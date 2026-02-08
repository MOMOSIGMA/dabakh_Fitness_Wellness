import { NextRequest, NextResponse } from 'next/server'

const MANAGER_PHONE = '+221771463012'

export async function POST(request: NextRequest) {
  try {
    const { planName, price, features } = await request.json()

    if (!planName) {
      return NextResponse.json(
        { error: 'Plan name required' },
        { status: 400 }
      )
    }

    // Message WhatsApp pré-rempli pour les abonnements
    const whatsappMessage = encodeURIComponent(
      `Bonjour Dabakh Fitness ! 🏋️\n\n` +
      `Je suis intéressé par l'abonnement *${planName}* (${price}/mois)\n\n` +
      `📋 Avantages :\n${features.map((f: string) => `• ${f}`).join('\n')}\n\n` +
      `✅ Je souhaite m'abonner ou avoir plus d'informations.\n` +
      `Pouvez-vous me contacter ? Merci ! 🙌`
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
