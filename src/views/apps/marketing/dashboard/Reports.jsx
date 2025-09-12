"use client"

import React, { useState } from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts"
import styles from "../css/Reports.module.css"

export default function Reports() {
  const [flipped, setFlipped] = useState(null)

  const projects = [
    { id: 1, title: 'ROI', value: '58%', detail: 'ROI = (Ganancia neta / Inversión) × 100', color: '#787594ff' },
    { id: 2, title: 'Conversiones', value: '1,245', detail: 'Conversiones = Visitantes que completaron una acción', color: '#579071ff' },
    { id: 3, title: 'Campañas Activas', value: '12', detail: 'Cantidad de campañas actualmente en ejecución', color: '#2055beff' }
  ]

  const lineData = [
    { month: "Ene", conversiones: 400 },
    { month: "Feb", conversiones: 300 },
    { month: "Mar", conversiones: 500 },
    { month: "Abr", conversiones: 700 },
    { month: "May", conversiones: 600 },
    { month: "Jun", conversiones: 800 }
  ]

  const pieData = [
    { name: "Facebook Ads", value: 40 },
    { name: "Google Ads", value: 30 },
    { name: "Email", value: 20 },
    { name: "Otros", value: 10 }
  ]

  const COLORS = ["#00668E", "#17BECF", "#5a564aff", "#f3f3f3ff"]

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reports</h2>

      {/* Tarjetas giratorias */}
      <div className={styles.cards}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={`${styles.card} ${flipped === project.id ? styles.flipped : ""}`}
            style={{ "--card-color": project.color }}
            onClick={() => setFlipped(flipped === project.id ? null : project.id)}
          >
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <h3>{project.title}</h3>
                <p>{project.value}</p>
              </div>
              <div className={styles.cardBack}>
                <p>{project.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficas */}
      <div className={styles.charts}>
        <div className={styles.chartBox}>
          <h3>Evolución de Conversiones</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="conversiones" stroke="#ffffffff" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>  
        </div>

        <div className={styles.chartBox}>
          <h3>Distribución de Canales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
