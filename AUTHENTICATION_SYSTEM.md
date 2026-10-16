# 🔐 Système d'Authentification Multi-Utilisateurs

## 📋 Vue d'Ensemble

L'application CSA dispose maintenant d'un système de connexion complet pour **tous les types d'utilisateurs** :

1. 👨‍👩‍👧‍👦 **Parents** - Connexion via numéro de licence
2. 👑 **Administrateurs** - Connexion via email/mot de passe
3. 🥋 **Coachs** - Connexion via email/mot de passe
4. 💰 **Trésoriers** - Connexion via email/mot de passe

---

## 🚀 Flux de Connexion

### 1. Page d'Accueil (Landing Page)

L'utilisateur arrive sur la landing page et peut :
- Cliquer sur **"Espace Parent"** → Sélection de connexion
- Cliquer sur **"Accéder à l'Application"** → Sélection de connexion

### 2. Page de Sélection de Connexion

L'utilisateur choisit entre :

#### 👨‍👩‍👧‍👦 **Espace Parents**
- **Méthode** : Numéro de licence de l'enfant
- **Usage** : Le numéro sert de login ET mot de passe
- **Accès à** : Suivi des enfants, paiements, assiduité, événements

#### 👨‍💼 **Espace Staff**
- **Méthode** : Email + Mot de passe + Sélection du rôle
- **Usage** : Gestion administrative de l'académie
- **Accès à** : Toutes les fonctionnalités de gestion

---

## 👨‍👩‍👧‍👦 Connexion Parents

### Comment ça marche ?

1. Le parent entre le **numéro de licence** d'un de ses enfants
2. Le système identifie automatiquement le parent via le téléphone
3. Le parent accède à **tous ses enfants** liés au même numéro

### Exemple

```
Numéro de licence : CSA-1000001
↓
Système trouve : Kouassi Aya Marie
↓
Identifie le parent : +225 05 98 76 54 32
↓
Trouve tous les enfants avec ce téléphone
↓
Parent connecté à tous ses enfants
```

### Numéros de Test

| Numéro | Enfant | Parent |
|--------|--------|--------|
| CSA-1000001 | Kouassi Aya Marie | +225 05 98 76 54 32 |
| CSA-1000002 | Traoré Moussa | +225 01 23 45 67 89 |
| CSA-1000003 | Bamba Fatoumata | +225 05 34 56 78 90 |
| CSA-1000004 | Koné Ibrahim | +225 01 45 67 89 01 |
| CSA-1000005 | Diallo Aminata | +225 05 56 78 90 12 |

---

## 👨‍💼 Connexion Staff

### Comment ça marche ?

1. L'utilisateur sélectionne son **rôle** (Admin/Coach/Trésorier)
2. Il entre son **email** et **mot de passe**
3. Le système vérifie les identifiants
4. L'utilisateur accède à l'application avec ses permissions

### Comptes de Démonstration

#### 👑 Administrateur
```
Email : admin@csa.ci
Mot de passe : admin123
Accès : Complet (toutes les fonctionnalités)
```

#### 🥋 Coach
```
Email : coach@csa.ci
Mot de passe : coach123
Accès : Gestion des entraînements, assiduité, progressions
```

#### 💰 Trésorier
```
Email : tresorerie@csa.ci
Mot de passe : tresor123
Accès : Gestion financière, paiements, reçus
```

---

## 🎨 Interface Utilisateur

### Page de Sélection

```
┌─────────────────────────────────────────┐
│         🥋 CONFIDENCE SPORTS            │
│              ACADEMY                    │
│                                         │
│    Sélectionnez votre espace            │
│                                         │
│  ┌──────────────┐  ┌──────────────┐   │
│  │ 👨‍👩‍👧‍👦         │  │ 👨‍💼         │   │
│  │              │  │              │   │
│  │ Espace       │  │ Espace       │   │
│  │ Parents      │  │ Staff        │   │
│  │              │  │              │   │
│  │ ✓ Assiduité  │  │ ✓ Admin      │   │
│  │ ✓ Paiements  │  │ ✓ Coach      │   │
│  │ ✓ Événements │  │ ✓ Trésorier  │   │
│  │              │  │              │   │
│  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────┘
```

### Page de Connexion Parent

```
┌─────────────────────────────────────────┐
│         🥋 CONFIDENCE SPORTS            │
│         Portail Parents                 │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Numéro de Licence               │   │
│  │ ┌─────────────────────────────┐ │   │
│  │ │ CSA-1000001                 │ │   │
│  │ └─────────────────────────────┘ │   │
│  │                                 │   │
│  │ 💡 Le numéro sert de login      │   │
│  │    ET de mot de passe           │   │
│  │                                 │   │
│  │ [🔒 Se Connecter]               │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Page de Connexion Staff

```
┌─────────────────────────────────────────┐
│         🥋 CONFIDENCE SPORTS            │
│         Portail Staff                   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Type de compte                  │   │
│  │ ┌─────┐ ┌─────┐ ┌─────┐      │   │
│  │ │ 👑  │ │ 🥋  │ │ 💰  │      │   │
│  │ │Admin│ │Coach│ │Trés.│      │   │
│  │ └─────┘ └─────┘ └─────┘      │   │
│  │                                 │   │
│  │ Email                           │   │
│  │ ┌─────────────────────────────┐ │   │
│  │ │ admin@csa.ci                │ │   │
│  │ └─────────────────────────────┘ │   │
│  │                                 │   │
│  │ Mot de passe                    │   │
│  │ ┌─────────────────────────────┐ │   │
│  │ │ ••••••••                    │ │   │
│  │ └─────────────────────────────┘ │   │
│  │                                 │   │
│  │ [👤 Se Connecter]               │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## 🔒 Sécurité

