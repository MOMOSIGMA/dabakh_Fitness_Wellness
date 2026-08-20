'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

type Coach = {
  name: string
  specialty: string
  image: string
  description: string
}

export default function CoachAvatars() {
  const shouldReduceMotion = useReducedMotion()

  // TODO CLIENT : remplacer chaque `description` par la vraie bio fournie par la salle
  // (parcours, certifications, approche). Les specialites ci-dessous proviennent des
  // donnees deja presentes dans le projet, pas d'une invention.
  const coaches: Coach[] = [
    {
      name: 'Babacar',
      specialty: 'Fitness & Musculation',
      image: '/images/coach-babacar.jpeg',
      description:
        'Accompagne les debutants comme les pratiquants confirmes sur le plateau musculation et les seances de fitness.',
    },
    {
      name: 'Achille',
      specialty: 'Musculation & Grit Force',
      image: '/images/coach-achille.jpeg',
      description:
        'Specialiste du travail de force et des programmes de prise de masse, avec un suivi technique sur chaque mouvement.',
    },
    {
      name: 'Top',
      specialty: 'Circuit Training & Cardio',
      image: '/images/coach-top.jpeg',
      description:
        'Anime les seances de circuit training et de cardio intensif, orientees endurance et perte de poids.',
    },
    {
      name: 'Lamine Bara Diouf',
      specialty: 'Fitness & Personal Training',
      image: '/images/coach-lamine.jpeg',
      description:
        'Construit des programmes sur mesure en coaching individuel, adaptes a l objectif et au rythme de chacun.',
    },
  ]

  const cardMotion = shouldReduceMotion ? undefined : { y: -4 }

  return (
    <section id="coachs" className="py-16 px-4 bg-black relative overflow-hidden">
      {/* Halo de fond discret */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[520px] h-[520px] -translate-x-1/4 glow-red" />
        <div className="absolute top-1/2 right-1/4 w-[520px] h-[520px] translate-x-1/4 glow-red-deep" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black mb-2">
            Nos Coachs <span className="text-red-500">Experts</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Une equipe de specialistes pour t accompagner sur chaque discipline
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {coaches.map((coach, index) => (
            <motion.article
              key={coach.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : index * 0.06 }}
              whileHover={cardMotion}
              className="glass border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center transition-transform"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-red-500/60 mb-4">
                <Image
                  src={coach.image}
                  alt={`Coach ${coach.name}`}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  quality={60}
                  sizes="96px"
                  priority={index < 2}
                />
              </div>

              <h3 className="text-white font-bold text-base leading-tight">{coach.name}</h3>
              <p className="text-red-500 text-xs font-semibold uppercase tracking-wider mt-1 mb-3">
                {coach.specialty}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">{coach.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
