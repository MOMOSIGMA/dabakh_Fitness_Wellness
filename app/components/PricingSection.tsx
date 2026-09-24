'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

type Rate = {
  label: string
  detail: string
  price: string
  /** Renseigne uniquement pour les abonnements : declenche la prise de contact. */
  souscrire?: { nom: string; avantages: string[] }
  marqueur?: string
}

type RateGroup = {
  title: string
  rates: Rate[]
}

export default function PricingSection() {
  const [enCours, setEnCours] = useState<string | null>(null)

  // TODO CLIENT : faire valider cette grille. Elle diverge aujourd'hui de celle
  // utilisee par le bot IA (le Pack VIP y figure, absent ici).
  //
  // Les quatre cartes d'abonnement et les onze cartes secondaires ne font plus
  // qu'une seule grille : une liste de prix continue se lit d'un trait, alors
  // qu'une pile de cartes obligeait a comparer deux montants a travers deux
  // mises en page differentes.
  const rateGroups: RateGroup[] = [
    {
      title: 'Abonnements',
      rates: [
        {
          label: 'Abonnement mensuel',
          detail:
            '1er mois, inscription de 5 000 FCFA comprise · 20 000 FCFA les mois suivants',
          price: '25 000',
          souscrire: {
            nom: 'Abonnement mensuel',
            avantages: [
              'Inscription incluse (5 000 F)',
              'Mensualité 1 mois (20 000 F)',
              'Accès complet salle',
              'Tous les équipements',
              'Vestiaires & douches',
            ],
          },
        },
        {
          label: 'Silver',
          detail: '3 mois · accès complet salle, équipements, vestiaires et douches',
          price: '45 000',
          souscrire: {
            nom: 'Silver',
            avantages: [
              'Accès complet salle',
              'Vestiaires & douches',
              'Tous les équipements',
              'Valide 3 mois',
            ],
          },
        },
        {
          label: 'Gold',
          detail: '6 mois · accès illimité · 2 massages offerts · support prioritaire',
          price: '100 000',
          marqueur: 'Le plus choisi',
          souscrire: {
            nom: 'Gold',
            avantages: [
              'Accès illimité',
              'Tous les équipements',
              '2 massages offerts',
              'Valide 6 mois',
              'Support prioritaire',
            ],
          },
        },
        {
          label: 'Premium',
          detail:
            '12 mois · 5 massages inclus · serviette Dabakh offerte · programme personnalisé',
          price: '150 000',
          souscrire: {
            nom: 'Premium',
            avantages: [
              'Abonnement annuel',
              '5 massages inclus',
              'Serviette Dabakh offerte',
              'Accès à tous les services',
              'Programme personnalisé',
            ],
          },
        },
      ],
    },
    {
      title: 'Accès à la séance',
      rates: [
        {
          label: 'Séance journalière',
          detail: 'Accès illimité pendant 1 jour',
          price: '2 000',
        },
      ],
    },
    {
      title: 'Cours combat — Boxe & Taekwondo',
      rates: [
        {
          label: 'Enfant',
          detail: 'Mensualité · inscription 5 000 FCFA',
          price: '15 000',
        },
        {
          label: 'Adulte',
          detail: 'Mensualité · inscription 5 000 FCFA',
          price: '20 000',
        },
      ],
    },
    {
      title: 'Salle détente',
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

  const handleSubscribe = async (nom: string, prix: string, avantages: string[]) => {
    setEnCours(nom)
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName: nom, price: prix, features: avantages }),
      })
      const data = await response.json()
      if (data.whatsappLink) {
        window.open(data.whatsappLink, '_blank')
      }
    } catch (error) {
      console.error('Subscribe error:', error)
    } finally {
      setEnCours(null)
    }
  }

  return (
    <section
      id="tarifs"
      className="py-12 md:py-24 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Halo statique : l'animation en rotation infinie tournait en permanence
          pour un effet invisible, au prix de la batterie sur mobile. */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[684px] h-[684px] glow-red" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-9 md:mb-14"
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

        {/* Grille unique : abonnements, cours, bien-etre et coaching au meme format */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
        >
          {rateGroups.map((group, groupIndex) => (
            <div
              key={group.title}
              className={groupIndex > 0 ? 'border-t border-white/10' : undefined}
            >
              <div className="px-5 md:px-7 pt-6 pb-3">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-red-500">
                  {group.title}
                </h3>
              </div>

              {/* dt et dd doivent etre enfants directs du div qui suit le dl :
                  les imbriquer plus profond invalide la liste de definitions
                  et casse la restitution par les lecteurs d'ecran. */}
              <dl className="px-5 md:px-7 pb-4">
                {group.rates.map((rate) => (
                  <div
                    key={rate.label}
                    className="flex items-baseline justify-between gap-5 py-3.5 border-b border-white/5 last:border-0"
                  >
                    <dt className="min-w-0">
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-white text-sm md:text-base font-semibold leading-snug">
                          {rate.label}
                        </span>
                        {rate.marqueur && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                            {rate.marqueur}
                          </span>
                        )}
                      </span>
                      <span className="block text-gray-400 text-xs mt-1 leading-snug">
                        {rate.detail}
                      </span>
                      {rate.souscrire && (
                        <button
                          type="button"
                          onClick={() =>
                            handleSubscribe(
                              rate.souscrire!.nom,
                              rate.price,
                              rate.souscrire!.avantages,
                            )
                          }
                          disabled={enCours === rate.souscrire.nom}
                          className="mt-2 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 disabled:opacity-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
                        >
                          {enCours === rate.souscrire.nom ? 'Redirection…' : 'Choisir →'}
                        </button>
                      )}
                    </dt>
                    <dd className="shrink-0 text-right m-0">
                      <span className="text-red-500 font-black text-base md:text-lg tabular-nums">
                        {rate.price}
                      </span>
                      <span className="text-gray-400 text-[11px] ml-1">FCFA</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </motion.div>

        {/* CTA final */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl border border-red-500/25 bg-red-500/[0.06] p-6 md:p-8 text-center"
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
