'use client'

import { useState } from 'react'
import { Box, Typography, Avatar, Button } from '@mui/material'
import { 
  ShoppingCartIcon, 
  TrendingUpIcon 
} from "lucide-react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts'

const salesByMonth = [
  { month: 'Jan', sales: 12000 },
  { month: 'Feb', sales: 15000 },
  { month: 'Mar', sales: 14000 },
  { month: 'Apr', sales: 17000 },
  { month: 'May', sales: 18000 },
  { month: 'Jun', sales: 21000 },
  { month: 'Jul', sales: 20000 },
  { month: 'Aug', sales: 23000 },
  { month: 'Sep', sales: 22000 },
  { month: 'Oct', sales: 24000 },
  { month: 'Nov', sales: 25000 },
  { month: 'Dec', sales: 27000 }
]

const salesByProduct = [
  { product: 'Producto A', sales: 15200 },
  { product: 'Producto B', sales: 10500 },
  { product: 'Producto C', sales: 23200 }
]

const SalesPage = () => {
  const [flipped, setFlipped] = useState(false)

  return (
    <Box
      className="container"
      sx={{
        minHeight: '50vh',
        p: 4,
        background: '#2c2f3e',
        color: '#000000ff',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <Typography variant="h4" className="header" sx={{ textAlign: 'center', mb: 4 }}>
        Ventas de Jhon
      </Typography>

      {/* Tarjetas */}
      <Box className="cardsContainer" sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 3, mb: 4 }}>
        <Box className="card cardPrimary" sx={{ p: 3, borderRadius: 3, textAlign: 'center', backdropFilter: 'blur(6px)', boxShadow: '0 6px 20px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography className="cardTitle">Ventas Mensuales</Typography>
          <Typography className="cardValue">$48,900</Typography>
        </Box>

        <Box
          className={`card cardWarning ${flipped ? 'flipped' : ''}`}
          sx={{ p: 3, borderRadius: 3, textAlign: 'center', backdropFilter: 'blur(6px)', boxShadow: '0 6px 20px rgba(0,0,0,0.5)', perspective: '1000px', position: 'relative', cursor: 'pointer', height: 150 }}
          onClick={() => setFlipped(!flipped)}
        >
          <Box className="cardFront" sx={{ backfaceVisibility: 'hidden', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}>
            <Typography className="cardTitle">Transacciones</Typography>
            <Typography className="cardValue">128</Typography>
          </Box>
          <Box className="cardBack" sx={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 3, background: 'rgba(90, 86, 78, 0.95)' }}>
            <Typography>Haga click para más detalles</Typography>
          </Box>
        </Box>

        <Box className="card cardInfo" sx={{ p: 3, borderRadius: 3, textAlign: 'center', backdropFilter: 'blur(6px)', boxShadow: '0 6px 20px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography className="cardTitle">Ventas por Producto</Typography>
          <Typography className="cardValue">$50,900</Typography>
        </Box>

        <Box className="card cardSuccess" sx={{ p: 3, borderRadius: 3, textAlign: 'center', backdropFilter: 'blur(6px)', boxShadow: '0 6px 20px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography className="cardTitle">Pedidos Completados</Typography>
          <Typography className="cardValue">86</Typography>
        </Box>
      </Box>

      {/* Graficas */}
      <Box className="charts" sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        <Box className="chartCard" sx={{ background: '#3a3d55', p: 3, borderRadius: 3, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', height: 400 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Ventas Mensuales</Typography>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={salesByMonth}>
              <Line type="monotone" dataKey="sales" stroke="#3871f6ff" strokeWidth={5} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="month" stroke="#e0e0e0ff" />
              <YAxis stroke="#e0e0e0" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Box className="chartCard" sx={{ background: '#3a3d55', p: 3, borderRadius: 3, textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', height: 400 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Ventas por Producto</Typography>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={salesByProduct}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="product" stroke="#e0e0e0" />
              <YAxis stroke="#e0e0e0" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#337e74ff" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      
      <Box sx={{ textAlign: 'center', margin: "25px" }}>
        <Button variant='contained' color='primary' href="/dashboards/ecommerce">
          Back to Ecommerce
        </Button>
      </Box>
    </Box>
  )
}

export default SalesPage
