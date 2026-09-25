'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { LogOut, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  // useMemo : sans lui, un nouveau client serait construit a chaque rendu.
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    // Espace client non configure : la page n'a rien a montrer.
    if (!supabase) {
      router.push('/')
      return
    }

    async function getUser() {
      const { data: { user: currentUser } } = await supabase!.auth.getUser()
      
      if (!currentUser) {
        router.push('/login')
        return
      }
      
      setUser(currentUser)
      setLoading(false)
    }

    getUser()
  }, [router, supabase])

  const handleLogout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p>Accès non autorisé</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-red-950/20 pt-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-red-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour à l&apos;accueil
        </Link>

        {/* Account Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Mon Compte</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-blue-600 rounded-full"></div>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <p className="text-white text-lg break-all">{user.email}</p>
            </div>

            {/* User ID */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                ID Utilisateur
              </label>
              <p className="text-white text-sm font-mono break-all">{user.id}</p>
            </div>

            {/* Member Since */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Membre depuis
              </label>
              <p className="text-white text-lg">
                {new Date(user.created_at || '').toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Last Sign In */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Dernière connexion
              </label>
              <p className="text-white text-lg">
                {user.last_sign_in_at ? 
                  new Date(user.last_sign_in_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                  : 'N/A'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-12 flex gap-4">
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all hover:scale-105 active:scale-95"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
            
            <Link
              href="https://dabakh-management.vercel.app/client/progress"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-600/50 transition-all hover:scale-105 active:scale-95 text-center"
            >
              Mon Progression
            </Link>
          </div>

          {/* Info Message */}
          <p className="mt-8 text-center text-gray-400 text-sm">
            Accédez à votre tableau de bord complet sur{' '}
            <a
              href="https://dabakh-management.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 underline"
            >
              Dabakh Management
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
