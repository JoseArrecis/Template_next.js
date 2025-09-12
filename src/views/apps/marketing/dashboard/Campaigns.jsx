import React from 'react'
import styles from '../css/Campaigns.module.css'

export default function Campaigns() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Campaigns</h1>

      <div className={styles.cardsContainer}>
        <div className={`${styles.card} ${styles.cardPrimary}`}>
          <h2 className={styles.cardTitle}>Email Marketing</h2>
          <p className={styles.cardValue}>8 campañas activas</p>
        </div>

        <div className={`${styles.card} ${styles.cardSuccess}`}>
          <h2 className={styles.cardTitle}>Social Media</h2>
          <p className={styles.cardValue}>15 campañas en ejecución</p>
        </div>

        <div className={`${styles.card} ${styles.cardInfo}`}>
          <h2 className={styles.cardTitle}>Publicidad (Ads)</h2>
          <p className={styles.cardValue}>5 campañas activas</p>
        </div>
      </div>
    </div>
  )
}
