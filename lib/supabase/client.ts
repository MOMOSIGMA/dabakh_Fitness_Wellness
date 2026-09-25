import {
  createClient as createSupabaseClient,
  type SupabaseClient,
} from '@supabase/supabase-js'

/**
 * Renvoie null quand la configuration Supabase est absente.
 *
 * L'espace client n'est pas active : ses variables ne sont declarees que dans
 * le `.env.local` local, pas sur Vercel. Construire le client sans elles levait
 * `supabaseUrl is required` au prerendu de /account, et faisait echouer le
 * build entier -- donc le deploiement de tout le site vitrine avec lui.
 *
 * Les pages appelantes doivent traiter le cas null.
 */
export function createClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const cle = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !cle) return null
  return createSupabaseClient(url, cle)
}
