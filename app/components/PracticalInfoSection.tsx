'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Shirt, Footprints, MapPin } from 'lucide-react'

export default function PracticalInfoSection() {
  const rules = [
    {
      icon: CheckCircle,
      title: 'Hygiène',
      description: 'Le port de la serviette est rigoureusement obligatoire sur le plateau.',
      color: 'from-red-500 to-red-700',
    },
    {
      icon: Footprints,
      title: 'Chaussures',
      description: 'Les chaussures venant de l’extérieur sont interdites sur les tapis et le plateau technique.',
      color: 'from-red-600 to-red-800',
    },
    {
      icon: Shirt,
      title: 'Tenue appropriée',
      description: 'Tenue de sport correcte exigée à tout moment.',
      color: 'from-red-400 to-red-600',
    },
  ]

  return (
    <section id="infos-pratiques" className="py-12 md:py-24 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-5">
        {/* Halo fige : meme raison, a 5 % d'opacite l'animation etait invisible. */}
        <div className="absolute bottom-1/4 right-1/4 w-[684px] h-[684px] glow-red" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium uppercase tracking-wider text-red-500 mb-4">
            Règlement Intérieur
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Infos <span className="text-stroke italic">Pratiques</span>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Respecte ces règles simples pour profiter pleinement de ton expérience Dabakh
          </p>
        </motion.div>

        {/* Rules Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mb-10 md:mb-16">
          {rules.map((rule, index) => {
            const Icon = rule.icon
            return (
              <motion.div
                key={index}
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Card Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${rule.color} opacity-10 rounded-3xl blur transition-all duration-300 group-hover:opacity-20`} />
                
                {/* Card Content */}
                <div className="relative glass border-2 border-white/10 p-4 md:p-8 h-full flex flex-col rounded-2xl md:rounded-3xl hover:border-white/30 transition-colors">
                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${rule.color} flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-2xl font-black mb-2 md:mb-3">{rule.title}</h3>
                  <p className="text-white text-xs md:text-base leading-relaxed flex-grow">
                    {rule.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass border-2 border-red-500/30 rounded-2xl p-8 flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold mb-2 text-red-500">Respect du lieu et de la communauté</h4>
              <p className="text-white">
                Dabakh est plus qu&apos;une salle de sport, c&apos;est une communauté. Nous comptons sur toi pour respecter ces règles simples et contribuer à créer un environnement sain, sécurisé et accueillant pour tous les membres.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Google Maps Button */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-12 text-center"
        >
          <a
            href="https://maps.app.goo.gl/BAVYB8i4dUwGWnss7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg shadow-red-600/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-600/70"
          >
            <MapPin className="w-6 h-6" />
            <span>Comment venir à Dabakh ?</span>
          </a>
          <p className="text-gray-300 text-sm mt-4">
            Sacré Cœur 3, VDN Villa 16 (derrière la résidence Mamoune)
          </p>
        </motion.div>
      </div>
    </section>
  )
}
