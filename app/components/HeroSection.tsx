'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const ua = navigator.userAgent || navigator.vendor
    setIsIOS(/iPad|iPhone|iPod/.test(ua))
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Animations réduites sur mobile
  const animationDelay = (value: number) => isMobile ? value * 0.5 : value
  const scaleHover = isMobile ? 1.02 : 1.05

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black z-10" />
      
      {/* Background Image Optimized */}
      <Image
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=50"
        alt="Fitness Background"
        fill
        priority
        quality={50}
        className="absolute inset-0 object-cover grayscale"
        sizes="100vw"
        loading="eager"
      />

      {/* Animated Grid Background - disabled on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      )}

      <div
        className="relative z-20 text-center px-4 max-w-6xl mx-auto"
        style={isIOS ? { paddingTop: '1.5rem' } : undefined}
      >
        {/* Badge animé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animationDelay(0.2) }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-red-500" style={{animation: isMobile ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : undefined}} />
          <span className="text-xs font-medium uppercase tracking-widest">
            Le plus grand club de Yoff
          </span>
        </motion.div>
        
        {/* Titre Principal avec animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animationDelay(0.4), duration: isMobile ? 0.4 : 0.8 }}
          className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter mb-6 leading-none"
        >
          <span className="block">DABAKH</span>
          <span className="block text-stroke italic">FITNESS</span>
        </motion.h1>
        
        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animationDelay(0.6) }}
          className="max-w-2xl mx-auto text-gray-300 text-lg md:text-2xl mb-12 leading-relaxed"
        >
          Dépassez vos limites au cœur de Dakar.
          <span className="block mt-2 text-yellow-400 font-semibold">
            Équipements de pointe • Coaching IA • Communauté premium
          </span>
        </motion.p>

        {/* Boutons CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animationDelay(0.8) }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#disciplines"
            className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full hover:shadow-2xl hover:shadow-yellow-400/50 transition-all flex items-center justify-center gap-2 min-w-[250px]"
            whileHover={{ scale: scaleHover }}
            whileTap={{ scale: 0.95 }}
          >
            COMMENCER MAINTENANT
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          
          <motion.a
            href="#disciplines"
            className="group px-8 py-4 glass border border-white/30 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 min-w-[250px]"
            whileHover={{ scale: scaleHover }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            VOIR LE PLANNING
          </motion.a>
        </motion.div>

        {/* Stats animés */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: animationDelay(1.2) }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: '500+', label: 'Membres Actifs' },
            { number: '4.3★', label: 'Note Google' },
            { number: '15+', label: 'Disciplines' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: animationDelay(1.2 + index * 0.1) }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-yellow-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
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
            <div className="w-1 h-2 bg-yellow-400 rounded-full animate-pulse" />
          </div>
        </motion.div>
      )}
    </section>
  )
}
