// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import UserDetails from './UserDetails'
import UserPlan from './UserPlan'


const UserLeftOverview = ({ user }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <UserDetails user={user} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <UserPlan user={user} />
      </Grid>
    </Grid>
  )
}

export default UserLeftOverview
