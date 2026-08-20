'use client'

import React, { useEffect, useState } from 'react'
import { getOpeningStatus, type OpeningStatus } from '@/lib/opening-hours'

/**
 * Pastille d'etat d'ouverture, calculee en direct.
 *
 * Le calcul depend de l'heure courante : le faire au rendu serveur produirait
 * un HTML fige au moment du build, et un ecart d'hydratation cote navigateur.
 * On ne rend donc rien avant le montage, puis on rafraichit chaque minute.
 */
export default function OpenStatus({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState<OpeningStatus | null>(null)

  useEffect(() => {
    const update = () => setStatus(getOpeningStatus())
    update()
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [])

  if (!status) return null

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
        status.isOpen
          ? 'bg-green-500/10 border-green-500/40 text-green-300'
          : 'bg-white/5 border-white/15 text-gray-300'
      } ${className}`}
    >
      <span className="relative flex w-2 h-2" aria-hidden="true">
        {status.isOpen && (
          <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-70 animate-ping" />
        )}
        <span
          className={`relative inline-flex w-2 h-2 rounded-full ${
            status.isOpen ? 'bg-green-400' : 'bg-gray-500'
          }`}
        />
      </span>
      <span>
        {status.isOpen ? 'Ouvert' : 'Fermé'}
        <span className="text-gray-400 font-normal"> · {status.detail}</span>
      </span>
    </span>
  )
}
