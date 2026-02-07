'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Dumbbell } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  const quickLinks = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Disciplines', href: '#disciplines' },
    { name: 'Tarifs', href: '#tarifs' },
    { name: 'IA Coach', href: '#ai-coach' },
  ]

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl">
                <Dumbbell className="w-6 h-6 text-black" />
              </div>
              <div>
                <span className="font-black text-2xl tracking-tight uppercase">Dabakh</span>
                <span className="block text-xs text-gray-400 -mt-1">Fitness Wellness Club</span>
              </div>
            </motion.div>
            <p className="text-gray-400 mb-6 max-w-md">
              La meilleure salle de sport de Dakar. Équipements premium, coaching personnalisé et intelligence artificielle pour ton succès.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors group">
                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">10355 Rue MZ 05, Dakar</span>
              </a>
              <a href="tel:+221" className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors group">
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+221 XX XXX XX XX</span>
              </a>
              <a href="mailto:contact@dabakhfitness.sn" className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors group">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">contact@dabakhfitness.sn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-bold text-lg mb-4">Horaires</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between">
                <span>Lun - Ven</span>
                <span className="text-yellow-400">6h - 22h</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi</span>
                <span className="text-yellow-400">8h - 20h</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-yellow-400">8h - 20h</span>
              </li>
              <li className="mt-4 pt-4 border-t border-white/10">
                <span className="text-yellow-400 font-semibold">Premium: 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10"
        >
          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-yellow-400 border border-white/10 transition-colors group"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                </motion.a>
              )
            })}
          </div>

          <div className="text-center sm:text-right">
            <p className="text-gray-500 text-sm">
              © 2026 Dabakh Fitness Wellness Club. Tous droits réservés.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Conçu avec ❤️ à Dakar
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
