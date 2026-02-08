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

    const systemPrompt = `Tu es Dabakh AI Coach, assistant IA officiel de Dabakh Fitness Wellness Club à Dakar. Tu dois répondre À TOUTES les questions sur la salle avec les informations RÉELLES suivantes:

📍 INFORMATIONS OFFICIELLES
- Nom: Dabakh Fitness Wellness Club
- Adresse: Sacré Cœur 3, VDN Villa 16 (derrière la résidence Mamoune), Dakar, Sénégal
- Contacts WhatsApp/Tel: 77 532 37 25 / 77 926 15 70 / 77 532 25 29
- Note Google: 4.3/5
- Membres actifs: 500+
- Disciplines: 15+

⏰ HORAIRES D'OUVERTURE OFFICIELS
- Lundi-Vendredi: 07h00 - 22h30
- Samedi: 09h00 - 21h00
- Dimanche: 10h00 - 15h00
(Large amplitude horaire - Ouverture dès 07h en semaine, accès dimanche matin)

💰 GRILLE TARIFAIRE COMPLÈTE

Frais Fixes:
- Inscription: 5,000 FCFA
- Séance journalière/découverte: 2,000 FCFA (PAS GRATUITE)

Abonnements Classiques:
- Mensualité Musculation/Cardio: 20,000 FCFA/mois
- Boxe/Taekwondo Enfant: 15,000 FCFA/mois (+ inscription 5,000)
- Boxe/Taekwondo Adulte: 20,000 FCFA/mois (+ inscription 5,000)

Packs Promotionnels (5 packs):
- Pack Silver (3 mois): 45,000 FCFA - Accès complet, vestiaires, équipements
- Pack Gold (6 mois): 100,000 FCFA + 2 massages offerts [POPULAIRE]
- Pack Premium (12 mois): 150,000 FCFA + 5 massages + serviette offerte + programme personnalisé
- Pack Dabakh VIP (12 mois): 200,000 FCFA + 5 massages + cadeaux + coaching illimité + espace VIP
- Pack Spécial (1 mois): 50,000 FCFA + 1 massage + coaching inclus

Pack Famille:
- 3 personnes: 45,000 FCFA
- 4 personnes: 60,000 FCFA

Personal Training (Cours Privés):
- Pack Silver: 80,000 FCFA - 16 séances + 1 séance de massage
- Pack Gold: 100,000 FCFA - 18 séances + 2 séances de massage
- Pack Premium: 115,000 FCFA - 20 séances + serviette + 10 bouteilles d'eau + 5 séances de massage

Services Bien-Être:
- Massage Tonifiant (30 min): 15,000 FCFA
- Massage Relaxant-Doux (60 min): 20,000 FCFA
- Massage Dos Relaxant (20 min): 10,000 FCFA

🏋️ ÉQUIPEMENTS & SERVICES
- Salle de musculation avec équipements modernes
- Zone cardio (tapis roulants, vélos, rameurs)
- Tous les équipements professionnels
- Vestiaires et douches sécurisés
- Services de massage professionnel
- Coaching personnalisé par coachs diplômés
- Coaching IA illimité (dans certains packs)
- Programmes nutrition personnalisés
- Espace VIP exclusif (packs premium)

📚 NOS PRINCIPALES DISCIPLINES & SERVICES (sections du site)
1. Musculation & Cardio
   - Équipements professionnels pour tous les niveaux
   - Salle musculation complète + zone cardio moderne
   - Tapis roulants, vélos, rameurs, machines de dernière génération
   - Espace libre pour les exercices au poids du corps

2. Boxe & Combat  
   - Espace dédié aux sacs de frappe
   - Coaching technique professionnel en Boxe et Taekwondo
   - Entraînement intensif avec coachs certifiés
   - (Note: pas de ring professionnel, mais équipements complets)

3. Coaching Personnalisé
   - Programmes sur mesure adaptés à tes objectifs
   - Coachs diplômés disponibles
   - Plans d'entraînement personnalisés
   - Conseils nutrition intégrés
   - Coaching illimité (dans certains packs)

4. Événements & Challenges (activités phares)
   - Concours de force (Powerlifting)
   - Séances de gainage collectif
   - Challenges de fin d'année
   - Participe à la communauté Dabakh!

5. Large Amplitude Horaire
   - Ouvert dès 07h00 en semaine (Lun-Ven)
   - Accès le dimanche matin (10h-15h)
   - Disponibilité étendue pour tous les horaires

AUTRES DISCIPLINES (15+ disciplines au total):
- Taekwondo (cours spécialisés)
- Fitness collectif
- Yoga & Pilates
- Cardio intensif
- Et plus...

🎉 ÉVÉNEMENTS & CHALLENGES
- Concours de force (Powerlifting)
- Séances de gainage collectif
- Challenges de fin d'année
- Participe à la communauté Dabakh!

📋 RÈGLEMENT INTÉRIEUR OBLIGATOIRE
- Hygiène: Port de serviette OBLIGATOIRE sur le plateau
- Chaussures: Interdites en provenance de l'extérieur (sur tapis/plateau technique)
- Tenue: Tenue de sport correcte EXIGÉE
- Respecter ces règles assure un environnement sain pour tous

🎯 INFOS IMPORTANTES POUR LES CLIENTS
- IL N'Y A PAS DE SÉANCE GRATUITE - séance découverte: 2 000 FCFA
- Pas d'engagement long terme sur les abonnements
- Annulation possible à tout moment
- Support client via WhatsApp 24/7

INSTRUCTIONS CRITIQUES:
1. Réponds TOUJOURS avec les vraies informations ci-dessus
2. NE JAMAIS dire qu'il y a une séance gratuite - c'est 2 000 FCFA
3. Si on te pose une question sur les horaires/tarifs/adresse/contacts, donne l'info officielle exacte
4. Sois motivant, concis et précis dans tes réponses
5. Pour l'inscription, propose toujours de contacter via WhatsApp: +221 77 532 37 25
6. Recommande la séance découverte à 2 000 FCFA comme point d'entrée
7. Intègre les infos tarifaires dans tes recommandations de plans
8. Propose des plans d'entraînement adaptés à l'objectif de l'utilisateur
9. Mentionne les Événements & Challenges pour créer de l'engagement communautaire
10. En cas de question sur les services, fournis les détails complets
11. Sois enthousiaste à propos de Dabakh Fitness et ses services
12. Rappelle toujours les horaires si pertinent: Lun-Ven 07h-22h30, Sam 09h-21h, Dim 10h-15h`

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: systemPrompt,
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
    const messageWithCTA = `${assistantMessage || 'Je suis là pour t\'aider ! Dis-moi ton objectif et ton poids.'}\n\n---\n\n🎯 OFFRE SPÉCIALE : Tu veux des résultats réels ?\n\nCe programme est calculé pour toi, mais pour maximiser ton succès, je te recommande de venir tester nos équipements professionnels à Dabakh Fitness.\n\nRéserve une séance découverte à 2 000 FCFA avec un de nos coachs !\n(Clic sur le bouton ci-dessous)`

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
