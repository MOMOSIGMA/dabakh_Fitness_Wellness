'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Coach = {
  name: string
  specialty: string
  image: string
  tiktok: string
  colorClass: string
  glowClass: string
}

export default function CoachAvatars() {
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

  return (
    <section id="coachs" className="py-12 px-4 bg-black relative overflow-hidden">
      {/* Subtle background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-red-500 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent mb-2">
            Nos Coachs Experts
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Découvre nos spécialistes et suis-les sur TikTok
          </p>
        </motion.div>

        {/* Coaches Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 py-6 flex-wrap md:flex-nowrap"
        >
          {coaches.map((coach, index) => (
            <motion.a
              key={coach.name}
              href={coach.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col items-center gap-3 cursor-pointer group`}
            >
              {/* Avatar Circle with Neon Border */}
              <div className={`relative w-20 h-20 rounded-full overflow-hidden transition-all duration-300 ${coach.glowClass}`}>
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-full ${coach.colorClass} p-0.5`}>
                  <div className="absolute inset-0.5 rounded-full bg-black flex items-center justify-center">
                    <Image
                      src={coach.image}
                      alt={`Coach ${coach.name}`}
                      fill
                      className="object-cover rounded-full"
                      sizes="80px"
                      priority={index < 2}
                    />
                  </div>
                </div>

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
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 text-sm md:text-base">
            💡 Visite nos coachs sur TikTok pour des <span className="text-red-400 font-semibold">conseils et transformation</span> en direct
          </p>
        </motion.div>
      </div>
    </section>
  )
}
