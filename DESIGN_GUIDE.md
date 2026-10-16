# 🎨 Guide de Style Professionnel - CSA Taekwondo

## Philosophie de Design

L'application reflète un **professionnalisme de haut niveau** avec un design épuré, moderne et cohérent qui inspire confiance et expertise.

### Principes Directeurs

1. **Minimalisme** : Moins c'est plus. Chaque élément a une raison d'être.
2. **Cohérence** : Même langage visuel dans toute l'application.
3. **Hiérarchie claire** : L'information est structurée pour une lecture facile.
4. **Accessibilité** : Contrastes élevés, navigation intuitive.
5. **Performance** : Design léger et rapide.

---

## 🎨 Palette de Couleurs

### Couleurs Principales

```css
/* Rouge CSA - Couleur d'accent */
--csa-red: #9f0202;           /* Principal */
--csa-red-dark: #7a0101;      /* Hover/Active */
--csa-red-light: #b80303;     /* Light variant */

/* Neutres - Base de l'interface */
--csa-white: #ffffff;         /* Fond principal */
--csa-gray-50: #f5f5f5;       /* Fond secondaire */
--csa-gray-100: #e8e8e8;      /* Bordures légères */
--csa-gray-200: #d0d0d0;      /* Bordures */
--csa-gray-300: #aaaaaa;      /* Texte désactivé */
--csa-gray-400: #8a8a8a;      /* Texte secondaire */
--csa-gray-500: #6a6a6a;      /* Texte tertiaire */
--csa-gray-600: #4a4a4a;      /* Texte principal */
--csa-gray-700: #3a3a3a;      /* Texte important */
--csa-gray-800: #2a2a2a;      /* Titres */
--csa-gray-900: #1a1a1a;      /* Titres importants */
--csa-black: #0a0a0a;         /* Texte le plus important */
```

### Utilisation des Couleurs

