'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import Image from 'next/image'

export default function GallerySection() {
  // 📸 IMAGES MODÈLES - Remplacer par vos vraies photos de Dabakh Fitness
  const galleryItems = [
    {
      title: '🏋️ Zone Musculation',
      description: 'Machines et poids libres professionnels',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&fit=crop',
      span: 'md:col-span-2 md:row-span-2',
      // 📸 À PRENDRE: Vue large de la salle avec tous les équipements visibles
    },
    {
      title: '🥊 Espace Boxe',
      description: 'Sacs de frappe et ring',
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&q=80&fit=crop',
      span: 'md:col-span-1 md:row-span-1',
      // 📸 À PRENDRE: Zone boxe avec sacs de frappe, angle dynamique
    },
    {
      title: '💪 Cours Collectifs',
      description: 'Séances en groupe et coaching',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80&fit=crop',
      span: 'md:col-span-1 md:row-span-1',
      // 📸 À PRENDRE: Groupe de membres pendant un cours (flouter visages si nécessaire)
    },
    {
      title: '🏃 Espace Cardio',
      description: 'Tapis de course et vélos',
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200&q=80&fit=crop',
      span: 'md:col-span-1 md:row-span-1',
      // 📸 À PRENDRE: Rangée de machines cardio (tapis, vélos, etc.)
    },
    {
      title: '🚿 Vestiaires Premium',
      description: 'Douches et casiers modernes',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80&fit=crop',
      span: 'md:col-span-1 md:row-span-1',
      // 📸 À PRENDRE: Vestiaires propres et ordonnés (quand vides de préférence)
    },
    {
      title: '🧘 Zone Stretching',
      description: 'Espace détente et étirements',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80&fit=crop',
      span: 'md:col-span-2 md:row-span-1',
      // 📸 À PRENDRE: Espace avec tapis de sol, ballons, foam rollers
    },
  ]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-red-500 blur-[120px] rounded-full transform -translate-x-1/2 -translate-y-1/2"
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-8 h-8 text-red-500" />
            <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium uppercase tracking-wider text-red-500">
              Nos Installations
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Découvre <span className="text-stroke italic">Dabakh</span>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto mb-4">
            Des équipements de pointe dans un cadre moderne et accueillant
          </p>
          <p className="text-yellow-500 text-sm flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" />
            Photos modèles - Seront remplacées par les vraies photos de la salle
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`${item.span} group relative overflow-hidden rounded-3xl cursor-pointer`}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <h3 className="text-2xl font-black mb-2 text-white group-hover:text-red-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </motion.div>
              </div>

              {/* Camera Icon Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-red-500/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass inline-block px-8 py-6 rounded-2xl border border-red-500/30">
            <p className="text-white text-lg mb-2">
              📸 <span className="text-red-500 font-bold">Bientôt les vraies photos</span> de notre salle !
            </p>
            <p className="text-gray-200 text-sm">
              Ces images te donnent une idée du type d'équipements et d'ambiance que tu trouveras chez Dabakh
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
