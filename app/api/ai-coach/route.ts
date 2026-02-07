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
        model: 'llama-3.1-70b-versatile',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text()
      console.error('Groq API Error:', errorText)
      return NextResponse.json(
        { message: 'Erreur Groq API. Réessaie plus tard.' },
        { status: 502 }
      )
    }

    const data = await groqResponse.json()
    const assistantMessage = data?.choices?.[0]?.message?.content

    return NextResponse.json({
      message:
        assistantMessage ||
        'Je suis là pour t’aider ! Dis-moi ton objectif et ton poids.',
    })
  } catch (error) {
    console.error('AI Coach Error:', error)
    return NextResponse.json(
      { message: 'Erreur serveur. Réessaye plus tard.' },
      { status: 500 }
    )
  }
}
