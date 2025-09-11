import React from 'react'
import styles from '../css/Setting.module.css'

export default function Settings() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>

      <div className={styles.cardsContainer}>
        <div className={`${styles.card} ${styles.cardPrimary}`}>
          <h2 className={styles.cardTitle}>Campañas</h2>
          <p className={styles.cardValue}>Administrar campañas activas</p>
        </div>

        <div className={`${styles.card} ${styles.cardSuccess}`}>
          <h2 className={styles.cardTitle}>Integraciones</h2>
          <p className={styles.cardValue}>Configurar integraciones externas</p>
        </div>

        <div className={`${styles.card} ${styles.cardInfo}`}>
          <h2 className={styles.cardTitle}>Preferencias</h2>
          <p className={styles.cardValue}>Ajustes de usuario y notificaciones</p>
        </div>
      </div>
    </div>
  )
}
