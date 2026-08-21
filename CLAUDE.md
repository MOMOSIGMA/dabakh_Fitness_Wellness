# Dabakh Fitness Wellness Club — site vitrine

Site d'une salle de sport à Dakar (Sénégal). Next.js 15, App Router, TypeScript,
Tailwind. Déployé sur Vercel.

Le public est majoritairement **sur téléphone, en 3G/4G**. C'est le critère qui
tranche la plupart des arbitrages : poids, temps de chargement, lisibilité en
petit écran.

## Commandes

```bash
npm run dev      # développement
npm run build    # build de production
npm run lint     # ESLint
npm run medias   # prépare les photos déposées dans _medias-bruts/
```

## Structure

Le site est **une seule page** composée de sections, plus des routes API.

`app/page.tsx` monte dans l'ordre : `HeroSection`, `DisciplinesSection`,
`GallerySection`, `PricingSection`, `PracticalInfoSection`, `CoachAvatars`,
`SouvenirsSection`, `ReviewsSection`, `Footer`, plus deux éléments flottants
(`WhatsAppButton`, `AICoachBot`).

Routes API : `/api/ai-coach`, `/api/reviews`, `/api/reviews/moderate`,
`/api/subscribe`, `/api/book-session`.

## Règles de conception

Ces règles viennent du client et ne sont pas négociables.

- **Aucun emoji**, nulle part : ni dans l'interface, ni dans les réponses du
  coach IA, ni dans les commentaires de code. Ils font amateur et signalent du
  contenu généré. Les flèches typographiques (`→`) sont admises.
- **Aucune animation en boucle infinie**, sauf l'indicateur de défilement du
  hero. Elles consomment de la batterie et trahissent le gabarit.
- **Palette : noir, blanc, rouge.** Un seul accent. Pas de dégradés bleus,
  verts ou violets ajoutés.
- **Pas d'image de remplacement ni de mention « bientôt disponible »** dans
  l'interface. Une section sans contenu s'affiche proprement sans le dire.
- `text-stroke` est un effet de signature : réservé au hero et au titre de la
  section tarifs. Ne pas l'étendre.
- Les textes visibles sont en **français accentué**. Écrire « déjà », pas
  « deja ».

## Pièges déjà rencontrés

**`.next` corrompu.** Enchaîner `next dev` puis `next build` sur le même
dossier produit `a[d] is not a function` ou
`<Html> should not be imported outside of pages/_document`. Toujours
`rm -rf .next` avant de changer de mode. Ne pas laisser `.next` supprimé non
plus : `next-env.d.ts` référence `.next/types/routes.d.ts`, et l'éditeur
signale une erreur si le dossier manque.

**Priorité des fichiers d'environnement.** `.env.local` écrase `.env`. Une
variable présente dans les deux prend la valeur de `.env.local`, ce qui a déjà
fait croire à une clé invalide.

**Variables Vercel.** Elles ne sont prises en compte **qu'au déploiement
suivant**. Ajouter une variable sans redéployer ne change rien.

**Framer Motion écrase les classes de transformation.** Un `motion.div` qui
anime `y` pose un `transform` en ligne qui annule `-translate-y-1/2`. Ne jamais
centrer une fenêtre modale par `translate` : passer par un conteneur flex
(`.modal-shell` dans `globals.css`).

**Hauteurs sur mobile.** Utiliser `dvh` plutôt que `vh`, et réserver
`env(safe-area-inset-bottom)` pour la barre de navigation Android. Voir
`.modal-panel` et `.chat-panel`.

**Grands flous CSS.** `filter: blur(120px)` sur un bloc large coûtait 4 484 ms
de Style & Layout sur mobile. Utiliser les dégradés radiaux `.glow-red` /
`.glow-red-deep`.

**Modèles Groq.** Groq retire ses modèles régulièrement — c'est ce qui avait
mis le coach IA hors service. Le modèle passe par `GROQ_MODEL` pour pouvoir en
changer sans toucher au code. Pour lister les modèles valides :

