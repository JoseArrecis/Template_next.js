// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import Dashboard from './Dashboard'
import Reports from './Reports'
import Settings from './Settings'

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
        <Settings />
      </Grid>
    </Grid>
  )
}

export default MarketingDashboard
