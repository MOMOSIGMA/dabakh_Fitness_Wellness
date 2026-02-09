import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Dabakh Fitness Wellness Club - Meilleure Salle de Sport à Yoff Dakar, Sénégal',
  description: 'Dabakh Fitness: salle de sport premium à Yoff Dakar avec musculation, boxe, cardio, coaching IA, et 500+ membres. Équipements professionnels. Rejoignez-nous!',
  keywords: [
    'salle de sport Dakar',
    'gym Yoff',
    'fitness Sénégal',
    'musculation Dakar',
    'boxe Dakar',
    'coaching fitness',
    'salle de sport Yoff',
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
    title: 'Dabakh Fitness - Salle de Sport Premium à Yoff Dakar',
    description: 'La meilleure salle de sport de Dakar. Musculation, boxe, cardio avec coaching IA. 500+ membres satisfaits.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&q=80&fit=crop&auto=format',
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
    images: ['https://dabakh-fitness-wellness.vercel.app/images/logo-dabakh.png'],
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
              description: 'Salle de sport premium à Yoff Dakar avec musculation, boxe, cardio et coaching IA',
              url: 'https://dabakh-fitness-wellness.vercel.app',
              telephone: '+221775323725',
              areaServed: {
                '@type': 'City',
                name: 'Dakar',
                'addressCountry': 'SN'
              },
              priceRange: '$$',
              image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=630&q=80&fit=crop&auto=format',
              logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&q=80&fit=crop&auto=format',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.3',
                reviewCount: '150',
                bestRating: '5',
                worstRating: '1'
              },
              sameAs: [
                'https://maps.app.goo.gl/BAVYB8i4dUwGWnss7',
                'https://www.facebook.com/share/1AWZq5noZP/',
                'https://www.instagram.com/dabakh_fitnesswellnessclub?igsh=MWQ4NWk2d21kMWN6eQ=='
              ],
              hasMap: 'https://maps.app.goo.gl/BAVYB8i4dUwGWnss7',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '14.7500',
                longitude: '-17.5000'
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
              logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&q=80',
              description: 'Meilleure salle de sport de Dakar - Musculation, Boxe, Cardio, Coaching IA',
              telephone: '+221775323725',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Yoff',
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
        <Navbar />
        {children}
      </body>
    </html>
  )
}
