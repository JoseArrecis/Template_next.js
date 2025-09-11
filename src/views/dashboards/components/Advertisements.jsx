// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import Dashboard from '@/views/apps/marketing/dashboard/Dashboard'
import Reports from '@/views/apps/marketing/dashboard/Reports'
import Settings from '@/views/apps/marketing/dashboard/Setting'

// Data Imports (si los tienes)
import { getMarketingData, getStatisticsData } from '@/app/server/actions'

const MarketingDashboard = async () => {
  // Traemos los datos
  const data = await getStatisticsData()
  const marketingData = await getMarketingData()

  return (
    <Grid container spacing={6} style={{ minHeight: '100vh', padding: '2rem' }}>
      <Grid size={{ xs: 12 }}>
        <Dashboard data={data} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Reports data={marketingData} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Settings />
      </Grid>
    </Grid>
  )
}

export default MarketingDashboard
