'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Star, Crown } from 'lucide-react'

type Plan = {
  name: string
  price: string
  period: string
  icon: typeof Star
  features: string[]
  cta: string
  popular: boolean
}

type Rate = {
  label: string
  detail: string
  price: string
}

type RateGroup = {
  title: string
  rates: Rate[]
}

export default function PricingSection() {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)

  // TODO CLIENT : faire valider cette grille. Elle diverge aujourd'hui de celle
  // utilisee par le bot IA (le Pack Starter y est absent, le Pack VIP y figure).
  const plans: Plan[] = [
    {
      name: 'Starter',
      price: '25 000',
      period: 'FCFA · 1er mois',
      icon: Star,
      features: [
        'Inscription incluse (5 000 F)',
        'Mensualité 1 mois (20 000 F)',
        'Accès complet salle',
        'Tous les équipements',
        'Vestiaires & douches',
      ],
      cta: 'Commencer',
      popular: false,
    },
    {
      name: 'Silver',
      price: '45 000',
      period: 'FCFA · 3 mois',
      icon: Star,
      features: [
        'Accès complet salle',
        'Vestiaires & douches',
        'Tous les équipements',
        'Valide 3 mois',
      ],
      cta: 'Choisir Silver',
      popular: false,
    },
    {
      name: 'Gold',
      price: '100 000',
      period: 'FCFA · 6 mois',
      icon: Zap,
      features: [
        'Accès illimité',
        'Tous les équipements',
        '2 massages offerts',
        'Valide 6 mois',
        'Support prioritaire',
      ],
      cta: 'Choisir Gold',
      popular: true,
    },
    {
      name: 'Premium',
      price: '150 000',
      period: 'FCFA · 12 mois',
      icon: Crown,
      features: [
        'Abonnement annuel',
        '5 massages inclus',
        'Serviette Dabakh offerte',
        'Accès à tous les services',
        'Programme personnalisé',
      ],
      cta: 'Choisir Premium',
      popular: false,
    },
  ]

  // Les onze cartes secondaires precedentes, regroupees en grille tarifaire :
  // une liste de prix se lit mieux qu'une pile de cartes, surtout sur mobile.
  const rateGroups: RateGroup[] = [
    {
      title: 'Accès & cours',
      rates: [
        {
          label: 'Séance journalière',
          detail: 'Accès illimité pendant 1 jour',
          price: '2 000',
        },
        {
          label: 'Boxe / Taekwondo — Enfant',
          detail: 'Mensualité · inscription 5 000 FCFA',
          price: '15 000',
        },
        {
          label: 'Boxe / Taekwondo — Adulte',
          detail: 'Mensualité · inscription 5 000 FCFA',
          price: '20 000',
        },
      ],
    },
    {
      title: 'Bien-être',
      rates: [
        { label: 'Massage dos relaxant', detail: '20 minutes', price: '10 000' },
        { label: 'Massage tonifiant', detail: '30 minutes', price: '15 000' },
        { label: 'Massage relaxant doux', detail: '1 heure', price: '20 000' },
      ],
    },
    {
      title: 'Pack Famille',
      rates: [
        { label: 'Famille — 3 personnes', detail: 'Accès complet salle', price: '45 000' },
        { label: 'Famille — 4 personnes', detail: 'Accès complet salle', price: '60 000' },
      ],
    },
    {
      title: 'Personal Training',
      rates: [
        {
          label: 'Personal Silver',
          detail: '16 séances + 1 séance de massage',
          price: '80 000',
        },
        {
          label: 'Personal Gold',
          detail: '18 séances + 2 séances de massage',
          price: '100 000',
        },
        {
          label: 'Personal Premium',
          detail: '20 séances + serviette + 10 bouteilles d’eau + 5 massages',
          price: '115 000',
        },
      ],
    },
  ]

  const handleSubscribe = async (planName: string, price: string, features: string[]) => {
    setLoadingIndex(plans.findIndex((p) => p.name === planName))
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName: `Pack ${planName}`, price, features }),
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

  return (
    <section
      id="tarifs"
      className="py-24 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Halo statique : l'animation en rotation infinie tournait en permanence
          pour un effet invisible, au prix de la batterie sur mobile. */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium uppercase tracking-wider text-red-500 mb-4">
            Nos Tarifs
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Investis Dans Ta <span className="text-stroke italic">Transformation</span>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Pas d&apos;engagement. Annule quand tu veux. Séance découverte à 2 000 FCFA.
          </p>
        </motion.div>

        {/* Abonnements */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`relative rounded-2xl border p-5 md:p-6 flex flex-col ${
                  plan.popular
                    ? 'border-red-500/60 bg-red-500/[0.07] ring-1 ring-red-500/20 shadow-xl shadow-red-500/10'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 left-5 px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    Le plus choisi
                  </span>
                )}

                <div
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-xl grid place-items-center border mb-4 ${
                    plan.popular
                      ? 'border-red-500/40 bg-red-500/15 text-red-400'
                      : 'border-white/10 bg-white/5 text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-2">
                  Pack {plan.name}
                </h3>

                <div className="mb-5">
                  <div className="text-3xl md:text-4xl font-black text-white tabular-nums leading-none">
                    {plan.price}
                  </div>
                  <div className="text-xs text-gray-400 mt-1.5">{plan.period}</div>
                </div>

                <ul className="space-y-2 mb-6 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'text-red-500' : 'text-gray-500'
                        }`}
                      />
                      <span className="text-gray-200 text-xs md:text-sm leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleSubscribe(plan.name, plan.price, plan.features)}
                  disabled={loadingIndex === index}
                  className={`w-full py-3 rounded-xl text-xs md:text-sm font-bold transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    plan.popular
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'border border-white/15 text-white hover:border-red-500/60 hover:bg-white/5'
                  }`}
                >
                  {loadingIndex === index ? 'Redirection…' : plan.cta}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Grille tarifaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-white">Grille tarifaire</h3>
            <p className="text-gray-400 text-sm mt-2">
              Cours à l&apos;unité, bien-être, formules famille et coaching individuel
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
            {rateGroups.map((group, groupIndex) => (
              <div
                key={group.title}
                className={groupIndex > 0 ? 'border-t border-white/10' : undefined}
              >
                <div className="px-5 md:px-7 pt-6 pb-3">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-500">
                    {group.title}
                  </h4>
                </div>

                <dl className="px-5 md:px-7 pb-4">
                  {group.rates.map((rate) => (
                    <div
                      key={rate.label}
                      className="flex items-baseline justify-between gap-5 py-3.5 border-b border-white/5 last:border-0"
                    >
                      <div className="min-w-0">
                        <dt className="text-white text-sm md:text-base font-semibold leading-snug">
                          {rate.label}
                        </dt>
                        <dd className="text-gray-400 text-xs mt-1 leading-snug">{rate.detail}</dd>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="text-red-500 font-black text-base md:text-lg tabular-nums">
                          {rate.price}
                        </span>
                        <span className="text-gray-400 text-[11px] ml-1">FCFA</span>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-10 rounded-2xl border border-red-500/25 bg-red-500/[0.06] p-6 md:p-8 text-center"
        >
          <p className="text-white text-lg font-bold mb-1">
            Séance découverte à <span className="text-red-500">2 000 FCFA</span>
          </p>
          <p className="text-gray-300 text-sm mb-5">
            Viens tester les installations avant de t&apos;engager
          </p>
          <a
            href="https://wa.me/221775323725"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors"
          >
            Réserver ma séance
          </a>
        </motion.div>
      </div>
    </section>
  )
}
