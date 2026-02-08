'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, Sparkles, User } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AICoachSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Salut ! Je suis Dabakh AI Coach. Dis-moi ton poids et ton objectif, je vais créer ton programme personnalisé !'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [bookingLoading, setBookingLoading] = useState(false)

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

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

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
            <Sparkles className="w-12 h-12 text-yellow-400" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Dabakh <span className="text-yellow-400">AI</span> Coach
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Intelligence artificielle pour ton programme personnalisé
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl overflow-hidden shadow-2xl border border-yellow-400/20"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <Bot className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="font-bold text-black">Dabakh AI Coach</div>
              <div className="text-xs text-black/70 flex items-center gap-1">
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
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-black" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-yellow-400 text-black font-medium'
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
                          className="text-xs px-3 py-1 rounded-full border border-white/20 hover:border-yellow-400/60 text-gray-300 hover:text-yellow-400 transition-colors self-end"
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
          <div className="p-4 border-t border-white/10 bg-black/60">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ex: Je pèse 75kg et je veux prendre de la masse..."
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                disabled={isLoading}
              />
              <motion.button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💡 Exemple: &quot;Je pèse 70kg, je veux perdre du poids&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
