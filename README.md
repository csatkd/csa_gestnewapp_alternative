# 🥋 Confidence Sports Academy (CSA) - Application de Gestion Taekwondo

Application web professionnelle complète pour la gestion d'une académie de Taekwondo en Côte d'Ivoire, affiliée à la **Fédération Ivoirienne de Taekwondo (FITKD)** et homologuée **World Taekwondo (Kukkiwon)**.

## 📋 Fonctionnalités Principales

### 🎯 Tableau de Bord Exécutif
- Vue d'ensemble des KPI (licenciés actifs, assiduité, revenus, médailles)
- Graphiques interactifs Recharts (assiduité 30 jours, répartition par grade)
- Alertes en temps réel (stocks critiques, échéances dépassées)
- Comptes à rebours pour les compétitions à venir
- Export CSV des données

### 📅 Planning des Entraînements
- Calendrier hebdomadaire interactif
- Gestion des séances par catégorie d'âge
- Suivi du taux d'occupation en temps réel
- Filtrage par jour et par instructeur
- Statistiques d'utilisation des créneaux

### 🎯 Progression Technique
- Suivi détaillé des compétences par membre
- 5 catégories : Poomsae, Kyorugi, Kyokpa, Hosinsul, Théorie
- Visualisation graphique de la progression
- Calcul automatique du niveau global
- Historique des mises à jour

### 📚 Système de Réservation
- Gestion des cours particuliers et stages
- Réservation en ligne avec confirmation
- Suivi des statuts (confirmée, en attente, annulée, terminée)
- Calcul automatique des revenus
- Filtrage par type et par statut

### 🎯 Cours d'Essai
- Planification de séances d'essai gratuites
- Inscription des prospects avec informations complètes
- Suivi du parcours : inscrit → présent → intéressé → adhérent
- Statistiques de conversion (taux de transformation prospects/adhérents)
- Gestion des contacts parents pour les mineurs
- Vue d'ensemble des prochains cours d'essai
- Actions rapides pour mettre à jour le statut des participants
- Filtrage par cours et par statut

