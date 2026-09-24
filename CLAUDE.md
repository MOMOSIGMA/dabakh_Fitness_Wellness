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
- **Palette : noir, blanc, rouge et bleu.** Le bleu vient du logo, qui est
  rouge et bleu. Il a été retiré une fois en septembre 2026 au nom d'une
  version antérieure de cette règle : le propriétaire a demandé à le remettre,
  puis à en ajouter. **Ne pas y retoucher sans le lui demander.**

  Répartition en place, relevée sur la version d'origine et restaurée à
  l'identique : pastille du badge de localisation `bg-blue-500`, chiffre
  « 500+ » en `text-blue-400`, « 15+ » en `text-blue-500`, note Google en
  `text-red-500` entre les deux. Second bouton du hero et icône lecture en
  bleu. Section Souvenirs en bleu. **Le bouton flottant du coach IA reste
  rouge.** Le rouge garde tout ce qui déclenche une action.

  L'ancienne règle disait « noir, blanc, rouge, un seul accent ». Elle était
  fausse.

## Pièges déjà rencontrés

**« Cannot find module for page: /\_document » au build.** Variante du point
suivant, mais vider `.next` ne suffit pas toujours : le build compile, puis
échoue à l'étape *Collecting page data*. Le coupable est
`tsconfig.tsbuildinfo`, resté en cache. Supprimer les trois à la fois :
`.next`, `node_modules/.cache` et `tsconfig.tsbuildinfo`. Mesuré en
septembre 2026, après une simple suppression de fichier dans `public/`.

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

**Framer Motion rend le contenu invisible avant hydratation.** Un
`initial={{ opacity: 0 }}` est ecrit tel quel dans le HTML rendu par le
serveur : `style="opacity:0"`. Tant que le JavaScript n'a pas hydrate la page
puis declenche l'observateur d'intersection, le contenu n'existe pas a l'ecran.
Mesure de septembre 2026 : **41 elements** dans ce cas, dont le `<h1>`. Sur un
telephone lent, le visiteur voyait une image de fond et du vide.

Meme famille, trouvee juste apres : la barre de navigation etait un
`motion.nav` avec `initial={{ y: -100 }}`. Elle etait donc rendue cent pixels
au-dessus de l'ecran, **logo compris**, et ne redescendait qu'a l'hydratation.
Le symptome cote utilisateur : « je ne vois plus le logo ».

Regle : ne jamais faire dependre la visibilite **ni la position** d'un contenu
du JavaScript.
L'etat initial d'une animation d'apparition porte un deplacement
(`initial={{ y: 16 }}`), jamais une opacite. Les fenetres modales sont la seule
exception : elles n'existent qu'apres un clic, donc apres hydratation.

Pour verifier apres coup :

```bash
curl -s http://localhost:3000/ | grep -o 'opacity:0' | wc -l
```

Doivent rester : l'indicateur de defilement du hero et la bulle du coach IA.
Verifier aussi qu'aucun `translate` ne sort un element de l'ecran :

```bash
curl -s http://localhost:3000/ | grep -c 'translateY(-'
```

**`quality` de next/image et `images.qualities`.** Next 15 refuse toute valeur
de `quality` absente de `images.qualities` dans `next.config.js` (aujourd'hui
`[50, 60, 75]`). L'erreur survient **au rendu du composant**, pas au build :
un `quality={70}` place dans une fenetre modale est passe au travers du build,
de `tsc`, du lint et d'un controle du HTML servi, pour ne planter qu'au clic.

Apres toute modification touchant des images :

```bash
grep -rn "quality={" app/
```

Chaque valeur doit figurer dans `images.qualities`.

**Contexte d'empilement de la barre de navigation.** `<nav>` porte un
`z-index`, donc tout enfant est confine dans ce contexte : un panneau en
`z-[110]` place a l'interieur passe quand meme **sous** une bulle flottante en
`z-[100]` posee a la racine. C'est ce qui faisait flotter le bouton du coach IA
et celui de WhatsApp par-dessus le menu mobile ouvert. Solution retenue : la
barre entiere monte a `z-[120]` tant que le menu est ouvert. Augmenter le
`z-index` de l'enfant ne sert a rien.

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

Les iPhone enregistrent en HEIC, que Pillow ne lit pas seul et qu'aucun
navigateur n'affiche. Le script enregistre le greffon `pillow-heif` s'il est
present (`pip install pillow-heif`) et convertit en JPEG au passage. Sans lui,
les fichiers .heic sont ignores avec un message explicite.

Le site ne contient plus aucune image de banque : hero, galerie et portraits
des coachs sont les photos réelles de la salle. `next.config.js` n'autorise
plus aucun domaine distant.

Photos encore manquantes, et sections qui s'affichent donc sans image :
boxe, taekwondo, salle détente, cours collectifs, et les portraits d'Amet et
des deux coachs combat.

Les souvenirs de la journée de partage (rupture du jeûne pendant le Ramadan)
sont intégrés : quatre photos retenues sur neuf fournies. Les cinq autres, dont
deux portraits individuels, restent dans `_medias-bruts/originaux/` et ne sont
pas publiées.

## Menu mobile

Panneau lateral qui entre par la droite, refait en septembre 2026. L'ancien
etait un bandeau deroulant en `overflow-hidden` : avec huit liens et un bouton,
le bas sortait de l'ecran sans possibilite de le faire defiler.

Ce que la version actuelle garantit, et qu'il faut preserver :

- la liste defile (`overflow-y-auto`), l'appel a l'action reste ancre en bas ;
- une croix de 48 px dans le panneau, en plus de l'ouverture par le burger ;
- fermeture par la croix, par le voile, par Echap, et au passage en format
  bureau (sinon le menu reste ouvert et bloque le defilement du body) ;
- le focus part sur la croix a l'ouverture et revient sur le burger a la
  fermeture ;
- `.sheet-safe` reserve la barre de navigation Android sous le bouton du bas ;
- la navigation vers une ancre attend 220 ms que le panneau soit sorti : sans
  ce delai, le verrou de defilement annule le `scrollIntoView`.

## Mise en page mobile

Le public est sur telephone : la profondeur de defilement est un critere de
conception, pas un detail. Trois regles appliquees en septembre 2026 :

- marges de section divisees par deux sous 768 px (`py-12 md:py-24`) ;
- deux cartes par ligne plutot qu'une pleine largeur ;
- listes longues en **rail horizontal** : la classe `.rail` de `globals.css`
  n'agit que sous 768 px, pour que les utilitaires de grille de Tailwind
  reprennent la main au-dela sans conflit de specificite. Chaque enfant recoit
  une largeur en `vw` et la section passe en `md:grid`.

Le rail est de loin le plus efficace : la galerie est passee de quatre photos
empilees a **484 px**, soit 5 % de la hauteur de page.

Hauteurs mesurees a 390 px de large, apres compaction : page totale 9 612 px
(11,4 ecrans). Repartition : tarifs 2 309, souvenirs 1 250, infos pratiques
1 245, coachs 1 182, disciplines 1 164, footer 774, hero 714, avis 490,
galerie 484. **Le prochain gain est dans les tarifs**, qui pesent 24 % a eux
seuls.

Pour mesurer : deposer une page dans `public/` qui charge le site dans une
`iframe` de 390 px et lit `scrollHeight` (meme origine, donc inspectable), puis
la capturer avec Chrome sans interface. Penser a retirer la page ensuite.

Attention aux captures Chrome sans interface sous Windows : l'affichage a
125 % rogne l'image sur la droite et donne l'illusion d'un debordement
horizontal. Verifier `documentElement.scrollWidth` avant de conclure.

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
