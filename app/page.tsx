import dynamic from 'next/dynamic'
import HeroSection from './components/HeroSection'
import WhatsAppButton from './components/WhatsAppButton'
import CoachAvatars from './components/CoachAvatars'

// Lazy load sections below the fold
const DisciplinesSection = dynamic(() => import('./components/DisciplinesSection'), {
  loading: () => <div className="h-96 bg-black/50" />,
  ssr: true,
})

const GallerySection = dynamic(() => import('./components/GallerySection'), {
  loading: () => <div className="h-96 bg-black/50" />,
  ssr: true,
})

const AICoachSection = dynamic(() => import('./components/AICoachSection'), {
  loading: () => <div className="h-96 bg-black/50" />,
  ssr: true,
})

const PricingSection = dynamic(() => import('./components/PricingSection'), {
  loading: () => <div className="h-96 bg-black/50" />,
  ssr: true,
})

const PracticalInfoSection = dynamic(() => import('./components/PracticalInfoSection'), {
  loading: () => <div className="h-96 bg-black/50" />,
  ssr: true,
})

const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => <div className="h-32 bg-black" />,
  ssr: true,
})

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
      <HeroSection />
      <DisciplinesSection />
      <GallerySection />
      <AICoachSection />
      <PricingSection />
      <PracticalInfoSection />
      <CoachAvatars />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
