import React from 'react'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Marketing</h1>
      </header>

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

        <div className={`${styles.card} ${styles.cardWarning}`}>
          <i className="tabler-currency-dollar" style={{ fontSize: '36px', marginBottom: '8px' }} />
          <h2 className={styles.cardTitle}>ROI</h2>
          <p className={styles.cardValue}>58%</p>
        </div>
      </div>

      <section className={styles.charts}>
        <div className={styles.chartCard}>
          <h3>Performance Semanal</h3>
          <div className={styles.chartPlaceholder}>[Gráfico aquí]</div>
        </div>

        <div className={styles.chartCard}>
          <h3>Leads por Canal</h3>
          <div className={styles.chartPlaceholder}>[Gráfico aquí]</div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
