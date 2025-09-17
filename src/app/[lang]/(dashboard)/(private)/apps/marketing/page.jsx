// MUI Imports
import { getMarketingData, getStatisticsData } from '@/app/server/actions'
import Campaigns from '@/views/apps/marketing/dashboard/Campaigns'
import Dashboard from '@/views/apps/marketing/dashboard/Dashboard'
import Reports from '@/views/apps/marketing/dashboard/Reports'
import Grid from '@mui/material/Grid2'

const MarketingDashboard = async () => {
  // Vars
  const data = await getStatisticsData()      
  const marketingData = await getMarketingData() 

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Dashboard data={data} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Reports data={marketingData} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Campaigns />
      </Grid>
    </Grid>
  )
}

export default MarketingDashboard
