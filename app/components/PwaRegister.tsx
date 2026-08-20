'use client'

import { useEffect } from 'react'

/**
 * Enregistre le service worker, uniquement en production.
 *
 * En developpement il interfererait avec le rechargement a chaud de Next :
 * c'est une source classique de « ma modification ne s'affiche pas ».
 */
export default function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    if (!('serviceWorker' in navigator)) return

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('[pwa] enregistrement du service worker impossible :', error)
      })
    }

    // Apres le chargement, pour ne pas disputer la bande passante au premier rendu.
    if (document.readyState === 'complete') {
      register()
    } else {
      window.addEventListener('load', register)
      return () => window.removeEventListener('load', register)
    }
  }, [])

  return null
}
