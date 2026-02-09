'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Star, Crown } from 'lucide-react'

export default function PricingSection() {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)

  const handleSubscribe = async (planName: string, price: string, features: string[]) => {
    setLoadingIndex(plans.findIndex(p => p.name === planName))
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName,
          price,
          features
        }),
      })

      const data = await response.json()
      if (data.whatsappLink) {
        window.open(data.whatsappLink, '_blank')
      }
    } catch (error) {
      console.error('Subscribe error:', error)
    } finally {
      setLoadingIndex(null)
    }
  }
  const plans = [
    {
      name: 'PACK STARTER',
      price: '25 000',
      period: 'FCFA / 1er mois',
      icon: Star,
      gradient: 'from-green-600 to-green-800',
      features: [
        'Inscription incluse (5 000F)',
        'Mensualité 1 mois (20 000F)',
        'Accès complet salle',
        'Tous les équipements',
        'Vestiaires & Douches',
      ],
      cta: 'Commencer',
      popular: false,
    },
    {
      name: 'PACK SILVER',
      price: '45 000',
      period: 'FCFA / 3 mois',
      icon: Star,
      gradient: 'from-blue-600 to-blue-800',
      features: [
        'Accès complet salle',
        'Vestiaires & Douches',
        'Tous les équipements',
        'Valide 3 mois',
      ],
      cta: 'Choisir Silver',
      popular: false,
    },
    {
      name: 'PACK GOLD',
      price: '100 000',
      period: 'FCFA / 6 mois',
      icon: Zap,
      gradient: 'from-red-500 to-red-700',
      features: [
        '✨ Accès illimité',
        'Tous les équipements',
        '2 massages offerts',
        'Valide 6 mois',
        'Support prioritaire',
      ],
      cta: 'Choisir Gold',
      popular: true,
    },
    {
      name: 'PACK PREMIUM',
      price: '150 000',
      period: 'FCFA / 12 mois',
      icon: Crown,
      gradient: 'from-purple-600 to-purple-800',
      features: [
        '👑 Abonnement annuel',
        '5 massages inclus',
        'Serviette Dabakh offerte',
        'Accès à tous les services',
        'Programme personnalisé',
      ],
      cta: 'Choisir Premium',
      popular: false,
    },
  ]

  return (
    <section id="tarifs" className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 blur-[150px] rounded-full"
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
            Nos Tarifs
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Investis Dans Ta <span className="text-stroke italic">Transformation</span>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Pas d&apos;engagement. Annule quand tu veux. Séance découverte disponible.
          </p>
          <p className="text-gray-100 text-sm mt-3">
            Séance journalière: 2 000 FCFA.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative rounded-3xl overflow-hidden ${
                  plan.popular ? 'md:scale-110 z-10 shadow-2xl shadow-red-500/40' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-4 right-4 z-20">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-xl shadow-red-500/50"
                    >
                      🔥 LE PLUS CHOISI
                    </motion.div>
                  </div>
                )}

                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-20`} />
                
                {/* Card Content */}
                <div className="relative glass border-2 border-white/10 p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4 border-2 border-white/20`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-black mb-2">{plan.name}</h3>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className={`font-black ${
                        plan.popular ? 'text-6xl' : 'text-5xl'
                      }`}>{plan.price}</span>
                    </div>
                    <span className="text-white text-sm font-medium">{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-white text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    onClick={() => handleSubscribe(plan.name, plan.price, plan.features)}
                    disabled={loadingIndex === index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 rounded-xl font-bold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/50'
                        : 'glass border border-white/20 text-white hover:border-red-500'
                    } disabled:opacity-50`}
                  >
                    {loadingIndex === index ? '⏳ Redirection...' : plan.cta}
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Options Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-20 pt-12 border-t border-white/10"
        >
          <h3 className="text-2xl md:text-3xl font-black text-center mb-12">
            Options <span className="text-stroke italic">Supplémentaires</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Séance journalière */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-200 text-sm uppercase tracking-wider mb-2">Séance journalière</p>
              <p className="text-3xl font-black text-red-500 mb-2">2 000 FCFA</p>
              <p className="text-gray-300 text-xs">Accès illimité 1 jour</p>
            </motion.div>

            {/* Boxe / Taekwondo - Enfant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-200 text-sm uppercase tracking-wider mb-2">Boxe / Taekwondo - Enfant</p>
              <p className="text-3xl font-black text-red-500 mb-2">15 000 FCFA</p>
              <p className="text-gray-300 text-xs">Mensualité enfant</p>
              <p className="text-gray-300 text-xs">Inscription Boxe/Taekwondo: 5 000 FCFA</p>
            </motion.div>

            {/* Boxe / Taekwondo - Adulte */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-200 text-sm uppercase tracking-wider mb-2">Boxe / Taekwondo - Adulte</p>
              <p className="text-3xl font-black text-red-500 mb-2">20 000 FCFA</p>
              <p className="text-gray-300 text-xs">Mensualité adulte</p>
              <p className="text-gray-300 text-xs">Inscription Boxe/Taekwondo: 5 000 FCFA</p>
            </motion.div>

            {/* Massage Tonifiant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-200 text-sm uppercase tracking-wider mb-2">Massage Tonifiant</p>
              <p className="text-3xl font-black text-red-500 mb-2">15 000 FCFA</p>
              <p className="text-gray-300 text-xs">30 minutes de bien-être</p>
            </motion.div>

            {/* Massage Relaxant Doux */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-200 text-sm uppercase tracking-wider mb-2">Massage Relaxant Doux</p>
              <p className="text-3xl font-black text-red-500 mb-2">20 000 FCFA</p>
              <p className="text-gray-300 text-xs">1h de relaxation</p>
            </motion.div>

            {/* Massage Dos Relaxant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-200 text-sm uppercase tracking-wider mb-2">Dos Relaxant</p>
              <p className="text-3xl font-black text-red-500 mb-2">10 000 FCFA</p>
              <p className="text-gray-300 text-xs">20 minutes</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Packs Famille */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16 pt-12 border-t border-white/10"
        >
          <h3 className="text-2xl md:text-3xl font-black text-center mb-12">
            Pack <span className="text-stroke italic">Famille</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-200 text-sm uppercase tracking-wider mb-2">Pack Famille</p>
              <p className="text-3xl font-black text-red-500 mb-2">45 000 FCFA</p>
              <p className="text-gray-300 text-xs">3 personnes</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-200 text-sm uppercase tracking-wider mb-2">Pack Famille</p>
              <p className="text-3xl font-black text-red-500 mb-2">60 000 FCFA</p>
              <p className="text-gray-300 text-xs">4 personnes</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Personal Training */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-16 pt-12 border-t border-white/10"
        >
          <h3 className="text-2xl md:text-3xl font-black text-center mb-12">
            Personal <span className="text-stroke italic">Training</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-200 text-sm uppercase tracking-wider mb-2">Pack Silver</p>
              <p className="text-3xl font-black text-red-500 mb-2">80 000 FCFA</p>
              <p className="text-gray-300 text-xs">16 séances + 1 séance de massage</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-200 text-sm uppercase tracking-wider mb-2">Pack Gold</p>
              <p className="text-3xl font-black text-red-500 mb-2">100 000 FCFA</p>
              <p className="text-gray-300 text-xs">18 séances + 2 séances de massage</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="glass border border-white/10 rounded-2xl p-6"
            >
              <p className="text-gray-200 text-sm uppercase tracking-wider mb-2">Pack Premium</p>
              <p className="text-3xl font-black text-red-500 mb-2">115 000 FCFA</p>
              <p className="text-gray-300 text-xs">20 séances + serviette + 10 bouteilles d&apos;eau + 5 séances de massage</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass inline-block px-8 py-4 rounded-2xl">
            <p className="text-white mb-4">
              🎁 <span className="text-red-500 font-bold">Offre Spéciale</span> - Séance découverte à 2 000 FCFA.
            </p>
            <p className="text-sm text-gray-100">
              Viens tester nos installations avant de t&apos;engager
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
