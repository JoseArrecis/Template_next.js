'use client'

import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8">

        <div className="xSvMjXo -NWgQGU">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Política de Privacidad y Términos
            </h1>
        </div>

        <p className="text-gray-700 mb-6">
          Bienvenido/a a nuestra aplicación. La protección de tu información personal es muy importante para nosotros. 
          Esta política de privacidad explica qué datos recopilamos, cómo los utilizamos y tus derechos como usuario.
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Privacidad
          </h2>
          <p className="text-gray-700 mb-2">
            Recopilamos y utilizamos tu información únicamente con fines específicos:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Autenticación de usuarios y administración de cuentas</li>
            <li>Análisis de uso para mejorar la aplicación</li>
            <li>Comunicación sobre novedades, ofertas o alertas importantes</li>
          </ul>
          <p className="text-gray-700 mt-2">
            Nunca compartiremos tu información con terceros sin tu consentimiento explícito, salvo cuando la ley lo requiera.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Información que recopilamos
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Nombre, correo electrónico y contraseña</li>
            <li>Datos de perfil que agregues voluntariamente</li>
            <li>Información técnica como dirección IP, navegador y sistema operativo</li>
            <li>Datos de uso de la aplicación y preferencias</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Cómo utilizamos la información
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Proveer y mantener nuestros servicios</li>
            <li>Mejorar la experiencia del usuario</li>
            <li>Responder consultas y soporte</li>
            <li>Enviar notificaciones importantes</li>
            <li>Prevenir fraudes y actividades ilícitas</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Cookies y tecnologías similares
          </h2>
          <p className="text-gray-700">
            Usamos cookies y tecnologías similares para analizar el tráfico, recordar tus preferencias y mejorar la navegación. 
            Puedes configurar tu navegador para rechazar cookies, pero algunas funciones podrían no estar disponibles.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Seguridad
          </h2>
          <p className="text-gray-700">
            Implementamos medidas de seguridad técnicas y administrativas para proteger tu información personal contra pérdida, uso indebido o acceso no autorizado.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Derechos del usuario
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Acceder y obtener una copia de tu información</li>
            <li>Solicitar corrección o actualización de tus datos</li>
            <li>Solicitar la eliminación de tu información personal</li>
            <li>Retirar tu consentimiento en cualquier momento</li>
          </ul>
          <p className="text-gray-700 mt-2">
            Para ejercer tus derechos, escríbenos a 
            <a href="mailto:soporte@miapp.com" className="text-blue-600 hover:underline ml-1">soporte@miapp.com</a>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Cambios en la política
          </h2>
          <p className="text-gray-700">
            Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre cambios importantes publicando la nueva versión en esta página.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">
            Contacto
          </h2>
          <p className="text-gray-700">
            Si tienes dudas o inquietudes sobre esta política de privacidad, contáctanos a 
            <a href="mailto:soporte@miapp.com" className="text-blue-600 hover:underline ml-1">soporte@miapp.com</a>.
          </p>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicy
