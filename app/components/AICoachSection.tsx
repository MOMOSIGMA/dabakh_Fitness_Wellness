'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, Sparkles, User, AlertCircle, Lock } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const DAILY_LIMIT = 10

export default function AICoachSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '🤖 Salut ! Je suis Dabakh AI Coach, ton assistant personnel ! 💪\n\nJe peux t\'aider sur:\n• 💰 Tarifs et packs d\'abonnement\n• ⏰ Horaires d\'ouverture\n• 📍 Localisation et itinéraire\n• 📞 Réservations et contacts\n• 🏋️ Plans d\'entraînement personnalisés\n• 🥗 Conseils nutrition\n• 💆 Services de massages\n• 📋 Règlement intérieur et services\n\nTu peux me poser n\'importe quelle question sur Dabakh Fitness. Dis moi tes objectifs et je vais créer un programme juste pour toi ! 🎯'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [messagesCount, setMessagesCount] = useState(0)
  const [limitReached, setLimitReached] = useState(false)

  // Initialiser le compteur au chargement
  useEffect(() => {
    const today = new Date().toDateString()
    const storedData = localStorage.getItem('ai-coach-limit')
    
    if (storedData) {
      const { date, count } = JSON.parse(storedData)
      
      // Si c'est un nouveau jour, réinitialiser
      if (date !== today) {
        localStorage.setItem('ai-coach-limit', JSON.stringify({ date: today, count: 0 }))
        setMessagesCount(0)
        setLimitReached(false)
      } else {
        setMessagesCount(count)
        setLimitReached(count >= DAILY_LIMIT)
      }
    } else {
      // Premier jour
      localStorage.setItem('ai-coach-limit', JSON.stringify({ date: today, count: 0 }))
      setMessagesCount(0)
      setLimitReached(false)
    }
  }, [])

  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/^\s*[*+-]\s+/gm, '• ')
      .replace(/^(\d+)\.\s+/gm, '$1) ')
  }

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 1500)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const handleBookSession = async () => {
    setBookingLoading(true)
    try {
      const response = await fetch('/api/book-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messageHistory: messages,
          userContext: { lastUserMessage: input }
        }),
      })

      const data = await response.json()
      
      if (data.whatsappLink) {
        // Ouvrir WhatsApp avec le message pré-rempli
        window.open(data.whatsappLink, '_blank')
      }
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setBookingLoading(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return
    
    // Vérifier la limite
    if (messagesCount >= DAILY_LIMIT) {
      setLimitReached(true)
      return
    }

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Incrémenter le compteur
    const newCount = messagesCount + 1
    setMessagesCount(newCount)
    
    // Mettre à jour localStorage
    const today = new Date().toDateString()
    localStorage.setItem('ai-coach-limit', JSON.stringify({ date: today, count: newCount }))
    
    if (newCount >= DAILY_LIMIT) {
      setLimitReached(true)
    }

    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          history: messages 
        }),
      })

      const data = await response.json()
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.message 
      }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '❌ Désolé, une erreur s\'est produite. Réessaye plus tard.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="ai-coach" className="py-24 px-4 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.3) 2px, transparent 2px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-red-500" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Dabakh <span className="text-red-500">AI</span> Coach
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Intelligence artificielle pour ton programme personnalisé
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl overflow-hidden shadow-2xl border border-red-500/20"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-white">Dabakh AI Coach</div>
              <div className="text-xs text-white/70 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                En ligne
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-black/40">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-black" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-red-500 text-white font-medium'
                        : 'glass text-white'
                    }`}
                  >
                    {message.role === 'assistant'
                      ? formatMessage(message.content)
                      : message.content}

                    {message.role === 'assistant' && (
                      <div className="mt-4 flex flex-col gap-2">
                        {/* Bouton Copier */}
                        <button
                          onClick={() => handleCopy(message.content, index)}
                          className="text-xs px-3 py-1 rounded-full border border-white/20 hover:border-red-500/60 text-white hover:text-red-500 transition-colors self-end"
                        >
                          {copiedIndex === index ? '✓ Copié' : 'Copier'}
                        </button>

                        {/* Bouton Réserver Séance - Seulement si CTA présent */}
                        {message.content.includes('OFFRE SPÉCIALE') && (
                          <motion.button
                            onClick={handleBookSession}
                            disabled={bookingLoading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold text-sm hover:shadow-lg hover:shadow-green-500/50 disabled:opacity-50 transition-all"
                          >
                            {bookingLoading ? '⏳ Ouverture WhatsApp...' : '📱 Réserver via WhatsApp'}
                          </motion.button>
                        )}
                      </div>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div className="glass px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-black/60 space-y-3">
            {/* Compteur de messages */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-100">Messages aujourd&apos;hui: <span className="text-red-500 font-bold">{messagesCount}/{DAILY_LIMIT}</span></span>
              <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(messagesCount / DAILY_LIMIT) * 100}%` }}
                  className="h-full bg-gradient-to-r from-red-500 to-red-600"
                />
              </div>
            </div>

            {/* Message limite atteinte */}
            {limitReached && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/40 rounded-lg p-4 flex flex-col gap-3"
              >
                <div className="flex gap-3">
                  <div className="text-2xl">🚀</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-purple-300 mb-2">
                      Je ne suis qu&apos;une IA...
                    </p>
                    <p className="text-xs text-purple-200 leading-relaxed">
                      Pour voir tes <span className="font-bold text-red-500">VRAIS résultats</span>, il faut passer à l&apos;action! C&apos;est maintenant que ça se joue. Fais-le pour toi, allez <span className="font-bold animate-pulse">GO GO GO</span> 💪 Tu peux y arriver!
                    </p>
                  </div>
                </div>
                
                {/* Bouton CTA WhatsApp */}
                <motion.button
                  onClick={async () => {
                    const message = encodeURIComponent(
                      `👋 Salut! Je suis prêt à passer à l'action et à commencer mes vrais entraînements chez Dabakh Fitness! 💪 J'aimerais prendre rendez-vous avec un coach pour débuter. Peux-tu m'aider? 🚀`
                    )
                    window.open(`https://wa.me/221771463012?text=${message}`, '_blank')
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center gap-2"
                >
                  📱 Commence Maintenant sur WhatsApp
                </motion.button>
              </motion.div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={limitReached ? "Limite atteinte pour aujourd'hui..." : "Ex: Je pèse 75kg et je veux prendre de la masse..."}
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
                disabled={isLoading || limitReached}
              />
              <motion.button
                onClick={handleSend}
                disabled={isLoading || !input.trim() || limitReached}
                whileHover={!limitReached ? { scale: 1.05 } : {}}
                whileTap={!limitReached ? { scale: 0.95 } : {}}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
            <p className="text-xs text-gray-200 text-center">
              {limitReached ? '⚠️ Limite atteinte! Contacte un coach pour des conseils illimités.' : '💡 Exemple: &quot;Je pèse 70kg, je veux perdre du poids&quot;'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
