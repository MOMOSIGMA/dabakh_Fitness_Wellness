'use client'

import React, { useEffect, useRef, useState } from 'react'
import { MessageCircle, Bot, X } from 'lucide-react'

/**
 * Bouton de contact unique, deplie au clic.
 *
 * Avant, deux bulles de 64 px etaient fixees en permanence en bas a droite,
 * l'une a 24 px du bas et l'autre a 96 px. Elles occupaient une colonne de
 * 150 px de haut sur toute la longueur du site et masquaient du contenu :
 * les prix du Personal Training etaient amputes de leur dernier chiffre
 * (« 80 00 », « 100 0 »), et le lien « Details » des cartes etait coupe.
 *
 * Une seule bulle divise par deux la surface couverte, et le doigt n'hesite
 * plus entre deux cibles voisines.
 *
 * Pas de framer-motion ici : ce composant est rendu sur toutes les pages, et
 * une transition CSS suffit pour un depliage.
 */

const TELEPHONE = '221775323725'
const MESSAGE = encodeURIComponent(
  'Bonjour ! Je suis intéressé par la séance découverte à 2 000 FCFA.',
)

export default function FloatingActions() {
  const [ouvert, setOuvert] = useState(false)
  const conteneur = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ouvert) return

    const surEchap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOuvert(false)
    }
    const surClicExterieur = (e: MouseEvent) => {
      if (conteneur.current && !conteneur.current.contains(e.target as Node)) {
        setOuvert(false)
      }
    }

    window.addEventListener('keydown', surEchap)
    document.addEventListener('click', surClicExterieur)
    return () => {
      window.removeEventListener('keydown', surEchap)
      document.removeEventListener('click', surClicExterieur)
    }
  }, [ouvert])

  // Le coach IA ecoute cet evenement, comme depuis le menu de navigation.
  const ouvrirCoach = () => {
    setOuvert(false)
    window.dispatchEvent(new CustomEvent('open-ai-coach'))
  }

  // `invisible` retire les actions du parcours au clavier quand elles sont
  // repliees, ce qu'une simple opacite a 0 ne ferait pas.
  const etatActions = ouvert
    ? 'opacity-100 translate-y-0 visible'
    : 'opacity-0 translate-y-2 invisible'

  return (
    <div
      ref={conteneur}
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3"
    >
      <a
        href={`https://wa.me/${TELEPHONE}?text=${MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOuvert(false)}
        className={`${etatActions} flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full bg-green-700 hover:bg-green-800 text-white font-bold text-sm shadow-xl transition-all duration-200`}
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        WhatsApp
      </a>

      <button
        type="button"
        onClick={ouvrirCoach}
        className={`${etatActions} flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-sm shadow-xl transition-all duration-200`}
      >
        <Bot className="w-5 h-5 shrink-0" />
        Coach IA
      </button>

      <button
        type="button"
        onClick={() => setOuvert((v) => !v)}
        aria-expanded={ouvert}
        aria-label={ouvert ? 'Fermer les contacts' : 'Nous contacter'}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-2xl shadow-red-500/40 flex items-center justify-center text-white hover:shadow-red-600/60 active:scale-95 transition-all"
      >
        {ouvert ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}
