// ===== TRACEPOINT - MAIN JAVASCRIPT =====

class TracepointApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupThemeToggle();
    this.setupTypingAnimation();
    this.setupSmoothScrolling();
    this.setupNavigation();
    this.setupAnimations();
    this.setupSearch();
    this.setupKeyboardShortcuts();
    this.setupLoadingStates();
  }

  // ===== THEME TOGGLE =====
  setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      this.updateThemeIcon(newTheme);
      
      // Add transition effect
      document.body.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    });
  }

  // ===== UNIVERSAL THEME TOGGLE (for pages without main.js) =====
  static setupUniversalThemeToggle() {
    // Check if theme toggle already exists
    if (window.themeToggleSetup) return;
    window.themeToggleSetup = true;

    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    TracepointApp.updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      TracepointApp.updateThemeIcon(newTheme);
      
      // Add transition effect
      document.body.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    });
  }

  static updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  }

  updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  }

  // ===== TYPING ANIMATION =====
  setupTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '2px solid #00ff00';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        } else {
          // Keep cursor blinking
          setInterval(() => {
            element.style.borderRight = element.style.borderRight === 'none' ? '2px solid #00ff00' : 'none';
          }, 500);
        }
      };
      
      // Start typing after a delay
      setTimeout(typeWriter, 1000);
    });
  }

  // ===== SMOOTH SCROLLING =====
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ===== NAVIGATION =====
  setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
      // Remove active class from all links
      link.classList.remove('active');
      
      // Add active class to current page
      if (link.getAttribute('href') === currentPath || 
          (currentPath === '/' && link.getAttribute('href') === './') ||
          (currentPath.endsWith(link.getAttribute('href').replace('./', '')) && link.getAttribute('href') !== './')) {
        link.classList.add('active');
      }
    });

    // Add hover effects
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
      });
      
      link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('active')) {
          link.style.transform = 'translateY(0)';
        }
      });
    });
  }

  // ===== ANIMATIONS =====
  setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all panels and terminal elements
    document.querySelectorAll('.panel, .terminal, .post').forEach(el => {
      observer.observe(el);
    });

    // Add hover effects to cards
    document.querySelectorAll('.panel, .terminal').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.7)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)';
      });
    });
  }

  // ===== SEARCH FUNCTIONALITY =====
  setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) return;

    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        if (searchResults) {
          searchResults.style.display = 'none';
        }
      }
    });
  }

  performSearch(query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults || !query.trim()) {
      if (searchResults) searchResults.style.display = 'none';
      return;
    }

    // Simple search implementation
    const searchableContent = document.querySelectorAll('h1, h2, h3, p, .post a');
    const results = [];

    searchableContent.forEach(element => {
      const text = element.textContent.toLowerCase();
      if (text.includes(query.toLowerCase())) {
        results.push({
          element: element,
          text: element.textContent,
          type: element.tagName.toLowerCase()
        });
      }
    });

    this.displaySearchResults(results, query);
  }

  displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;

    if (results.length === 0) {
      searchResults.innerHTML = '<p>No results found</p>';
    } else {
      const resultsHTML = results.slice(0, 5).map(result => `
        <div class="search-result-item">
          <h4>${result.type.toUpperCase()}</h4>
          <p>${this.highlightText(result.text, query)}</p>
        </div>
      `).join('');
      
      searchResults.innerHTML = resultsHTML;
    }
    
    searchResults.style.display = 'block';
  }

  highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // ===== KEYBOARD SHORTCUTS =====
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Escape to close modals/search
      if (e.key === 'Escape') {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
          searchResults.style.display = 'none';
        }
      }

      // Arrow keys for navigation (if on homepage)
      if (window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.scrollToNextSection();
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.scrollToPreviousSection();
        }
      }
    });
  }

  scrollToNextSection() {
    const sections = document.querySelectorAll('.terminal, .panel');
    const currentScroll = window.scrollY;
    
    for (let section of sections) {
      if (section.offsetTop > currentScroll + 100) {
        section.scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  }

  scrollToPreviousSection() {
    const sections = document.querySelectorAll('.terminal, .panel');
    const currentScroll = window.scrollY;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop < currentScroll - 100) {
        sections[i].scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  }

  // ===== LOADING STATES =====
  setupLoadingStates() {
    // Add loading animation to external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      link.addEventListener('click', () => {
        link.innerHTML = '<span class="loading"></span> Loading...';
      });
    });

    // Add loading state to forms
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.innerHTML = '<span class="loading"></span> Sending...';
          submitBtn.disabled = true;
          
          // Re-enable after 3 seconds (for demo purposes)
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 3000);
        }
      });
    });
  }

  // ===== UTILITY METHODS =====
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--card-bg);
      color: var(--text-secondary);
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid var(--accent-purple);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // ===== TERMINAL SIMULATION =====
  simulateTerminal() {
    const terminalElements = document.querySelectorAll('.terminal');
    
    terminalElements.forEach(terminal => {
      const commands = terminal.querySelectorAll('.command');
      commands.forEach((command, index) => {
        command.style.opacity = '0';
        command.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
          command.style.transition = 'all 0.5s ease';
          command.style.opacity = '1';
          command.style.transform = 'translateX(0)';
        }, index * 200);
      });
    });
  }
}

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
  new TracepointApp();
  
  // Add some terminal-style effects
  setTimeout(() => {
    const app = new TracepointApp();
    app.simulateTerminal();
  }, 500);
});

// ===== FALLBACK THEME TOGGLE (for all pages) =====
// This ensures theme toggle works even if main.js doesn't load properly
(function() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFallbackTheme);
  } else {
    initFallbackTheme();
  }

  function initFallbackTheme() {
    // Only run if TracepointApp hasn't already set up theme toggle
    if (window.themeToggleSetup) return;

    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      
      // Add transition effect
      document.body.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    });

    function updateThemeIcon(theme) {
      const themeToggle = document.getElementById('theme-toggle');
      if (!themeToggle) return;
      
      themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
  }
})();

// ===== ADDITIONAL UTILITIES =====

// Copy to clipboard functionality
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Show notification
    const notification = document.createElement('div');
    notification.textContent = 'Copied to clipboard!';
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--accent-purple);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      z-index: 1000;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 2000);
  });
}

// Add copy buttons to code blocks
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code').forEach(block => {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.className = 'copy-btn';
    button.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      background: var(--accent-purple);
      color: white;
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    `;
    
    const pre = block.parentElement;
    pre.style.position = 'relative';
    pre.appendChild(button);
    
    button.addEventListener('click', () => {
      copyToClipboard(block.textContent);
    });
  });
});


