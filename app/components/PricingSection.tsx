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
      name: 'BASIC',
      price: '25 000',
      period: 'FCFA/mois',
      icon: Star,
      gradient: 'from-gray-500 to-gray-700',
      features: [
        'Accès salle (6h-22h)',
        'Vestiaires & Douches',
        'Tous les équipements',
        'Planning des cours (limité)',
      ],
      cta: 'Choisir Basic',
      popular: false,
    },
    {
      name: 'PREMIUM',
      price: '40 000',
      period: 'FCFA/mois',
      icon: Zap,
      gradient: 'from-yellow-400 to-orange-500',
      features: [
        '✨ Accès 24/7',
        'Tous les cours collectifs',
        'Suivi personnalisé mensuel',
        'Zone cardio prioritaire',
        'Guest pass (2/mois)',
      ],
      cta: 'Choisir Premium',
      popular: true,
    },
    {
      name: 'VIP',
      price: '60 000',
      period: 'FCFA/mois',
      icon: Crown,
      gradient: 'from-purple-500 to-pink-600',
      features: [
        '👑 Tout Premium +',
        'Dabakh AI Coach illimité',
        'Coach personnel (4h/mois)',
        'Programme nutrition',
        'Espace VIP privé',
        'Guest pass illimité',
      ],
      cta: 'Choisir VIP',
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
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 blur-[150px] rounded-full"
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
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium uppercase tracking-wider text-yellow-400 mb-4">
            Nos Tarifs
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Investis Dans Ta <span className="text-stroke italic">Transformation</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pas d&apos;engagement. Annule quand tu veux. Première séance gratuite.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  plan.popular ? 'md:scale-110 z-10' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-4 right-4 z-20">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full"
                    >
                      ⭐ POPULAIRE
                    </motion.div>
                  </div>
                )}

                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-20`} />
                
                {/* Card Content */}
                <div className="relative glass border-2 border-white/10 p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-black mb-2">{plan.name}</h3>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black">{plan.price}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
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
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-400/50'
                        : 'glass border border-white/20 text-white hover:border-yellow-400'
                    } disabled:opacity-50`}
                  >
                    {loadingIndex === index ? '⏳ Redirection...' : plan.cta}
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass inline-block px-8 py-4 rounded-2xl">
            <p className="text-gray-300 mb-4">
              🎁 <span className="text-yellow-400 font-bold">Offre Spéciale</span> - Ta première séance est gratuite !
            </p>
            <p className="text-sm text-gray-500">
              Viens tester nos installations avant de t&apos;engager
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
