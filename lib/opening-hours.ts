/**
 * Etat d'ouverture de la salle, calcule a partir des horaires officiels.
 *
 * Dakar est a UTC+0 toute l'annee, sans heure d'ete : un decalage fixe suffit
 * et le resultat est identique quel que soit le fuseau du visiteur.
 */

type Slot = { open: string; close: string }

/** Index 0 = dimanche, conformement a Date.getUTCDay(). */
const SCHEDULE: (Slot | null)[] = [
  { open: '10:00', close: '15:00' }, // dimanche
  { open: '07:00', close: '22:30' }, // lundi
  { open: '07:00', close: '22:30' }, // mardi
  { open: '07:00', close: '22:30' }, // mercredi
  { open: '07:00', close: '22:30' }, // jeudi
  { open: '07:00', close: '22:30' }, // vendredi
  { open: '09:00', close: '21:00' }, // samedi
]

const DAY_NAMES = [
  'dimanche',
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
]

export type OpeningStatus = {
  isOpen: boolean
  /** Phrase courte prete a afficher, ex. « ferme à 22h30 » ou « ouvre demain à 7h ». */
  detail: string
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** « 22:30 » → « 22h30 », « 07:00 » → « 7h ». */
function humanize(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`
}

/**
 * @param now Date de reference. Injectable pour rendre la fonction testable.
 */
export function getOpeningStatus(now: Date = new Date()): OpeningStatus {
  // Dakar = UTC+0 : les composantes UTC sont directement l'heure locale.
  const day = now.getUTCDay()
  const minutes = now.getUTCHours() * 60 + now.getUTCMinutes()
  const today = SCHEDULE[day]

  if (today) {
    const opensAt = toMinutes(today.open)
    const closesAt = toMinutes(today.close)

    if (minutes >= opensAt && minutes < closesAt) {
      return { isOpen: true, detail: `ferme à ${humanize(today.close)}` }
    }

    if (minutes < opensAt) {
      return { isOpen: false, detail: `ouvre à ${humanize(today.open)}` }
    }
  }

  // Ferme pour aujourd'hui : chercher la prochaine ouverture.
  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = (day + offset) % 7
    const slot = SCHEDULE[nextDay]
    if (!slot) continue

    const when = offset === 1 ? 'demain' : DAY_NAMES[nextDay]
    return { isOpen: false, detail: `ouvre ${when} à ${humanize(slot.open)}` }
  }

  return { isOpen: false, detail: 'horaires à confirmer' }
}
