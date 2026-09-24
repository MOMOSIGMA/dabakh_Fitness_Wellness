'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import OpenStatus from './OpenStatus'

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="hero" className="relative min-h-[72dvh] md:min-h-screen flex items-center justify-center overflow-hidden pt-[var(--nav-h)] pb-6 md:pb-12">
      {/* Background Video/Image Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-600/10 z-10" />
      
      {/* Background Image Optimized */}
      <Image
        src="/images/salle/salle-vue-ensemble.jpg"
        alt="Salle de musculation du Dabakh Fitness Wellness Club a Sacre Coeur 3, Dakar"
        fill
        priority
        quality={50}
        className="absolute inset-0 object-cover grayscale"
        sizes="(max-width: 768px) 640px, (max-width: 1200px) 1080px, 1920px"
        loading="eager"
        placeholder="empty"
      />

      {/* Animated Grid Background - completely disabled for performance */}
      {false && !isMobile && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      )}

      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        {/* Badge localisation + etat d'ouverture en direct */}
        <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-5 md:mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 glass shadow-lg shadow-red-500/10">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs font-medium uppercase tracking-widest">
              Sacré Cœur 3 • Dakar • Note Google 4,3
            </span>
          </span>
          <OpenStatus />
        </div>
        
        {/* Titre Principal avec animation */}
        <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter mb-4 md:mb-6 leading-none">
          <span className="block">DABAKH</span>
          <span className="block text-stroke italic">FITNESS</span>
          <span className="block text-lg sm:text-2xl lg:text-4xl font-bold tracking-[0.18em] mt-2 md:mt-3">
            WELLNESS CLUB
          </span>
        </h1>
        
        {/* Sous-titre */}
        <p
          className="max-w-2xl mx-auto text-white text-base md:text-2xl mb-6 md:mb-10 leading-relaxed"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
        >
          Dépassez vos limites au cœur de Dakar.
          <span className="block mt-2 text-red-500 font-semibold">
            Équipements de pointe • Coaching IA • Communauté premium
          </span>
        </p>

        {/* Boutons CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#disciplines"
            className="group px-8 py-3.5 md:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-red-600/50 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[250px]"
          >
            COMMENCER MAINTENANT
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#disciplines"
            className="group px-8 py-3.5 md:py-4 glass border border-blue-400/40 rounded-full font-bold hover:bg-blue-500/10 hover:border-blue-400/60 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[250px]"
          >
            <Play className="w-5 h-5 text-blue-400" />
            VOIR LES ÉVÉNEMENTS
          </a>
        </div>

        {/* Stats animés */}
        <div className="mt-8 md:mt-14 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto pb-8 md:pb-16">
          {[
            { number: '500+', label: 'Membres Actifs', color: 'text-blue-400' },
            { number: '4,3', label: 'Note Google', color: 'text-red-500' },
            { number: '15+', label: 'Disciplines', color: 'text-blue-500' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              <div className={`text-3xl md:text-5xl font-black ${stat.color} mb-1 md:mb-2`}>
                {stat.number}
              </div>
              <div className="text-[11px] md:text-sm text-white uppercase tracking-wider font-medium leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator - disabled on mobile */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
        </motion.div>
      )}
    </section>
  )
}
