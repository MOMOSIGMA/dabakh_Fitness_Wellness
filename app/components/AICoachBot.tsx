'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X, Minimize2, AlertCircle, User } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const DAILY_LIMIT = 10

export default function AICoachBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '🤖 Salut ! Je suis Dabakh AI Coach, ton assistant personnel ! 💪\n\nJe peux t\'aider sur:\n• 💰 Tarifs et packs\n• ⏰ Horaires\n• 📍 Localisation\n• 🏋️ Programmes personnalisés\n• 🥗 Conseils nutrition\n• 💆 Services de massages\n\nTu peux me poser n\'importe quelle question ! 🎯'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messagesCount, setMessagesCount] = useState(0)
  const [limitReached, setLimitReached] = useState(false)

  // Initialiser le compteur
  useEffect(() => {
    const today = new Date().toDateString()
    const storedData = localStorage.getItem('ai-coach-limit')
    
    if (storedData) {
      const { date, count } = JSON.parse(storedData)
      if (date !== today) {
        localStorage.setItem('ai-coach-limit', JSON.stringify({ date: today, count: 0 }))
        setMessagesCount(0)
        setLimitReached(false)
      } else {
        setMessagesCount(count)
        setLimitReached(count >= DAILY_LIMIT)
      }
    } else {
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

  const renderMessageContent = (text: string) => {
    const formattedText = formatMessage(text)
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = formattedText.split(urlRegex)
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            {part}
          </a>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  const handleSend = async () => {
    if (!input.trim()) return
    
    if (messagesCount >= DAILY_LIMIT) {
      setLimitReached(true)
      return
    }

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const newCount = messagesCount + 1
    setMessagesCount(newCount)
    
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
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-2xl shadow-red-500/50 flex items-center justify-center z-40 hover:shadow-lg hover:shadow-red-600/70 transition-all"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Bot className="w-8 h-8 text-white" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <Bot className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Dabakh AI Coach</div>
                  <div className="text-xs text-white/70 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                    En ligne
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    {message.role === 'assistant'
                      ? renderMessageContent(message.content)
                      : message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {limitReached && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-lg p-3 mt-2"
                >
                  <p className="text-xs font-bold text-purple-700 mb-2">🚀 Je ne suis qu&apos;une IA...</p>
                  <p className="text-xs text-purple-600 mb-3">
                    Pour voir tes <span className="font-bold text-red-500">VRAIS résultats</span>, il faut passer à l&apos;action!
                  </p>
                  <motion.button
                    onClick={async () => {
                      const message = encodeURIComponent(
                        `👋 Salut! Je suis prêt à passer à l\'action chez Dabakh Fitness! 💪 Je voudrais commencer mes entraînements.`
                      )
                      window.open(`https://wa.me/221771463012?text=${message}`, '_blank')
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded text-xs font-bold hover:shadow-lg transition-all"
                  >
                    📱 WhatsApp
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 bg-white space-y-2">
              <div className="text-xs text-gray-500 text-center">
                Messages: <span className="font-bold text-red-500">{messagesCount}/{DAILY_LIMIT}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={limitReached ? "Limite atteinte..." : "Écris ta question..."}
                  className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-500 disabled:opacity-50"
                  disabled={isLoading || limitReached}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim() || limitReached}
                  whileHover={!limitReached ? { scale: 1.05 } : {}}
                  whileTap={!limitReached ? { scale: 0.95 } : {}}
                  className="p-2 bg-red-500 text-white rounded-lg disabled:opacity-50 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
