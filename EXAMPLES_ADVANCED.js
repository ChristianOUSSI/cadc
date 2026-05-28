/**
 * 📚 EXEMPLES D'UTILISATION AVANCÉE - Système de Thème Automatique
 * 
 * Ce fichier contient des exemples pratiques pour utiliser le système
 * de thème automatique de manière avancée.
 */

// ============================================
// 1. ÉCOUTER LES CHANGEMENTS DE THÈME
// ============================================

/**
 * Exemple 1: Déclencher du code lors d'un changement de thème
 */
document.addEventListener('themeChanged', (event) => {
  const { theme, colors, timestamp } = event.detail;
  
  console.log(`🎨 Le thème a changé: ${theme}`);
  console.log(`🕐 À ${timestamp.toLocaleTimeString('fr-FR')}`);
  console.log(`🎨 Nouvelles couleurs:`, colors);
  
  // Faire quelque chose selon le thème
  if (theme === 'nuit') {
    console.log('💤 Bonne nuit! Passe au thème sombre.');
    // Peut démarrer une animation spéciale la nuit
  } else if (theme === 'jour') {
    console.log('☀️ Bonjour! Passe au thème clair.');
    // Peut afficher une notification le matin
  }
});


// ============================================
// 2. OBTENIR LES INFOS DU THÈME ACTUEL
// ============================================

/**
 * Exemple 2: Récupérer les informations du thème
 */
function afficherInfosTheme() {
  const info = window.themeSwitcher.getThemeInfo();
  
  console.log('=== INFORMATIONS DU THÈME ===');
  console.log('Thème actuel:', info.current);
  console.log('Heure:', info.time);
  console.log('Couleurs:');
  
  Object.entries(info.colors).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
}


// ============================================
// 3. UTILISER LES VARIABLES CSS
// ============================================

/**
 * Exemple 3: Accéder aux variables CSS dans du code JavaScript
 */
function afficherCouleursDynamiques() {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  
  // Récupérer les valeurs actuelles des variables CSS
  const bgColor = styles.getPropertyValue('--theme-background').trim();
  const textColor = styles.getPropertyValue('--theme-text').trim();
  const accentColor = styles.getPropertyValue('--theme-accent').trim();
  
  console.log('Couleur de fond:', bgColor);
  console.log('Couleur du texte:', textColor);
  console.log('Couleur d\'accent:', accentColor);
  
  // Utiliser ces couleurs pour créer quelque chose dynamiquement
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = accentColor;
  ctx.fillRect(0, 0, 100, 100);
}


// ============================================
// 4. FORCER UN THÈME POUR TEST
// ============================================

/**
 * Exemple 4: Ajouter des boutons pour tester les thèmes
 */
function creerBoutonsTeste() {
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    gap: 10px;
  `;
  
  ['jour', 'soirée', 'nuit'].forEach(theme => {
    const btn = document.createElement('button');
    btn.textContent = theme;
    btn.style.cssText = `
      padding: 10px 15px;
      background: var(--theme-accent);
      color: var(--theme-background);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    `;
    btn.onclick = () => window.themeSwitcher.forceTheme(theme);
    container.appendChild(btn);
  });
  
  document.body.appendChild(container);
}


// ============================================
// 5. SYNCHRONISER UN ÉLÉMENT AVEC LE THÈME
// ============================================

/**
 * Exemple 5: Faire un élément qui change avec le thème
 */
class ElementSynchronise {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.initialiserEcouteurs();
    this.mettreAJour();
  }
  
  initialiserEcouteurs() {
    // Écouter les changements de thème
    document.addEventListener('themeChanged', () => this.mettreAJour());
    
    // Mettre à jour aussi si on force un thème
    const originalForce = window.themeSwitcher.forceTheme;
    window.themeSwitcher.forceTheme = (theme) => {
      originalForce.call(window.themeSwitcher, theme);
      this.mettreAJour();
    };
  }
  
  mettreAJour() {
    const info = window.themeSwitcher.getThemeInfo();
    
    // Appliquer un style selon le thème
    if (info.current === 'jour') {
      this.element.className = 'theme-jour';
    } else if (info.current === 'soirée') {
      this.element.className = 'theme-soirée';
    } else {
      this.element.className = 'theme-nuit';
    }
  }
}

// Utilisation:
// const sync = new ElementSynchronise('#mon-element');


// ============================================
// 6. AFFICHER L'HEURE ET LE THÈME EN TEMPS RÉEL
// ============================================

/**
 * Exemple 6: Horloge avec indication du thème
 */
class HorlageAvecTheme {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.demarrer();
  }
  
  demarrer() {
    setInterval(() => this.afficherHeure(), 1000);
  }
  
  afficherHeure() {
    const now = new Date();
    const heures = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const secondes = String(now.getSeconds()).padStart(2, '0');
    
    const theme = window.themeSwitcher.getCurrentTheme().name;
    const emoji = this.getEmoji(theme);
    
    this.element.textContent = `${emoji} ${heures}:${minutes}:${secondes}`;
  }
  
  getEmoji(theme) {
    switch(theme) {
      case 'jour': return '☀️';
      case 'soirée': return '🌆';
      case 'nuit': return '🌙';
      default: return '⏰';
    }
  }
}

// Utilisation:
// const horloge = new HorlageAvecTheme('#mon-horloge');


// ============================================
// 7. PERSONNALISER LE CHANGEMENT AUTOMATIQUE
// ============================================

/**
 * Exemple 7: Ajouter des notifications lors du changement de thème
 */
class NotifChangementTheme {
  constructor() {
    document.addEventListener('themeChanged', (e) => this.afficherNotif(e.detail));
  }
  
  afficherNotif(detail) {
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: var(--theme-accent);
      color: var(--theme-background);
      border-radius: 4px;
      z-index: 10001;
      animation: slideIn 0.3s ease-out;
      font-weight: bold;
    `;
    
    const messages = {
      'jour': '☀️ Passage en mode JOUR',
      'soirée': '🌆 Passage en mode SOIRÉE',
      'nuit': '🌙 Passage en mode NUIT'
    };
    
    notif.textContent = messages[detail.theme] || 'Thème changé';
    document.body.appendChild(notif);
    
    // Supprimer après 3 secondes
    setTimeout(() => notif.remove(), 3000);
  }
}

