'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useReducedMotion } from '@/lib/useReducedMotion'

type Coach = {
  name: string
  specialty: string
  /** Absent tant que la salle n'a pas fourni de portrait : la carte affiche
   *  alors l'initiale, sans photo de remplacement ni mention d'attente. */
  image?: string
  description: string
  parcours: string
}

// =====================================================================
// TEXTE PROVISOIRE — NE PAS METTRE EN LIGNE
//
// Les champs `description` et `parcours` ci-dessous sont des textes de
// remplissage ecrits pour voir la mise en page fonctionner. Ils ne
// decrivent pas le veritable parcours de ces personnes.
//
// La cliente doit fournir les vraies biographies avant tout `git push`.
// Aucun diplome, titre, certification ni palmares n'a ete invente ici :
// les textes restent volontairement generiques pour qu'aucune affirmation
// fausse ne puisse etre attribuee a un coach reel.
// =====================================================================

const MOUSSA: Coach = {
  name: 'Moussa',
  // TODO CLIENT : confirmer la specialite affichee sous son nom.
  specialty: 'Musculation & Préparation physique',
  image: '/images/coachs/coach-moussa.jpg',
  description:
    'Encadre les séances sur le plateau musculation et accompagne les membres dans la durée, du premier jour jusqu’aux objectifs de fond.',
  parcours:
    'TEXTE PROVISOIRE. Moussa encadre les entraînements de la salle et suit les membres sur le long terme. Il travaille aussi bien avec des débutants qui découvrent le plateau qu’avec des pratiquants confirmés qui cherchent à structurer leur progression. Son approche part de l’état réel de la personne : un bilan simple, des mouvements maîtrisés avant d’être chargés, et une montée en charge qui tient compte du rythme de vie de chacun. Il insiste sur la technique et sur la régularité, qu’il considère comme le seul facteur qui fasse vraiment la différence sur une année.',
}

const AUTRES_COACHS: Coach[] = [
  {
    name: 'Achille',
    specialty: 'Musculation & Grit Force',
    image: '/images/coachs/coach-achille.jpg',
    description:
      'Spécialiste du travail de force et des programmes de prise de masse, avec un suivi technique sur chaque mouvement.',
    parcours:
      'TEXTE PROVISOIRE. Achille intervient sur le travail de force et les programmes de prise de masse. Il décompose chaque mouvement avant d’ajouter de la charge, et corrige les positions séance après séance. Il accompagne les membres qui veulent progresser sur les mouvements de base et construire une base solide avant de viser des charges lourdes.',
  },
  {
    name: 'Top',
    specialty: 'Circuit Training & Cardio',
    image: '/images/coachs/coach-top.jpg',
    description:
      'Anime les séances de circuit training et de cardio intensif, orientées endurance et perte de poids.',
    parcours:
      'TEXTE PROVISOIRE. Top anime les séances de circuit training et les formats cardio intensifs de la salle. Il construit des enchaînements qui s’adaptent au niveau du groupe présent, de façon à ce qu’un débutant et un pratiquant régulier puissent suivre la même séance sans que l’un s’ennuie ni que l’autre décroche. Il suit particulièrement les membres dont l’objectif est la perte de poids et le souffle.',
  },
  {
    name: 'Lamine Bara Diouf',
    specialty: 'Fitness & Personal Training',
    image: '/images/coachs/coach-lamine.jpg',
    description:
      'Construit des programmes sur mesure en coaching individuel, adaptés à l’objectif et au rythme de chacun.',
    parcours:
      'TEXTE PROVISOIRE. Lamine travaille principalement en coaching individuel. Il construit des programmes sur mesure à partir de l’objectif annoncé, du temps réellement disponible et des contraintes de chacun. Il assure le suivi séance par séance et ajuste le programme au fil des semaines plutôt que de le figer au départ.',
  },
  {
    name: 'Amet',
    // TODO CLIENT : confirmer la specialite, et fournir un portrait.
    specialty: 'Fitness & Musculation',
    description:
      'Accompagne les membres sur le plateau musculation et les séances de fitness.',
    parcours:
      'TEXTE PROVISOIRE. Amet accompagne les membres sur le plateau musculation et pendant les séances de fitness. Il travaille surtout avec les personnes qui débutent, sur la prise en main des machines et la mise en place d’une routine tenable dans la semaine.',
  },
  {
    // TODO CLIENT : remplacer par le prenom reel du coach de boxe, et fournir un portrait.
    name: 'Coach Boxe',
    specialty: 'Boxe — Adultes & Enfants',
    description:
      'Encadre les cours de boxe, du travail technique au sac jusqu’aux oppositions encadrées.',
    parcours:
      'TEXTE PROVISOIRE. Le coach de boxe encadre les cours adultes et enfants. Les séances commencent par le placement, la garde et les déplacements, avant le travail au sac et les exercices d’opposition encadrés. Les groupes enfants travaillent sur des formats plus courts, centrés sur la coordination et le respect des consignes.',
  },
  {
    // TODO CLIENT : remplacer par le prenom reel du coach de taekwondo, et fournir un portrait.
    name: 'Coach Taekwondo',
    specialty: 'Taekwondo — Adultes & Enfants',
    description:
      'Encadre les cours de taekwondo, techniques de pied, souplesse et travail de forme.',
    parcours:
      'TEXTE PROVISOIRE. Le coach de taekwondo encadre les cours adultes et enfants. Le travail porte sur les techniques de pied, la souplesse et les enchaînements de forme. Les cours enfants mettent l’accent sur la discipline, la coordination et la progression par étapes.',
  },
]

