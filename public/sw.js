/**
 * Service worker Dabakh Fitness.
 *
 * Strategie deliberement prudente : un service worker mal concu peut servir
 * une version perimee du site indefiniment, sans moyen simple de rattraper
 * les visiteurs concernes.
 *
 *   - Pages HTML  : reseau d'abord, cache en secours hors ligne.
 *   - API         : jamais mises en cache.
 *   - Assets Next : cache d'abord (leur nom contient un hachage, donc une
 *                   nouvelle version produit une nouvelle URL).
 *   - Images      : cache d'abord, avec repli reseau.
 *
 * Incrementer CACHE_VERSION invalide tout l'ancien cache au deploiement suivant.
 */

const CACHE_VERSION = 'v1'
const CACHE_NAME = `dabakh-${CACHE_VERSION}`
const OFFLINE_URL = '/'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([OFFLINE_URL]))
  )
  // Le nouveau worker prend la main des l'installation plutot que d'attendre
  // la fermeture de tous les onglets : evite qu'un visiteur reste bloque sur
  // une version ancienne.
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // Meme origine uniquement : on ne met jamais en cache un domaine tiers.
  if (url.origin !== self.location.origin) return

  // Les routes API doivent toujours frapper le reseau : le coach IA et les
  // avis renverraient sinon des reponses figees.
  if (url.pathname.startsWith('/api/')) return

  const isImmutableAsset =
    url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/images/')

  if (isImmutableAsset) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone()
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
            }
            return response
          })
      )
    )
    return
  }

  // Navigation : reseau d'abord, cache seulement si le reseau echoue.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(OFFLINE_URL, copy))
          }
          return response
        })
        .catch(() => caches.match(OFFLINE_URL).then((c) => c || Response.error()))
    )
  }
})
