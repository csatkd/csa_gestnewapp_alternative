# 🎨 Guide de Migration vers les Couleurs CSA Officielles

## Couleur Officielle
**Rouge CSA** : `#9f0202`

## Remplacement Systématique

### Dans les fichiers TSX

Remplacez toutes les occurrences de :

| Ancienne couleur | Nouvelle couleur |
|-----------------|------------------|
| `red-500` | `[#9f0202]` |
| `red-600` | `[#9f0202]` |
| `red-700` | `[#7a0101]` |
| `red-800` | `[#7a0101]` |
| `red-400` | `[#b80303]` |
| `red-300` | `[#b80303]` |

### Exemples de Remplacement

#### Avant :
```tsx
<div className="bg-red-500/20 border border-red-500/30">
  <p className="text-red-500">Texte rouge</p>
</div>
```

#### Après :
```tsx
<div className="bg-[#9f0202]/20 border border-[#9f0202]/30">
  <p className="text-[#9f0202]">Texte rouge</p>
</div>
```

### Utilisation des Classes Utilitaires

Vous pouvez également utiliser les classes utilitaires définies dans `src/utils/csaColors.ts` :

```tsx
import { csaClasses } from '../utils/csaColors';

<div className={`${csaClasses.bgRedOpacity20} ${csaClasses.borderRedOpacity30}`}>
  <p className={csaClasses.textRed}>Texte rouge</p>
</div>
```

### Fichiers à Mettre à Jour

Les fichiers suivants contiennent encore des occurrences de `red-500`, `red-600`, etc. :

1. ✅ `LandingPage.tsx` - Mis à jour
2. ✅ `App.tsx` - Mis à jour
3. ✅ `DashboardView.tsx` - Mis à jour
4. ⚠️ `Communication.tsx` - 4 occurrences
5. ⚠️ `AttendanceView.tsx` - 4 occurrences
6. ⚠️ `PaymentsView.tsx` - 8 occurrences
7. ⚠️ `DataManagement.tsx` - 3 occurrences
8. ⚠️ `InventoryView.tsx` - 6 occurrences
9. ⚠️ `MemberCardManagement.tsx` - 3 occurrences
10. ⚠️ `ParentPortalView.tsx` - 4 occurrences
11. ⚠️ `ParentLogin.tsx` - 1 occurrence
12. ⚠️ `CoachAttendance.tsx` - 4 occurrences
13. ⚠️ `IncidentTracker.tsx` - 7 occurrences
14. ⚠️ `ErrorBoundary.tsx` - 2 occurrences
15. ⚠️ `NotificationsPanel.tsx` - 2 occurrences
16. ⚠️ `MembersView.tsx` - 4 occurrences
17. ⚠️ `TrialClasses.tsx` - 1 occurrence
18. ⚠️ `AdvancedStats.tsx` - 3 occurrences
19. ⚠️ `TechnicalProgress.tsx` - 1 occurrence
20. ⚠️ `TrainingSchedule.tsx` - 2 occurrences
21. ⚠️ `PaymentBookletView.tsx` - 1 occurrence
22. ⚠️ `GradingView.tsx` - 3 occurrences
23. ⚠️ `BookingSystem.tsx` - 2 occurrences
24. ⚠️ `AddMemberModal.tsx` - 1 occurrence
25. ⚠️ `Toast.tsx` - 1 occurrence
26. ⚠️ `SecretariatAttendanceView.tsx` - 3 occurrences
27. ⚠️ `ShopManagement.tsx` - 1 occurrence
28. ⚠️ `InscriptionManagement.tsx` - 1 occurrence
29. ⚠️ `InteractiveCalendar.tsx` - 2 occurrences
30. ⚠️ `ReceiptPrinter.tsx` - 1 occurrence
31. ⚠️ `MonthlyPaymentsView.tsx` - 6 occurrences
32. ⚠️ `VideoLibrary.tsx` - 1 occurrence

## Commande de Remplacement (Regex)

Pour remplacer automatiquement dans VS Code ou un éditeur similaire :

### Rechercher :
```
red-(300|400|500|600|700|800)
```

### Remplacer par :
```
#9f0202
```

### Pour les variations avec opacité :
```
red-(300|400|500|600|700|800)/(\d+)
```

### Remplacer par :
```
#9f0202/$2
```

## Vérification

Après le remplacement, vérifiez que :
- ✅ Aucune occurrence de `red-500`, `red-600`, etc. ne reste
- ✅ Le build compile sans erreur
- ✅ Les couleurs sont cohérentes dans toute l'application
- ✅ Le rouge officiel #9f0202 est utilisé partout

## Notes Importantes

1. **Cohérence** : Utilisez toujours `#9f0202` pour le rouge principal
2. **Variations** : Utilisez `#7a0101` pour les variations sombres et `#b80303` pour les variations claires
3. **Opacité** : Conservez les niveaux d'opacité (10, 20, 30, etc.)
4. **Accessibilité** : Le contraste reste excellent avec le noir et le blanc

## Ressources

- Fichier de configuration : `src/utils/csaColors.ts`
- Variables CSS : `src/index.css`
- Documentation : `FINAL_SUMMARY.md`

---

**Dernière mise à jour** : Décembre 2024  
**Couleur officielle** : Rouge CSA `#9f0202`
