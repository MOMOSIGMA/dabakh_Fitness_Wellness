import { NextRequest, NextResponse } from 'next/server'

const MANAGER_PHONE = '+221775323725'

export async function POST(request: NextRequest) {
  try {
    const { planName, price, features } = await request.json()

    if (!planName) {
      return NextResponse.json(
        { error: 'Plan name required' },
        { status: 400 }
      )
    }

    // Message WhatsApp pré-rempli pour les abonnements - DÉTAILLÉ
    const cleanFeatures = features
      .map((f: string) => f.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim())
      .filter((f: string) => f.length > 0)
      .map((f: string, idx: number) => `${idx + 1}. ${f}`)
      .join('\n')

    const whatsappMessage = encodeURIComponent(
      `Bonjour Dabakh Fitness!\n` +
      `Je suis interesse par l'abonnement ${planName}.\n\n` +
      `Prix: ${price} FCFA\n\n` +
      `Avantages de ce pack:\n${cleanFeatures}\n\n` +
      `Je souhaite m'abonner ou avoir plus d'informations sur ce pack.\n` +
      `Pouvez-vous me contacter pour finaliser l'inscription?\n` +
      `Merci!`
    )

    const whatsappLink = `https://wa.me/${MANAGER_PHONE.replace('+', '')}?text=${whatsappMessage}`

    return NextResponse.json({
      whatsappLink,
      message: `Redirection vers WhatsApp...`,
    })
  } catch (error) {
    console.error('Subscription WhatsApp Error:', error)
    return NextResponse.json(
      { error: 'Erreur génération lien WhatsApp' },
      { status: 500 }
    )
  }
}
