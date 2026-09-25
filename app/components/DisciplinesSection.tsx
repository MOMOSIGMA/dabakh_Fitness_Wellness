'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Dumbbell, Zap, Clock, Users, Calendar, Sparkles, X } from 'lucide-react'

/** Un element detaille a l'interieur d'une carte : un espace, un cours, une
 *  formule. Chaque champ est optionnel pour qu'un sujet encore sans photo ni
 *  prix s'affiche proprement, sans bloc vide ni mention d'attente. */
type Sujet = {
  nom: string
  description?: string
  prix?: string
  images?: string[]
}

type Discipline = {
  title: string
  description: string
  details: string
  price: string | null
  icon: typeof Dumbbell
  size: 'large' | 'medium' | 'small' | 'wide'
  gradient: string
  image?: string
  fullWidthMobile?: boolean
  sujets?: Sujet[]
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
  //
  // TODO CLIENT — photos manquantes : boxe, taekwondo, salle detente et cours
  // collectifs n'ont pas encore de photo. Les sujets concernes s'affichent sans
  // image ; il suffira de completer le tableau `images` quand elles arriveront.
  const disciplines: Discipline[] = [
    {
      title: 'Nos Espaces',
      description: 'Cardio, fitness, gym et boxe sous le même toit.',
      details:
        'La salle est organisée en espaces distincts, pour que chacun s’entraîne sans se gêner : une zone cardio, un espace fitness, le plateau de musculation et un espace dédié à la boxe. L’accès à l’ensemble est compris dans la mensualité, sans engagement de durée.',
      price: '20 000 FCFA / mois',
      icon: Dumbbell,
      size: 'large',
      gradient: 'from-red-500/20 to-red-600/20',
      image: '/images/salle/salle-vue-ensemble.jpg',
      sujets: [
        {
          nom: 'Cardio',
          description:
            'Vélos de biking, tapis et machines cardio, pour le travail d’endurance comme pour l’échauffement.',
          images: ['/images/salle/salle-cardio.jpg', '/images/salle/salle-coaching.jpg'],
        },
        {
          nom: 'Fitness',
          description:
            'Espace libre pour les exercices au poids du corps, les étirements et les séances collectives.',
          images: ['/images/salle/salle-vue-ensemble.jpg'],
        },
        {
          nom: 'Gym — plateau musculation',
          description:
            'Bancs, barres, haltères et machines guidées, du poids léger aux charges lourdes.',
          images: ['/images/salle/salle-musculation.jpg'],
        },
        {
          nom: 'Boxe',
          description:
            'Espace dédié aux sacs de frappe et au travail technique, adultes et enfants.',
        },
      ],
    },
    {
      title: 'Cours Combat',
      description: 'Boxe et Taekwondo, adultes et enfants.',
      details:
        'Cours encadrés par des coachs dédiés, en groupes séparés pour les adultes et les enfants. Une inscription de 5 000 FCFA s’ajoute à la première mensualité.',
      price: 'Dès 15 000 FCFA / mois',
      icon: Zap,
      size: 'small',
      gradient: 'from-red-400/20 to-red-500/20',
      sujets: [
        {
          nom: 'Boxe',
          description:
            'Garde, déplacements et travail au sac, puis exercices d’opposition encadrés. Groupes adultes et enfants.',
          prix: 'Enfant 15 000 · Adulte 20 000 FCFA / mois',
        },
        {
          nom: 'Taekwondo',
          description:
            'Techniques de pied, souplesse et enchaînements de forme. Groupes adultes et enfants.',
          prix: 'Enfant 15 000 · Adulte 20 000 FCFA / mois',
        },
      ],
    },
    {
      title: 'Salle Détente',
      description: 'Espace massage et récupération.',
      details:
        'Un espace séparé du plateau, équipé pour le massage et la récupération après l’effort. Les séances se réservent sur place ou par WhatsApp.',
      price: 'Dès 10 000 FCFA',
      icon: Sparkles,
      size: 'small',
      gradient: 'from-red-600/20 to-red-800/20',
      sujets: [
        { nom: 'Massage dos relaxant', description: '20 minutes', prix: '10 000 FCFA' },
        { nom: 'Massage tonifiant', description: '30 minutes', prix: '15 000 FCFA' },
        { nom: 'Massage relaxant doux', description: '1 heure', prix: '20 000 FCFA' },
      ],
    },
    {
      title: 'Cours Collectifs',
      description: 'Des séances en groupe tout au long de la semaine.',
      details:
        'Les cours collectifs sont compris dans l’abonnement et se déroulent dans l’espace fitness. Le planning de la semaine est affiché à l’accueil de la salle.',
      price: 'Inclus',
      icon: Users,
      size: 'medium',
      gradient: 'from-red-500/20 to-red-700/20',
      // TODO CLIENT : le planning jour par jour n'a pas encore ete fourni. Les
      // cours listes ci-dessous proviennent des donnees deja presentes dans le
      // projet ; il reste a leur associer un jour, un horaire et une photo.
      sujets: [
        { nom: 'Fitness collectif' },
        { nom: 'Cardio intensif' },
        { nom: 'Yoga & Pilates' },
        { nom: 'Circuit training' },
      ],
    },
    {
      title: 'Événements & Challenges',
      description: 'Les rendez-vous qui rythment l’année.',
      details:
        'Tout au long de l’année, la salle organise des rendez-vous ouverts à tous les membres. La participation est comprise dans l’abonnement.',
      price: 'Inclus',
      icon: Calendar,
      size: 'medium',
      gradient: 'from-red-600/25 to-red-800/20',
      // TODO CLIENT : photos et videos de souvenirs attendues, a deposer dans
      // _medias-bruts/souvenirs/ puis `npm run medias`.
      sujets: [
        {
          nom: 'Concours de force',
          description:
            'Une épreuve de powerlifting ouverte aux membres, sur les mouvements de base.',
        },
        {
          nom: 'Séances de gainage collectif',
          description: 'Des sessions de groupe où toute la salle travaille en même temps.',
        },
        {
          nom: 'Challenges de fin d’année',
          description: 'Un rendez-vous communautaire pour clôturer la saison.',
        },
      ],
    },
    {
      title: 'Large Amplitude Horaire',
      description: 'Ouvert dès 07h00 en semaine et le dimanche matin.',
      details:
        'Lundi au vendredi de 07h00 à 22h30, samedi de 09h00 à 21h00, dimanche de 10h00 à 15h00. Une amplitude pensée pour s’entraîner avant le travail comme en fin de journée.',
      price: null,
      icon: Clock,
      size: 'wide',
      fullWidthMobile: true,
      gradient: 'from-red-700/20 to-red-900/25',
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: isMobile ? 0.03 : 0.08 } },
  }

  // Un leger glissement, sans passer par l'opacite : les cartes doivent etre
  // lisibles dans le HTML rendu par le serveur, avant toute hydratation.
  const itemVariants = {
    hidden: { y: 12 },
    visible: { y: 0, transition: { duration: isMobile ? 0.15 : 0.3 } },
  }

  const active = openIndex !== null ? disciplines[openIndex] : null

  return (
    <section id="disciplines" className="py-12 md:py-24 px-4 bg-black relative overflow-hidden">
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
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: isMobile ? 0.2 : 0.4 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium uppercase tracking-wider text-red-500 mb-4">
            Nos Disciplines
          </span>
          <h2 className="text-4xl md:text-6xl font-black">
            Trouvez Votre <span className="text-stroke italic">Passion</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
          className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 auto-rows-[minmax(158px,auto)] md:auto-rows-[minmax(200px,auto)]"
        >
          {disciplines.map((discipline, index) => {
            const Icon = discipline.icon
            const gridClass =
              discipline.size === 'large'
                ? 'col-span-2 md:col-span-4 md:row-span-2'
                : discipline.size === 'medium'
                ? 'col-span-1 md:col-span-3 md:row-span-2'
                : discipline.size === 'wide'
                ? 'col-span-2 md:col-span-6 md:row-span-1'
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
                <div className="relative h-full p-4 md:p-6 flex flex-col justify-between gap-3 md:gap-4">
                  <div>
                    <Icon className="w-7 h-7 md:w-10 md:h-10 mb-2.5 md:mb-4 text-red-500" />
                    <h3 className="text-lg md:text-2xl font-bold mb-1.5 md:mb-2 leading-tight">{discipline.title}</h3>
                    <p className="text-white text-xs md:text-sm leading-snug">{discipline.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    {discipline.price ? (
                      <span className="text-red-500 font-black text-sm md:text-lg leading-tight">
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
            <div className="fixed inset-0 z-[120] flex items-center justify-center modal-shell pointer-events-none">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={active.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-auto w-full sm:max-w-lg modal-panel overflow-y-auto overscroll-contain bg-neutral-950 border border-white/15 rounded-2xl p-6 shadow-2xl"
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

                {/* Le detail de chaque espace, cours ou formule */}
                {active.sujets && (
                  <div className="space-y-5 mb-6">
                    {active.sujets.map((sujet) => (
                      <div
                        key={sujet.nom}
                        className="border-t border-white/10 pt-5 first:border-0 first:pt-0"
                      >
                        <div className="flex items-baseline justify-between gap-4 mb-2">
                          <h4 className="text-white font-bold text-base leading-snug">
                            {sujet.nom}
                          </h4>
                          {sujet.prix && (
                            <span className="shrink-0 text-red-500 font-black text-sm tabular-nums">
                              {sujet.prix}
                            </span>
                          )}
                        </div>

                        {sujet.description && (
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {sujet.description}
                          </p>
                        )}

                        {sujet.images && sujet.images.length > 0 && (
                          <div
                            className={`mt-3 grid gap-2 ${
                              sujet.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                            }`}
                          >
                            {sujet.images.map((src) => (
                              <div
                                key={src}
                                className="relative aspect-[4/3] rounded-xl overflow-hidden"
                              >
                                <Image
                                  src={src}
                                  alt={sujet.nom}
                                  fill
                                  className="object-cover"
                                  loading="lazy"
                                  quality={60}
                                  sizes="(max-width: 640px) 50vw, 240px"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href="https://wa.me/221775323725"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-full transition-colors"
                >
                  Réserver une séance découverte
                </a>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