```powershell
curl.exe -s https://api.groq.com/openai/v1/models -H "Authorization: Bearer $GROQ_API_KEY"
```

Sous PowerShell, `curl` est un alias d'`Invoke-WebRequest` qui n'accepte pas
`-H` : utiliser `curl.exe`.

**Limite anti-robot des avis.** Comptée par IP dans Redis. En local la clé est
`dabakh:reviews:rl:::1`, pas `:unknown`.

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `GROQ_API_KEY` | Coach IA |
| `GROQ_MODEL` | Modèle Groq, défaut `openai/gpt-oss-120b` |
| `UPSTASH_REDIS_REST_URL` | Stockage des avis |
| `UPSTASH_REDIS_REST_TOKEN` | Stockage des avis |
| `REVIEWS_ADMIN_TOKEN` | Suppression d'un avis via `/api/reviews/moderate` |

Upstash a été choisi parce que l'offre gratuite de Supabase met un projet en
pause après 7 jours sans activité — rédhibitoire pour un site vitrine.

Sans les variables Upstash, le site fonctionne : la section avis s'affiche
vide et le formulaire renvoie un message explicite.

## Les avis

Publication **immédiate**, sans modération préalable, comme sur Google. Pas de
compte à créer. Le gérant supprime a posteriori si besoin. Les garde-fous
conservés sont invisibles pour un visiteur normal : longueur, note entière de
1 à 5, refus des liens, 3 avis par jour et par IP.

Pas de balisage `aggregateRating` dans les données structurées : Google
interdit de déclarer comme sienne une note auto-déclarée ou collectée
ailleurs.

## Adresse et référencement local

La salle est à **Sacré Cœur 3, VDN Villa 16**, derrière la résidence Mamoune.
Sur les papiers et sur Google Maps, l'adresse officielle est
**10355 Rue MZ 05** — Rue MZ, c'est Mermoz.

Ce n'est pas une contradiction à trancher : localement, personne ne dit
Mermoz. Le texte visible s'adresse aux gens et dit **Sacré Cœur**. Les
métadonnées s'adressent à Google et mentionnent **les deux**. Ne pas
« corriger » l'un vers l'autre.

Coordonnées GPS réelles : `14.7234638, -17.4739456`.

## Médias

Déposer les fichiers bruts dans `_medias-bruts/<catégorie>/` (ignoré par Git),
puis `npm run medias`. Le script redresse, **supprime les données EXIF** —
les photos de téléphone contiennent les coordonnées GPS du lieu de prise de
vue — redimensionne et compresse. Détail dans `scripts/NOMMAGE-MEDIAS.md`.

Les photos actuelles de la galerie sont des images de banque Unsplash, à
remplacer par les vraies photos de la salle. C'est le point qui pèse le plus
sur la crédibilité du site.

## Attentes de travail

**Vérifier avant d'annoncer.** Ne pas dire qu'une correction est faite sans
l'avoir mesurée : build, `tsc --noEmit`, appel HTTP réel, capture au
navigateur, audit Lighthouse. Plusieurs régressions ont été livrées faute de
cette étape — notamment trois fenêtres modales inutilisables sur mobile.

**Tester sur mobile.** C'est là que les problèmes apparaissent, et là que le
public se trouve. Lighthouse mobile est bruité : faire plusieurs passes avant
de conclure.

**Ne pas inventer de contenu client.** Les biographies des coachs et les
tarifs sont marqués `TODO CLIENT` tant qu'ils ne sont pas fournis. Ne pas
fabriquer de parcours ni de certifications pour des personnes réelles.

**Repères mesurés** (build de production, août 2026) : desktop 96 en
performance, 100 en accessibilité, bonnes pratiques et SEO. Mobile autour de
60 en performance — le poste dominant est l'exécution de framer-motion,
présente dans une dizaine de composants.
