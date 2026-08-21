# Nommage des médias

Le script `npm run medias` reprend le nom du fichier déposé, le passe en
minuscules et remplace les espaces par des tirets. Il ne devine pas ce que
montre la photo.

Deux façons de procéder, au choix.

## Option 1 — tu ne renommes rien

Dépose les fichiers tels que la cliente les envoie dans
`_medias-bruts/<catégorie>/`, dis-moi que c'est fait, et je m'occupe du
tri : j'ouvre chaque image, j'identifie ce qu'elle montre, et je la renomme
selon la convention ci-dessous.

C'est comme ça que j'ai repéré la maquette « Caille Pro » et la photo
personnelle qui traînaient dans `public/images/`.

## Option 2 — tu renommes avant de lancer le script

Renomme les fichiers dans `_medias-bruts/` en suivant cette convention, puis
lance `npm run medias`.

### Salle → `_medias-bruts/salle/`

| Nom du fichier | Où il apparaît sur le site |
|---|---|
| `salle-vue-ensemble.jpg` | Fond de la page d'accueil (ordinateur) |
| `salle-vue-ensemble-portrait.jpg` | Fond de la page d'accueil (téléphone) |
| `salle-musculation.jpg` | Carte « Musculation & Cardio », galerie |
| `salle-cardio.jpg` | Galerie |
| `salle-boxe.jpg` | Carte « Boxe & Combat », galerie |
| `salle-cours-collectif.jpg` | Galerie |
| `salle-etirement.jpg` | Galerie |
| `salle-vestiaires.jpg` | Galerie |
| `salle-entree.jpg` | Infos pratiques |
| `salle-coaching.jpg` | Carte « Coaching personnalisé » |

### Coachs → `_medias-bruts/coachs/`

Le nom doit correspondre au prénom utilisé dans le code :
`coach-babacar.jpg`, `coach-achille.jpg`, `coach-top.jpg`,
`coach-lamine.jpg`.

### Souvenirs → `_medias-bruts/souvenirs/`

Format `souvenir-<événement>-<numéro>.jpg`, numérotés à partir de 01 :

```
souvenir-concours-force-01.jpg
souvenir-concours-force-02.jpg
souvenir-gainage-01.jpg
souvenir-challenge-fin-annee-01.jpg
```

### Vidéos → `_medias-bruts/videos/`

Même convention, en `.mp4` :

```
souvenir-concours-force.mp4
```

Les vidéos ne passent pas par `npm run medias`, elles demandent un
traitement à part.

## Ce que fait le script

- redresse les photos prises appareil incliné, d'après l'orientation EXIF ;
- **supprime les données EXIF** — coordonnées GPS du lieu de prise de vue,
  date, modèle de téléphone, parfois le nom du propriétaire. Ces données
  partent en ligne avec la photo si on ne les retire pas ;
- redimensionne : 2000 px de large pour la salle, 1600 px pour les
  souvenirs, 800 px pour les portraits ;
- compresse en JPEG progressif, avec une qualité qui s'ajuste pour ne
  jamais produire un fichier plus lourd que l'original ;
- range le résultat dans `public/images/<catégorie>/`.

Mesuré sur une photo de téléphone de 4000 × 3000 : **7,4 Mo → 629 Ko**.

## Remarque

`_medias-bruts/` est ignoré par Git : les fichiers déposés ne partent ni sur
GitHub ni en ligne. Seul le contenu de `public/images/` est publié. Garde les
originaux ailleurs si tu veux les conserver.
