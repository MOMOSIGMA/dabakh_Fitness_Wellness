import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import PwaRegister from './components/PwaRegister'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Dabakh Fitness Wellness Club - Salle de Sport à Sacré Cœur 3, Dakar, Sénégal',
  description: 'Dabakh Fitness: salle de sport premium à Sacré Cœur 3 / Mermoz, Dakar avec musculation, boxe, cardio, coaching IA, et 500+ membres. Équipements professionnels. Rejoignez-nous!',
  keywords: [
    'salle de sport Dakar',
    'gym Sacré Cœur Dakar',
    'fitness Sénégal',
    'musculation Dakar',
    'boxe Dakar',
    'coaching fitness',
    'salle de sport Mermoz',
    'Dabakh Fitness',
    'gym Dakar Sénégal',
    'centre de fitness'
  ],
  authors: [{ name: 'Dabakh Fitness Wellness Club' }],
  creator: 'Dabakh Fitness',
  publisher: 'Dabakh Fitness Wellness Club',
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    url: 'https://dabakh-fitness-wellness.vercel.app',
    siteName: 'Dabakh Fitness Wellness Club',
    title: 'Dabakh Fitness - Salle de Sport Premium à Sacré Cœur 3 Dakar',
    description: 'La meilleure salle de sport de Dakar. Musculation, boxe, cardio avec coaching IA. 500+ membres satisfaits.',
    images: [
      {
        url: 'https://dabakh-fitness-wellness.vercel.app/images/og-dabakh.jpg',
        width: 1200,
        height: 630,
        alt: 'Dabakh Fitness Wellness Club - Salle de Sport Dakar',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dabakh Fitness - Salle de Sport Premium à Dakar',
    description: 'Rejoignez 500+ membres à Dabakh Fitness. Musculation, boxe, cardio avec coaching IA.',
    images: ['https://dabakh-fitness-wellness.vercel.app/images/og-dabakh.jpg'],
    creator: '@dabakhfitness1',
  },
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/logo-dabakh.png',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://dabakh-fitness-wellness.vercel.app',
    languages: {
      'fr-SN': 'https://dabakh-fitness-wellness.vercel.app',
      'fr': 'https://dabakh-fitness-wellness.vercel.app',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* LocalBusiness Schema - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HealthAndBeautyBusiness',
              '@id': 'https://dabakh-fitness-wellness.vercel.app',
              name: 'Dabakh Fitness Wellness Club',
              description: 'Salle de sport premium à Sacré Cœur 3 Dakar avec musculation, boxe, cardio et coaching IA',
              url: 'https://dabakh-fitness-wellness.vercel.app',
              telephone: '+221775323725',
              areaServed: {
                '@type': 'City',
                name: 'Dakar',
                'addressCountry': 'SN'
              },
              priceRange: '$$',
              image: 'https://dabakh-fitness-wellness.vercel.app/images/logo-dabakh.png',
              logo: 'https://dabakh-fitness-wellness.vercel.app/images/logo-dabakh.png',
              sameAs: [
                'https://maps.app.goo.gl/BAVYB8i4dUwGWnss7',
                'https://www.facebook.com/share/1AWZq5noZP/',
                'https://www.instagram.com/dabakh_fitnesswellnessclub?igsh=MWQ4NWk2d21kMWN6eQ=='
              ],
              hasMap: 'https://maps.app.goo.gl/BAVYB8i4dUwGWnss7',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Abonnements Dabakh Fitness',
                itemListElement: [
                  { name: 'Pack Starter - 1er mois', price: '25000' },
                  { name: 'Pack Silver - 3 mois', price: '45000' },
                  { name: 'Pack Gold - 6 mois', price: '100000' },
                  { name: 'Pack Premium - 12 mois', price: '150000' },
                  { name: 'Seance decouverte', price: '2000' },
                  { name: 'Boxe / Taekwondo enfant - mensualite', price: '15000' },
                  { name: 'Boxe / Taekwondo adulte - mensualite', price: '20000' },
                ].map((offer) => ({
                  '@type': 'Offer',
                  name: offer.name,
                  price: offer.price,
                  priceCurrency: 'XOF',
                  availability: 'https://schema.org/InStock',
                })),
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '07:00',
                  closes: '22:30',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '09:00',
                  closes: '21:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Sunday',
                  opens: '10:00',
                  closes: '15:00',
                },
              ],
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '14.7234638',
                longitude: '-17.4739456'
              }
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Dabakh Fitness Wellness Club',
              url: 'https://dabakh-fitness-wellness.vercel.app',
              logo: 'https://dabakh-fitness-wellness.vercel.app/images/logo-dabakh.png',
              description: 'Meilleure salle de sport de Dakar - Musculation, Boxe, Cardio, Coaching IA',
              telephone: '+221775323725',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '10355 Rue MZ 05',
                addressLocality: 'Dakar',
                addressRegion: 'Dakar',
                postalCode: '',
                addressCountry: 'SN'
              },
              sameAs: [
                'https://www.facebook.com/share/1AWZq5noZP/',
                'https://www.instagram.com/dabakh_fitnesswellnessclub?igsh=MWQ4NWk2d21kMWN6eQ==',
                'https://www.tiktok.com/@dabakhfitness1'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                telephone: '+221775323725',
                availableLanguage: ['fr', 'en']
              }
            }),
          }}
        />

        {/* FAQ Schema - questions reellement posees au coach IA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'La premiere seance est-elle gratuite ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Non. La seance decouverte coute 2 000 FCFA et donne acces a l'ensemble de la salle pour la journee.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Quels sont les horaires de la salle ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Du lundi au vendredi de 07h00 a 22h30, le samedi de 09h00 a 21h00 et le dimanche de 10h00 a 15h00.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Combien coute un abonnement ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "La mensualite musculation et cardio est a 20 000 FCFA, avec 5 000 FCFA d'inscription. Des packs de 3, 6 et 12 mois sont disponibles a partir de 45 000 FCFA.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Ou se trouve Dabakh Fitness Wellness Club ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'A Sacre Coeur 3, VDN Villa 16, derriere la residence Mamoune, a Dakar au Senegal.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Y a-t-il un engagement de duree ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "Non, aucun engagement de longue duree. L'abonnement peut etre arrete a tout moment.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Proposez-vous des cours de boxe et de taekwondo ?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Oui, pour les enfants a 15 000 FCFA par mois et pour les adultes a 20 000 FCFA par mois, avec un coaching technique assure par des coachs certifies.',
                  },
                },
              ],
            }),
          }}
        />

        {/* WebSite Schema for Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Dabakh Fitness Wellness Club',
              url: 'https://dabakh-fitness-wellness.vercel.app',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://dabakh-fitness-wellness.vercel.app?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              }
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <PwaRegister />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
