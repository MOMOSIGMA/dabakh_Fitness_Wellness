'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, PenLine, X, ExternalLink } from 'lucide-react'

type Review = {
  id: string
  name: string
  rating: number
  comment: string
  createdAt: string
}

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/BAVYB8i4dUwGWnss7'

function Stars({ value, size = 'sm' }: { value: number; size?: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${value} sur 5 étoiles`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${cls} ${i <= value ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
        />
      ))}
    </span>
  )
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [average, setAverage] = useState(0)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)

  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews')
      const data = await res.json()
      setReviews(Array.isArray(data.reviews) ? data.reviews : [])
      setAverage(data.average || 0)
      setCount(data.count || 0)
    } catch {
      setReviews([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    document.body.style.overflow = formOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [formOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFormOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setFeedback(null)

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment }),
      })
      const data = await res.json()

      if (res.ok) {
        setFeedback({ ok: true, text: data.message || 'Merci pour ton avis !' })
        setName('')
        setComment('')
        setRating(5)
        // L'avis est publie tout de suite : on recharge pour qu'il apparaisse.
        load()
        setTimeout(() => setFormOpen(false), 1400)
      } else {
        setFeedback({ ok: false, text: data.error || 'Une erreur est survenue.' })
      }
    } catch {
      setFeedback({ ok: false, text: 'Impossible d’envoyer ton avis. Vérifie ta connexion.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="avis" className="py-24 px-4 bg-black relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium uppercase tracking-wider text-red-500 mb-4">
            Ils en parlent
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Avis des <span className="text-red-500">membres</span>
          </h2>

          {count > 0 && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <Stars value={Math.round(average)} size="lg" />
              <span className="text-white font-black text-xl tabular-nums">{average}</span>
              <span className="text-gray-400 text-sm">
                · {count} avis
              </span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setFeedback(null)
                setFormOpen(true)
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <PenLine className="w-4 h-4" />
              Laisser un avis
            </button>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-red-500/60 hover:bg-white/5 text-white font-bold rounded-full transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Voir sur Google
            </a>
          </div>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-500 text-sm">Chargement des avis…</p>
        ) : reviews.length === 0 ? (
          <div className="max-w-xl mx-auto text-center rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-white font-semibold mb-1">Sois le premier à donner ton avis</p>
            <p className="text-gray-400 text-sm">
              Tu t’entraînes chez Dabakh ? Ton retour aide les prochains à se décider.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review, index) => (
              <motion.blockquote
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.3, delay: Math.min(index, 5) * 0.05 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col"
              >
                <Stars value={review.rating} />
                <p className="text-gray-200 text-sm leading-relaxed mt-3 mb-4 flex-grow">
                  {review.comment}
                </p>
                <footer className="text-xs text-gray-400">
                  <span className="text-white font-semibold">{review.name}</span>
                  <span className="mx-1.5">·</span>
                  <time dateTime={review.createdAt}>
                    {new Date(review.createdAt).toLocaleDateString('fr-FR', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        )}
      </div>

      {/* Formulaire */}
      <AnimatePresence>
        {formOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFormOpen(false)}
              className="fixed inset-0 bg-black/70 z-[110]"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Laisser un avis"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md max-h-[85vh] overflow-y-auto bg-neutral-950 border border-white/15 rounded-2xl p-6 z-[120] shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <h3 className="text-xl font-black text-white">Ton avis</h3>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  aria-label="Fermer"
                  className="p-2 -m-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label htmlFor="review-name" className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                    Ton prénom
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={50}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Awa"
                  />
                </div>

                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                    Ta note
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        aria-label={`${value} étoile${value > 1 ? 's' : ''}`}
                        aria-pressed={rating === value}
                        className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            value <= rating ? 'text-red-500 fill-red-500' : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="review-comment" className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                    Ton expérience
                  </label>
                  <textarea
                    id="review-comment"
                    required
                    minLength={10}
                    maxLength={600}
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-red-500 transition-colors resize-none"
                    placeholder="Les équipements, les coachs, l’ambiance…"
                  />
                  <p className="text-right text-[11px] text-gray-500 mt-1 tabular-nums">
                    {comment.length}/600
                  </p>
                </div>

                {feedback && (
                  <p
                    role="status"
                    className={`text-sm rounded-xl px-4 py-3 ${
                      feedback.ok
                        ? 'bg-green-500/10 border border-green-500/30 text-green-300'
                        : 'bg-red-500/10 border border-red-500/30 text-red-300'
                    }`}
                  >
                    {feedback.text}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold transition-colors"
                >
                  {sending ? 'Envoi…' : 'Envoyer mon avis'}
                </button>

                <p className="text-[11px] text-gray-500 text-center">
                  Ton avis apparaît tout de suite sur le site.
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
