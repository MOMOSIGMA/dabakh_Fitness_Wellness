'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/useReducedMotion'

type Coach = {
  name: string
  specialty: string
  image: string
  tiktok: string
  colorClass: string
  glowClass: string
}

export default function CoachAvatars() {
  const shouldReduceMotion = useReducedMotion()

  const coaches: Coach[] = [
    {
      name: 'Babacar',
      specialty: 'Fitness',
      image: '/images/coach-babacar.jpeg',
      tiktok: 'https://vt.tiktok.com/ZSmJYTBnw/',
      colorClass: 'bg-gradient-to-r from-red-500 to-red-600',
      glowClass: 'hover:shadow-lg hover:shadow-red-500/50',
    },
    {
      name: 'Achille',
      specialty: 'Musculation',
      image: '/images/coach-achille.jpeg',
      tiktok: 'https://vt.tiktok.com/ZSmJ2CUTT/',
      colorClass: 'bg-gradient-to-r from-blue-500 to-blue-600',
      glowClass: 'hover:shadow-lg hover:shadow-blue-500/50',
    },
    {
      name: 'Top',
      specialty: 'Cardio',
      image: '/images/coach-top.jpeg',
      tiktok: 'https://vt.tiktok.com/ZSmJ2BQaE/',
      colorClass: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      glowClass: 'hover:shadow-lg hover:shadow-yellow-500/50',
    },
    {
      name: 'Lamine',
      specialty: 'Personal',
      image: '/images/coach-lamine.jpeg',
      tiktok: 'https://vt.tiktok.com/ZSmJ2c5gj/',
      colorClass: 'bg-gradient-to-r from-purple-500 to-purple-600',
      glowClass: 'hover:shadow-lg hover:shadow-purple-500/50',
    },
  ]

  const enableHover = shouldReduceMotion ? undefined : { scale: 1.05 }

  return (
    <section id="coachs" className="py-12 px-4 bg-black relative overflow-hidden">
      {/* Subtle background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-red-500 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent mb-2">
            Nos Coachs Experts
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Découvre nos spécialistes et suis-les sur TikTok
          </p>
        </div>

        {/* Coaches Grid - Optimized animations */}
        <div className="flex justify-center gap-3 sm:gap-6 py-6 flex-wrap">
          {coaches.map((coach, index) => (
            <motion.a
              key={coach.name}
              href={coach.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={enableHover}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-3 cursor-pointer group"
            >
              {/* Avatar Circle with Neon Border */}
              <div className={`relative w-16 sm:w-20 h-16 sm:h-20 rounded-full overflow-hidden transition-all duration-300 border-2 ${coach.colorClass.replace('bg-gradient', 'border')} ${coach.glowClass}`}>
                <Image
                  src={coach.image}
                  alt={`Coach ${coach.name}`}
                  width={80}
                  height={80}
                  className="object-cover rounded-full w-full h-full"
                  loading={index < 2 ? "eager" : "lazy"}
                  quality={90}
                  sizes="(max-width: 640px) 64px, 80px"
                  priority={index < 2}
                />

                {/* Subtle Shine Effect on Hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Coach Name */}
              <div className="text-center">
                <p className="text-white font-semibold text-sm">{coach.name}</p>
                <p className="text-gray-400 text-xs">{coach.specialty}</p>
              </div>

              {/* TikTok Indicator */}
              <div className="text-xs text-gray-500 group-hover:text-red-400 transition-colors">
                @TikTok
              </div>
            </motion.a>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm md:text-base">
            💡 Visite nos coachs sur TikTok pour des <span className="text-red-400 font-semibold">conseils et transformation</span> en direct
          </p>
        </div>
      </div>
    </section>
  )
}
