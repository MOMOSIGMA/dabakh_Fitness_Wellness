# -*- coding: utf-8 -*-
"""
Preparation des medias fournis par la salle.

Une photo prise au telephone pese entre 3 et 8 Mo et mesure 4000 px de large.
Huit photos brutes, c'est 40 Mo dans le depot et dans chaque deploiement.
next/image redimensionne ce qui est envoye au visiteur, mais il ne reduit pas
le poids du fichier source : celui-la reste dans le projet.

Ce script ramene les sources a une taille raisonnable, sans perte visible.

Il supprime aussi les donnees EXIF. Ce point n'est pas cosmetique : une photo
prise au telephone contient les coordonnees GPS du lieu de prise de vue, la
date exacte, le modele de l'appareil et parfois le nom du proprietaire. Publier
ces donnees en ligne, c'est diffuser des informations que personne n'a
l'intention de rendre publiques.

Usage :
    python scripts/optimiser-medias.py            # traite tout
    python scripts/optimiser-medias.py salle      # une seule categorie
"""

import io
import os
import sys

from PIL import Image, ImageOps

# Les iPhone enregistrent en HEIC. Pillow ne sait pas lire ce format seul :
# sans ce greffon, les fichiers .heic listes dans EXTENSIONS ci-dessous
# ressortaient en ILLISIBLE. Installation : pip install pillow-heif
try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:
    print('Note : pillow-heif absent, les fichiers .heic seront ignores.')
    print('       Pour les traiter : pip install pillow-heif')
    print('')

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE = os.path.join(RACINE, '_medias-bruts')
DESTINATION = os.path.join(RACINE, 'public', 'images')

EXTENSIONS = ('.jpg', '.jpeg', '.png', '.webp', '.heic', '.bmp', '.tif', '.tiff')

# Largeur maximale conservee par categorie, et qualite JPEG.
# 2000 px suffit largement : la plus grande zone d'affichage du site fait
# 1200 px, et next/image genere de toute facon les variantes plus petites.
PROFILS = {
    'salle': {'largeur': 2000, 'qualite': 82},
    'coachs': {'largeur': 1000, 'qualite': 85},
    'souvenirs': {'largeur': 1600, 'qualite': 82},
}


def humain(octets):
    return '%.0f Ko' % (octets / 1024) if octets < 1024 * 1024 else '%.1f Mo' % (octets / 1024 / 1024)


def traiter(chemin_source, dossier_sortie, largeur_max, qualite):
    """Retourne (nom_sortie, poids_avant, poids_apres, dimensions) ou None."""
    poids_avant = os.path.getsize(chemin_source)

    try:
        image = Image.open(chemin_source)
    except Exception as erreur:
        print('    ILLISIBLE : %s (%s)' % (os.path.basename(chemin_source), erreur))
        return None

    # Redresse les photos prises telephone incline, d'apres l'orientation EXIF.
    image = ImageOps.exif_transpose(image)

    if image.mode in ('RGBA', 'LA', 'P'):
        fond = Image.new('RGB', image.size, (0, 0, 0))
        image = image.convert('RGBA')
        fond.paste(image, mask=image.split()[-1])
        image = fond
    elif image.mode != 'RGB':
        image = image.convert('RGB')

    if image.width > largeur_max:
        hauteur = round(image.height * largeur_max / image.width)
        image = image.resize((largeur_max, hauteur), Image.LANCZOS)

    base = os.path.splitext(os.path.basename(chemin_source))[0]
    nom_sortie = base.lower().replace(' ', '-').replace('_', '-') + '.jpg'
    chemin_sortie = os.path.join(dossier_sortie, nom_sortie)

    # Une image deja compressee (capture WhatsApp, photo deja traitee) peut
    # ressortir plus lourde qu'a l'entree si on la reencode a qualite fixe.
    # On baisse donc la qualite par paliers jusqu'a passer sous le poids
    # d'origine, sans descendre sous un seuil ou les artefacts deviennent
    # visibles.
    # save() sur une image reconstruite n'ecrit aucun bloc EXIF.
    q = qualite
    while True:
        image.save(chemin_sortie, 'JPEG', quality=q, optimize=True, progressive=True)
        poids_apres = os.path.getsize(chemin_sortie)
        if poids_apres <= poids_avant or q <= 72:
            break
        q -= 5

    return nom_sortie, poids_avant, poids_apres, image.size, q


def main():
    categories = sys.argv[1:] or list(PROFILS.keys())
    total_avant = total_apres = fichiers = 0

    for categorie in categories:
        if categorie not in PROFILS:
            print('Categorie inconnue : %s' % categorie)
            continue

        dossier_source = os.path.join(SOURCE, categorie)
        dossier_sortie = os.path.join(DESTINATION, categorie)

        if not os.path.isdir(dossier_source):
            continue

        entrees = sorted(
            f for f in os.listdir(dossier_source)
            if f.lower().endswith(EXTENSIONS)
        )

        if not entrees:
            print('%s : aucun fichier a traiter' % categorie)
            continue

        os.makedirs(dossier_sortie, exist_ok=True)
        profil = PROFILS[categorie]
        print('%s : %d fichier(s)' % (categorie.upper(), len(entrees)))

        for entree in entrees:
            resultat = traiter(
                os.path.join(dossier_source, entree),
                dossier_sortie,
                profil['largeur'],
                profil['qualite'],
            )
            if not resultat:
                continue

            nom, avant, apres, taille, q = resultat
            gain = 100 * (1 - apres / avant) if avant else 0
            note = 'deja optimisee' if gain < 5 else '%+.0f%%' % -gain
            print('    %-34s %9s -> %8s  %-15s %dx%d  q%d'
                  % (nom, humain(avant), humain(apres), note, taille[0], taille[1], q))

            total_avant += avant
            total_apres += apres
            fichiers += 1

        print('')

    if fichiers:
        gain = 100 * (1 - total_apres / total_avant)
        print('TOTAL : %d fichiers, %s -> %s (-%.0f%%)'
              % (fichiers, humain(total_avant), humain(total_apres), gain))
        print('Donnees EXIF supprimees, y compris les coordonnees GPS.')
    else:
        print('Rien a traiter. Depose les fichiers dans _medias-bruts/<categorie>/')


if __name__ == '__main__':
    main()
