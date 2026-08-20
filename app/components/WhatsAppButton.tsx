'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const phoneNumber = '221775323725'
  const message = encodeURIComponent('Bonjour ! Je suis intéressé par la séance découverte à 2000 FCFA 💪')

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[90] flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white px-5 py-4 rounded-full shadow-2xl hover:shadow-green-700/50 transition-all hover:scale-105 active:scale-95 group"
      aria-label="Message WhatsApp : seance decouverte a 2000 FCFA"
    >
      <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      <div className="hidden sm:flex flex-col">
        <span className="text-xs font-medium">2000 FCFA Découverte</span>
        <span className="text-sm font-bold">Message WhatsApp</span>
      </div>
      {/* Mobile: juste l'icône avec badge */}
      <div className="sm:hidden absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    </a>
  )
}