#### Rouge CSA (#9f0202)
- **Usage** : Accent uniquement (5-10% de l'interface)
- **Éléments** :
  - Boutons d'action principaux
  - Icônes d'état important
  - Liens actifs
  - Indicateurs de notification
  - Titres accentués

#### Neutres (Gris/Blanc)
- **Usage** : Base de l'interface (90-95%)
- **Hiérarchie** :
  - Fond : Blanc (#ffffff) ou gris très clair (#f5f5f5)
  - Bordures : Gris clair (#e8e8e8, #d0d0d0)
  - Texte : Gris foncé (#1a1a1a à #6a6a6a)

---

## 📐 Système de Grille et Espacements

### Espacements

```css
--spacing-xs: 0.25rem;   /* 4px - Micro-espacements */
--spacing-sm: 0.5rem;    /* 8px - Petits espacements */
--spacing-md: 1rem;      /* 16px - Espacements standards */
--spacing-lg: 1.5rem;    /* 24px - Grands espacements */
--spacing-xl: 2rem;      /* 32px - Très grands espacements */
--spacing-2xl: 3rem;     /* 48px - Espacements de section */
```

### Rayons de Bordure

```css
--radius-sm: 0.25rem;    /* 4px - Petits éléments */
--radius-md: 0.5rem;     /* 8px - Boutons, inputs */
--radius-lg: 0.75rem;    /* 12px - Cartes */
--radius-xl: 1rem;       /* 16px - Grandes cartes */
```

### Ombres

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

**Règle** : Ombres subtiles, jamais excessives. Privilégier les bordures légères.

---

## 🔤 Typographie

### Police

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif;
```

### Hiérarchie

```css
/* Titres */
h1 { font-size: 2.5rem; font-weight: 600; letter-spacing: -0.025em; }
h2 { font-size: 2rem; font-weight: 600; letter-spacing: -0.025em; }
h3 { font-size: 1.5rem; font-weight: 600; }
h4 { font-size: 1.25rem; font-weight: 600; }
h5 { font-size: 1.125rem; font-weight: 600; }
h6 { font-size: 1rem; font-weight: 600; }

/* Texte courant */
body { font-size: 1rem; line-height: 1.6; }
small { font-size: 0.875rem; }
```

### Couleurs du Texte

- **Titres** : `#0a0a0a` (noir)
- **Texte principal** : `#1a1a1a` à `#3a3a3a` (gris très foncé)
- **Texte secondaire** : `#6a6a6a` (gris moyen)
- **Texte tertiaire** : `#8a8a8a` (gris clair)
- **Texte désactivé** : `#aaaaaa` (gris très clair)

---

## 🎯 Composants

### Boutons

#### Bouton Principal
```css
.btn-primary {
  background-color: #9f0202;
  color: #ffffff;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 250ms;
}

.btn-primary:hover {
  background-color: #7a0101;
}
```

#### Bouton Secondaire
```css
.btn-secondary {
  background-color: #ffffff;
  color: #1a1a1a;
  border: 1px solid #d0d0d0;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
}

.btn-secondary:hover {
  background-color: #f5f5f5;
  border-color: #aaaaaa;
}
```

#### Bouton Ghost
```css
.btn-ghost {
  background-color: transparent;
  color: #4a4a4a;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
}

.btn-ghost:hover {
  background-color: #f5f5f5;
}
```

### Cartes

```css
.card {
  background-color: #ffffff;
  border: 1px solid #d0d0d0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 250ms;
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-color: #aaaaaa;
}
```

### Inputs

```css
.input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  color: #1a1a1a;
  background-color: #ffffff;
  border: 1px solid #aaaaaa;
  border-radius: 0.5rem;
  transition: all 150ms;
}

.input:focus {
  outline: none;
  border-color: #9f0202;
  box-shadow: 0 0 0 3px rgba(159, 2, 2, 0.1);
}

.input::placeholder {
  color: #8a8a8a;
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 0.25rem;
}

.badge-primary {
  background-color: rgba(159, 2, 2, 0.1);
  color: #9f0202;
}

.badge-success {
  background-color: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.badge-warning {
  background-color: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.badge-danger {
  background-color: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.badge-neutral {
  background-color: #f5f5f5;
  color: #4a4a4a;
}
```

### Tableaux

```css
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.table thead {
  background-color: #f5f5f5;
  border-bottom: 2px solid #d0d0d0;
}

.table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #4a4a4a;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #d0d0d0;
  color: #1a1a1a;
}

.table tbody tr:hover {
  background-color: #f5f5f5;
}
```

---

## 🎭 Animations et Transitions

### Principes

1. **Subtiles** : Animations discrètes, jamais excessives
2. **Rapides** : 150ms à 350ms maximum
3. **Naturelles** : Courbes d'animation fluides
4. **Utiles** : Chaque animation a un but

### Transitions

```css
/* Rapide - pour les interactions */
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);

/* Standard - pour les changements d'état */
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);

/* Lent - pour les transitions de page */
--transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Animations

```css
/* Fade In - pour l'apparition d'éléments */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide In - pour les panneaux latéraux */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  /* Menu hamburger, grille 1 colonne */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Grille 2 colonnes */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Grille 3-4 colonnes, sidebar fixe */
}
```

### Principes

1. **Mobile First** : Concevoir d'abord pour mobile
2. **Progressive Enhancement** : Ajouter des fonctionnalités pour les grands écrans
3. **Touch-Friendly** : Zones de clic minimum 44x44px
4. **Lisible** : Taille de texte minimum 14px sur mobile

---

## ♿ Accessibilité

### Contrastes

- **Texte normal** : Ratio minimum 4.5:1
- **Texte large** : Ratio minimum 3:1
- **Éléments interactifs** : Ratio minimum 3:1

### Navigation

- **Focus visible** : Outline de 2px avec la couleur d'accent
- **Skip links** : Liens d'accès rapide pour les lecteurs d'écran
- **ARIA labels** : Labels descriptifs pour les éléments interactifs

### Couleurs

- **Ne jamais utiliser la couleur seule** pour transmettre une information
- **Toujours ajouter** une icône, un texte ou un motif

---

## 🎯 Patterns de Design

### Cards avec Actions

```tsx
<div className="bg-white rounded-lg p-6 border border-gray-200">
  <div className="flex items-center justify-between mb-4">
    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
      <Icon className="w-6 h-6 text-[#9f0202]" />
    </div>
  </div>
  <div>
    <p className="text-gray-500 text-sm font-medium mb-1">Label</p>
    <p className="text-3xl font-bold text-gray-900">Value</p>
  </div>
  <div className="mt-3 flex items-center text-green-600 text-sm font-medium">
    <TrendingUp className="w-4 h-4 mr-1" />
    <span>+2 ce mois</span>
  </div>
</div>
```

### Navigation Sidebar

```tsx
<nav className="flex-1 p-3 space-y-1 overflow-y-auto">
  {navItems.map(item => (
    <button
      key={item.key}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-[#9f0202]/10 text-[#9f0202]'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <item.icon className="w-5 h-5" />
      {item.label}
    </button>
  ))}
</nav>
```

### Header avec Actions

```tsx
<header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-6 py-3">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <h2 className="text-gray-900 font-semibold text-lg">Titre</h2>
      <p className="text-gray-500 text-xs">Sous-titre</p>
    </div>
    <div className="flex items-center gap-3">
      {/* Actions */}
    </div>
  </div>
</header>
```

---

## 🚫 Ce qu'il faut Éviter

### ❌ Erreurs Courantes

1. **Gradients excessifs** : Utiliser avec parcimonie, jamais sur toute la page
2. **Ombres trop prononcées** : Rester subtil, maximum `shadow-md`
3. **Trop de couleurs** : Maximum 3 couleurs par écran
4. **Animations excessives** : Subtiles et utiles uniquement
5. **Texte sur fond coloré** : Privilégier le texte foncé sur fond clair
6. **Bordures épaisses** : Maximum 2px, généralement 1px
7. **Icônes trop grandes** : Proportionnées au texte (16-24px)
8. **Espacements incohérents** : Utiliser le système d'espacements

### ✅ Bonnes Pratiques

1. **Espace blanc généreux** : Laisser respirer le contenu
2. **Hiérarchie claire** : Titres, sous-titres, texte courant
3. **Cohérence** : Même style partout
4. **Simplicité** : Moins c'est plus
5. **Lisibilité** : Contrastes élevés, tailles appropriées
6. **Performance** : Design léger et rapide
7. **Accessibilité** : Navigation au clavier, lecteurs d'écran

---

## 📊 Métriques de Qualité

### Performance

- **Lighthouse Score** : > 90
- **First Contentful Paint** : < 1.5s
- **Time to Interactive** : < 3s
- **Bundle Size** : < 500KB gzipped

### Accessibilité

- **Contraste** : WCAG AA minimum
- **Navigation clavier** : 100% des éléments accessibles
- **Screen readers** : ARIA labels complets
- **Focus visible** : Tous les éléments interactifs

### Design

- **Cohérence** : 100% des composants suivent le guide
- **Responsive** : Fonctionne sur tous les écrans
- **Internationalisation** : Support multilingue
- **Theming** : Variables CSS pour personnalisation

---

## 🎨 Exemples de Pages

### Landing Page

```
┌─────────────────────────────────────────┐
│  [Logo]  Accueil  Services  Contact     │  ← Navigation blanche
├─────────────────────────────────────────┤
│                                         │
│     Devenez le Meilleur                 │  ← Titre noir
│     Version de Vous-Même                │  ← Titre rouge
│                                         │
│     [Commencer]  [Découvrir]            │  ← Boutons
│                                         │
├─────────────────────────────────────────┤
│  250+    12    15    180+               │  ← Stats sur fond gris clair
│  Licenciés  Coachs  Ans  Médailles      │
├─────────────────────────────────────────┤
│                                         │
│     Nos Services                        │  ← Section blanche
│     ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│     │ 🎯  │ │ 🏆  │ │ 🛡️  │ │ ⚡  │   │  ← Cartes avec bordures
│     └─────┘ └─────┘ └─────┘ └─────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### Dashboard

```
┌──────────┬──────────────────────────────┐
│          │  Tableau de Bord             │  ← Header blanc
│  Logo    │  [Rechercher] [Notif] [Date] │
│          ├──────────────────────────────┤
│  Menu    │                              │
│  ─────   │  ┌────┐ ┌────┐ ┌────┐ ┌────┐│  ← KPI Cards blanches
│  📊 Dash │  │ 👥 │ │ 📈 │ │ 💰 │ │ 🏆 ││
│  👥 Memb │  │250 │ │ 85%│ │ 2M │ │ 15 ││
│  📅 Plan │  └────┘ └────┘ └────┘ └────┘│
│  💰 Pay  │                              │
│  ⚙️ Set  │  ┌──────────────────────┐   │
│          │  │  Graphique            │   │  ← Graphique sur fond blanc
│  [User]  │  │  ████████░░░░         │   │
│          │  └──────────────────────┘   │
└──────────┴──────────────────────────────┘
```

---

## 📝 Checklist de Conformité

### Avant de Publier

- [ ] Tous les textes ont un contraste suffisant
- [ ] Tous les boutons ont des états hover/focus
- [ ] Tous les inputs ont des labels
- [ ] Tous les icônes ont des labels ARIA si nécessaire
- [ ] Navigation au clavier fonctionnelle
- [ ] Responsive sur mobile, tablet, desktop
- [ ] Animations subtiles et utiles
- [ ] Espacements cohérents
- [ ] Typographie hiérarchisée
- [ ] Couleurs respectent la palette
- [ ] Ombres subtiles
- [ ] Bordures fines
- [ ] Pas de gradients excessifs
- [ ] Performance optimisée

---

## 🔄 Maintenance

### Mises à Jour

1. **Variables CSS** : Modifier dans `src/styles/design-system.css`
2. **Composants** : Suivre les patterns définis
3. **Tests** : Vérifier la cohérence sur tous les écrans
4. **Documentation** : Mettre à jour ce guide

### Ajout de Nouveaux Composants

1. Suivre les patterns existants
2. Utiliser les variables CSS
3. Respecter la hiérarchie visuelle
4. Tester l'accessibilité
5. Documenter l'utilisation

---

## 📚 Ressources

### Inspiration

- [Stripe Design System](https://stripe.com/blog/creating-a-design-system)
- [Linear App](https://linear.app)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Notion](https://notion.so)

### Outils

- [Figma](https://figma.com) - Design
- [Storybook](https://storybook.js.org) - Documentation
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance
- [axe DevTools](https://www.deque.com/axe/devtools/) - Accessibilité

---

**Dernière mise à jour** : Décembre 2024  
**Version** : 2.0.0  
**Auteur** : Confidence Sports Academy  
**Licence** : Propriétaire
