import React from 'react';

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      fontFamily: 'Inter, sans-serif',
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 800,
        color: '#222',
        marginBottom: '1rem',
        letterSpacing: '-1px',
        textShadow: '0 2px 16px #fff8',
      }}>
        ¡Bienvenido a tu la plantilla Vuexy! 🏡
      </h1>
      <p style={{
        fontSize: '1.25rem',
        color: '#444',
        maxWidth: 500,
        textAlign: 'center',
        marginBottom: '2rem',
      }}>
        Presiona el button "Iniciar sesión" para acceder a tu dashboard.
      </p>
      <a href="/login" style={{
        padding: '0.75rem 2rem',
        background: '#6366f1',
        color: '#fff',
        borderRadius: '999px',
        fontWeight: 600,
        textDecoration: 'none',
        boxShadow: '0 2px 8px #6366f133',
        transition: 'background 0.2s',
      }}>
        Iniciar sesión
      </a>
    </div>
  );
}
