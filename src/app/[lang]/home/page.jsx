"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { getLocalizedUrl } from '@/utils/i18n';

export default function HomePage() {
  const { lang } = useParams();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 500,
          marginBottom: '2rem',
        }}
      >
        <svg
          width='60'
          height='40'
          viewBox='0 0 35 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{ marginBottom: '1rem' }}
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M0.00188479 0V7.47707C0.00188479 7.47707 -0.145285 9.83135 2.161 11.8242L14.9358 23.9961L21.5792 23.9107L20.5136 10.7809L17.9947 7.82497L10.0778 0H0.00188479Z'
            fill='#6366f1'
          />
          <path
            opacity='0.06'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.39807 17.9307L13.6581 3.53127L18.059 7.91564L8.39807 17.9307Z'
            fill='#161616'
          />
          <path
            opacity='0.06'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.81183 17.3645L15.2093 5.06165L18.0926 7.94695L8.81183 17.3645Z'
            fill='#161616'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.47955 17.8436L25.8069 0H34.9091V7.50963C34.9091 7.50963 34.7195 10.0128 33.4463 11.3517L21.5808 24H14.9387L8.47955 17.8436Z'
            fill='#6366f1'
          />
        </svg>
        <p>
          Presiona el botón de <strong>“Iniciar sesión”</strong> para acceder a la plantilla.
        </p>
      </div>
      {/* Botón */}
      <a
        href={getLocalizedUrl('/login', lang)}
        style={{
          padding: '0.75rem 2rem',
          background: '#6366f1',
          color: '#fff',
          borderRadius: '999px',
          fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 2px 8px #6366f133',
          transition: 'background 0.2s',
        }}
      >
        Iniciar sesión
      </a>
    </div>
  );
}