// Utilisation:
// new NotifChangementTheme();


// ============================================
// 8. TRACKER LES CHANGEMENTS DE THÈME
// ============================================

/**
 * Exemple 8: Garder un historique des changements de thème
 */
class HistoriqueTheme {
  constructor() {
    this.historique = [];
    this.initialiser();
  }
  
  initialiser() {
    document.addEventListener('themeChanged', (e) => {
      this.ajouter(e.detail);
    });
  }
  
  ajouter(detail) {
    this.historique.push({
      theme: detail.theme,
      timestamp: detail.timestamp,
      heure: detail.timestamp.toLocaleTimeString('fr-FR')
    });
    
    console.log(`📝 Changement #${this.historique.length}: ${detail.theme} à ${detail.timestamp.toLocaleTimeString()}`);
  }
  
  afficherHistorique() {
    console.table(this.historique);
  }
}

// Utilisation:
// const hist = new HistoriqueTheme();
// hist.afficherHistorique();


// ============================================
// 9. DÉTECTER QUAND ON EST PASSÉ À UN THÈME SPÉCIFIQUE
// ============================================

/**
 * Exemple 9: Faire une action spécifique la nuit
 */
function quandNuitArrive() {
  document.addEventListener('themeChanged', (event) => {
    if (event.detail.theme === 'nuit') {
      console.log('🌙 C\'est la nuit! On peut faire des choses spéciales...');
      
      // Exemple: désactiver certaines animations coûteuses
      document.body.style.animation = 'none';
      
      // Exemple: reduire la luminosité
      document.body.style.opacity = '0.95';
      
      // Exemple: charger des ressources plus légères
      console.log('Chargement des ressources légères pour la nuit...');
    }
  });
}


// ============================================
// 10. COMBINER AVEC D'AUTRES DONNÉES
// ============================================

/**
 * Exemple 10: Adapter le thème en fonction de la météo ET l'heure
 */
async function themeAdapteMeteo() {
  // Récupérer la météo (exemple simplifié)
  const estNuageux = Math.random() > 0.5;
  const theme = window.themeSwitcher.getCurrentTheme();
  
  if (estNuageux && theme.name === 'jour') {
    console.log('⛅ Jour nuageux detecté, on assombrit un peu...');
    // Appliquer une classe CSS spéciale
    document.body.classList.add('weather-cloudy');
  }
}


// ============================================
// INITIALISATION DES EXEMPLES
// ============================================

/**
 * Activez les exemples dont vous avez besoin en décommentant:
 */

// Afficher les infos du thème toutes les 30 secondes
// setInterval(afficherInfosTheme, 30000);

// Ajouter des boutons de test
// Si vous êtes en développement:
// if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
//   creerBoutonsTeste();
//   new NotifChangementTheme();
// }

// Activer la synchronisation d'éléments
// const sync1 = new ElementSynchronise('#navbar');
// const sync2 = new ElementSynchronise('#footer');

// Activer l'horloge
// const horloge = new HorlageAvecTheme('#ma-horloge');

// Tracker l'historique
// const histTracker = new HistoriqueTheme();

// Afficher des infos la nuit
// quandNuitArrive();


// ============================================
// NOTES IMPORTANTES
// ============================================

/**
 * - Ces exemples sont optionnels et à titre informatif
 * - Le système fonctionne parfaitement sans eux
 * - Adaptez-les selon vos besoins
 * - Testez dans la console (F12) en premier
 * - N'oubliez pas de vérifier window.themeSwitcher.getThemeInfo() au préalable
 */
