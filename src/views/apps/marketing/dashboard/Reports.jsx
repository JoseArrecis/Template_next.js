"use client"
import React from "react"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import styles from "../css/Reports.module.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function Reports() {
  const conversionesData = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    datasets: [
      {
        label: "Conversiones",
        data: [90, 160, 120, 200],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  }

  const roiData = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    datasets: [
      {
        label: "ROI (%)",
        data: [45, 60, 50, 70],
        backgroundColor: "#22c55e"
      }
    ]
  }

  const campaignsData = {
    labels: ["Email", "Social Media", "Ads", "SEO"],
    datasets: [
      {
        label: "Campañas activas",
        data: [8, 15, 12, 3],
        backgroundColor: ["#6366f1", "#3b82f6", "#f59e0b", "#6b7280"]
      }
    ]
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reports</h2>

      <div className={styles.filters}>
        <button className={styles.filterActive}>Mes</button>
        <button className={styles.filter}>Semana</button>
        <button className={styles.filter}>Año</button>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.card}>ROI: <span className={styles.value}>72%</span></div>
        <div className={styles.card}>CTR: <span className={styles.value}>4.5%</span></div>
        <div className={styles.card}>Leads: <span className={styles.value}>320</span></div>
      </div>

      <div className={styles.charts}>
        <div className={styles.chartBox}>
          <h3>Conversiones</h3>
          <Line data={conversionesData} />
        </div>
        <div className={styles.chartBox}>
          <h3>ROI</h3>
          <Bar data={roiData} />
        </div>
        <div className={styles.chartBox}>
          <h3>Distribución de Campañas</h3>
          <Doughnut data={campaignsData} />
        </div>
      </div>

      <div className={styles.summary}>
        <h3>Resumen Ejecutivo</h3>
        <p>
          Este mes las campañas han mostrado un aumento constante en conversiones
          y un ROI en crecimiento. Se recomienda invertir en redes sociales y 
          mejorar las creatividades en Ads para optimizar el CTR.
        </p>
      </div>
    </div>
  )
}
