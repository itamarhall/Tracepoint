// ===== TRACEPOINT THEME SYSTEM =====
// Robust, no-flash theme toggle that works across all pages

(function() {
  'use strict';
  
  const LS_KEY = 'tp-theme';
  const root = document.documentElement;
  
  // Prevent multiple initializations
  if (window.tpThemeInitialized) return;
  window.tpThemeInitialized = true;
  
  // ===== THEME MANAGEMENT =====
  function getStoredTheme() {
    try {
      return localStorage.getItem(LS_KEY);
    } catch (e) {
      return null;
    }
  }
  
  function setStoredTheme(theme) {
    try {
      localStorage.setItem(LS_KEY, theme);
    } catch (e) {
      console.warn('Could not save theme preference:', e);
    }
  }
  
  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  
  function getInitialTheme() {
    const stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return getSystemTheme();
  }
  
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    
    // Update meta color-scheme for native UI elements
    let meta = document.querySelector('meta[name="color-scheme"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'color-scheme';
      document.head.appendChild(meta);
    }
    meta.content = theme === 'dark' ? 'dark light' : 'light dark';
    
    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: theme } 
    }));
  }
  
  function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const icon = theme === 'dark' ? '☀️' : '🌙';
    const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
    
    themeToggle.innerHTML = icon;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }
  
  function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    setStoredTheme(newTheme);
    updateThemeIcon(newTheme);
    
    // Add smooth transition
    root.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      root.style.transition = '';
    }, 300);
  }
  
  // ===== INITIALIZATION =====
  function initializeTheme() {
    const theme = getInitialTheme();
    applyTheme(theme);
    updateThemeIcon(theme);
  }
  
  function setupThemeToggle() {
    // Handle clicks on theme toggle button
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('[data-theme-toggle], #theme-toggle');
      if (toggle) {
        e.preventDefault();
        toggleTheme();
      }
    });
    
    // Handle keyboard activation
    document.addEventListener('keydown', (e) => {
      const toggle = document.activeElement;
      if (toggle && (toggle.id === 'theme-toggle' || toggle.hasAttribute('data-theme-toggle'))) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      }
    });
  }
  
  // ===== SYSTEM THEME CHANGES =====
  function setupSystemThemeListener() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't set a preference
        const stored = getStoredTheme();
        if (!stored || stored === 'auto') {
          const newTheme = e.matches ? 'dark' : 'light';
          applyTheme(newTheme);
          updateThemeIcon(newTheme);
        }
      });
    }
  }
  
  // ===== PUBLIC API =====
  window.TracepointTheme = {
    getCurrentTheme: () => root.getAttribute('data-theme') || 'light',
    setTheme: (theme) => {
      if (theme === 'light' || theme === 'dark') {
        applyTheme(theme);
        setStoredTheme(theme);
        updateThemeIcon(theme);
      }
    },
    toggle: toggleTheme,
    reset: () => {
      localStorage.removeItem(LS_KEY);
      const theme = getSystemTheme();
      applyTheme(theme);
      updateThemeIcon(theme);
    }
  };
  
  // ===== START =====
  // Initialize immediately to prevent flash
  initializeTheme();
  
  // Set up event listeners when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupThemeToggle();
      setupSystemThemeListener();
    });
  } else {
    setupThemeToggle();
    setupSystemThemeListener();
  }
  
})();
