'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Heart, Zap, Clock, Users, Calendar } from 'lucide-react'

export default function DisciplinesSection() {
  const disciplines = [
    {
      title: 'Musculation & Cardio',
      description: 'Équipements professionnels pour tous les niveaux. Machines de dernière génération et espace libre.',
      icon: Dumbbell,
      size: 'large', // Grande carte
      gradient: 'from-yellow-400/20 to-orange-500/20',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    },
    {
      title: 'Boxe & Combat',
      description: 'Entraînement intensif avec nos coachs certifiés. Ring professionnel et sacs de frappe.',
      icon: Zap,
      size: 'medium',
      gradient: 'from-red-400/20 to-pink-500/20',
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    },
    {
      title: 'Planning des Cours',
      description: 'Aérobic, Step, Yoga et plus encore',
      icon: Calendar,
      size: 'small',
      gradient: 'from-blue-400/20 to-purple-500/20',
      schedule: [
        { day: 'Lun-Mer-Ven', time: '18h00', activity: 'Aérobic' },
        { day: 'Mar-Jeu', time: '19h00', activity: 'Step' },
        { day: 'Samedi', time: '10h00', activity: 'Yoga' },
      ]
    },
    {
      title: 'Coaching Personnalisé',
      description: 'Programmes sur mesure adaptés à vos objectifs',
      icon: Users,
      size: 'medium',
      gradient: 'from-green-400/20 to-emerald-500/20',
    },
    {
      title: '24/7 Access',
      description: 'Accès illimité pour les membres Premium',
      icon: Clock,
      size: 'small',
      gradient: 'from-cyan-400/20 to-blue-500/20',
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="disciplines" className="py-24 px-4 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.5) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium uppercase tracking-wider text-yellow-400 mb-4">
            Nos Disciplines
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Trouvez Votre <span className="text-stroke italic">Passion</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Des équipements de pointe et des programmes adaptés à tous les niveaux
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]"
        >
          {disciplines.map((discipline, index) => {
            const Icon = discipline.icon
            const gridClass = 
              discipline.size === 'large' ? 'md:col-span-4 md:row-span-2' :
              discipline.size === 'medium' ? 'md:col-span-3 md:row-span-2' :
              'md:col-span-2 md:row-span-1'

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`${gridClass} group relative overflow-hidden rounded-3xl glass cursor-pointer`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${discipline.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
                
                {/* Background Image for large/medium cards */}
                {discipline.image && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity grayscale group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${discipline.image})` }}
                  />
                )}

                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div>
                    <Icon className="w-10 h-10 mb-4 text-yellow-400" />
                    <h3 className="text-2xl font-bold mb-2">{discipline.title}</h3>
                    <p className="text-gray-300 text-sm">{discipline.description}</p>
                  </div>

                  {/* Schedule for planning card */}
                  {discipline.schedule && (
                    <div className="mt-4 space-y-2">
                      {discipline.schedule.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs glass rounded-lg px-3 py-2">
                          <span className="font-semibold">{item.day}</span>
                          <span className="text-yellow-400">{item.time}</span>
                          <span className="text-gray-400">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