### Parents
- ✅ Numéro de licence unique par enfant
- ✅ Lien automatique via téléphone parent
- ✅ Session persistante (localStorage)
- ✅ Déconnexion manuelle

### Staff
- ✅ Email + mot de passe
- ✅ Rôle spécifique (admin/coach/trésorier)
- ✅ Session persistante (localStorage)
- ✅ Déconnexion manuelle
- ✅ Affichage du rôle dans l'interface

---

## 📊 Permissions par Rôle

### 👑 Administrateur
- ✅ Accès complet à toutes les fonctionnalités
- ✅ Gestion des utilisateurs
- ✅ Configuration de l'académie
- ✅ Tous les rapports et statistiques

### 🥋 Coach
- ✅ Gestion des entraînements
- ✅ Pointage des présences
- ✅ Suivi des progressions
- ✅ Communication avec les parents
- ❌ Accès limité aux finances

### 💰 Trésorier
- ✅ Gestion des paiements
- ✅ Émission de reçus
- ✅ Relances automatiques
- ✅ Rapports financiers
- ❌ Accès limité aux entraînements

### 👨‍👩‍👧‍👦 Parent
- ✅ Suivi de ses enfants
- ✅ Consultation assiduité
- ✅ Historique des paiements
- ✅ Calendrier des événements
- ❌ Pas d'accès à la gestion

---

## 🔄 Gestion des Sessions

### Connexion
1. L'utilisateur se connecte
2. La session est sauvegardée dans `localStorage`
3. L'utilisateur est redirigé vers son espace

### Déconnexion
1. L'utilisateur clique sur "Déconnexion"
2. La session est supprimée du `localStorage`
3. Retour à la page de sélection

### Persistance
- ✅ Les sessions persistent après fermeture du navigateur
- ✅ Multi-appareils : chaque appareil a sa propre session
- ✅ Expiration : pas d'expiration automatique (à implémenter)

---

## 🛠️ Implémentation Technique

### Fichiers Principaux

```
src/components/
├── AuthContext.tsx          # Contexte d'authentification staff
├── ParentAuthContext.tsx    # Contexte d'authentification parent
├── LoginSelection.tsx       # Page de sélection
├── ParentLogin.tsx          # Connexion parent
├── StaffLogin.tsx           # Connexion staff
└── ParentPortalView.tsx     # Portail parent
```

### Structure des Données

#### User (Staff)
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'coach' | 'treasurer';
  avatar?: string;
}
```

#### Parent Session
```typescript
interface ParentSession {
  isAuthenticated: boolean;
  parentPhone: string;
  childrenIds: string[];
  loginTime: string;
}
```

---

## 🎯 Cas d'Usage

### Scénario 1 : Parent
1. Parent arrive sur le site
2. Clique sur "Espace Parent"
3. Entre le numéro de licence de son enfant
4. Accède au suivi de tous ses enfants

### Scénario 2 : Coach
1. Coach arrive sur le site
2. Clique sur "Espace Staff"
3. Sélectionne "Coach"
4. Entre email/mot de passe
5. Accède à la gestion des entraînements

### Scénario 3 : Trésorier
1. Trésorier arrive sur le site
2. Clique sur "Espace Staff"
3. Sélectionne "Trésorier"
4. Entre email/mot de passe
5. Accède à la gestion financière

### Scénario 4 : Administrateur
1. Admin arrive sur le site
2. Clique sur "Espace Staff"
3. Sélectionne "Administrateur"
4. Entre email/mot de passe
5. Accède à toutes les fonctionnalités

---

## 🚀 Améliorations Futures

### Court terme
- [ ] Mot de passe oublié (récupération par email)
- [ ] Validation des emails
- [ ] Changement de mot de passe
- [ ] Sessions avec expiration

### Moyen terme
- [ ] Authentification à deux facteurs (2FA)
- [ ] Journal de connexion
- [ ] Permissions granulaires
- [ ] Multi-académies

### Long terme
- [ ] Intégration OAuth (Google, Facebook)
- [ ] API REST pour mobile
- [ ] Notifications push
- [ ] Biométrie (empreinte, face ID)

---

## 📝 Notes Importantes

1. **Simplicité** : Le système est volontairement simple pour une adoption rapide
2. **Sécurité** : Les mots de passe sont en dur pour la démo (à hasher en production)
3. **Extensibilité** : L'architecture permet d'ajouter facilement de nouveaux rôles
4. **UX** : Interface intuitive avec feedback visuel clair

---

**Développé avec ❤️ pour la Confidence Sports Academy**  
**Abidjan, Côte d'Ivoire**
