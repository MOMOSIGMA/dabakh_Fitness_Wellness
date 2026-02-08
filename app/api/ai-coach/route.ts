import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()
    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { message: 'Clé Groq manquante. Ajoute GROQ_API_KEY dans .env.local.' },
        { status: 500 }
      )
    }

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content:
          'Tu es Dabakh AI Coach, coach sportif virtuel pour la salle Dabakh Fitness à Dakar. Donne des conseils personnalisés en musculation, cardio et nutrition. Sois motivant, concis et précis. Propose un plan simple et actionnable.',
      },
      ...(Array.isArray(history) ? history : []),
      { role: 'user', content: message },
    ]

    const groqResponse = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text()
      console.error('Groq API Error:', groqResponse.status, errorText)
      
      // Friendly error messages
      let friendlyMessage = ''
      
      if (groqResponse.status === 429 || groqResponse.status === 400) {
        // Token limit or rate limit exceeded
        friendlyMessage = '🤔 Je suis un peu fatigué en ce moment! L\'API Groq atteint sa limite. Réessaye dans quelques secondes. Les vrais coachs de Dabakh Fitness sont toujours là pour toi! Contacte-les sur WhatsApp. 💪'
      } else if (groqResponse.status === 401) {
        friendlyMessage = '❌ Problème d\'authentification avec l\'API. Le coach revient bientôt!'
      } else if (groqResponse.status === 500) {
        friendlyMessage = '⚠️ Le serveur Groq a un souci. Réessaye dans 1 minute, ou contacte un vrai coach sur WhatsApp! 📱'
      } else {
        friendlyMessage = `❌ Oups! Je n'arrive pas à te répondre. Réessaye ou contacte un coach sur WhatsApp.`
      }
      
      return NextResponse.json(
        { message: friendlyMessage },
        { status: groqResponse.status || 502 }
      )
    }

    const data = await groqResponse.json()
    const assistantMessage = data?.choices?.[0]?.message?.content

    // Ajouter CTA après conseils - Transformation en vendeur automatique
    const messageWithCTA = `${assistantMessage || 'Je suis là pour t\'aider ! Dis-moi ton objectif et ton poids.'}\n\n---\n\n🎯 OFFRE SPÉCIALE : Tu veux des résultats réels ?\n\nCe programme est calculé pour toi, mais pour maximiser ton succès, je te recommande de venir tester nos équipements professionnels à Dabakh Fitness.\n\nRéserve une séance d'essai GRATUITE avec un de nos coachs !\n(Clic sur le bouton ci-dessous)`

    return NextResponse.json({
      message: messageWithCTA,
      showBookingButton: true,
      userContext: {
        history: messages,
        lastMessage: message,
      }
    })
  } catch (error) {
    console.error('AI Coach Error:', error)
    return NextResponse.json(
      { message: 'Erreur serveur. Réessaye plus tard.' },
      { status: 500 }
    )
  }
}
