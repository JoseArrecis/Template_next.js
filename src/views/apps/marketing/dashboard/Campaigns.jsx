'use client'

import React from 'react'
import styles from '../css/Campaigns.module.css'



export default function Campaigns() {
    const [conFlipped, setConFlipped] = React.useState(false)

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

            <div className={`${styles.card} ${styles.cardWarning}`}>
                <h2 className={styles.cardTitle}>SEO</h2>
                <p className={styles.cardValue}>3 proyectos en curso</p>
            </div>

            <div className={`${styles.card} ${styles.cardDanger} ${conFlipped ? styles.flipped : ''}`}
                onClick={() => setConFlipped(!conFlipped)}
            >
                <div className={styles.cardFront}>
                    <h2 className={styles.cardTitle}>Conversiones</h2>
                    <p className={styles.cardValue}>342</p>
                </div>

                <div className={styles.cardBack}>
                    <h2 className={styles.cardTitle}>Detalles de Conversiones</h2>
                    <p className={styles.cardValue}>Tasa de conversión: 5.6%</p>
                    <p className={styles.cardValue}>Objetivos alcanzados: 120</p>
                    <p className={styles.cardValue}>Valor total de conversiones: $15,300</p>
                </div>
            </div>
        </div>
    </div>
  )
}
