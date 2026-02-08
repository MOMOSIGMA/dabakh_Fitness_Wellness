'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to detect if user prefers reduced motion or is on mobile with weak connection
 * Reduces animation complexity on these devices
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Détecte les préférences système
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Détecte si mobile
    setIsMobile(window.innerWidth < 768)

    // Listeners
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    mediaQuery.addEventListener('change', handleMotionChange)
    window.addEventListener('resize', handleResize)

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Retourne true si on devrait réduire les animations
  return prefersReducedMotion || isMobile
}

/**
 * Retourne des animations réduites si nécessaire
 */
export const getAnimationVariants = (shouldReduce: boolean) => {
  if (shouldReduce) {
    return {
      container: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      },
      item: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      },
    }
  }

  return {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
    },
  }
}
