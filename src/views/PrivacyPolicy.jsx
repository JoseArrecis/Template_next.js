'use client'

import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Política de Privacidad y Términos</h1>
      <p>
        Bienvenido/a a nuestra aplicación. La protección de tu información personal es muy importante para nosotros. 
        A continuación, te explicamos cómo manejamos tus datos.
      </p>

      <h2 style={{ marginTop: '1.5rem' }}>Privacidad</h2>
      <p>
        Recopilamos y utilizamos tu información únicamente con fines de autenticación, análisis de uso de la aplicación 
        y mejora de la experiencia del usuario. Nunca compartiremos tus datos sin tu consentimiento.
      </p>

      <h2 style={{ marginTop: '1.5rem' }}>Términos de Uso</h2>
      <p>
        Al registrarte y usar nuestra aplicación, aceptas cumplir con las normas de uso responsable. 
        Queda prohibido el uso indebido de la plataforma para fines ilegales o maliciosos.
      </p>

      <h2 style={{ marginTop: '1.5rem' }}>Tus Derechos</h2>
      <p>
        Puedes solicitar la eliminación o modificación de tu información en cualquier momento escribiéndonos a 
        soporte@miapp.com.
      </p>
    </div>
  )
}

export default PrivacyPolicy
