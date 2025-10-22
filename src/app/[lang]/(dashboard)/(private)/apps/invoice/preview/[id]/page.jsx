import { redirect } from 'next/navigation'
import Preview from '@views/apps/invoice/preview'
import { getInvoiceData } from '@/app/server/actions'
import { db } from '@/fake-db/apps/invoice'

const PreviewPage = async ({ params }) => {
  const { id } = await params

  const filteredData = db.find(invoice => invoice.id === id)

  if (!filteredData) {
    redirect('/not-found')
  }

  return <Preview invoiceData={filteredData} id={id} />
}

export default PreviewPage
