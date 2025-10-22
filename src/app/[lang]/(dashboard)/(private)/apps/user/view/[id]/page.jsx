import dynamic from 'next/dynamic'
import Grid from '@mui/material/Grid2'
import UserLeftOverview from '@views/apps/user/view/user-left-overview'
import UserRight from '@views/apps/user/view/user-right'
import { getUserData } from '@/app/server/actions'

const OverViewTab = dynamic(() => import('@views/apps/user/view/user-right/overview'))
const SecurityTab = dynamic(() => import('@views/apps/user/view/user-right/security'))
const BillingPlans = dynamic(() => import('@views/apps/user/view/user-right/billing-plans'))
const NotificationsTab = dynamic(() => import('@views/apps/user/view/user-right/notifications'))
const ConnectionsTab = dynamic(() => import('@views/apps/user/view/user-right/connections'))

export default async function UserViewPage(props) {
  const params = typeof props.params?.then === 'function' ? await props.params : props.params
  const { id } = params
  const users = await getUserData()
  const user = users.find(u => String(u.id) === String(id))

  if (!user) {
    return <div style={{ padding: 40, textAlign: 'center' }}><h2>User not found</h2></div>
  }

  // Tabs con datos del usuario
  const tabContentList = {
    overview: <OverViewTab user={user} />,
    security: <SecurityTab user={user} />,
    'billing-plans': <BillingPlans user={user} />,
    notifications: <NotificationsTab user={user} />,
    connections: <ConnectionsTab user={user} />
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, lg: 4, md: 5 }}>
        <UserLeftOverview user={user} />
      </Grid>
      <Grid size={{ xs: 12, lg: 8, md: 7 }}>
        <UserRight user={user} tabContentList={tabContentList} />
      </Grid>
    </Grid>
  )
}