export default function CoachAvatars() {
  const shouldReduceMotion = useReducedMotion()
  const [ouvert, setOuvert] = useState<Coach | null>(null)

  // Bloque le defilement du body quand le parcours est ouvert
  useEffect(() => {
    document.body.style.overflow = ouvert ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [ouvert])

  // Ferme le parcours avec la touche Echap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOuvert(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const cardMotion = shouldReduceMotion ? undefined : { y: -4 }

  const lienParcours = (coach: Coach) => (
    <button
      type="button"
      onClick={() => setOuvert(coach)}
      aria-label={`Parcours de ${coach.name}`}
      className="mt-3 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
    >
      Parcours →
    </button>
  )

  return (
    <section id="coachs" className="py-10 md:py-16 px-4 bg-black relative overflow-hidden">
      {/* Halo de fond discret */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[520px] h-[520px] -translate-x-1/4 glow-red" />
        <div className="absolute top-1/2 right-1/4 w-[520px] h-[520px] translate-x-1/4 glow-blue" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-7 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-black mb-2">
            Nos Coachs <span className="text-red-500">Experts</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Une équipe de spécialistes pour t’accompagner sur chaque discipline
          </p>
        </div>

        {/* Coach mis en avant : portrait large et texte a cote, pour qu'il se
            distingue des autres sans porter de titre particulier. */}
        <motion.article
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.3 }}
          className="glass border border-red-500/30 rounded-2xl overflow-hidden mb-6 grid grid-cols-1 sm:grid-cols-[minmax(0,240px)_1fr] md:grid-cols-[minmax(0,300px)_1fr]"
        >
          <div className="relative aspect-[16/10] sm:aspect-auto sm:min-h-[320px]">
            <Image
              src={MOUSSA.image!}
              alt={`Coach ${MOUSSA.name}`}
              fill
              className="object-cover"
              loading="lazy"
              quality={75}
              sizes="(max-width: 640px) 100vw, 300px"
            />
          </div>

          <div className="p-5 md:p-8 flex flex-col justify-center">
            <h3 className="text-white font-black text-2xl md:text-3xl leading-tight">
              {MOUSSA.name}
            </h3>
            <p className="text-red-500 text-xs font-semibold uppercase tracking-wider mt-2 mb-4">
              {MOUSSA.specialty}
            </p>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed">
              {MOUSSA.description}
            </p>
            <div>{lienParcours(MOUSSA)}</div>
          </div>
        </motion.article>

        <div
          className="rail md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6"
          tabIndex={0}
          role="region"
          aria-label="Nos coachs, faire defiler horizontalement"
        >
          {AUTRES_COACHS.map((coach, index) => (
            <motion.article
              key={coach.name}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : index * 0.06 }}
              whileHover={cardMotion}
              className="w-[62vw] md:w-auto glass border border-white/10 rounded-2xl overflow-hidden flex flex-col transition-transform"
            >
              <div className="relative aspect-[4/5] bg-white/[0.03]">
                {coach.image ? (
                  <Image
                    src={coach.image}
                    alt={`Coach ${coach.name}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 767px) 62vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 grid place-items-center text-6xl font-black text-white/15"
                  >
                    {coach.name.replace(/^Coach\s+/i, '').charAt(0)}
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-white font-bold text-base leading-tight">{coach.name}</h3>
                <p className="text-red-500 text-xs font-semibold uppercase tracking-wider mt-1 mb-3">
                  {coach.specialty}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                  {coach.description}
                </p>
                <div>{lienParcours(coach)}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Parcours du coach */}
      <AnimatePresence>
        {ouvert && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOuvert(null)}
              className="fixed inset-0 bg-black/70 z-[110]"
            />
            {/* Centrage par conteneur flex : Framer Motion pose un transform en
                ligne pour animer y, qui ecraserait -translate-y-1/2. */}
            <div className="fixed inset-0 z-[120] flex items-center justify-center modal-shell pointer-events-none">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`Parcours de ${ouvert.name}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-auto w-full sm:max-w-lg modal-panel overflow-y-auto overscroll-contain bg-neutral-950 border border-white/15 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4 min-w-0">
                    {ouvert.image && (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-red-500/60 shrink-0">
                        <Image
                          src={ouvert.image}
                          alt=""
                          fill
                          className="object-cover"
                          quality={60}
                          sizes="56px"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-xl font-black text-white leading-tight">
                        {ouvert.name}
                      </h3>
                      <p className="text-red-500 text-xs font-semibold uppercase tracking-wider mt-1">
                        {ouvert.specialty}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOuvert(null)}
                    aria-label="Fermer"
                    className="shrink-0 p-2 -m-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-200 text-sm leading-relaxed mb-6">{ouvert.parcours}</p>

                <a
                  href="https://wa.me/221775323725"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-full transition-colors"
                >
                  Réserver une séance avec {ouvert.name.replace(/^Coach\s+/i, '')}
                </a>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
