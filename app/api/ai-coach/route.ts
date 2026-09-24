import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

// llama-3.3-70b-versatile a ete retire par Groq : c est ce qui cassait le bot.
// Groq decommissionne ses modeles regulierement. Surchargeable par variable
// d'environnement pour en changer sans toucher au code.
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b'

// Garde-fous : la route est publique et facturee a l appel.
const MAX_MESSAGE_LENGTH = 500
const MAX_HISTORY_MESSAGES = 10
const MAX_HISTORY_CONTENT = 1000
const RATE_LIMIT_MAX = 10
const RATE_LIMIT_WINDOW_MS = 60_000

type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

// Limitation par IP, en memoire. Chaque instance serverless a la sienne, donc la limite
// reelle est un multiple de RATE_LIMIT_MAX ; suffisant contre le bouclage simple.
// A remplacer par un store partage (Upstash) si l abus persiste.
const hits = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    if (hits.size > 5000) {
      for (const [key, value] of hits) {
        if (now > value.resetAt) hits.delete(key)
      }
    }
    return false
  }

  entry.count += 1
  return entry.count > RATE_LIMIT_MAX
}

// Le client envoyait son historique tel quel dans le tableau messages : un visiteur
// pouvait y glisser un message role:'system' et reecrire entierement le prompt.
// On ne garde que user/assistant, tronques et plafonnes.
function sanitizeHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) return []

  return history
    .filter((item): item is { role: string; content: string } =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as { content?: unknown }).content === 'string' &&
      ((item as { role?: unknown }).role === 'user' ||
        (item as { role?: unknown }).role === 'assistant')
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((item) => ({
      role: item.role as 'user' | 'assistant',
      content: item.content.slice(0, MAX_HISTORY_CONTENT),
    }))
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          message:
            'Tu vas un peu vite ! Laisse-moi souffler quelques secondes, puis réessaye. Pour une réponse immédiate, un coach est joignable sur WhatsApp.',
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const rawMessage = body?.message
    const history = body?.history
    const apiKey = process.env.GROQ_API_KEY

    if (typeof rawMessage !== 'string' || rawMessage.trim().length === 0) {
      return NextResponse.json(
        { message: 'Écris-moi ta question et je te réponds.' },
        { status: 400 }
      )
    }

    const message = rawMessage.slice(0, MAX_MESSAGE_LENGTH)

    if (!apiKey) {
      return NextResponse.json(
        { message: 'Clé Groq manquante. Ajoute GROQ_API_KEY dans .env.local.' },
        { status: 500 }
      )
    }

    const systemPrompt = `Tu es Dabakh AI Coach, assistant IA officiel de Dabakh Fitness Wellness Club à Dakar. Tu dois répondre À TOUTES les questions sur la salle avec les informations RÉELLES suivantes:

INFORMATIONS OFFICIELLES
- Nom: Dabakh Fitness Wellness Club
- Adresse: Sacré Cœur 3, VDN Villa 16 (derrière la résidence Mamoune), Dakar, Sénégal
- Lien Google Maps: https://maps.app.goo.gl/BAVYB8i4dUwGWnss7
- Contacts WhatsApp/Tel: 77 532 37 25 / 77 926 15 70 / 77 532 25 29
- Note Google: 4.3/5
- Membres actifs: 500+
- Disciplines: 15+

IMPORTANT: Si quelqu'un demande la localisation, l'adresse ou "comment venir", TOUJOURS inclure le lien Google Maps cliquable dans ta réponse.

HORAIRES D'OUVERTURE OFFICIELS
- Lundi-Vendredi: 07h00 - 22h30
- Samedi: 09h00 - 21h00
- Dimanche: 10h00 - 15h00
(Large amplitude horaire - Ouverture dès 07h en semaine, accès dimanche matin)

GRILLE TARIFAIRE COMPLÈTE

Frais Fixes:
- Inscription: 5,000 FCFA
- Séance journalière/découverte: 2,000 FCFA (PAS GRATUITE)

Abonnements Classiques:
- Abonnement mensuel: 25,000 FCFA le 1er mois (inscription 5,000 comprise), puis 20,000 FCFA/mois
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

ÉQUIPEMENTS & SERVICES
- Salle de musculation avec équipements modernes
- Zone cardio (tapis roulants, vélos, rameurs)
- Tous les équipements professionnels
- Vestiaires et douches sécurisés
- Services de massage professionnel
- Coaching personnalisé par coachs diplômés
- Coaching IA illimité (dans certains packs)
- Programmes nutrition personnalisés
- Espace VIP exclusif (packs premium)

NOS PRINCIPALES DISCIPLINES & SERVICES (sections du site)
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

NOS COACHS SPÉCIALISÉS
- Coach Moussa (Musculation & Préparation physique)
- Coach Achille (Musculation & Grit Force) - TikTok: https://vt.tiktok.com/ZSmJ2CUTT/
- Coach Top (Circuit Training & Cardio) - TikTok: https://vt.tiktok.com/ZSmJ2BQaE/
- Coach Lamine Bara Diouf (Fitness & Personal Training) - TikTok: https://vt.tiktok.com/ZSmJ2c5gj/
- Coach Amet (Fitness & Musculation)
- Un coach dédié à la Boxe et un coach dédié au Taekwondo encadrent les cours combat

INSTRUCTIONS COACHS:
- Lorsqu'un utilisateur demande un conseil sportif, mentionne le coach spécialisé par son nom pour créer un lien humain
- Exemple: "Pour ce type d'exercice, n'hésite pas à solliciter Coach Achille lors de ta visite!"
- Recommande les coachs selon le domaine: cardio→Coach Top, musculation→Coach Moussa, Coach Achille ou Coach Amet, perso→Coach Lamine, boxe et taekwondo→les coachs des cours combat

AUTRES DISCIPLINES (15+ disciplines au total):
- Taekwondo (cours spécialisés)
- Fitness collectif
- Yoga & Pilates
- Cardio intensif
- Et plus...

ÉVÉNEMENTS & CHALLENGES
- Concours de force (Powerlifting)
- Séances de gainage collectif
- Challenges de fin d'année
- Participe à la communauté Dabakh!

RÈGLEMENT INTÉRIEUR OBLIGATOIRE
- Hygiène: Port de serviette OBLIGATOIRE sur le plateau
- Chaussures: Interdites en provenance de l'extérieur (sur tapis/plateau technique)
- Tenue: Tenue de sport correcte EXIGÉE
- Respecter ces règles assure un environnement sain pour tous

INFOS IMPORTANTES POUR LES CLIENTS
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
12. AUCUN EMOJI, jamais, dans aucune reponse. Ni en debut de phrase, ni en
    puce, ni en decoration. Le site n en utilise aucun.
13. FORMAT DE REPONSE : ecris en texte simple. Pas de titres Markdown (###),
    pas de gras (**), pas de separateurs (---), pas de liens Markdown : ecris
    les URL en clair. La bulle de chat n'interprete pas le Markdown.
14. LONGUEUR : 6 phrases maximum, sauf si on te demande explicitement un
    programme d'entrainement detaille.
15. Rappelle toujours les horaires si pertinent: Lun-Ven 07h-22h30, Sam 09h-21h, Dim 10h-15h`

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...sanitizeHistory(history),
      { role: 'user', content: message },
    ]

    const groqResponse = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    })

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text()

      // Groq expose un code machine exploitable dans error.code
      let groqCode = ''
      try {
        groqCode = JSON.parse(errorText)?.error?.code || ''
      } catch {
        groqCode = ''
      }

      console.error(
        `[ai-coach] Groq ${groqResponse.status}` +
          (groqCode ? ` code=${groqCode}` : '') +
          ` model=${GROQ_MODEL} :: ${errorText.slice(0, 400)}`
      )

      const indispo =
        'Le coach IA est momentanément indisponible. Contacte un coach sur WhatsApp, il te répondra tout de suite.'
      let friendlyMessage = indispo

      if (groqResponse.status === 429) {
        // Quota reellement atteint
        friendlyMessage =
          'Je suis très sollicité en ce moment. Réessaye dans quelques secondes, ou contacte directement un coach sur WhatsApp.'
      } else if (groqResponse.status === 400 || groqResponse.status === 404) {
        // Presque toujours un modele retire par Groq, PAS un depassement de quota.
        // Confondre les deux rendait la panne indiagnostiquable.
        console.error(
          `[ai-coach] Verifier que le modele "${GROQ_MODEL}" existe encore. ` +
            'Lister les modeles : curl -s https://api.groq.com/openai/v1/models ' +
            '-H "Authorization: Bearer $GROQ_API_KEY"'
        )
      } else if (groqResponse.status === 401 || groqResponse.status === 403) {
        console.error(
          "[ai-coach] Cle GROQ_API_KEY invalide, revoquee, ou absente de l'environnement. " +
            'Sur Vercel, un redeploiement est necessaire apres avoir ajoute ou modifie la variable.'
        )
      } else if (groqResponse.status >= 500) {
        friendlyMessage =
          'Le service est momentanément perturbé. Réessaye dans une minute, ou contacte un coach sur WhatsApp.'
      }

      return NextResponse.json(
        { message: friendlyMessage },
        { status: groqResponse.status || 502 }
      )
    }

    const data = await groqResponse.json()
    const assistantMessage = data?.choices?.[0]?.message?.content

    // Ajouter CTA après conseils - Transformation en vendeur automatique
    const messageWithCTA = `${assistantMessage || 'Je suis là pour t\'aider ! Dis-moi ton objectif et ton poids.'}

Pour aller plus loin, la séance découverte est à 2 000 FCFA : tu testes la salle et les équipements avant de choisir ton abonnement.`

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
