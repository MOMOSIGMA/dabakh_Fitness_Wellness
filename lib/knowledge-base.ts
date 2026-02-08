// Documentation complète Dabakh Fitness pour Dabakh AI Coach
// Ce fichier sert de référence pour le prompt système et les réponses de l'IA

export const DABAKH_KNOWLEDGE_BASE = {
  // INFORMATIONS GÉNÉRALES
  establishment: {
    nom: "Dabakh Fitness Wellness Club",
    description: "La meilleure salle de fitness à Dakar avec équipements premium et coaching professionnel",
    localisation: "Sacré Cœur 3, VDN Villa 16 (derrière la résidence Mamoune), Dakar, Sénégal",
    note_google: "4.3/5",
    membres_actifs: "500+",
    disciplines: "15+",
  },

  // CONTACT & LOCALISATION
  contact: {
    whatsapp_principal: "77 532 37 25",
    whatsapp_alt1: "77 926 15 70",
    whatsapp_alt2: "77 532 25 29",
    credit_whatsapp: "+221775323725", // Pour les liens a.me
    adresse_complete: "Sacré Cœur 3, VDN Villa 16, Dakar, Sénégal",
    repere: "Derrière la résidence Mamoune",
    google_maps_link: "https://maps.google.com/?q=Sacré+Cœur+3+VDN+Villa+16+Dakar",
  },

  // HORAIRES OFFICIELS
  horaires: {
    lundi_vendredi: "07h00 - 22h30",
    samedi: "09h00 - 21h00",
    dimanche: "10h00 - 15h00",
    resume: "Lun-Ven 07h-22h30 | Sam 09h-21h | Dim 10h-15h",
  },

  // TARIFICATION
  tarifs: {
    frais_fixes: {
      inscription: {
        montant: 5000,
        devise: "FCFA",
        description: "Frais de création de compte (une seule fois)",
      },
      seance_journaliere: {
        montant: 2000,
        devise: "FCFA",
        description: "Accès illimité pour une journée",
      },
    },

    abonnements_classiques: {
      musculation_cardio: {
        montant: 20000,
        periode: "1 mois",
        devise: "FCFA",
        description: "Accès illimité salle musculation/cardio",
      },
      taekwondo_boxe: {
        enfant: {
          montant: 15000,
          periode: "1 mois",
          devise: "FCFA",
        },
        adulte: {
          montant: 20000,
          periode: "1 mois",
          devise: "FCFA",
        },
        inscription: 5000,
        description: "Cours spécialisé en Boxe et Taekwondo",
      },
    },

    pack_famille: {
      trois_personnes: {
        montant: 45000,
        devise: "FCFA",
        description: "Pack famille 3 personnes",
      },
      quatre_personnes: {
        montant: 60000,
        devise: "FCFA",
        description: "Pack famille 4 personnes",
      },
    },

    personal_training: {
      silver: {
        montant: 80000,
        devise: "FCFA",
        description: "16 séances + 1 séance de massage",
      },
      gold: {
        montant: 100000,
        devise: "FCFA",
        description: "18 séances + 2 séances de massage",
      },
      premium: {
        montant: 115000,
        devise: "FCFA",
        description: "20 séances + serviette + 10 bouteilles d'eau + 5 séances de massage",
      },
    },

    packs_promotionnels: {
      silver: {
        montant: 45000,
        devise: "FCFA",
        periode: "3 mois",
        avantages: [
          "Accès complet salle",
          "Vestiaires & Douches",
          "Tous les équipements",
          "Valide 3 mois",
        ],
      },

      gold: {
        montant: 100000,
        devise: "FCFA",
        periode: "6 mois",
        populaire: true,
        avantages: [
          "✨ Accès illimité",
          "Tous les équipements",
          "2 massages offerts",
          "Valide 6 mois",
          "Support prioritaire",
        ],
      },

      premium: {
        montant: 150000,
        devise: "FCFA",
        periode: "12 mois",
        avantages: [
          "Abonnement annuel",
          "5 massages inclus",
          "Serviette Dabakh offerte",
          "Accès à tous les services",
          "Programme personnalisé",
        ],
      },

      dabakh_vip: {
        montant: 200000,
        devise: "FCFA",
        periode: "12 mois",
        avantages: [
          "🏆 Statut VIP Premium",
          "5 massages + cadeaux",
          "Serviette premium",
          "Coaching personnalisé illimité",
          "Espace VIP exclusif",
        ],
      },

      special: {
        montant: 50000,
        devise: "FCFA",
        periode: "1 mois",
        avantages: [
          "Accès illimité 1 mois",
          "Massage inclus",
          "Coaching personnalisé",
          "Accès tous les services",
        ],
      },
    },

    services_bien_etre: {
      massage_tonifiant: {
        montant: 15000,
        devise: "FCFA",
        duree: "30 minutes",
        description: "Massage tonifiant pour récupération",
      },
      massage_relaxant_doux: {
        montant: 20000,
        devise: "FCFA",
        duree: "60 minutes",
        description: "Massage relaxant doux premium",
      },
      massage_dos_relaxant: {
        montant: 10000,
        devise: "FCFA",
        duree: "20 minutes",
        description: "Massage ciblé du dos",
      },
    },
  },

  // ÉQUIPEMENTS & SERVICES
  equipements: {
    salle_musculation: "Complète avec tous équipements modernes",
    zone_cardio: "Tapis roulants, vélos, rameurs dernière génération",
    vestiaires_douches: "Vestiaires sécurisés et douches",
    coaching_personnalise: "Coaches diplômés disponibles",
    massage_therapie: "Service de massage professionnel",
    coaching_ia: "Coaching IA personnalisé illimité (certains packs)",
    programmes_nutrition: "Programmes nutritionnels personnalisés",
    espace_vip: "Espace VIP exclusif pour membres premium",
  },

  // DISCIPLINES PRINCIPALES
  disciplines: [
    "Musculation",
    "Cardio",
    "Taekwondo",
    "Boxe",
    "Fitness collectif",
    "Yoga",
    "Pilates",
    "Cours collectifs",
    "Training personnalisé",
    "Coaching spécialisé",
    "Et plus...",
  ],

  // RÈGLEMENT INTÉRIEUR
  reglement_interieur: {
    hygiene: {
      titre: "🧼 Hygiène",
      regles: [
        "Port de la serviette OBLIGATOIRE sur le plateau",
        "Respect du code vestimentaire de la salle",
        "Utilisation des installations sanitaires adéquates",
      ],
    },

    chaussures: {
      titre: "👟 Chaussures",
      regles: [
        "Chaussures extérieures INTERDITES sur les tapis",
        "Chaussures INTERDITES sur le plateau technique",
        "Utiliser des chaussures spécifiques pour le gym",
        "Aucune chaussure de rue autorisée",
      ],
    },

    tenue: {
      titre: "👕 Tenue Appropriée",
      regles: [
        "Tenue de sport correcte EXIGÉE",
        "Vêtements appropriés et en bon état",
        "Pas de tenue inappropriée tolérée",
      ],
    },
  },

  // OFFRES SPÉCIALES
  offres_speciales: {
    seance_decouverte: {
      prix: 2000,
      description: "Séance découverte / journalière",
    },
    no_engagement: {
      description: "Pas d'engagement long terme",
    },
    annulation_facile: {
      description: "Annulation possible à tout moment",
    },
  },

  // FAQs COURANTES
  faqs: [
    {
      question: "Quels sont les horaires?",
      reponse: "Lun-Ven: 07h-22h30 | Samedi: 09h-21h | Dimanche: 10h-15h",
    },
    {
      question: "Quel est le tarif d'inscription?",
      reponse: "L'inscription coûte 5,000 FCFA (une seule fois)",
    },
    {
      question: "Quel pack me convient le mieux?",
      reponse: "Cela dépend de tes objectifs et de tes disponibilités. Pack Gold (100k/6 mois) est notre plus populaire!",
    },
    {
      question: "Comment m'inscrire?",
      reponse: "Contacte-nous sur WhatsApp: +221 77 532 37 25. Tu peux venir pour une séance découverte à 2 000 FCFA.",
    },
    {
      question: "Y a-t-il des règles à respecter?",
      reponse: "Oui: serviette obligatoire, chaussures interdites en extérieur, tenue correcte exigée.",
    },
    {
      question: "Vous proposez un coaching personnalisé?",
      reponse: "Absolument! Coaching personnalisé, massage, nutrition - tout est disponible selon ton pack.",
    },
    {
      question: "Je suis débutant, par où commencer?",
      reponse: "Commence par une séance découverte à 2 000 FCFA. Je peux te créer un programme adapté à ton niveau.",
    },
    {
      question: "Quel est le meilleur pack pour la musculation?",
      reponse: "Pour la musculation, je recommande Pack Gold (100k/6 mois) ou Premium (150k/12 mois) avec coaching.",
    },
  ],

  // PROMPTS DE RÉPONSE
  response_templates: {
    salutation: "Salut! 👋 Content de t'aider. Qu'est-ce que tu aimerais savoir sur Dabakh Fitness?",
    horaires: "Nos horaires sont: Lun-Ven 07h-22h30 | Samedi 09h-21h | Dimanche 10h-15h 📅",
    contact: "Pour plus d'info ou t'inscrire, contacte-nous sur WhatsApp: 📱 +221 77 532 37 25",
    adresse: "Nous sommes à: Sacré Cœur 3, VDN Villa 16, Dakar 📍 (Derrière la résidence Mamoune)",
    premiere_seance: "Tu veux essayer? Séance découverte à 2 000 FCFA. Viens découvrir nos installations!",
  },

  // CONTEXTE POUR LE COACHING
  coaching_context: {
    objectifs_courants: [
      "Perdre du poids",
      "Prendre de la masse musculaire",
      "Améliorer la condition physique",
      "Apprendre les arts martiaux",
      "Récupération et bien-être",
    ],
    niveaux: ["Débutant", "Intermédiaire", "Avancé"],
    duree_programmes: ["4 semaines", "8 semaines", "12 semaines", "26 semaines"],
  },
}

// Export en tant qu'objet pour faciliter l'accès
export default DABAKH_KNOWLEDGE_BASE
