import { NextRequest, NextResponse } from 'next/server'
import {
  deleteReview,
  getAllReviews,
  reviewsEnabled,
  setReviewStatus,
} from '@/lib/reviews'

export const dynamic = 'force-dynamic'

/**
 * Moderation des avis, protegee par un jeton partage.
 *
 * Solution d'attente : l'ecran de moderation a sa place dans le projet
 * Management. En attendant, ces deux routes permettent au gerant de publier
 * ou supprimer un avis sans passer par la console Upstash.
 */
function authorize(request: NextRequest): boolean {
  const expected = process.env.REVIEWS_ADMIN_TOKEN
  if (!expected) return false

  const header = request.headers.get('authorization') || ''
  const provided = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (provided.length !== expected.length) return false

  // Comparaison a temps constant : evite de reveler le jeton caractere
  // par caractere via le temps de reponse.
  let diff = 0
  for (let i = 0; i < expected.length; i += 1) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return diff === 0
}

/** Liste tous les avis, en attente comme publies. */
export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 })
  }
  if (!reviewsEnabled()) {
    return NextResponse.json({ error: 'Stockage non configure' }, { status: 503 })
  }

  const reviews = await getAllReviews()
  return NextResponse.json({
    total: reviews.length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    reviews,
  })
}

/** Publie ou supprime un avis. Corps attendu : { id, action: 'approve' | 'reject' | 'delete' }. */
export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 })
  }
  if (!reviewsEnabled()) {
    return NextResponse.json({ error: 'Stockage non configure' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requete invalide' }, { status: 400 })
  }

  const { id, action } = (body ?? {}) as Record<string, unknown>

  if (typeof id !== 'string' || !id) {
    return NextResponse.json({ error: 'Identifiant manquant' }, { status: 400 })
  }

  if (action === 'delete') {
    const ok = await deleteReview(id)
    return ok
      ? NextResponse.json({ success: true, action: 'delete', id })
      : NextResponse.json({ error: 'Avis introuvable' }, { status: 404 })
  }

  if (action === 'approve' || action === 'reject') {
    const review = await setReviewStatus(id, action === 'approve' ? 'approved' : 'pending')
    return review
      ? NextResponse.json({ success: true, action, review })
      : NextResponse.json({ error: 'Avis introuvable' }, { status: 404 })
  }

  return NextResponse.json(
    { error: "action doit valoir 'approve', 'reject' ou 'delete'" },
    { status: 400 }
  )
}
