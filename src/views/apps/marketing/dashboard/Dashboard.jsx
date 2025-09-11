import { Grid } from '@mui/material'
import React from 'react'

const StatCard = ({ title, value, icon }) => (
  <div style={{
    background: '#282a42',
    borderRadius: 12,
    padding: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem'
  }}>
    <div>
      <p style={{ margin: 0, fontSize: '0.9rem', color: '#bfc9d4' }}>{title}</p>
      <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#7367f0' }}>{value}</h2>
    </div>
    <span style={{ fontSize: '2rem' }}>{icon}</span>
  </div>
)

const CampaignCard = ({ name, leads, performance }) => (
  <div style={{
    background: '#282a42',
    borderRadius: 12,
    padding: '0.8rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem'
  }}>
    <h3 style={{ margin: 0, color: '#7367f0', fontSize: '1rem' }}>{name}</h3>
    <p style={{ margin: 0, fontSize: '0.85rem', color: '#bfc9d4' }}>
      Leads: {leads} | Performance: {performance}
    </p>
  </div>
)

const ReportCard = ({ title, clicks, conversions }) => (
  <div style={{
    background: '#282a42',
    borderRadius: 12,
    padding: '0.8rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem'
  }}>
    <h3 style={{ margin: 0, color: '#7367f0', fontSize: '1rem' }}>{title}</h3>
    <p style={{ margin: 0, fontSize: '0.85rem', color: '#bfc9d4' }}>
      Clicks: {clicks} | Conversions: {conversions}
    </p>
  </div>
)

// Datos mock
const statsData = [
  { title: 'Campañas activas', value: 5, icon: '📊' },
  { title: 'Leads generados', value: 345, icon: '📈' },
  { title: 'Conversiones', value: 78, icon: '💰' }
]

const campaignsData = [
  { name: 'Campaña verano', leads: 120, performance: 'Alta' },
  { name: 'Campaña invierno', leads: 85, performance: 'Media' },
]

const reportsData = [
  { title: 'Reporte mensual', clicks: 500, conversions: 40 },
  { title: 'Reporte trimestral', clicks: 1200, conversions: 90 },
]

const Dashboard = () => {
 return (
    <div style={{ minHeight: '30vh', background: '#373955', padding: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ color: '#7367f0', marginBottom: '1.5rem', fontSize: '2rem' }}>Marketing Dashboard</h1>

      {/* Estadísticas */}
      <Grid container spacing={3} marginBottom={3}>
        {statsData.map((stat, i) => (
          <Grid key={i} xs={12} md={4}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Campañas */}
      <h2 style={{ color: '#bfc9d4', marginBottom: '1rem', fontSize: '1.2rem' }}>Campañas</h2>
      <Grid container spacing={2} marginBottom={3}>
        {campaignsData.map((c, i) => (
          <Grid key={i} xs={12} md={6}>
            <CampaignCard {...c} />
          </Grid>
        ))}
      </Grid>

      {/* Reportes */}
      <h2 style={{ color: '#bfc9d4', marginBottom: '1rem', fontSize: '1.2rem' }}>Reportes</h2>
      <Grid container spacing={2}>
        {reportsData.map((r, i) => (
          <Grid key={i} xs={12} md={6}>
            <ReportCard {...r} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Dashboard
