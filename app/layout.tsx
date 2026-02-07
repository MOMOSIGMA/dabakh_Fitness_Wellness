import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dabakh Fitness Wellness Club - Salle de Sport Premium à Dakar',
  description: 'La meilleure salle de sport de Dakar. Équipements de pointe, coaching personnalisé et IA intégrée. Musculation, Cardio, Boxe et plus.',
  keywords: ['salle de sport Dakar', 'gym Dakar', 'fitness Sénégal', 'musculation', 'Dabakh Fitness'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
