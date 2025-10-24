// PreviewPage.jsx (Server Component)
import { redirect } from 'next/navigation'
import { db } from '@/fake-db/apps/invoice'
import PreviewActions from '@/views/apps/invoice/preview/PreviewActions'

const PreviewPage = ({ params }) => {
  const { id } = params
  const invoiceData = db.find(invoice => invoice.id === id)

  if (!invoiceData) redirect('/not-found')

  return (
    <div className="p-4">
      <h2>Invoice #{invoiceData.id}</h2>
      <p>Client: {invoiceData.name}</p>
      <p>Email: {invoiceData.companyEmail}</p>

      <ul>
        {invoiceData.items?.map((item, i) => (
          <li key={i}>{item.item} - ${item.total}</li>
        ))}
      </ul>

      <PreviewActions invoiceData={invoiceData} />
    </div>
  )
}

export default PreviewPage
