'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Users, Flame, Play, X } from 'lucide-react'

type Souvenir = {
  title: string
  summary: string
  icon: typeof Trophy
  /** Photo du souvenir. Laisser absent tant que le client n'a pas fourni ses images. */
  image?: string
  /** Video du souvenir (fichier servi depuis /public/videos). */
  video?: string
}

export default function SouvenirsSection() {
  const [active, setActive] = useState<Souvenir | null>(null)

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // TODO CLIENT : ajouter `image` et/ou `video` a chaque entree des que la salle
  // fournit ses photos et ses videos, et completer avec les autres souvenirs.
  // Les entrees sans media s'affichent proprement en carte texte : aucune image
  // de remplacement, aucune mention "bientot disponible".
  const souvenirs: Souvenir[] = [
    {
      title: 'Concours de force',
      summary:
        'Le rendez-vous powerlifting de la salle : squat, développé couché et soulevé de terre, tous niveaux confondus, dans une ambiance de compétition bon enfant.',
      icon: Trophy,
    },
    {
      title: 'Séances de gainage collectif',
      summary:
        'Des sessions ouvertes à tous les membres, encadrées par les coachs, où le groupe tient la planche ensemble jusqu’au bout.',
      icon: Users,
    },
    {
      title: 'Challenges de fin d’année',
      summary:
        'Le temps fort de la saison : plusieurs semaines de défis entre membres, avec classement et récompenses pour clôturer l’année.',
      icon: Flame,
    },
  ]

  const hasMedia = (s: Souvenir) => Boolean(s.image || s.video)

  return (
    <section
      id="souvenirs"
      className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium uppercase tracking-wider text-red-500 mb-4">
            Nos Souvenirs
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Les moments <span className="text-red-500">Dabakh</span>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Les rendez-vous qui rythment l’année de la salle et rassemblent la communauté
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {souvenirs.map((souvenir, index) => {
            const Icon = souvenir.icon
            return (
              <motion.button
                key={souvenir.title}
                type="button"
                onClick={() => setActive(souvenir)}
                aria-label={`${souvenir.title} — voir le détail`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="group relative overflow-hidden rounded-2xl glass border border-white/10 text-left transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {souvenir.image && (
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={souvenir.image}
                      alt={souvenir.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={60}
                      loading="lazy"
                    />
                    {souvenir.video && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <span className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-0.5" />
                        </span>
                      </span>
                    )}
                  </div>
                )}

                <div className="p-6">
                  <Icon className="w-9 h-9 mb-4 text-red-500" />
                  <h3 className="text-xl font-bold mb-2 text-white leading-tight">
                    {souvenir.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{souvenir.summary}</p>
                  <span className="inline-block mt-4 text-xs uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors">
                    En savoir plus →
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Panneau de detail */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 bg-black/70 z-[110]"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-xl max-h-[85vh] overflow-y-auto bg-neutral-950 border border-white/15 rounded-2xl p-6 z-[120] shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <active.icon className="w-8 h-8 text-red-500 shrink-0" />
                  <h3 className="text-xl font-black text-white leading-tight">{active.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Fermer"
                  className="shrink-0 p-2 -m-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {active.video ? (
                <video
                  src={active.video}
                  poster={active.image}
                  controls
                  preload="none"
                  playsInline
                  className="w-full rounded-xl mb-4 bg-black"
                />
              ) : (
                active.image && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4">
                    <Image
                      src={active.image}
                      alt={active.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 576px"
                      quality={70}
                    />
                  </div>
                )
              )}

              <p className="text-gray-200 text-sm leading-relaxed">{active.summary}</p>

              {!hasMedia(active) && (
                <p className="sr-only">Aucun média disponible pour ce souvenir.</p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
