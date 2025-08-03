// Modern JavaScript with 2025 interactions
class CharteredAuditsWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.setupActiveNavigation();
    this.setupAnimatedCounters();
    this.setupFormHandling();
    this.setupScrollProgress();
    this.setupIntersectionObserver();
    this.setupSmoothScrolling();
  }

  // Enhanced Scroll Effects
  setupScrollEffects() {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollProgress();
          this.handleParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Scroll Progress Indicator
  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
  }

  updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  }

  // Enhanced Mobile Menu
  setupMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const sidenav = document.getElementById('sidenav');
    
    if (toggle && sidenav) {
      toggle.addEventListener('click', () => {
        sidenav.classList.toggle('open');
        toggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!sidenav.contains(e.target) && !toggle.contains(e.target)) {
          sidenav.classList.remove('open');
          toggle.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
    }
  }

  // Active Navigation Highlighting
  setupActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // Animated Counters
  setupAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter);
          }
        }
      });
    });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Enhanced Form Handling
  setupFormHandling() {
    const form = document.getElementById('contactForm');
    
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        try {
          await this.simulateFormSubmission(new FormData(form));
          
          // Success state
          submitBtn.innerHTML = '<span>Message Sent!</span>';
          submitBtn.style.background = 'var(--success-green)';
          
          // Reset form
          form.reset();
          
          // Reset button after delay
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 3000);
          
        } catch (error) {
          // Error state
          submitBtn.innerHTML = '<span>Error - Try Again</span>';
          submitBtn.style.background = '#EF4444';
          
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 3000);
        }
      });
    }
  }

  async simulateFormSubmission(formData) {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000); // Simulate network delay
    });
  }

  // Intersection Observer for Animations
  setupIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.service-card, .client-card, .benefit-item');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100); // Stagger animation
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Smooth Scrolling
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Parallax Effect
  handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-elements');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }
}

// Lazy Loading for Images
class LazyLoader {
  constructor() {
    this.imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          this.imageObserver.unobserve(img);
        }
      });
    });

    this.init();
  }

  init() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      this.imageObserver.observe(img);
    });
  }
}

// Performance Monitoring
class PerformanceMonitor {
  constructor() {
    this.monitorPageLoad();
    this.monitorInteractions();
  }

  monitorPageLoad() {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
    });
  }

  monitorInteractions() {
    // Monitor click events
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, a, .clickable');
      if (target) {
        console.log('Interaction:', target.textContent?.trim());
      }
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CharteredAuditsWebsite();
  new LazyLoader();
  new PerformanceMonitor();
});

// Add CSS Custom Properties support for older browsers
if (!window.CSS || !CSS.supports('color', 'var(--primary)')) {
  const fallbackStyles = document.createElement('style');
  fallbackStyles.innerHTML = `
    .btn-primary { background: #F97316; }
    .nav-link:hover { background: #F97316; }
  `;
  document.head.appendChild(fallbackStyles);
}
