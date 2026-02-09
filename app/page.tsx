import dynamic from 'next/dynamic'
import HeroSection from './components/HeroSection'
import WhatsAppButton from './components/WhatsAppButton'
import CoachAvatars from './components/CoachAvatars'
import AICoachBot from './components/AICoachBot'

// Force fresh content on every request
export const revalidate = 0

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
      <Footer />
      <WhatsAppButton />
       <AICoachBot />
     </main>
   )
 }