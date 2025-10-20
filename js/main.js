// ===== TRACEPOINT - MAIN JAVASCRIPT =====

class TracepointApp {
  constructor() {
    this.init();
  }

  init() {
		this.enforceCSSMaster();
    this.setupThemeToggle();
    this.setupTypingAnimation();
    this.setupSmoothScrolling();
    this.setupNavigation();
    this.setupAnimations();
		this.setupTiltEffects();
    this.setupSearch();
    this.setupKeyboardShortcuts();
    this.setupLoadingStates();
  }

  // ===== CSS ENFORCEMENT =====
  enforceCSSMaster() {
    // Force CSS to be the master by removing conflicting inline styles
    // and ensuring our CSS variables take precedence
    
    // Remove any conflicting inline styles from body and html
    document.body.removeAttribute('style');
    document.documentElement.removeAttribute('style');
    
    // Force apply our CSS variables with !important
    const style = document.createElement('style');
    style.textContent = `
      /* Force CSS Master - Override everything */
      :root:not([data-theme="light"]) {
        --bg-primary: #1a0d2e !important;
        --bg-secondary: #2d1b69 !important;
        --bg-accent: #4a148c !important;
        --text-primary: #4ade80 !important;
        --text-secondary: #e2e8f0 !important;
        --text-muted: #94a3b8 !important;
        --accent-purple: #8b5cf6 !important;
        --accent-purple-light: rgba(139, 92, 246, 0.15) !important;
        --accent-purple-border: rgba(139, 92, 246, 0.35) !important;
        --card-bg: rgba(0, 0, 0, 0.7) !important;
        --gradient-bg: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary), var(--bg-accent)) !important;
        --gradient-header: linear-gradient(135deg, var(--bg-secondary), var(--bg-accent)) !important;
        --gradient-footer: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary)) !important;
      }
      
      :root[data-theme="light"] {
        --bg-primary: #ffffff !important;
        --bg-secondary: #f8f9fa !important;
        --bg-accent: #e9ecef !important;
        --text-primary: #1a4d1a !important;
        --text-secondary: #000000 !important;
        --text-muted: #333333 !important;
        --accent-purple: #6f42c1 !important;
        --accent-purple-light: rgba(111, 66, 193, 0.15) !important;
        --accent-purple-border: rgba(111, 66, 193, 0.4) !important;
        --card-bg: rgba(255, 255, 255, 0.98) !important;
        --gradient-bg: linear-gradient(135deg, #ffffff, #f8f9fa, #e9ecef) !important;
        --gradient-header: linear-gradient(135deg, #f8f9fa, #e9ecef) !important;
        --gradient-footer: linear-gradient(135deg, #e9ecef, #ffffff) !important;
        --shadow-card: 0 4px 15px rgba(0, 0, 0, 0.08) !important;
        --shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.12) !important;
        --shadow-text: 0 0 8px rgba(26, 77, 26, 0.6) !important;
      }
      
      html, body {
        font-family: 'Courier New', 'Fira Code', 'JetBrains Mono', monospace !important;
        background: var(--gradient-bg) !important;
        color: var(--text-primary) !important;
        text-align: left !important;
        line-height: 1.6 !important;
        overflow-x: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      /* Force header styling */
      header {
        background: var(--gradient-header) !important;
        padding: var(--spacing-lg) !important;
        text-align: center !important;
        position: sticky !important;
        top: 0 !important;
        z-index: 100 !important;
        backdrop-filter: blur(10px) !important;
        border-bottom: 2px solid var(--accent-purple-border) !important;
      }
      
      header h1 {
        margin-bottom: var(--spacing-sm) !important;
        font-size: 2.5rem !important;
        text-shadow: 0 0 20px rgba(0, 255, 0, 0.5) !important;
        animation: glow 2s ease-in-out infinite alternate !important;
        color: var(--text-secondary) !important;
        font-weight: 700 !important;
      }
      
      /* Force terminal styling */
      .terminal, .panel {
        background: var(--card-bg) !important;
        padding: var(--spacing-lg) !important;
        border-radius: var(--radius-lg) !important;
        margin: var(--spacing-lg) auto !important;
        max-width: 900px !important;
        box-shadow: var(--shadow-card) !important;
        border: var(--border-dashed) !important;
        position: relative !important;
        overflow: hidden !important;
        transition: all var(--transition-normal) !important;
      }
      
      .terminal::before, .panel::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 2px !important;
        background: linear-gradient(90deg, var(--accent-purple), var(--text-primary), var(--accent-purple)) !important;
      }
      
      .command {
        color: var(--text-primary) !important;
        margin-bottom: var(--spacing-xs) !important;
        font-weight: bold !important;
        text-shadow: 0 0 2px rgba(0, 255, 0, 0.1) !important;
      }
      
      .output {
        color: var(--text-secondary) !important;
        margin: 0 0 var(--spacing-md) 0 !important;
        line-height: 1.6 !important;
      }
      
      .blink {
        animation: blink 1s infinite !important;
        color: var(--text-primary) !important;
      }
      
      /* Force navigation styling */
      nav {
        display: flex !important;
        justify-content: center !important;
        gap: var(--spacing-lg) !important;
        flex-wrap: wrap !important;
      }
      
      nav a {
        color: var(--accent-purple) !important;
        font-weight: bold !important;
        padding: var(--spacing-sm) var(--spacing-md) !important;
        border-radius: var(--radius-md) !important;
        transition: all var(--transition-normal) !important;
        position: relative !important;
        overflow: hidden !important;
        text-decoration: none !important;
        border-bottom: var(--border-dotted) !important;
      }
      
      nav a:hover, nav a.active {
        color: var(--text-secondary) !important;
        background: var(--accent-purple-light) !important;
        border-bottom: none !important;
        transform: translateY(-2px) !important;
        box-shadow: var(--shadow-hover) !important;
      }
      
      /* Force footer styling */
      footer {
        background: var(--gradient-footer) !important;
        padding: var(--spacing-lg) !important;
        text-align: center !important;
        color: var(--text-secondary) !important;
        margin-top: var(--spacing-xxl) !important;
        border-top: 2px solid var(--accent-purple-border) !important;
      }
      
      /* Force theme toggle styling */
      .theme-toggle {
        position: fixed !important;
        top: var(--spacing-lg) !important;
        right: var(--spacing-lg) !important;
        background: var(--card-bg) !important;
        border: 1px solid var(--accent-purple) !important;
        border-radius: var(--radius-full) !important;
        width: 50px !important;
        height: 50px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        transition: all var(--transition-normal) !important;
        z-index: 1000 !important;
      }
      
      .theme-toggle:hover {
        background: var(--accent-purple) !important;
        transform: scale(1.1) !important;
      }
      
      /* Force all text elements */
      h1, h2, h3, h4, h5, h6 {
        color: var(--text-secondary) !important;
        margin-bottom: var(--spacing-md) !important;
        font-weight: 700 !important;
      }
      
      p {
        margin-bottom: var(--spacing-md) !important;
        color: var(--text-secondary) !important;
      }
      
      a {
        color: var(--accent-purple) !important;
        text-decoration: none !important;
        border-bottom: var(--border-dotted) !important;
        transition: all var(--transition-normal) !important;
      }
      
      a:hover {
        color: var(--text-secondary) !important;
        border-bottom-color: var(--text-secondary) !important;
        text-shadow: var(--shadow-text) !important;
      }
      
      /* Force code styling */
      code {
        background: rgba(138, 43, 226, 0.15) !important;
        color: #e0e0e0 !important;
        padding: 2px 6px !important;
        border-radius: 3px !important;
        border: 1px solid rgba(138, 43, 226, 0.4) !important;
        font-family: "Courier New", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace !important;
        font-size: 0.9em !important;
        font-weight: 500 !important;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.3) !important;
        box-shadow: 0 0 8px rgba(138, 43, 226, 0.1) !important;
      }
      
      pre {
        background: #000 !important;
        color: var(--text-primary) !important;
        padding: 1.5rem !important;
        border-radius: var(--radius-md) !important;
        overflow-x: auto !important;
        border: 1px solid var(--accent-purple-border) !important;
        margin: 1rem 0 !important;
        font-family: "Fira Code", "Courier New", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace !important;
        font-size: 0.9rem !important;
        line-height: 1.5 !important;
        position: relative !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
      }
      
      /* Force animations */
      @keyframes glow {
        from { text-shadow: 0 0 20px rgba(0, 255, 0, 0.5); }
        to { text-shadow: 0 0 30px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.3); }
      }
      
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    
    // Insert the style at the beginning of head to ensure it loads first
    document.head.insertBefore(style, document.head.firstChild);
    
    // Also force apply styles after a short delay to override any late-loading styles
    setTimeout(() => {
      this.forceApplyStyles();
    }, 100);
  }
  
  forceApplyStyles() {
    // Force apply critical styles to ensure they take precedence
    const elements = document.querySelectorAll('body, header, .terminal, .panel, nav, footer, .theme-toggle');
    elements.forEach(el => {
      if (el.tagName === 'BODY') {
        el.style.setProperty('font-family', "'Courier New', 'Fira Code', 'JetBrains Mono', monospace", 'important');
        el.style.setProperty('background', 'var(--gradient-bg)', 'important');
        el.style.setProperty('color', 'var(--text-primary)', 'important');
      }
      
      if (el.tagName === 'HEADER') {
        el.style.setProperty('background', 'var(--gradient-header)', 'important');
        el.style.setProperty('padding', 'var(--spacing-lg)', 'important');
        el.style.setProperty('text-align', 'center', 'important');
        el.style.setProperty('position', 'sticky', 'important');
        el.style.setProperty('top', '0', 'important');
        el.style.setProperty('z-index', '100', 'important');
        el.style.setProperty('backdrop-filter', 'blur(10px)', 'important');
        el.style.setProperty('border-bottom', '2px solid var(--accent-purple-border)', 'important');
      }
      
      if (el.classList.contains('terminal') || el.classList.contains('panel')) {
        el.style.setProperty('background', 'var(--card-bg)', 'important');
        el.style.setProperty('padding', 'var(--spacing-lg)', 'important');
        el.style.setProperty('border-radius', 'var(--radius-lg)', 'important');
        el.style.setProperty('margin', 'var(--spacing-lg) auto', 'important');
        el.style.setProperty('max-width', '900px', 'important');
        el.style.setProperty('box-shadow', 'var(--shadow-card)', 'important');
        el.style.setProperty('border', 'var(--border-dashed)', 'important');
        el.style.setProperty('position', 'relative', 'important');
        el.style.setProperty('overflow', 'hidden', 'important');
        el.style.setProperty('transition', 'all var(--transition-normal)', 'important');
      }
      
      if (el.tagName === 'NAV') {
        el.style.setProperty('display', 'flex', 'important');
        el.style.setProperty('justify-content', 'center', 'important');
        el.style.setProperty('gap', 'var(--spacing-lg)', 'important');
        el.style.setProperty('flex-wrap', 'wrap', 'important');
      }
      
      if (el.tagName === 'FOOTER') {
        el.style.setProperty('background', 'var(--gradient-footer)', 'important');
        el.style.setProperty('padding', 'var(--spacing-lg)', 'important');
        el.style.setProperty('text-align', 'center', 'important');
        el.style.setProperty('color', 'var(--text-secondary)', 'important');
        el.style.setProperty('margin-top', 'var(--spacing-xxl)', 'important');
        el.style.setProperty('border-top', '2px solid var(--accent-purple-border)', 'important');
      }
      
      if (el.classList.contains('theme-toggle')) {
        el.style.setProperty('position', 'fixed', 'important');
        el.style.setProperty('top', 'var(--spacing-lg)', 'important');
        el.style.setProperty('right', 'var(--spacing-lg)', 'important');
        el.style.setProperty('background', 'var(--card-bg)', 'important');
        el.style.setProperty('border', '1px solid var(--accent-purple)', 'important');
        el.style.setProperty('border-radius', 'var(--radius-full)', 'important');
        el.style.setProperty('width', '50px', 'important');
        el.style.setProperty('height', '50px', 'important');
        el.style.setProperty('display', 'flex', 'important');
        el.style.setProperty('align-items', 'center', 'important');
        el.style.setProperty('justify-content', 'center', 'important');
        el.style.setProperty('cursor', 'pointer', 'important');
        el.style.setProperty('transition', 'all var(--transition-normal)', 'important');
        el.style.setProperty('z-index', '1000', 'important');
      }
    });
    
    // Force apply styles to command and output elements
    const commands = document.querySelectorAll('.command');
    commands.forEach(cmd => {
      cmd.style.setProperty('color', 'var(--text-primary)', 'important');
      cmd.style.setProperty('margin-bottom', 'var(--spacing-xs)', 'important');
      cmd.style.setProperty('font-weight', 'bold', 'important');
      cmd.style.setProperty('text-shadow', '0 0 2px rgba(0, 255, 0, 0.1)', 'important');
    });
    
    const outputs = document.querySelectorAll('.output');
    outputs.forEach(output => {
      output.style.setProperty('color', 'var(--text-secondary)', 'important');
      output.style.setProperty('margin', '0 0 var(--spacing-md) 0', 'important');
      output.style.setProperty('line-height', '1.6', 'important');
    });
    
    const blinks = document.querySelectorAll('.blink');
    blinks.forEach(blink => {
      blink.style.setProperty('animation', 'blink 1s infinite', 'important');
      blink.style.setProperty('color', 'var(--text-primary)', 'important');
    });
  }

  // ===== THEME TOGGLE =====
  setupThemeToggle() {
    // Theme toggle is now handled by theme.js
    // This method is kept for compatibility but does nothing
    // The theme system is initialized by theme-boot.js and theme.js
  }

  // ===== UNIVERSAL THEME TOGGLE (for pages without main.js) =====
  static setupUniversalThemeToggle() {
    // Theme toggle is now handled by theme.js
    // This method is kept for compatibility but does nothing
  }

  static updateThemeIcon(theme) {
    // Theme icon updates are now handled by theme.js
    // This method is kept for compatibility but does nothing
  }

  updateThemeIcon(theme) {
    // Theme icon updates are now handled by theme.js
    // This method is kept for compatibility but does nothing
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
    // Loading states disabled - no loading animations needed
    // This method is kept for compatibility but does nothing
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

	// ===== 3D TILT EFFECTS =====
	setupTiltEffects() {
		const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		const cards = document.querySelectorAll('.cert-card');
		if (!cards.length) return;

		const maxRotateX = 12; // degrees
		const maxRotateY = 16; // degrees

		cards.forEach(card => {
			let rafId = null;

			const reset = () => {
				card.style.transform = '';
				card.style.transition = 'transform 200ms ease';
				setTimeout(() => { card.style.transition = ''; }, 200);
			};

			const onMove = (e) => {
				const rect = card.getBoundingClientRect();
				const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
				const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
				if (clientX == null || clientY == null) return;

				const x = clientX - rect.left;
				const y = clientY - rect.top;
				const px = (x / rect.width) - 0.5;  // -0.5 .. 0.5
				const py = (y / rect.height) - 0.5; // -0.5 .. 0.5

				const rotateY = px * (maxRotateY * 2);
				const rotateX = -py * (maxRotateX * 2);

				if (rafId) cancelAnimationFrame(rafId);
				rafId = requestAnimationFrame(() => {
					card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-10px) scale(1.06)`;
				});
			};

			const onEnter = () => {
				card.style.willChange = 'transform';
			};

			const onLeave = () => {
				if (rafId) cancelAnimationFrame(rafId);
				rafId = null;
				reset();
			};

			card.addEventListener('mouseenter', onEnter, { passive: true });
			card.addEventListener('mousemove', onMove);
			card.addEventListener('mouseleave', onLeave, { passive: true });

			card.addEventListener('touchstart', onEnter, { passive: true });
			card.addEventListener('touchmove', onMove, { passive: true });
			card.addEventListener('touchend', onLeave, { passive: true });
		});
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
  // Initialize theme first
  initializeTheme();
  
  new TracepointApp();
  
  // Add some terminal-style effects
  setTimeout(() => {
    const app = new TracepointApp();
    app.simulateTerminal();
  }, 500);
});

