/**
 * Stockage des avis sur Upstash Redis.
 *
 * Pourquoi Redis et pas une base classique : l'offre gratuite de Supabase met un
 * projet en pause apres 7 jours sans activite, ce qui est redhibitoire pour un
 * site vitrine qui peut rester des semaines sans ecriture. Upstash facture a la
 * requete au lieu d'heberger un serveur qui dort : il n'y a rien a mettre en pause.
 *
 * On passe par l'API REST plutot que par le SDK : une simple requete fetch,
 * aucune dependance ajoutee au projet.
 */

export type ReviewStatus = 'pending' | 'approved'

export type Review = {
  id: string
  name: string
  rating: number
  comment: string
  createdAt: string
  status: ReviewStatus
}

const HASH_KEY = 'dabakh:reviews'

function config() {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return { url: url.replace(/\/+$/, ''), token }
}

/** Le stockage est-il configure ? Permet au site de fonctionner sans, en degrade. */
export function reviewsEnabled(): boolean {
  return config() !== null
}

async function command<T = unknown>(args: (string | number)[]): Promise<T | null> {
  const cfg = config()
  if (!cfg) return null

  try {
    const response = await fetch(cfg.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args.map(String)),
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error(`[reviews] Upstash ${response.status} :: ${(await response.text()).slice(0, 300)}`)
      return null
    }

    const data = await response.json()
    return (data?.result ?? null) as T
  } catch (error) {
    console.error('[reviews] Upstash injoignable :', error)
    return null
  }
}

/**
 * Lit tous les avis. HGETALL renvoie un tableau plat [champ, valeur, champ, valeur...].
 * Les entrees illisibles sont ignorees plutot que de faire echouer la lecture entiere.
 */
export async function getAllReviews(): Promise<Review[]> {
  const flat = await command<string[]>(['HGETALL', HASH_KEY])
  if (!Array.isArray(flat)) return []

  const reviews: Review[] = []
  for (let i = 1; i < flat.length; i += 2) {
    try {
      const parsed = JSON.parse(flat[i]) as Review
      if (parsed && typeof parsed.id === 'string') reviews.push(parsed)
    } catch {
      // entree corrompue : on l'ignore
    }
  }

  return reviews.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

/** Avis publies uniquement : c'est ce que voit le visiteur. */
export async function getApprovedReviews(): Promise<Review[]> {
  return (await getAllReviews()).filter((r) => r.status === 'approved')
}

export async function saveReview(review: Review): Promise<boolean> {
  const result = await command(['HSET', HASH_KEY, review.id, JSON.stringify(review)])
  return result !== null
}

export async function setReviewStatus(
  id: string,
  status: ReviewStatus
): Promise<Review | null> {
  const raw = await command<string>(['HGET', HASH_KEY, id])
  if (!raw) return null

  try {
    const review = JSON.parse(raw) as Review
    review.status = status
    const ok = await saveReview(review)
    return ok ? review : null
  } catch {
    return null
  }
}

export async function deleteReview(id: string): Promise<boolean> {
  const result = await command<number>(['HDEL', HASH_KEY, id])
  return result === 1
}

/**
 * Limitation de debit cote Redis plutot qu'en memoire : chaque instance
 * serverless a sa propre memoire, un compteur partage est donc le seul
 * qui compte reellement les soumissions.
 */
export async function isSubmissionAllowed(ip: string, maxPerDay = 3): Promise<boolean> {
  const cfg = config()
  if (!cfg) return true

  const key = `dabakh:reviews:rl:${ip}`
  const count = await command<number>(['INCR', key])
  if (count === null) return true
  if (count === 1) await command(['EXPIRE', key, 86400])
  return count <= maxPerDay
}

/** Moyenne et total, calcules sur les avis reellement publies. */
export function summarize(reviews: Review[]): { average: number; count: number } {
  if (reviews.length === 0) return { average: 0, count: 0 }
  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  return {
    average: Math.round((total / reviews.length) * 10) / 10,
    count: reviews.length,
  }
}
