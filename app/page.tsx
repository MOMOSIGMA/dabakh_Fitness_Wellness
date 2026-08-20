import dynamic from 'next/dynamic'
// CoachAvatars reste en import direct : differe, son substitut noir de 384 px
// degradait la progression visuelle (Speed Index 3,1 s -> 6,3 s) pour un gain nul.
import CoachAvatars from './components/CoachAvatars'
import HeroSection from './components/HeroSection'
import WhatsAppButton from './components/WhatsAppButton'


// Regeneration horaire : les tarifs ne changent pas toutes les secondes,
// et le rendu a chaque requete penalisait lourdement les connexions 3G.
export const revalidate = 3600

// Lazy load sections below the fold
const DisciplinesSection = dynamic(() => import('./components/DisciplinesSection'), {
  loading: () => <div className="h-96 bg-black/50" />,
})

const GallerySection = dynamic(() => import('./components/GallerySection'), {
  loading: () => <div className="h-96 bg-black/50" />,
})

const PricingSection = dynamic(() => import('./components/PricingSection'), {
  loading: () => <div className="h-96 bg-black/50" />,
})

const PracticalInfoSection = dynamic(() => import('./components/PracticalInfoSection'), {
  loading: () => <div className="h-96 bg-black/50" />,
})

const SouvenirsSection = dynamic(() => import('./components/SouvenirsSection'), {
  loading: () => <div className="h-96 bg-black/50" />,
})

const ReviewsSection = dynamic(() => import('./components/ReviewsSection'), {
  loading: () => <div className="h-96 bg-black/50" />,
})

// Le chat n'apparait qu'au clic sur la bulle : son code part dans un fragment
// separe au lieu d'etre paye par tous les visiteurs au premier rendu.
// (ssr: false est interdit depuis un Server Component avec l'App Router.)
const AICoachBot = dynamic(() => import('./components/AICoachBot'))

const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => <div className="h-32 bg-black" />,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
      <HeroSection />
      <DisciplinesSection />
      <GallerySection />
      <PricingSection />
      <PracticalInfoSection />
      <CoachAvatars />
      <SouvenirsSection />
      <ReviewsSection />
      <Footer />
      <WhatsAppButton />
       <AICoachBot />
     </main>
   )
 }