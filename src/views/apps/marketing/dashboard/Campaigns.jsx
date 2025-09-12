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
          <p className={styles.cardValue}>12 campañas activas</p>
        </div>

        <div
          className={`${styles.card} ${styles.cardWarning} ${flippedCards.seo ? styles.flipped : ''}`}
          onClick={() => toggleFlip('seo')}
        >
          <div className={styles.cardFront}>
            <h2 className={styles.cardTitle}>SEO</h2>
            <p className={styles.cardValue}>3 proyectos en curso</p>
          </div>
          <div className={styles.cardBack}>
            <h3>Proyectos en curso</h3>
            <li>Optimización de Contenido en Blog</li>
            <li>Campaña de Backlinks</li>
            <li>SEO Técnico en la Web</li>
          </div>
        </div>

        <div
          className={`${styles.card} ${styles.cardDanger} ${flippedCards.conversiones ? styles.flipped : ''}`}
          onClick={() => toggleFlip('conversiones')}
        >
          <div className={styles.cardFront}>
            <h2 className={styles.cardTitle}>Conversiones</h2>
            <p className={styles.cardValue}>342</p>
          </div>
          <div className={styles.cardBack}>
            <h3>Detalles de Conversiones</h3>
            <p>Tasa de conversión: 5.6%</p>
            <p>Objetivos alcanzados: 120</p>
            <p>Valor total de conversiones: $15,300</p>
          </div>
        </div>

      </div>
    </div>
  )
}
