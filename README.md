# Dabakh Fitness Wellness Club - Site Web Moderne

🏋️ Site web premium pour la salle de sport Dabakh Fitness à Dakar, Sénégal.

## 🚀 Technologies Utilisées

- **Next.js 15+** - Framework React avec rendu côté serveur
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes modernes
- **API OpenAI** (optionnel) - Intelligence artificielle

## ✨ Fonctionnalités

### 🎨 Design Moderne "Type Apple"
- Navigation sticky avec effet glassmorphism
- Animations fluides et élégantes
- Design responsive (mobile-first)
- Thème sombre premium avec accents jaunes

### 📱 Sections du Site

1. **Hero Section** - Accueil percutant avec vidéo de fond
2. **Disciplines** - Grille Bento moderne des activités
3. **IA Coach** - Chatbot intelligent personnalisé
4. **Tarifs** - Plans d'abonnement clairs
5. **Footer** - Informations de contact complètes

### 🤖 Dabakh AI Coach
Interface chat interactive qui :
- Analyse les objectifs de l'utilisateur
- Recommande des programmes personnalisés
- Fournit des conseils sur les tarifs et horaires
- Peut être connecté à OpenAI/Gemini pour des réponses avancées

## 🛠️ Installation

### Prérequis
- Node.js 18+ installé
- npm ou yarn

### Étapes

1. **Cloner ou naviguer vers le projet**
```bash
cd c:\GYM\dabakh-web
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 🎯 Structure du Projet

```
dabakh-web/
├── app/
│   ├── components/          # Composants React
│   │   ├── Navbar.tsx       # Navigation sticky
│   │   ├── HeroSection.tsx  # Section d'accueil
│   │   ├── DisciplinesSection.tsx  # Grille des activités
│   │   ├── AICoachSection.tsx      # Chat IA
│   │   ├── PricingSection.tsx      # Tarifs
│   │   └── Footer.tsx       # Pied de page
│   ├── api/
│   │   └── ai-coach/
│   │       └── route.ts     # API pour le chatbot
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Page d'accueil
│   └── globals.css          # Styles globaux
├── public/                  # Images et assets
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Personnalisation

### Changer les Couleurs
Modifier `tailwind.config.ts` :
```typescript
colors: {
  'dabakh-yellow': '#FFD700',  // Jaune principal
  'dabakh-dark': '#0A0A0A',    // Noir profond
}
```

### Ajouter des Images
Placer les images dans `/public/` et les référencer :
```tsx
<img src="/gym-photo.jpg" alt="Dabakh Fitness" />
```

### Activer l'IA Réelle (OpenAI)

1. Créer un fichier `.env.local` :
```bash
OPENAI_API_KEY=sk-votre-clé-ici
```

2. Décommenter le code dans `app/api/ai-coach/route.ts`

## 📊 Données Dabakh Fitness

### Informations de Base
- **Nom**: Dabakh Fitness Wellness Club
- **Adresse**: 10355 Rue MZ 05, Dakar
- **Note Google**: 4.3/5 étoiles (12 avis)
- **Type**: Salle de gym premium

### Tarifs
- **BASIC**: 25 000 FCFA/mois
- **PREMIUM**: 40 000 FCFA/mois (accès 24/7)
- **VIP**: 60 000 FCFA/mois (tout inclus + IA)

### Disciplines
- Musculation & Cardio
- Boxe & Combat
- Cours collectifs (Aérobic, Step, Yoga)
- Coaching personnalisé

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel
```

### Build de Production
```bash
npm run build
npm start
```

## 📝 TODO - Améliorations Futures

- [ ] Ajouter une galerie photo
- [ ] Système de réservation en ligne
- [ ] Blog fitness
- [ ] Espace membre avec dashboard
- [ ] Application mobile PWA
- [ ] Intégration paiement mobile money

## 🤝 Support

Pour toute question sur le site :
- Email: contact@dabakhfitness.sn
- Téléphone: +221 XX XXX XX XX

## 📄 Licence

© 2026 Dabakh Fitness Wellness Club. Tous droits réservés.

---

**Développé avec ❤️ pour la communauté fitness de Dakar**
