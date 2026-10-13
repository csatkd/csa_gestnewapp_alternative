# 🔐 Système de Connexion Parent - Guide d'Utilisation

## 📋 Principe de Fonctionnement

Le système de connexion parent permet aux parents d'accéder au portail familial de la **Confidence Sports Academy** en utilisant le **numéro de licence de leur enfant** comme identifiant ET mot de passe.

## 🎯 Comment Ça Marche ?

### 1. **Identifiant Unique**
- Le numéro de licence de l'enfant (ex: `CSA-2024-001`) sert de **login unique**
- Ce même numéro sert de **mot de passe**
- Simple, sécurisé et facile à retenir pour les parents

### 2. **Authentification**
1. Le parent se rend sur le **Portail Famille**
2. Il entre le numéro de licence de son enfant
3. Le système vérifie si le numéro existe
4. Si valide, le parent est connecté et voit les informations de **tous ses enfants** (fratrie)

### 3. **Sécurité**
- Session persistante via `localStorage`
- Déconnexion manuelle possible
- Accès limité aux informations des enfants du parent connecté
- Pas de données sensibles exposées

## 🔑 Numéros de Licence de Test

Voici les numéros de licence disponibles pour tester le système :

| Numéro de Licence | Nom de l'Enfant | Parent (Téléphone) |
|-------------------|-----------------|-------------------|
| `CSA-2024-001` | Kouassi Aya Marie | +225 05 98 76 54 32 |
| `CSA-2024-002` | Traoré Moussa | +225 01 23 45 67 89 |
| `CSA-2024-003` | Bamba Fatoumata | +225 05 34 56 78 90 |
| `CSA-2024-004` | Koné Ibrahim | +225 01 45 67 89 01 |
| `CSA-2024-005` | Diallo Aminata | +225 05 56 78 90 12 |
| `CSA-2024-006` | Ouattara Seydou | +225 05 67 89 01 23 |
| `CSA-2024-007` | Yao Koffi | +225 05 78 90 12 34 |
| `CSA-2024-008` | Coulibaly Salimata | +225 05 89 01 23 45 |

## 📱 Fonctionnalités du Portail Parent

Une fois connecté, le parent peut :

### ✅ **Vue d'ensemble**
- Notifications en temps réel (arrivées au dojang, paiements, événements)
- Résumé du mois (séances suivies, retards, prochain grade, solde à payer)
- Contact rapide avec le coach ou pour paiement Mobile Money

### 📊 **Assiduité**
- Graphique d'assiduité sur 12 mois
- Derniers pointages avec statut (présent, retard, absent)
- Comparaison avec les seuils FITKD (75% minimum)

### 💰 **Paiements**
- Historique complet des paiements
- Suivi des cotisations et acomptes
- Barre de progression des paiements
- Bouton "Payer maintenant" pour les soldes restants

### 🏆 **Événements**
- Calendrier des compétitions à venir
- Compte à rebours en temps réel
- Statut d'inscription de l'enfant
- Palmarès des médailles

## 🔄 Gestion de la Session

### **Connexion**
- Le parent entre le numéro de licence
- La session est sauvegardée dans le navigateur
- Le parent peut fermer et rouvrir le navigateur sans se reconnecter

### **Déconnexion**
- Bouton "Déconnexion" en haut à droite du portail
- Supprime la session du localStorage
- Redirige vers la page de connexion

### **Multi-Enfants**
- Si un parent a plusieurs enfants inscrits avec le même numéro de téléphone
- Un sélecteur permet de basculer entre les enfants
- Toutes les informations sont filtrées par enfant sélectionné

## 🛡️ Sécurité et Confidentialité

### **Données Protégées**
- Seuls les enfants liés au numéro de téléphone du parent sont visibles
- Pas d'accès aux données des autres familles
- Session limitée au navigateur utilisé

### **Bonnes Pratiques**
- Ne pas partager son numéro de licence
- Se déconnecter sur les appareils partagés
- Vérifier régulièrement les informations affichées

## 💡 Cas d'Usage

### **Cas 1 : Parent avec un seul enfant**
1. Connexion avec le numéro de licence de l'enfant
2. Accès direct aux informations de cet enfant
3. Pas de sélecteur d'enfant affiché

### **Cas 2 : Parent avec plusieurs enfants (fratrie)**
1. Connexion avec le numéro de licence d'un des enfants
2. Le système détecte tous les enfants avec le même numéro de téléphone parent
3. Un sélecteur permet de basculer entre les enfants
4. Toutes les informations sont mises à jour selon l'enfant sélectionné

### **Cas 3 : Numéro de licence invalide**
1. Le parent entre un numéro incorrect
2. Message d'erreur affiché : "Numéro de licence invalide"
3. Le parent reste sur la page de connexion
4. Il peut réessayer ou contacter le secrétariat

## 🔧 Configuration Technique

### **Fichiers Impliqués**
- `src/components/ParentAuthContext.tsx` - Contexte d'authentification
- `src/components/ParentLogin.tsx` - Page de connexion
- `src/components/ParentPortalView.tsx` - Portail familial
- `src/App.tsx` - Intégration du système

### **Structure des Données**
```typescript
interface ParentAuthContextType {
  isAuthenticated: boolean;
  parentPhone: string | null;
  childrenIds: string[];
  login: (licenseNumber: string) => boolean;
  logout: () => void;
}
```

### **Stockage**
- Session sauvegardée dans `localStorage` sous la clé `csa_parent_session`
- Contient : `isAuthenticated`, `parentPhone`, `childrenIds`, `loginTime`
- Supprimé automatiquement lors de la déconnexion

## 🚀 Améliorations Futures Possibles

1. **Récupération de mot de passe** via SMS/Email
2. **Authentification à deux facteurs** (2FA)
3. **Notifications push** pour les événements importants
4. **Historique de connexion** pour le parent
5. **Modification du mot de passe** par le parent
6. **Accès aux documents** (certificats, diplômes)
7. **Messagerie interne** avec les coaches

## 📞 Support

En cas de problème de connexion :
- Vérifier le numéro de licence sur la carte de membre
- Contacter le secrétariat de la CSA
- Email : contact@csa-taekwondo.ci
- Téléphone : +225 XX XX XX XX XX

---

**Développé pour la Confidence Sports Academy - Abidjan, Côte d'Ivoire**  
**Système sécurisé et conforme aux standards de protection des données**
