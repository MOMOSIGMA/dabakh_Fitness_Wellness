import { NextRequest, NextResponse } from 'next/server'

const MANAGER_PHONE = '+221771463012' // Numéro du gérant Dabakh Fitness

export async function POST(request: NextRequest) {
  try {
    const { messageHistory, userContext } = await request.json()

    if (!messageHistory || messageHistory.length === 0) {
      return NextResponse.json(
        { error: 'Historique de messages vide' },
        { status: 400 }
      )
    }

    // Construire le résumé de la conversation
    const userMessage = messageHistory.find((m: any) => m.role === 'user')?.content || 'Pas de détails'
    const aiAdvice = messageHistory.find((m: any) => m.role === 'assistant')?.content || 'Consultation personnalisée'

    // Créer le message WhatsApp avec le résumé
    const whatsappMessage = encodeURIComponent(
      `Bonjour Dabakh Fitness ! 🏋️\n\n` +
      `Votre IA Coach m'a analysé et m'a conseillé :\n\n` +
      `📊 Mon demande : ${userMessage.slice(0, 100)}...\n\n` +
      `💡 Conseil reçu : ${aiAdvice.slice(0, 150)}...\n\n` +
      `✅ Je souhaite réserver une séance d'essai GRATUITE !\n` +
      `Merci d'avoir créé ce site intelligent 🙌`
    )

    // Lien WhatsApp pré-rempli
    const whatsappLink = `https://wa.me/${MANAGER_PHONE.replace('+', '')}?text=${whatsappMessage}`

    return NextResponse.json({
      whatsappLink,
      message: `Message WhatsApp prêt ! Clique pour contacter le manager.`,
      phone: MANAGER_PHONE,
    })
  } catch (error) {
    console.error('WhatsApp Link Error:', error)
    return NextResponse.json(
      { error: 'Erreur génération lien WhatsApp' },
      { status: 500 }
    )
  }
}
