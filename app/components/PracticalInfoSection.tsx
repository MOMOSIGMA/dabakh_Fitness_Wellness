'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Shirt, Footprints } from 'lucide-react'

export default function PracticalInfoSection() {
  const rules = [
    {
      icon: CheckCircle,
      title: '🧼 Hygiène',
      description: 'Le port de la serviette est rigoureusement obligatoire sur le plateau.',
      color: 'from-blue-600 to-blue-700',
    },
    {
      icon: Footprints,
      title: '👟 Chaussures',
      description: 'Les chaussures venant de l&apos;extérieur sont interdites sur les tapis et le plateau technique.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shirt,
      title: '👕 Tenue Appropriée',
      description: 'Tenue de sport correcte exigée à tout moment.',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <section id="infos-pratiques" className="py-24 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500 blur-[150px] rounded-full"
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium uppercase tracking-wider text-red-500 mb-4">
            Règlement Intérieur
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Infos <span className="text-stroke italic">Pratiques</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Respecte ces règles simples pour profiter pleinement de ton expérience Dabakh
          </p>
        </motion.div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {rules.map((rule, index) => {
            const Icon = rule.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Card Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${rule.color} opacity-10 rounded-3xl blur transition-all duration-300 group-hover:opacity-20`} />
                
                {/* Card Content */}
                <div className="relative glass border-2 border-white/10 p-8 h-full flex flex-col rounded-3xl hover:border-white/30 transition-colors">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${rule.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black mb-3">{rule.title}</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow">
                    {rule.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass border-2 border-red-500/30 rounded-2xl p-8 flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold mb-2 text-red-500">Respect du lieu et de la communauté</h4>
              <p className="text-gray-300">
                Dabakh est plus qu&apos;une salle de sport, c&apos;est une communauté. Nous comptons sur toi pour respecter ces règles simples et contribuer à créer un environnement sain, sécurisé et accueillant pour tous les membres.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
