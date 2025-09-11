import React from 'react';

export default function MarketingDashboard() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#23243c',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        background: '#373955',
        borderRadius: '18px',
        padding: '0.5em 1.5em',
        marginBottom: '1.5rem',
        boxShadow: '0 4px 24px #373955',
        display: 'inline-block',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: '#7367f0',
          margin: 0,
          letterSpacing: '-1px',
        }}>
          Marketing
        </h1>
      </div>
      <p style={{
        fontSize: '1.2rem',
        color: '#bfc9d4',
        maxWidth: 500,
        textAlign: 'center',
        marginBottom: '2rem',
      }}>
        Bienvenido a la vista de Marketing. Aquí podrás visualizar campañas, métricas y herramientas para potenciar tu negocio.
      </p>
      <div style={{
        background: '#282a42',
        borderRadius: 16,
        boxShadow: '0 4px 24px #373955',
        padding: '2rem',
        minWidth: 320,
        minHeight: 180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <span style={{fontSize: '3rem'}}>📈</span>
        <span style={{color: '#7367f0', fontWeight: 600}}>¡Próximamente más widgets y reportes!</span>
      </div>
    </div>
  );
}
