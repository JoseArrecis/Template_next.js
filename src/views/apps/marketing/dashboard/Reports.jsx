'use client'

import React from 'react'
import styles from '../css/Reports.module.css'

export default function Reports() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reports</h1>

      <div className={styles.cardsContainer}>
        <div className={`${styles.card} ${styles.cardPrimary}`}>
          <h2 className={styles.cardTitle}>Campañas Activas</h2>
          <p className={styles.cardValue}>12</p>
        </div>

        <div className={`${styles.card} ${styles.cardSuccess}`}>
          <h2 className={styles.cardTitle}>Leads Generados</h2>
          <p className={styles.cardValue}>1,245</p>
        </div>

        <div className={`${styles.card} ${styles.cardInfo}`}>
          <h2 className={styles.cardTitle}>Conversiones</h2>
          <p className={styles.cardValue}>342</p>
        </div>
      </div>
    </div>
  )
}
