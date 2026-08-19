'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dumbbell, Zap, Clock, Users, Calendar, X } from 'lucide-react'

type Discipline = {
  title: string
  description: string
  details: string
  price: string | null
  icon: typeof Dumbbell
  size: 'large' | 'medium' | 'small'
  gradient: string
  image?: string
  fullWidthMobile?: boolean
  schedule?: { day: string; time: string; activity: string }[]
}

export default function DisciplinesSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Bloque le scroll du body quand le panneau de detail est ouvert
  useEffect(() => {
    document.body.style.overflow = openIndex !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [openIndex])

  // Ferme le panneau avec la touche Echap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // TODO CLIENT : faire valider les tarifs ci-dessous. Ils proviennent de la grille
  // deja utilisee par le bot IA, qui diverge aujourd'hui de la page Tarifs.
  const disciplines: Discipline[] = [
    {
      title: 'Musculation & Cardio',
      description: 'Équipements professionnels pour tous les niveaux.',
      details:
        'Salle de musculation complète et zone cardio moderne : tapis roulants, vélos, rameurs et machines de dernière génération. Un espace libre est réservé aux exercices au poids du corps. Accès inclus dans la mensualité, sans engagement de durée.',
      price: '20 000 FCFA / mois',
      icon: Dumbbell,
      size: 'large',
      gradient: 'from-red-500/20 to-red-600/20',
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&fit=crop&auto=format',
    },
    {
      title: 'Boxe & Combat',
      description: 'Sacs de frappe et coaching technique en Boxe et Taekwondo.',
      details:
        'Espace dédié aux sacs de frappe, avec un coaching technique en Boxe et en Taekwondo assuré par des coachs certifiés. Cours enfants et adultes. Une inscription de 5 000 FCFA s’ajoute à la première mensualité.',
      price: 'Enfant 15 000 · Adulte 20 000 FCFA / mois',
      icon: Zap,
      size: 'medium',
      gradient: 'from-red-400/20 to-red-500/20',
      image:
        'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&q=80&fit=crop&auto=format',
    },
    {
      title: 'Événements & Challenges',
      description: 'Participe aux activités phares de la salle.',
      details:
        'Tout au long de l’année, la salle organise des rendez-vous ouverts à tous les membres : concours de force en powerlifting, séances de gainage collectif et challenges de fin d’année. Participation incluse dans l’abonnement.',
      price: 'Inclus dans l’abonnement',
      icon: Calendar,
      size: 'small',
      fullWidthMobile: true,
      gradient: 'from-red-600/25 to-red-800/20',
      schedule: [
        { day: 'Concours de force', time: 'Powerlifting', activity: 'Événement' },
        { day: 'Séances de gainage', time: 'Collectif', activity: 'Challenge' },
        { day: 'Challenges de fin d’année', time: 'Communauté', activity: 'Saison' },
      ],
    },
    {
      title: 'Coaching Personnalisé',
      description: 'Programmes sur mesure adaptés à vos objectifs.',
      details:
        'Un coach diplômé construit ton programme d’entraînement selon ton objectif, ton niveau et ton rythme, avec des conseils nutrition intégrés. Les formules Personal Training vont de 16 à 20 séances, séances de massage comprises.',
      price: 'À partir de 80 000 FCFA / 16 séances',
      icon: Users,
      size: 'medium',
      gradient: 'from-red-500/20 to-red-700/20',
      image:
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80&fit=crop&auto=format',
    },
    {
      title: 'Large Amplitude Horaire',
      description: 'Ouvert dès 07h00 en semaine et le dimanche matin.',
      details:
        'Lundi au vendredi de 07h00 à 22h30, samedi de 09h00 à 21h00, dimanche de 10h00 à 15h00. Une amplitude pensée pour s’entraîner avant le travail comme en fin de journée.',
      price: null,
      icon: Clock,
      size: 'small',
      fullWidthMobile: true,
      gradient: 'from-red-700/20 to-red-900/25',
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: isMobile ? 0.03 : 0.08 } },
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: isMobile ? 0.15 : 0.3 } },
  }

  const active = openIndex !== null ? disciplines[openIndex] : null

  return (
    <section id="disciplines" className="py-24 px-4 bg-black relative overflow-hidden">
      {/* Background Pattern - disabled on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,0,0,0.35) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>
      )}

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: isMobile ? 0.2 : 0.4 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium uppercase tracking-wider text-red-500 mb-4">
            Nos Disciplines
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Trouvez Votre <span className="text-stroke italic">Passion</span>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Des équipements de pointe et des programmes adaptés à tous les niveaux
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
          className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 auto-rows-[minmax(200px,auto)]"
        >
          {disciplines.map((discipline, index) => {
            const Icon = discipline.icon
            const gridClass =
              discipline.size === 'large'
                ? 'col-span-2 md:col-span-4 md:row-span-2'
                : discipline.size === 'medium'
                ? 'col-span-2 md:col-span-3 md:row-span-2'
                : discipline.fullWidthMobile
                ? 'col-span-2 md:col-span-2 md:row-span-1'
                : 'col-span-1 md:col-span-2 md:row-span-1'

            return (
              <motion.button
                key={discipline.title}
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`${discipline.title} — voir le détail`}
                variants={itemVariants}
                whileHover={isMobile ? undefined : { scale: 1.02, y: -5 }}
                className={`${gridClass} group relative overflow-hidden rounded-3xl glass text-left transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${discipline.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                />

                {/* Background Image for large/medium cards */}
                {discipline.image && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity grayscale group-hover:grayscale-0 duration-300"
                    style={{ backgroundImage: `url(${discipline.image})` }}
                  />
                )}

                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between gap-4">
                  <div>
                    <Icon className="w-10 h-10 mb-4 text-red-500" />
                    <h3 className="text-2xl font-bold mb-2">{discipline.title}</h3>
                    <p className="text-white text-sm">{discipline.description}</p>
                  </div>

                  {/* Schedule for planning card */}
                  {discipline.schedule && (
                    <div className="space-y-2">
                      {discipline.schedule.map((item) => (
                        <div
                          key={item.day}
                          className="flex items-center justify-between gap-2 text-xs glass rounded-lg px-3 py-2"
                        >
                          <span className="font-semibold">{item.day}</span>
                          <span className="text-red-500">{item.time}</span>
                          <span className="text-gray-100">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3">
                    {discipline.price ? (
                      <span className="text-red-500 font-black text-base md:text-lg leading-tight">
                        {discipline.price}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="shrink-0 text-xs uppercase tracking-wider text-gray-300 group-hover:text-white transition-colors">
                      Détails →
                    </span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* Panneau de detail */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenIndex(null)}
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
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg max-h-[80vh] overflow-y-auto bg-neutral-950 border border-white/15 rounded-2xl p-6 z-[120] shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <active.icon className="w-8 h-8 text-red-500 shrink-0" />
                  <h3 className="text-xl font-black text-white leading-tight">
                    {active.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  aria-label="Fermer"
                  className="shrink-0 p-2 -m-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {active.price && (
                <p className="text-red-500 font-black text-lg mb-4">{active.price}</p>
              )}

              <p className="text-gray-200 text-sm leading-relaxed mb-6">{active.details}</p>

              <a
                href="https://wa.me/221775323725"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-full transition-colors"
              >
                Réserver une séance découverte
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
