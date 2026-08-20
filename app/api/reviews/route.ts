import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import {
  getApprovedReviews,
  isSubmissionAllowed,
  reviewsEnabled,
  saveReview,
  summarize,
  type Review,
} from '@/lib/reviews'

export const dynamic = 'force-dynamic'

const NAME_MIN = 2
const NAME_MAX = 50
const COMMENT_MIN = 10
const COMMENT_MAX = 600

export async function GET() {
  const reviews = await getApprovedReviews()
  return NextResponse.json({
    reviews,
    ...summarize(reviews),
    enabled: reviewsEnabled(),
  })
}

export async function POST(request: NextRequest) {
  if (!reviewsEnabled()) {
    console.error(
      '[reviews] UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN absents de l environnement.'
    )
    return NextResponse.json(
      { error: 'Les avis ne sont pas encore actifs. Reviens bientot !' },
      { status: 503 }
    )
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  if (!(await isSubmissionAllowed(ip))) {
    return NextResponse.json(
      { error: 'Tu as deja laisse plusieurs avis aujourd hui. Merci !' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requete invalide.' }, { status: 400 })
  }

  const { name, rating, comment } = (body ?? {}) as Record<string, unknown>

  const cleanName = typeof name === 'string' ? name.trim() : ''
  const cleanComment = typeof comment === 'string' ? comment.trim() : ''
  const cleanRating = Number(rating)

  if (cleanName.length < NAME_MIN || cleanName.length > NAME_MAX) {
    return NextResponse.json(
      { error: `Ton nom doit faire entre ${NAME_MIN} et ${NAME_MAX} caracteres.` },
      { status: 400 }
    )
  }

  if (!Number.isInteger(cleanRating) || cleanRating < 1 || cleanRating > 5) {
    return NextResponse.json({ error: 'Choisis une note de 1 a 5 etoiles.' }, { status: 400 })
  }

  if (cleanComment.length < COMMENT_MIN || cleanComment.length > COMMENT_MAX) {
    return NextResponse.json(
      { error: `Ton avis doit faire entre ${COMMENT_MIN} et ${COMMENT_MAX} caracteres.` },
      { status: 400 }
    )
  }

  // Un lien dans un avis de salle de sport est un signal de spam quasi certain.
  if (/https?:\/\/|www\.|\[url|<a\s/i.test(cleanComment)) {
    return NextResponse.json(
      { error: 'Les liens ne sont pas acceptes dans les avis.' },
      { status: 400 }
    )
  }

  const review: Review = {
    id: crypto.randomUUID(),
    name: cleanName,
    rating: cleanRating,
    comment: cleanComment,
    createdAt: new Date().toISOString(),
    // Publication immediate, comme sur Google ou le Play Store : pas de compte
    // a creer, pas d'attente. Le gerant supprime a posteriori si besoin, via
    // /api/reviews/moderate. Les garde-fous conserves (longueur, refus des
    // liens, 3 avis/jour/IP) sont invisibles pour un visiteur normal et ne
    // bloquent que les robots.
    status: 'approved',
  }

  const saved = await saveReview(review)
  if (!saved) {
    return NextResponse.json(
      { error: 'Impossible d enregistrer ton avis pour le moment. Reessaye plus tard.' },
      { status: 502 }
    )
  }

  return NextResponse.json({
    success: true,
    message: 'Merci ! Ton avis est en ligne.',
  })
}
