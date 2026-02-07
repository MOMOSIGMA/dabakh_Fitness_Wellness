import HeroSection from './components/HeroSection'
import DisciplinesSection from './components/DisciplinesSection'
import AICoachSection from './components/AICoachSection'
import PricingSection from './components/PricingSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
      <HeroSection />
      <DisciplinesSection />
      <AICoachSection />
      <PricingSection />
      <Footer />
    </main>
  )
}
