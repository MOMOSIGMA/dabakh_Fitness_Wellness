import { NextRequest, NextResponse } from 'next/server'

const MANAGER_PHONE = '+221775323725' // ✅ Numéro officiel Dabakh Fitness

export async function POST(request: NextRequest) {
  try {
    const { messageHistory, userContext } = await request.json()

    if (!messageHistory || messageHistory.length === 0) {
      return NextResponse.json(
        { error: 'Historique de messages vide' },
        { status: 400 }
      )
    }

    // Construire le résumé de la conversation - Détaillé et structuré
    const userMessage = messageHistory.find((m: any) => m.role === 'user')?.content || 'Pas de détails'
    const aiAdvice = messageHistory.find((m: any) => m.role === 'assistant')?.content || 'Consultation personnalisée'

    // Nettoyer et limiter à une longueur raisonnable
    const cleanUserMessage = userMessage.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim().slice(0, 150)
    const cleanAiAdvice = aiAdvice.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim().slice(0, 200)

    // Créer le message WhatsApp - DÉTAILLÉ et STRUCTURÉ
    const whatsappMessage = encodeURIComponent(
      `Bonjour Dabakh Fitness!\n` +
      `Je souhaite reserver une seance decouverte (2 000 FCFA).\n\n` +
      `L'IA Coach m'a analyse et conseille de venir tester vos equipements.\n\n` +
      `--- Details de ma demande ---\n` +
      `${cleanUserMessage}\n\n` +
      `--- Conseil du Coach IA ---\n` +
      `${cleanAiAdvice}\n\n` +
      `Quels jours et horaires sont disponibles pour commencer?\n` +
      `Merci!`
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
