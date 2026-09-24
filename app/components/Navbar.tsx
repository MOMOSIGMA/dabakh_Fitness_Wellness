'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const ouvertureRef = useRef<HTMLButtonElement>(null)
  const fermetureRef = useRef<HTMLButtonElement>(null)
  const dejaOuvert = useRef(false)

  // Bloquer le scroll du body quand menu ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Echap ferme le menu, comme n'importe quelle fenetre modale du site.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // En passant au format bureau, le menu mobile n'a plus de bouton pour le
  // fermer : il resterait ouvert et bloquerait le defilement du body.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // A l'ouverture, le focus part sur la croix ; a la fermeture il revient sur
  // le bouton d'ouverture, sinon la navigation au clavier se perd.
  useEffect(() => {
    if (mobileMenuOpen) fermetureRef.current?.focus()
    else if (dejaOuvert.current) ouvertureRef.current?.focus()
    dejaOuvert.current = mobileMenuOpen
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Disciplines', href: '#disciplines' },
    { name: 'Tarifs', href: '#tarifs' },
    { name: 'AI Coach', href: '#ai-coach', action: 'ai' as const },
    { name: 'Nos Coachs', href: '#coachs' },
    { name: 'Nos Souvenirs', href: '#souvenirs' },
    { name: 'Avis', href: '#avis' },
    { name: 'Infos', href: '#infos-pratiques' },
  ]

  const openAICoach = () => {
    window.dispatchEvent(new CustomEvent('open-ai-coach'))
  }

  /** Referme le panneau puis navigue. Le delai laisse le panneau sortir de
   *  l'ecran et le verrou de defilement se lever : sans lui, le defilement
   *  vers l'ancre est annule. */
  const allerVers = (href: string, action?: string) => {
    setMobileMenuOpen(false)
    setTimeout(() => {
      if (action === 'ai') {
        openAICoach()
        return
      }
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 220)
  }

  return (
    <nav
      // La barre porte un z-index qui cree un contexte d'empilement : un enfant
      // ne peut pas passer au-dessus d'un element exterieur plus haut, quel que
      // soit son propre z-index. Menu ouvert, on hisse donc toute la barre
      // au-dessus des bulles flottantes (coach IA et WhatsApp, z-100).
      className={`fixed top-0 left-0 right-0 ${
        mobileMenuOpen ? 'z-[120]' : 'z-50'
      } transition-all duration-300 ${
        scrolled
          ? 'nav-scrolled shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/images/logo-dabakh.png"
              alt="Logo du Dabakh Fitness Wellness Club"
              width={40}
              height={40}
              className="w-10 h-10 shrink-0 object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight uppercase">Dabakh</span>
              <span className="text-xs text-gray-200 -mt-1">Fitness Wellness Club</span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.action === 'ai' ? (
                <button
                  key={link.name}
                  type="button"
                  onClick={openAICoach}
                  className="text-sm font-medium text-white hover:text-red-500 transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-600 group-hover:w-full transition-all duration-300" />
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-white hover:text-red-500 transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-600 group-hover:w-full transition-all duration-300" />
                </a>
              )
            )}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#tarifs"
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-red-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Séance Découverte
            </motion.a>
          </div>

          {/* Bouton d'ouverture. La croix vit desormais dans le panneau :
              chercher un bouton de 24 px en haut d'ecran pour refermer etait
              le point le plus penible de l'ancien menu. */}
          <button
            ref={ouvertureRef}
            type="button"
            className="md:hidden -mr-2 p-3 text-white"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Panneau lateral.
          L'ancien menu etait un bandeau deroulant en overflow-hidden : avec
          huit liens et un bouton, le bas sortait de l'ecran sans possibilite
          de le faire defiler. Ici la liste defile et l'appel a l'action reste
          ancre en bas. */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-[105] md:hidden"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu principal"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.28 }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-[110] w-[86%] max-w-sm bg-neutral-950 border-l border-white/10 flex flex-col"
            >
              <div className="flex items-center justify-between gap-3 px-5 h-[var(--nav-h)] border-b border-white/10 shrink-0">
                <span className="flex items-center gap-2 min-w-0">
                  <Image
                    src="/images/logo-dabakh.png"
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 shrink-0 object-contain"
                  />
                  <span className="font-black text-base uppercase tracking-tight truncate">
                    Dabakh
                  </span>
                </span>
                <button
                  ref={fermetureRef}
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Fermer le menu"
                  className="-mr-2 p-3 text-gray-300 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => allerVers(link.href, link.action)}
                    className="group flex items-center justify-between w-full gap-3 px-4 py-3.5 rounded-xl text-white text-base font-semibold hover:bg-white/5 active:bg-white/10 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
                  </button>
                ))}
              </nav>

              <div className="shrink-0 border-t border-white/10 p-4 sheet-safe">
                <button
                  type="button"
                  onClick={() => allerVers('#tarifs')}
                  className="block w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl text-center shadow-lg shadow-red-500/25 active:scale-[0.98] transition-transform"
                >
                  Séance Découverte
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
