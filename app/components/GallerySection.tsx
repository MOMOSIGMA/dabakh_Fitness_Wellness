'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import Image from 'next/image'

export default function GallerySection() {
  // Photos reelles de la salle, preparees par `npm run medias`
  // (redressees, redimensionnees, donnees EXIF supprimees).
  const galleryItems = [
    {
      title: 'Vue d’ensemble',
      description: 'Cardio, plateau musculation et espace libre',
      image: '/images/salle/salle-vue-ensemble.jpg',
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      title: 'Plateau musculation',
      description: 'Bancs, barres et poids libres',
      image: '/images/salle/salle-musculation.jpg',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      title: 'Espace biking',
      description: 'Vélos de biking pour les séances cardio',
      image: '/images/salle/salle-cardio.jpg',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      title: 'Séance en cours',
      description: 'L’ambiance d’un entraînement en fin de journée',
      image: '/images/salle/salle-coaching.jpg',
      span: 'md:col-span-3 md:row-span-1',
    },
  ]

  return (
    <section className="py-12 md:py-24 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        {/* Halo fige : anime, il tournait en boucle a 10 % d'opacite derriere
            un flou de 120 px, donc sans effet visible, en occupant le processeur
            en permanence. */}
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 glow-red" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] translate-x-1/4 -translate-y-1/2 glow-blue" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-8 h-8 text-red-500" />
            <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium uppercase tracking-wider text-red-500">
              Nos Installations
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Découvre <span className="text-stroke italic">Dabakh</span>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            La salle telle qu’elle est, à Sacré Cœur 3
          </p>
        </motion.div>

        {/* Rail sur telephone, mosaique a partir de la tablette.
            Empilees, ces quatre photos faisaient descendre d'un ecran entier
            chacune ; en rail elles tiennent sur une seule bande. */}
        <div
          className="rail md:grid md:grid-cols-3 md:gap-4 md:auto-rows-[250px]"
          tabIndex={0}
          role="region"
          aria-label="Photos de la salle, faire defiler horizontalement"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`${item.span} w-[74vw] h-[210px] md:w-auto md:h-auto group relative overflow-hidden rounded-3xl`}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={60}
                  sizes="(max-width: 768px) 74vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-black mb-2 text-white">{item.title}</h3>
                {/* Visible en permanence : au doigt, il n'y a pas de survol, et
                    la description restait donc invisible sur telephone. */}
                <p className="text-gray-200 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
