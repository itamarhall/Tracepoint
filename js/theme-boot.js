// ===== TRACEPOINT THEME BOOT =====
// No-flash theme initialization - must be loaded in <head> before CSS

(function() {
  'use strict';
  
  const LS_KEY = 'tp-theme';
  
  // Get initial theme preference
  function getInitialTheme() {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch (e) {
      // localStorage not available
    }
    
    // Fall back to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  
  // Apply theme immediately to prevent flash
  const theme = getInitialTheme();
  document.documentElement.setAttribute('data-theme', theme);
  
  // Set meta color-scheme for native UI elements
  const meta = document.createElement('meta');
  meta.name = 'color-scheme';
  meta.content = theme === 'dark' ? 'dark light' : 'light dark';
  document.head.appendChild(meta);
  
})();
