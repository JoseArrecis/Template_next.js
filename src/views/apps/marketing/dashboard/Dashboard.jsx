'use client'

import React, { useState } from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import styles from '../css/Dashboard.module.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function Dashboard() {
  const [roiFlipped, setRoiFlipped] = useState(false)

  const weeklyData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Conversiones',
        data: [50, 75, 60, 80, 90, 70, 100],
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.2)',
        tension: 0.4
      }
    ]
  }

  const weeklyOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: '#fff' } } },
    scales: {
      x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  }

  const leadsData = {
    labels: ['Email', 'Social Media', 'Ads', 'Referral'],
    datasets: [
      {
        label: 'Leads',
        data: [400, 300, 200, 100],
        backgroundColor: ['#5048e5', '#0984e3', '#5a564e', '#dae6e3ff']
      }
    ]
  }

  const leadsOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: '#fff' } } }
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        <div className={`${styles.card} ${styles.cardPrimary}`}>
          <i className="tabler-bullhorn" style={{ fontSize: '36px', marginBottom: '8px' }} />
          <h2 className={styles.cardTitle}>Campañas Activas</h2>
          <p className={styles.cardValue}>12</p>
        </div>

        <div className={`${styles.card} ${styles.cardSuccess}`}>
          <i className="tabler-users" style={{ fontSize: '36px', marginBottom: '8px' }} />
          <h2 className={styles.cardTitle}>Leads Generados</h2>
          <p className={styles.cardValue}>1,245</p>
        </div>

        <div className={`${styles.card} ${styles.cardInfo}`}>
          <i className="tabler-chart-bar" style={{ fontSize: '36px', marginBottom: '8px' }} />
          <h2 className={styles.cardTitle}>Conversiones</h2>
          <p className={styles.cardValue}>342</p>
        </div>

        {/* ROI con flip */}
        <div
          className={`${styles.card} ${styles.cardWarning} ${roiFlipped ? styles.flipped : ''}`}
          onClick={() => setRoiFlipped(!roiFlipped)}
        >
          <div className={styles.cardFront}>
            <i className="tabler-currency-dollar" style={{ fontSize: '36px', marginBottom: '8px' }} />
            <h2 className={styles.cardTitle}>ROI</h2>
            <p className={styles.cardValue}>58%</p>
          </div>
          <div className={styles.cardBack}>
            ROI = (Ingresos de la Inversión - Costo de la Inversión) / Costo de la Inversión × 100 <br />
            Ejemplo: ((3000-1000)/1000) × 1000 → ROI = 58%
          </div>
        </div>
      </div>

      <section className={styles.charts}>
        <div className={styles.chartCard}>
          <h3>Performance Semanal</h3>
          <Line data={weeklyData} options={weeklyOptions} />
        </div>

        <div className={styles.chartCard}>
          <h3>Leads por Canal</h3>
          <Doughnut data={leadsData} options={leadsOptions} />
        </div>
      </section>
    </div>
  )
}
