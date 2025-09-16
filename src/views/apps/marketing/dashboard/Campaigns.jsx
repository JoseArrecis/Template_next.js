'use client'

import React, { useState } from 'react'
import styles from '../css/Campaigns.module.css'

export default function Campaigns() {
  const [flippedCards, setFlippedCards] = useState({
    seo: false,
    conversiones: false
  })

  const toggleFlip = (card) => {
    setFlippedCards(prev => ({ ...prev, [card]: !prev[card] }))
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Campaigns</h2>

      <div className={styles.cardsContainer}>
        <div className={`${styles.card} ${styles.cardPrimary}`}>
          <h3 className={styles.cardTitle}>Email Marketing</h3>
          <p className={styles.cardValue}>8 campañas activas</p>
        </div>

        <div className={`${styles.card} ${styles.cardSuccess}`}>
          <h3 className={styles.cardTitle}>Social Media</h3>
          <p className={styles.cardValue}>15 campañas en ejecución</p>
        </div>

        <div className={`${styles.card} ${styles.cardInfo}`}>
          <h3 className={styles.cardTitle}>Publicidad (Ads)</h3>
          <p className={styles.cardValue}>12 campañas activas</p>
        </div>

        <div
          className={`${styles.card} ${styles.cardWarning} ${flippedCards.seo ? styles.flipped : ''}`}
          onClick={() => toggleFlip('seo')}
        >
          <div className={styles.cardFront}>
            <h3 className={styles.cardTitle}>SEO</h3>
            <p className={styles.cardValue}>3 proyectos en curso</p>
          </div>
          <div className={styles.cardBack}>
            <h4>Proyectos en curso</h4>
            <ul>
              <li>Optimización de Contenido</li>
              <li>Campaña de Backlinks</li>
              <li>SEO Técnico</li>
            </ul>
          </div>
        </div>

        <div
          className={`${styles.card} ${styles.cardDanger} ${flippedCards.conversiones ? styles.flipped : ''}`}
          onClick={() => toggleFlip('conversiones')}
        >
          <div className={styles.cardFront}>
            <h3 className={styles.cardTitle}>Conversiones</h3>
            <p className={styles.cardValue}>342</p>
          </div>
          <div className={styles.cardBack}>
            <h4>Detalles</h4>
            <p>Tasa de conversión: 5.6%</p>
            <p>Objetivos alcanzados: 120</p>
            <p>Valor total: $15,300</p>
          </div>
        </div>
      </div>
    </div>
  )
}
