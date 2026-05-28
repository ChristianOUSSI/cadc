# 🌓 Système de Changement de Thème Automatique

## 📋 Description

Le site change automatiquement de thème selon l'heure de la journée:

- **🌅 JOUR (6h - 18h)** : Fond blanc, texte gris foncé
- **🌆 SOIRÉE (18h - 22h)** : Fond gris (#3a3a3a), texte blanc
- **🌙 NUIT (22h - 6h)** : Fond noir (#0c0c0c), texte blanc

## 🎨 Fichiers Créés/Modifiés

### Nouveaux Fichiers

1. **`assets/js/theme-switcher.js`**
   - Système principal de gestion des thèmes
   - Détecte automatiquement l'heure actuelle
   - Change de thème toutes les minutes
   - Supporte les transitions lisses

2. **`assets/css/theme-auto.css`**
   - Styles pour chaque thème
   - Variables CSS personnalisées
   - Transitions fluides entre les thèmes

### Fichiers Modifiés

3. **`index.html`**
   - Ajout du lien vers `theme-auto.css`
   - Ajout du script `theme-switcher.js`

## 🚀 Fonctionnement

### Initialisation Automatique
- Au chargement du site, le thème approprié est appliqué
- La classe CSS correspondante est ajoutée au `<body>`
- Les variables CSS sont définies

### Vérification Toutes les Minutes
```javascript
setInterval(() => {
  this.applyCurrentTheme();
}, 60000); // 60 secondes
```

### Transitions Lisses
- Lors du changement de thème, une classe `theme-transitioning` est ajoutée
- Tous les éléments reçoivent des transitions CSS fluides (0.3s)
- Après la transition, la classe est supprimée

## 💻 API JavaScript

### Accès à l'Instance ThemeSwitcher
```javascript
// L'instance est accessible globalement
window.themeSwitcher
```

### Méthodes Disponibles

#### `getThemeInfo()`
Retourne les informations du thème actuel:
```javascript
const info = window.themeSwitcher.getThemeInfo();
console.log(info);
// {
//   current: 'nuit',
//   time: '23:45',
//   colors: { ... }
// }
```

#### `forceTheme(themeName)`
Force un thème spécifique (utile pour tester):
```javascript
window.themeSwitcher.forceTheme('jour');
window.themeSwitcher.forceTheme('soirée');
window.themeSwitcher.forceTheme('nuit');
```

#### `getCurrentTheme()`
Retourne le thème basé sur l'heure actuelle:
```javascript
const theme = window.themeSwitcher.getCurrentTheme();
```

### Événements Personnalisés

Un événement `themeChanged` est déclenché à chaque changement de thème:
```javascript
document.addEventListener('themeChanged', (event) => {
  console.log('Thème changé:', event.detail.theme);
  console.log('Couleurs:', event.detail.colors);
  console.log('Heure:', event.detail.timestamp);
});
```

## 🎯 Variables CSS Disponibles

Les variables suivantes sont mises à jour selon le thème:

```css
--theme-background   /* Couleur de fond principal */
--theme-text         /* Couleur du texte */
--theme-accent       /* Couleur d'accent (toujours bleu) */
--theme-muted        /* Couleur pour les textes secondaires */
--theme-border       /* Couleur des bordures */
--theme-card         /* Couleur de fond des cartes */
--theme-shadow       /* Ombre personnalisée */
```

Exemple d'utilisation:
```css
.my-element {
  background-color: var(--theme-background);
  color: var(--theme-text);
}
```

## 🧪 Tester le Système

### Via la Console Navigateur

1. **Forcer le thème jour:**
```javascript
window.themeSwitcher.forceTheme('jour');
```

2. **Forcer le thème soirée:**
```javascript
window.themeSwitcher.forceTheme('soirée');
```

3. **Forcer le thème nuit:**
```javascript
window.themeSwitcher.forceTheme('nuit');
```

4. **Voir les infos actuelles:**
```javascript
console.log(window.themeSwitcher.getThemeInfo());
```

### Indicateur Visuel
Un petit indicateur en bas à droite du site affiche le thème actuel (en minuscule):
- `"jour"` pendant la journée
- `"soirée"` en soirée
- `"nuit"` la nuit

## 📱 Compatibilité

- ✅ Chrome/Edge (versions récentes)
- ✅ Firefox (versions récentes)
- ✅ Safari (versions récentes)
- ✅ Mobile (iOS et Android)

## 🔒 Notes de Sécurité

- Pas de données personnelles collectées
- Pas de requêtes réseau pour le thème
- Tout fonctionne localement dans le navigateur
- L'heure utilisée est celle du système client

## 📝 Exemple d'Utilisation Avancée

```javascript
// Écouter les changements de thème
document.addEventListener('themeChanged', (event) => {
  const { theme, colors } = event.detail;
  
  if (theme === 'nuit') {
    // Faire quelque chose la nuit
    console.log('Bonne nuit! 🌙');
  } else if (theme === 'jour') {
    // Faire quelque chose le jour
    console.log('Bonjour! 🌅');
  }
});

// Obtenir la couleur actuelle d'un élément
const bgColor = window.getComputedStyle(document.documentElement)
  .getPropertyValue('--theme-background');
console.log('Couleur de fond:', bgColor);
```

## 🛠️ Maintenance

Le système est très léger et nécessite peu de maintenance:

- **Mise à jour des heures** : Modifier `startHour` et `endHour` dans `theme-switcher.js`
- **Modification des couleurs** : Changer les valeurs dans l'objet `colors` de chaque thème
- **Ajout d'un nouveau thème** : Ajouter un objet dans `this.themes` et les styles CSS correspondants

## 🎨 Personnalisation des Couleurs

Pour modifier les couleurs d'un thème, éditez le fichier `assets/js/theme-switcher.js` et cherchez la section correspondante:

```javascript
day: {
  colors: {
    background: '#ffffff',  // <- Modifier ici
    text: '#1a1a1a',        // <- Ou ici
    // ...
  }
}
```

Puis mettez à jour les styles CSS correspondants dans `assets/css/theme-auto.css`.

---

**Version**: 1.0  
**Date de création**: 2026-01-04  
**Auteur**: Assistant IA
