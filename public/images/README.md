# Images du site

Ne rien déposer directement ici. Les fichiers de ce dossier sont ceux que le
site sert en ligne : ils doivent être passés par `npm run medias`, qui
redresse, supprime les données EXIF (coordonnées GPS comprises), redimensionne
et compresse.

Marche à suivre : déposer les fichiers bruts dans `_medias-bruts/<catégorie>/`
puis lancer `npm run medias`. Convention de nommage dans
`scripts/NOMMAGE-MEDIAS.md`.

## Contenu

| Dossier | Ce qu'il contient |
|---|---|
| `salle/` | Photos de la salle : hero, galerie, cartes des espaces |
| `coachs/` | Portraits des coachs |
| `souvenirs/` | Photos d'événements (vide pour l'instant) |

Les fichiers à la racine (`logo-dabakh.png`, `favicon.png`, `icon-192.png`,
`icon-pwa.png`, `og-dabakh.jpg`) sont l'identité visuelle et les icônes PWA.
Ils ne passent pas par le script.