### 👨‍🏫 Gestion des Coachs
- Profils détaillés des entraîneurs avec biographie et réalisations
- Suivi des certifications et qualifications (Kukkiwon, FITKD, WT)
- Gestion des spécialisations (Poomsae, Kyorugi, Self-Défense, etc.)
- Statistiques individuelles (nombre d'élèves, cours/semaine, note moyenne)
- Suivi de la masse salariale
- Filtrage par statut (actif, en congé, inactif)
- Vue d'ensemble de l'équipe technique
- Évaluations et feedback des élèves

### 📋 Assiduité des Coachs
- Pointage quotidien des entraîneurs (arrivée/départ)
- Suivi des statuts : présent, en retard, absent, excusé
- Planning hebdomadaire avec créneaux de cours par coach
- Calcul automatique du taux d'assiduité mensuel
- Statistiques individuelles (présences, retards, heures travaillées)
- Export CSV des données de pointage
- Filtrage par date, coach et statut
- Vue d'ensemble des présences du jour
- Alertes pour absences non justifiées
- Suivi des heures supplémentaires

### 🚪 Pointage au Secrétariat
- **Système de double pointage** (entrée/sortie) au secrétariat
- **Pointage d'entrée** :
  - Enregistrement à l'arrivée au club
  - Avant d'entrer dans la salle d'entraînement
  - Sélection du licencié dans la liste
  - Horodatage automatique
  - Vérification des doublons (empêche double pointage)
- **Pointage de sortie** :
  - Enregistrement au départ du club
  - Après la séance d'entraînement
  - Calcul automatique de la durée de présence
  - Affichage en heures et minutes
- **Affichage en temps réel** :
  - Heure actuelle mise à jour chaque seconde
  - Date complète en français
  - Liste des licenciés actuellement au club
  - Durée de présence en temps réel pour chaque licencié
- **Statistiques du jour** :
  - Nombre de licenciés actuellement au club
  - Nombre de sorties enregistrées
  - Durée moyenne de présence
  - Total des pointages du jour
- **Gestion des oublis** :
  - Détection des pointages de sortie manquants
  - Statut "Oubli" pour les sorties non enregistrées
  - Possibilité de régularisation
- **Interface intuitive** :
  - Bouton "Pointage Entrée" bien visible
  - Bouton "Pointage Sortie" sur chaque carte de licencié présent
  - Modal de sélection pour l'entrée
  - Tableau détaillé de l'historique du jour
- **Fonctionnalités avancées** :
  - Recherche par nom ou numéro de licence
  - Filtrage par date
  - Export CSV des pointages du jour
  - Persistance des données dans localStorage
  - Code couleur par statut (En cours, Terminé, Oubli)
- **Workflow optimisé** :
  1. Le licencié arrive au secrétariat
  2. Le secrétaire sélectionne le licencié
  3. Confirmation de l'entrée (horodatage automatique)
  4. Le licencié va en salle d'entraînement
  5. À la fin de la séance, retour au secrétariat
  6. Le secrétaire enregistre la sortie
  7. Calcul automatique de la durée

### 🛒 Boutique en Ligne
- Catalogue de produits (doboks, protections, accessoires, équipements)
- Gestion des stocks en temps réel avec alertes
- Suivi des commandes avec statuts (en attente, confirmée, expédiée, livrée)
- Gestion des tailles et couleurs disponibles
- Produits vedettes et mise en avant
- Calcul automatique du chiffre d'affaires
- Historique complet des commandes
- Intégration avec les membres pour suivi des achats

### 🏆 Gestion des Compétitions
- Suivi des compétitions (nationales, internationales, régionales, locales)
- Inscription des athlètes aux compétitions
- Enregistrement des résultats et médailles (or, argent, bronze)
- Statistiques individuelles par athlète (taux de réussite, meilleur rang)
- Classement général des athlètes
- Historique complet des performances
- Préparation et suivi des athlètes
- Analyse des résultats par discipline (Poomsae, Kyorugi)

### 💬 Intégration WhatsApp
- **Système de messagerie intégré** pour communications professionnelles
- **8 modèles de messages** prédéfinis avec variables dynamiques :
  - 💰 Rappel de paiement
  - 📋 Confirmation d'arrivée
  - 📋 Notification d'absence
  - 🥋 Rappel passage de grade
  - 🥋 Félicitations réussite
  - 🏆 Invitation compétition
  - 📢 Cours d'essai gratuit
  - 📢 Fermeture exceptionnelle
- **3 onglets fonctionnels** :
  - Modèles : Bibliothèque de templates avec recherche et filtres
  - Composer : Envoi de messages personnalisés
  - Historique : Suivi des messages envoyés avec statuts
- **Canaux multiples** : WhatsApp et SMS
- **Statistiques de communication** :
  - Nombre de messages envoyés
  - Taux de livraison (98%)
  - Temps de réponse moyen
- **Suivi des statuts** : Envoyé, Livré, Lu, Échoué
- **Variables dynamiques** : {parent_name}, {student_name}, {amount}, {date}, etc.

### 📅 Calendrier Interactif
- **Vue calendrier complète** avec navigation mois/semaine/jour
- **6 types d'événements** avec codes couleur :
  - 🔵 Entraînement (bleu)
  - 🔴 Compétition (rouge)
  - 🟡 Passage de Grade (ambre)
  - 🟣 Réunion (indigo)
  - 🩷 Événement Spécial (rose)
  - ⚫ Fermeture (gris)
- **Fonctionnalités avancées** :
  - Navigation entre mois avec boutons précédent/suivant
  - Bouton "Aujourd'hui" pour retour rapide
  - Affichage du nombre d'événements par jour
  - Vue détaillée des événements du jour sélectionné
  - Modal détaillé pour chaque événement
- **Informations complètes** par événement :
  - Date et heure
  - Durée
  - Lieu
  - Nombre de participants
  - Instructeur responsable
  - Description détaillée
- **Légende visuelle** avec tous les types d'événements
- **Responsive design** adapté mobile/tablette/desktop

### ⭐ Système de Feedback
- **Évaluations bidirectionnelles** :
  - Parents → Coachs
  - Élèves → Coachs
  - Coachs → Élèves
- **Classement des coachs** avec notes détaillées :
  - Note globale sur 5
  - Pédagogie
  - Ponctualité
  - Communication
  - Expertise technique
- **3 onglets fonctionnels** :
  - Classement Coachs : Top coachs avec statistiques
  - Tous les Feedbacks : Historique complet avec filtres
  - Soumettre : Formulaire d'évaluation
- **Statistiques globales** :
  - Note moyenne globale (4.6/5)
  - Nombre total de feedbacks
  - Nombre de coachs évalués
  - Tendance de satisfaction (+12%)
- **Filtres avancés** par type de feedback
- **Système d'étoiles** visuel (1 à 5 étoiles)
- **Option anonyme** pour feedbacks sensibles
- **Modal détaillé** pour chaque coach avec :
  - Notes par catégorie avec barres de progression
  - Feedbacks récents
  - Nombre total d'évaluations

### 🎥 Bibliothèque de Vidéos
- **Catalogue de techniques vidéo** organisé par catégories :
  - 🥋 Poomsae (Formes)
  - ⚔️ Kyorugi (Combat)
  - 💥 Kyokpa (Casse)
  - 🛡️ Hosinsul (Self-Défense)
  - 📚 Théorie
- **4 niveaux de difficulté** :
  - 🟢 Débutant
  - 🔵 Intermédiaire
  - 🟣 Avancé
  - 🔴 Expert
- **Fonctionnalités avancées** :
  - Recherche par titre, description ou tags
  - Filtres par catégorie et niveau
  - Affichage en grille responsive
  - Lecteur vidéo intégré (modal)
  - Système de notation (étoiles)
  - Compteur de vues
- **Informations par vidéo** :
  - Titre et description
  - Durée
  - Instructeur
  - Niveau de difficulté
  - Tags pour recherche
  - Nombre de vues
  - Note moyenne
- **Statistiques globales** :
  - Nombre total de vidéos
  - Heures de contenu
  - Vues totales
  - Note moyenne
- **Aperçu vidéo** avec bouton play au survol
- **Modal détaillé** avec :
  - Lecteur vidéo
  - Description complète
  - Tags
  - Statistiques

### 🧾 Impression de Reçus Multi-Format
- **Système d'impression professionnel** avec support multi-format
- **5 formats d'impression** disponibles :
  - 📄 **A4 Standard** : Format officiel pour archivage et documents
  - 🧾 **Ticket 80mm** : Imprimantes thermiques standard (Epson, Star, etc.)
  - 🎫 **Ticket 58mm** : Imprimantes thermiques compactes
  - 🌐 **HTML Web** : Impression via navigateur (toutes imprimantes)
  - 📡 **ESC/POS Direct** : Impression directe via Bluetooth
- **Connexion Bluetooth** pour imprimantes thermiques :
  - Détection automatique des imprimantes
  - Connexion/déconnexion simple
  - Support des protocoles ESC/POS
  - Statut de connexion en temps réel
- **Fonctionnalités avancées** :
  - Sélection de paiement avec recherche
  - Aperçu avant impression
  - Téléchargement PDF
  - Impression directe
  - Gestion des acomptes et soldes
- **Reçus professionnels** avec :
  - En-tête officiel CSA
  - Informations complètes du licencié
  - Détails du paiement
  - Historique des acomptes
  - Codes-barres et numéros de reçu
  - Pied de page avec mentions légales
- **Interface intuitive** :
  - Sélection visuelle des formats
  - Indicateurs de connexion Bluetooth
  - Messages d'état et d'erreur
  - Configuration détaillée des imprimantes

### 📝 Gestion des Inscriptions
- **Suivi complet des nouvelles inscriptions** avec workflow structuré
- **4 statuts d'inscription** avec code couleur :
  - 🟡 **En attente** : Dossier en cours de constitution
  - 🟠 **Incomplet** : Documents manquants
  - 🔵 **Complet** : Tous les documents requis reçus
  - 🟢 **Validé** : Inscription finalisée
- **Checklist des documents requis** (personnalisable) :
  - 📋 Formulaire d'inscription
  - 📸 Photos d'identité (2)
  - 🏥 Certificat médical
  - 🆔 Copie pièce d'identité (parent pour mineurs)
  - 📖 Copie livret de famille (pour mineurs)
  - ✍️ Autorisation parentale (pour mineurs)
  - 🛡️ Assurance sportive (optionnel)
- **Suivi en temps réel** :
  - Barre de progression des documents
  - Compteur de documents reçus/total
  - Date de réception pour chaque document
  - Distinction documents obligatoires/optionnels
- **Gestion des frais d'inscription** :
  - Suivi du paiement des frais
  - Montants différenciés (mineurs/adultes)
  - Statut de paiement (payé/en attente)
- **Statistiques des inscriptions** :
  - Total des inscriptions
  - Répartition par statut
  - Taux de complétion
  - Nombre de validations
- **Interface intuitive** :
  - Recherche par nom
  - Filtres par statut
  - Vue détaillée avec modal
  - Actions rapides (valider, marquer documents)
  - Progression visuelle
- **Processus de validation** :
  - Vérification automatique des documents obligatoires
  - Confirmation du paiement des frais
  - Validation manuelle par l'administrateur
  - Génération automatique du numéro de licence

### 🎁 Programme de Parrainage
- **Système de parrainage complet** pour recrutement de nouveaux membres
- **Processus en 4 étapes** :
  1. Partager le code de parrainage
  2. Inscription du filleul avec le code
  3. Validation de l'inscription
  4. Récompense automatique (10 000 FCFA)
- **3 onglets fonctionnels** :
  - Vue d'Ensemble : Statistiques et code personnel
  - Mes Parrainages : Historique complet
  - Inviter : Formulaire et options de partage
- **Code de parrainage unique** :
  - Généré automatiquement (ex: CSA-VOUS-2024)
  - Copiable en un clic
  - Partageable via WhatsApp, SMS, Email
- **Statistiques détaillées** :
  - Nombre total de parrainages
  - Parrainages réussis
  - Récompenses totales gagnées
  - Taux de conversion (67%)
- **Suivi des statuts** :
  - ⏳ En attente
  - ✓ Accepté
  - 🎓 Inscrit
  - 🎁 Récompensé
- **Récompenses financières** :
  - 10 000 FCFA par parrainage réussi
  - Réduction sur prochaine cotisation
  - Pas de limite de parrainages
- **Formulaire d'enregistrement** :
  - Nom du filleul
  - Téléphone
  - Email (optionnel)
- **Avantages mis en avant** :
  - Récompense immédiate
  - Pas de limite
  - Suivi en temps réel
  - Processus simple

### 👥 Gestion des Licenciés
- Fiches détaillées avec calcul automatique IMC et catégorie d'âge
- Suivi biométrique complet (poids, taille, évolution 12 mois)
- Historique d'assiduité avec code couleur (vert ≥80%, amber 75-79%, rouge <75%)
- Validation des certificats médicaux et assurances
- Recherche et filtres avancés (par ceinture, catégorie d'âge)
- Formulaire d'ajout avec validation complète

### 📊 Pointage Dojang (Licenciés)
- **Suivi complet des arrivées ET départs** avec calcul automatique du temps de présence
- Système multi-méthodes : QR Code, NFC, Manuel
- Mode Kiosk immersif pour borne de pointage
- Effets sonores et animations visuelles
- **Tableau de bord en temps réel** avec 7 indicateurs clés :
  - Convoqués, Présents, Retards, Absents
  - Taux d'assiduité (%)
  - Heures totales de présence
  - Moyenne par personne
- **Actions rapides** :
  - Pointer tous les présents en un clic
  - Marquer tous les absents
  - Pointer tous les départs
  - Notifier les absents (WhatsApp/SMS)
- **Boutons d'action individuels** pour chaque licencié :
  - Pointer l'arrivée (icône verte)
  - Pointer le départ (icône bleue)
  - Marquer absent (icône rouge)
  - Marquer excusé (icône bleue)
- **Interface de pointage améliorée** :
  - Affichage des heures d'arrivée et de départ
  - Calcul automatique de la durée de présence
  - Code couleur intuitif pour chaque statut
  - Méthode de pointage utilisée (QR/NFC/Manuel)
- Export PDF de la feuille d'émargement officielle
- Export CSV complet avec heures d'arrivée, départ et durée
- Statistiques en temps réel (présents, retards, absents)

### 🥋 Passages de Grade
- Gestion des sessions d'examen Kukkiwon/FITKD
- Notation officielle sur 100 points (5 ateliers /20) :
  - Poomsae (Formes)
  - Kyorugi (Combat)
  - Kyokpa (Casse)
  - Hosinsul (Self-Défense)
  - Attitude & Terminologie coréenne
- Analyseur d'éligibilité automatique (seuil 75% assiduité)
- Génération de diplômes PDF officiels A4 paysage
- Confettis de célébration lors de la réussite

### 💰 Trésorerie & Paiements
- Suivi des cotisations, acomptes et créances
- Identification automatique des opérateurs Mobile Money ivoiriens :
  - 🟠 Orange Money
  - 🟡 MTN MoMo
  - 🔵 Wave
  - 🔷 Moov Money
- Alertes visuelles pour échéances dépassées (pastille rouge animée)
- Intégration WhatsApp pour relances automatiques
- Export PDF des relevés de compte
- Export CSV des paiements
- Formulaire d'ajout de paiement avec validation

### 📅 Gestion des Mensualités & Trésorerie
- **Tableau de bord de trésorerie** avec 4 KPIs en temps réel :
  - 💚 Total encaissé (FCFA)
  - 💙 Taux de recouvrement (%)
  - ❤️ Impayés (FCFA + nombre)
  - 🧡 En attente (FCFA + nombre)
- **Évolution mensuelle** avec graphique de progression :
  - Barres de progression colorées par taux de recouvrement
  - Montants encaissés vs attendus par mois
  - Taux de recouvrement mensuel en pourcentage
- **Gestion des paiements mensuels** :
  - Suivi de 12 mensualités par licencié
  - Statuts : Payé, Partiel, Impayé, En attente
  - Montants différenciés par grade (ceinture noire, Dan, etc.)
  - Échéances au 5 de chaque mois
- **Système de relances automatiques** :
  - Relances individuelles via WhatsApp
  - Relances groupées pour tous les impayés
  - Compteur de relances par mensualité
  - Date de dernière relance
  - Messages personnalisés avec nom et montant
- **Gestion des impayés** :
  - Liste des licenciés en retard avec total dû
  - Nombre de mois en retard par licencié
  - Bouton de relance rapide
  - Tri par montant dû décroissant
- **Filtres avancés** :
  - Recherche par nom de licencié
  - Filtre par mois
  - Filtre par statut (payé, partiel, impayé, en attente)
- **Export et rapports** :
  - Export CSV complet des mensualités
  - Export PDF des relevés de compte
  - Détails de chaque mensualité avec historique
- **Interface intuitive** :
  - Tableau détaillé avec toutes les informations
  - Modal de détail pour chaque mensualité
  - Actions rapides (relance WhatsApp, export PDF)
  - Code couleur par statut
  - Alertes visuelles pour impayés

### 📦 Gestion des Stocks
- Inventaire des équipements de combat et d'entraînement
- Alertes visuelles pour stocks critiques
- Simulation de commande fournisseur
- Calcul automatique de la valeur totale du stock
- Édition en ligne des seuils min/max
- Historique des mouvements de stock

### 📈 Statistiques Avancées
- Analyse détaillée des performances de l'académie
- KPI financiers (revenus, taux de recouvrement, impayés)
- Analyse d'assiduité (excellente, bonne, à risque)
- Répartition par ceinture et par âge
- Évolution mensuelle (assiduité, nouveaux membres, revenus)
- Export de rapports personnalisés

### 📄 Rapports de Performance
- Génération de rapports détaillés (général, assiduité, financier, grades)
- Aperçu en temps réel avant export
- Export PDF/CSV des rapports complets
- Périodes personnalisables (mois, trimestre, année)

### 💾 Gestion des Données
- Export de toutes les données en JSON (sauvegarde)
- Import de données depuis un fichier JSON (restauration)
- Réinitialisation complète des données locales
- Persistance localStorage automatique

### 👨‍👩‍👧 Portail Famille
- Notifications push en temps réel
- Suivi assiduité/paiements/événements
- Support Mobile Money (Orange Money, MTN, Wave, Moov)
- Comptes à rebours pour compétitions
- Autorisations parentales numériques

### 🔔 Système de Notifications
- Notifications avec système de priorités (low, medium, high)
- Filtres (toutes, non lues, prioritaires)
- Marquage comme lu / suppression
- Types : assiduité, paiement, grade, événement, médical, stock, système

### 💬 Module de Communication
- Système d'annonces avec priorités (haute, moyenne, basse)
- Ciblage par audience (tous, parents, coaches, élèves)
- Messagerie interne entre membres
- Suivi des messages lus/non lus
- Historique complet des communications

### 🏥 Suivi des Incidents
- Déclaration et suivi des blessures
- Classification par gravité (légère, modérée, grave)
- Suivi du traitement et de la guérison
- Statistiques des incidents actifs
- Historique médical complet par membre

### 🏆 Programme de Récompenses (Gamification)
- Système d'achievements avec 5 catégories
- Classement général avec leaderboard
- Niveaux et rangs (Bronze, Argent, Or, Diamant, Légende, Mythique)
- Points de récompense pour chaque achievement
- Suivi de la progression individuelle

### ⚙️ Paramètres de l'Académie
- Configuration des informations générales
- Gestion des coordonnées et horaires
- Affiliations officielles (FITKD, Kukkiwon, World Taekwondo)
- Intégration réseaux sociaux
- Sauvegarde persistante des paramètres

### 🔍 Recherche Globale
- Recherche unifiée dans toute l'application
- Raccourci clavier (⌘K / Ctrl+K)
- Résultats en temps réel (licenciés, paiements, grades)
- Navigation rapide vers les résultats

## 🛠️ Technologies Utilisées

- **React 18** avec TypeScript
- **Tailwind CSS** pour le design responsive
- **Recharts** pour les graphiques interactifs
- **jsPDF** + **jspdf-autotable** pour la génération de documents PDF
- **Lucide React** pour les icônes
- **LocalStorage** pour la persistance des données
- **Canvas Confetti** pour les animations de célébration

## 📁 Structure du Projet

```
src/
├── components/
│   ├── DashboardView.tsx              # Tableau de bord principal
│   ├── MembersView.tsx                # Gestion des licenciés
│   ├── AddMemberModal.tsx             # Formulaire d'ajout de membre
│   ├── AttendanceView.tsx             # Pointage dojang
│   ├── SecretariatAttendanceView.tsx  # Pointage au secrétariat
│   ├── KioskMode.tsx                  # Mode borne de pointage
│   ├── TrainingSchedule.tsx           # Planning des entraînements
│   ├── TechnicalProgress.tsx          # Progression technique
│   ├── GradingView.tsx                # Passages de grade
│   ├── BookingSystem.tsx              # Système de réservation
│   ├── TrialClasses.tsx               # Gestion des cours d'essai
│   ├── CoachesManagement.tsx          # Gestion des coachs
│   ├── CoachAttendance.tsx            # Assiduité des coachs
│   ├── ShopManagement.tsx             # Boutique en ligne
│   ├── CompetitionManagement.tsx      # Gestion des compétitions
│   ├── WhatsAppIntegration.tsx        # Intégration WhatsApp
│   ├── InteractiveCalendar.tsx        # Calendrier interactif
│   ├── FeedbackSystem.tsx             # Système de feedback
│   ├── VideoLibrary.tsx               # Bibliothèque de vidéos
│   ├── ReferralProgram.tsx            # Programme de parrainage
│   ├── ReceiptPrinter.tsx             # Impression de reçus
│   ├── InscriptionManagement.tsx      # Gestion des inscriptions
│   ├── MonthlyPaymentsView.tsx        # Gestion des mensualités
│   ├── PaymentsView.tsx               # Trésorerie
│   ├── AddPaymentModal.tsx            # Formulaire d'ajout de paiement
│   ├── InventoryView.tsx              # Gestion des stocks
│   ├── IncidentTracker.tsx            # Suivi des incidents
│   ├── RewardsProgram.tsx             # Programme de récompenses
│   ├── Communication.tsx              # Module de communication
│   ├── AdvancedStats.tsx              # Statistiques avancées
│   ├── PerformanceReport.tsx          # Rapports de performance
│   ├── DataManagement.tsx             # Gestion des données
│   ├── AcademySettings.tsx            # Paramètres de l'académie
│   ├── ParentPortalView.tsx           # Portail famille
│   ├── ParentLogin.tsx                # Connexion parent
│   ├── ParentAuthContext.tsx          # Contexte d'authentification
│   ├── NotificationsPanel.tsx         # Panneau de notifications
│   ├── CompetitionCountdown.tsx       # Compte à rebours compétitions
│   ├── ErrorBoundary.tsx              # Gestion des erreurs
│   └── Toast.tsx                      # Système de notifications toast
├── utils/
│   ├── helpers.ts                     # Fonctions utilitaires
│   ├── storage.ts                     # Gestion localStorage & validation
│   ├── pdfGenerators.ts               # Générateurs PDF officiels
│   └── receiptGenerator.ts            # Générateurs de reçus multi-format
├── data/
│   └── mockData.ts                    # Données de démonstration
├── types.ts                           # Interfaces TypeScript
└── App.tsx                            # Composant principal
```

## 🎨 Design & UX

- **Thème martial élégant** : ardoise foncé, rouge taekwondo, or impérial, émeraude
- **Responsive design** : adapté mobile, tablette et desktop
- **Animations fluides** : transitions, confettis, pulse glow
- **Accessibilité** : contrastes élevés, navigation au clavier
- **Performance** : optimisation des rendus, lazy loading

## 🇨🇮 Adaptation au Contexte Ivoirien

- **Noms et prénoms** ivoiriens (Kouassi, Traoré, Bamba, Koné, Diallo, etc.)
- **Numéros de téléphone** au format +225 avec préfixes opérateurs (07, 05, 01)
- **Adresses** : communes d'Abidjan (Cocody, Yopougon, Abobo, Plateau, etc.)
- **Licences** : format CSA-XXXXXXX (7 chiffres) spécifique à l'académie
- **Opérateurs Mobile Money** : Orange Money, MTN MoMo, Wave, Moov Money
- **Devise** : FCFA (Franc CFA)
- **Format de date** : français (JJ/MM/AAAA)

## 📄 Documents Officiels Générés

1. **Diplômes de grade** (A4 paysage)
   - Cadre cérémonial or et bordeaux
   - Filigrane 태권도 (Taekwondo en coréen)
   - Notes techniques détaillées
   - Sceau officiel CSA

2. **Feuilles d'émargement** (A4 portrait)
   - En-tête officiel CSA
   - Statistiques de la séance
   - Tableau détaillé des présences
   - Cases de signature

3. **Relevés de compte** (A4 portrait)
   - Historique complet des transactions
   - Détail des acomptes
   - Solde restant
   - Certification officielle

## 🚀 Installation & Démarrage

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev

# Build pour production
npm run build

# Vérification des types
npm run typecheck
```

## 🔒 Sécurité & Validation

- Validation des formulaires (téléphone, âge, poids, taille)
- Format de téléphone ivoirien vérifié (+225 XX XX XX XX)
- Contrôle des âges (4-80 ans)
- Validation des poids (20-200 kg) et tailles (80-220 cm)
- Génération automatique de numéros de licence et reçus

## 📊 Fonctionnalités Avancées

- **Export CSV** de toutes les données
- **Export PDF** de documents officiels
- **Import/Export JSON** pour sauvegarde/restauration
- **Recherche globale** avec raccourci clavier
- **Notifications toast** pour feedback utilisateur
- **Comptes à rebours** en temps réel pour compétitions
- **Mode Kiosk** pour borne de pointage automatique
- **Confettis** de célébration pour réussites

## 🎯 Standards FITKD & Kukkiwon

- Seuil d'assiduité fédéral : **75% minimum**
- Objectif club : **85%**
- Catégories d'âge réglementaires : Poussins, Benjamins, Minimes, Cadets, Juniors, Seniors, Vétérans
- Barème de notation officiel WT sur 100 points
- Temps minimum de pratique requis entre les grades

## 📝 Licence

Application développée pour la **Confidence Sports Academy** - Dojang de Cocody, Abidjan, Côte d'Ivoire.

---

**Développé avec ❤️ pour le Taekwondo ivoirien**