// ===== THEME INITIALIZATION =====
function initializeTheme() {
  // Theme initialization is now handled by theme-boot.js and theme.js
  // This function is kept for compatibility but does nothing
}

// ===== FALLBACK CSS ENFORCEMENT & THEME TOGGLE =====
// This ensures CSS enforcement and theme toggle work even if main.js doesn't load properly
(function() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFallback);
  } else {
    initFallback();
  }

  function initFallback() {
    // Force CSS enforcement first
    enforceCSSMasterFallback();
    
    // Then set up theme toggle
    initFallbackTheme();
  }

  function enforceCSSMasterFallback() {
    // Only run if TracepointApp hasn't already enforced CSS
    if (window.cssEnforced) return;
    window.cssEnforced = true;

    // Remove any conflicting inline styles
    document.body.removeAttribute('style');
    document.documentElement.removeAttribute('style');
    
    // Force apply critical styles with !important
    const style = document.createElement('style');
    style.textContent = `
      /* Force CSS Master - Fallback Override */
      :root:not([data-theme="light"]) {
        --bg-primary: #1a0d2e !important;
        --bg-secondary: #2d1b69 !important;
        --bg-accent: #4a148c !important;
        --text-primary: #4ade80 !important;
        --text-secondary: #e2e8f0 !important;
        --text-muted: #94a3b8 !important;
        --accent-purple: #8b5cf6 !important;
        --accent-purple-light: rgba(139, 92, 246, 0.15) !important;
        --accent-purple-border: rgba(139, 92, 246, 0.35) !important;
        --card-bg: rgba(0, 0, 0, 0.7) !important;
        --gradient-bg: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary), var(--bg-accent)) !important;
        --gradient-header: linear-gradient(135deg, var(--bg-secondary), var(--bg-accent)) !important;
        --gradient-footer: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary)) !important;
      }
      
      :root[data-theme="light"] {
        --bg-primary: #ffffff !important;
        --bg-secondary: #f8f9fa !important;
        --bg-accent: #e9ecef !important;
        --text-primary: #1a4d1a !important;
        --text-secondary: #000000 !important;
        --text-muted: #333333 !important;
        --accent-purple: #6f42c1 !important;
        --accent-purple-light: rgba(111, 66, 193, 0.15) !important;
        --accent-purple-border: rgba(111, 66, 193, 0.4) !important;
        --card-bg: rgba(255, 255, 255, 0.98) !important;
        --gradient-bg: linear-gradient(135deg, #ffffff, #f8f9fa, #e9ecef) !important;
        --gradient-header: linear-gradient(135deg, #f8f9fa, #e9ecef) !important;
        --gradient-footer: linear-gradient(135deg, #e9ecef, #ffffff) !important;
        --shadow-card: 0 4px 15px rgba(0, 0, 0, 0.08) !important;
        --shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.12) !important;
        --shadow-text: 0 0 8px rgba(26, 77, 26, 0.6) !important;
      }
      
      html, body {
        font-family: 'Courier New', 'Fira Code', 'JetBrains Mono', monospace !important;
        background: var(--gradient-bg) !important;
        color: var(--text-primary) !important;
        text-align: left !important;
        line-height: 1.6 !important;
        overflow-x: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      header {
        background: var(--gradient-header) !important;
        padding: var(--spacing-lg) !important;
        text-align: center !important;
        position: sticky !important;
        top: 0 !important;
        z-index: 100 !important;
        backdrop-filter: blur(10px) !important;
        border-bottom: 2px solid var(--accent-purple-border) !important;
      }
      
      header h1 {
        margin-bottom: var(--spacing-sm) !important;
        font-size: 2.5rem !important;
        text-shadow: 0 0 20px rgba(0, 255, 0, 0.5) !important;
        animation: glow 2s ease-in-out infinite alternate !important;
        color: var(--text-secondary) !important;
        font-weight: 700 !important;
      }
      
      .terminal, .panel {
        background: var(--card-bg) !important;
        padding: var(--spacing-lg) !important;
        border-radius: var(--radius-lg) !important;
        margin: var(--spacing-lg) auto !important;
        max-width: 900px !important;
        box-shadow: var(--shadow-card) !important;
        border: var(--border-dashed) !important;
        position: relative !important;
        overflow: hidden !important;
        transition: all var(--transition-normal) !important;
      }
      
      .terminal::before, .panel::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 2px !important;
        background: linear-gradient(90deg, var(--accent-purple), var(--text-primary), var(--accent-purple)) !important;
      }
      
      .command {
        color: var(--text-primary) !important;
        margin-bottom: var(--spacing-xs) !important;
        font-weight: bold !important;
        text-shadow: 0 0 2px rgba(0, 255, 0, 0.1) !important;
      }
      
      .output {
        color: var(--text-secondary) !important;
        margin: 0 0 var(--spacing-md) 0 !important;
        line-height: 1.6 !important;
      }
      
      .blink {
        animation: blink 1s infinite !important;
        color: var(--text-primary) !important;
      }
      
      nav {
        display: flex !important;
        justify-content: center !important;
        gap: var(--spacing-lg) !important;
        flex-wrap: wrap !important;
      }
      
      nav a {
        color: var(--accent-purple) !important;
        font-weight: bold !important;
        padding: var(--spacing-sm) var(--spacing-md) !important;
        border-radius: var(--radius-md) !important;
        transition: all var(--transition-normal) !important;
        position: relative !important;
        overflow: hidden !important;
        text-decoration: none !important;
        border-bottom: var(--border-dotted) !important;
      }
      
      nav a:hover, nav a.active {
        color: var(--text-secondary) !important;
        background: var(--accent-purple-light) !important;
        border-bottom: none !important;
        transform: translateY(-2px) !important;
        box-shadow: var(--shadow-hover) !important;
      }
      
      footer {
        background: var(--gradient-footer) !important;
        padding: var(--spacing-lg) !important;
        text-align: center !important;
        color: var(--text-secondary) !important;
        margin-top: var(--spacing-xxl) !important;
        border-top: 2px solid var(--accent-purple-border) !important;
      }
      
      .theme-toggle {
        position: fixed !important;
        top: var(--spacing-lg) !important;
        right: var(--spacing-lg) !important;
        background: var(--card-bg) !important;
        border: 1px solid var(--accent-purple) !important;
        border-radius: var(--radius-full) !important;
        width: 50px !important;
        height: 50px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        transition: all var(--transition-normal) !important;
        z-index: 1000 !important;
      }
      
      .theme-toggle:hover {
        background: var(--accent-purple) !important;
        transform: scale(1.1) !important;
      }
      
      h1, h2, h3, h4, h5, h6 {
        color: var(--text-secondary) !important;
        margin-bottom: var(--spacing-md) !important;
        font-weight: 700 !important;
      }
      
      p {
        margin-bottom: var(--spacing-md) !important;
        color: var(--text-secondary) !important;
      }
      
      a {
        color: var(--accent-purple) !important;
        text-decoration: none !important;
        border-bottom: var(--border-dotted) !important;
        transition: all var(--transition-normal) !important;
      }
      
      a:hover {
        color: var(--text-secondary) !important;
        border-bottom-color: var(--text-secondary) !important;
        text-shadow: var(--shadow-text) !important;
      }
      
      code {
        background: rgba(138, 43, 226, 0.15) !important;
        color: #e0e0e0 !important;
        padding: 2px 6px !important;
        border-radius: 3px !important;
        border: 1px solid rgba(138, 43, 226, 0.4) !important;
        font-family: "Courier New", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace !important;
        font-size: 0.9em !important;
        font-weight: 500 !important;
        text-shadow: 0 0 4px rgba(138, 43, 226, 0.3) !important;
        box-shadow: 0 0 8px rgba(138, 43, 226, 0.1) !important;
      }
      
      pre {
        background: #000 !important;
        color: var(--text-primary) !important;
        padding: 1.5rem !important;
        border-radius: var(--radius-md) !important;
        overflow-x: auto !important;
        border: 1px solid var(--accent-purple-border) !important;
        margin: 1rem 0 !important;
        font-family: "Fira Code", "Courier New", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace !important;
        font-size: 0.9rem !important;
        line-height: 1.5 !important;
        position: relative !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
      }
      
      @keyframes glow {
        from { text-shadow: 0 0 20px rgba(0, 255, 0, 0.5); }
        to { text-shadow: 0 0 30px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.3); }
      }
      
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    
    // Insert the style at the beginning of head
    document.head.insertBefore(style, document.head.firstChild);
    
    // Force apply styles after a delay
    setTimeout(() => {
      forceApplyStylesFallback();
    }, 100);
  }

  window.forceApplyStylesFallback = function() {
    // Force apply critical styles to ensure they take precedence
    const elements = document.querySelectorAll('body, header, .terminal, .panel, nav, footer, .theme-toggle');
    elements.forEach(el => {
      if (el.tagName === 'BODY') {
        el.style.setProperty('font-family', "'Courier New', 'Fira Code', 'JetBrains Mono', monospace", 'important');
        el.style.setProperty('background', 'var(--gradient-bg)', 'important');
        el.style.setProperty('color', 'var(--text-primary)', 'important');
      }
      
      if (el.tagName === 'HEADER') {
        el.style.setProperty('background', 'var(--gradient-header)', 'important');
        el.style.setProperty('padding', 'var(--spacing-lg)', 'important');
        el.style.setProperty('text-align', 'center', 'important');
        el.style.setProperty('position', 'sticky', 'important');
        el.style.setProperty('top', '0', 'important');
        el.style.setProperty('z-index', '100', 'important');
        el.style.setProperty('backdrop-filter', 'blur(10px)', 'important');
        el.style.setProperty('border-bottom', '2px solid var(--accent-purple-border)', 'important');
      }
      
      if (el.classList.contains('terminal') || el.classList.contains('panel')) {
        el.style.setProperty('background', 'var(--card-bg)', 'important');
        el.style.setProperty('padding', 'var(--spacing-lg)', 'important');
        el.style.setProperty('border-radius', 'var(--radius-lg)', 'important');
        el.style.setProperty('margin', 'var(--spacing-lg) auto', 'important');
        el.style.setProperty('max-width', '900px', 'important');
        el.style.setProperty('box-shadow', 'var(--shadow-card)', 'important');
        el.style.setProperty('border', 'var(--border-dashed)', 'important');
        el.style.setProperty('position', 'relative', 'important');
        el.style.setProperty('overflow', 'hidden', 'important');
        el.style.setProperty('transition', 'all var(--transition-normal)', 'important');
      }
      
      if (el.tagName === 'NAV') {
        el.style.setProperty('display', 'flex', 'important');
        el.style.setProperty('justify-content', 'center', 'important');
        el.style.setProperty('gap', 'var(--spacing-lg)', 'important');
        el.style.setProperty('flex-wrap', 'wrap', 'important');
      }
      
      if (el.tagName === 'FOOTER') {
        el.style.setProperty('background', 'var(--gradient-footer)', 'important');
        el.style.setProperty('padding', 'var(--spacing-lg)', 'important');
        el.style.setProperty('text-align', 'center', 'important');
        el.style.setProperty('color', 'var(--text-secondary)', 'important');
        el.style.setProperty('margin-top', 'var(--spacing-xxl)', 'important');
        el.style.setProperty('border-top', '2px solid var(--accent-purple-border)', 'important');
      }
      
      if (el.classList.contains('theme-toggle')) {
        el.style.setProperty('position', 'fixed', 'important');
        el.style.setProperty('top', 'var(--spacing-lg)', 'important');
        el.style.setProperty('right', 'var(--spacing-lg)', 'important');
        el.style.setProperty('background', 'var(--card-bg)', 'important');
        el.style.setProperty('border', '1px solid var(--accent-purple)', 'important');
        el.style.setProperty('border-radius', 'var(--radius-full)', 'important');
        el.style.setProperty('width', '50px', 'important');
        el.style.setProperty('height', '50px', 'important');
        el.style.setProperty('display', 'flex', 'important');
        el.style.setProperty('align-items', 'center', 'important');
        el.style.setProperty('justify-content', 'center', 'important');
        el.style.setProperty('cursor', 'pointer', 'important');
        el.style.setProperty('transition', 'all var(--transition-normal)', 'important');
        el.style.setProperty('z-index', '1000', 'important');
      }
    });
    
    // Force apply styles to command and output elements
    const commands = document.querySelectorAll('.command');
    commands.forEach(cmd => {
      cmd.style.setProperty('color', 'var(--text-primary)', 'important');
      cmd.style.setProperty('margin-bottom', 'var(--spacing-xs)', 'important');
      cmd.style.setProperty('font-weight', 'bold', 'important');
      cmd.style.setProperty('text-shadow', '0 0 2px rgba(0, 255, 0, 0.1)', 'important');
    });
    
    const outputs = document.querySelectorAll('.output');
    outputs.forEach(output => {
      output.style.setProperty('color', 'var(--text-secondary)', 'important');
      output.style.setProperty('margin', '0 0 var(--spacing-md) 0', 'important');
      output.style.setProperty('line-height', '1.6', 'important');
    });
    
    const blinks = document.querySelectorAll('.blink');
    blinks.forEach(blink => {
      blink.style.setProperty('animation', 'blink 1s infinite', 'important');
      blink.style.setProperty('color', 'var(--text-primary)', 'important');
    });
  }

  function initFallbackTheme() {
    // Theme toggle is now handled by theme.js
    // This function is kept for compatibility but does nothing
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


