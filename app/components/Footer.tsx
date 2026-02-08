'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'
import TikTokIcon from './TikTokIcon'

export default function Footer() {
  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@dabakhfitness1', label: 'TikTok' },
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
              <img 
                src="/images/logo-dabakh.png" 
                alt="Dabakh Fitness Logo"
                className="w-12 h-12 object-contain"
              />
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
              <a href="https://maps.google.com/?q=Sacré+Cœur+3+VDN+Villa+16+Dakar" className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors group">
                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Sacré Cœur 3, VDN Villa 16, Dakar</span>
              </a>
              <a href="tel:+221775323725" className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors group">
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+221 77 532 37 25</span>
              </a>
              <a href="mailto:contact@dabakhfitness.sn" className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors group">
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
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm"
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
                <span className="text-red-500">07h - 22h30</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi</span>
                <span className="text-red-500">09h - 21h</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-red-500">10h - 15h</span>
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
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-red-500 border border-white/10 transition-colors group"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
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
