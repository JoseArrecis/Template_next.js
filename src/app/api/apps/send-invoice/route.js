import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export async function POST(req) {
  try {
    const { from, to, subject, message, invoiceId, invoiceData } = await req.json()

    // Crear PDF
    const doc = new jsPDF()
    doc.text(`Invoice #${invoiceId}`, 14, 20)
    doc.text('Invoice Details:', 14, 30)
    autoTable(doc, {
      startY: 40,
      head: [['Item', 'Description', 'Hours', 'Qty', 'Total']],
      body: invoiceData.map(item => [item.Item, item.Description, item.Hours, item.Qty, `$${item.Total}`])
    })
    const pdfBase64 = doc.output('datauristring').split(',')[1]

    // Transportador SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    await transporter.sendMail({
      from,
      to,
      subject,
      text: message,
      attachments: [
        {
          filename: `invoice_${invoiceId}.pdf`,
          content: Buffer.from(pdfBase64, 'base64'),
          contentType: 'application/pdf'
        }
      ]
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error sending invoice:', err)
    return NextResponse.json({ success: false, message: err.message }, { status: 500 })
  }
}
