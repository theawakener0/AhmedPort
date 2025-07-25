/**
 * Main JavaScript Controller for Ahmed's Portfolio    // Initialize GSAP animations
    initializeAnimations() {
        if (typeof gsap !== 'undefined' && typeof Animations !== 'undefined') {
            Animations.init();
    // Update scroll progress
    updateScrollProgress() {
        const progress = Utils.getScrollProgress();
        
        // Update scroll progress bar
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            gsap.set(progressBar, { scaleX: progress });
        }
        
        // Update CSS custom property for other uses
        document.documentElement.style.setProperty('--scroll-progress', progress);
        
        // Add parallax effect to background
        gsap.set('body', {
            backgroundPosition: `50% ${progress * 100}%`
        });
    },     Animations.enhanceProfileCard();
            Animations.initSectionTransitions();
            Animations.initAdvancedSkillsAnimation();
            Animations.initLoadingSequence();
            
            // Initialize mouse parallax on desktop only
            if (!Utils.isMobile() && !Utils.isTouchDevice()) {
                Animations.initMouseParallax();
            }
            
            console.log('🎨 Advanced animations initialized');
        } else {
            console.warn('⚠️ GSAP or Animations not loaded');
        }
    },lizes all components and handles global functionality
 */

// Portfolio App Main Controller
class PortfolioApp {
    constructor() {
        this.isInitialized = false;
        this.scrollPosition = 0;
        this.activeSection = 'hero';
        
        // Bind methods
        this.handleScroll = Utils.throttle(this.onScroll.bind(this), 16);
        this.handleResize = Utils.debounce(this.onResize.bind(this), 250);
        this.handleNavClick = this.onNavClick.bind(this);
    }

    // Initialize the application
    init() {
        if (this.isInitialized) return;
        
        console.log('🚀 Initializing Ahmed\'s Portfolio');
        
        // Setup performance monitoring
        PerformanceMonitor.init();
        
        // Wait for DOM and GSAP to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    // Setup all components
    setup() {
        try {
            // Initialize components
            this.initializeAnimations();
            this.initializeNavigation();
            this.initializeButtons();
            this.initializeAccessibility();
            this.bindEvents();
            
            // Mark as initialized
            this.isInitialized = true;
            console.log('✅ Portfolio initialized successfully');
            
            // Trigger initial animations
            this.startEntrySequence();
            
        } catch (error) {
            console.error('❌ Error initializing portfolio:', error);
        }
    }

    // Initialize GSAP animations
    initializeAnimations() {
        if (typeof gsap !== 'undefined' && typeof Animations !== 'undefined') {
            Animations.init();
            Animations.enhanceProfileCard();
            
            console.log('🎨 Complete animation system initialized');
        } else {
            console.warn('⚠️ GSAP or Animations not loaded');
        }
    }

    // Initialize navigation functionality
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick);
        });

        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navLinks_container = document.querySelector('.nav-links');
        
        if (navToggle && navLinks_container) {
            navToggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    navLinks_container.style.display = 'flex';
                } else {
                    navLinks_container.style.display = '';
                }
            });
        }

        console.log('🧭 Navigation initialized');
    }

    // Initialize button interactions
    initializeButtons() {
        const buttons = document.querySelectorAll('.btn, button');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (typeof Animations !== 'undefined') {
                    Animations.animateButtonPress(button);
                }
            });
        });

        console.log('🔘 Button interactions initialized');
    }

    // Initialize accessibility features
    initializeAccessibility() {
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        // Remove keyboard navigation class on mouse use
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Add reduced motion class if needed
        if (Utils.prefersReducedMotion()) {
            document.body.classList.add('reduce-motion');
        }

        console.log('♿ Accessibility features initialized');
    }

    // Bind global events
    bindEvents() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        window.addEventListener('resize', this.handleResize);
        
        // Page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations when tab is hidden
                if (typeof gsap !== 'undefined') {
                    gsap.globalTimeline.pause();
                }
            } else {
                // Resume animations when tab is visible
                if (typeof gsap !== 'undefined') {
                    gsap.globalTimeline.resume();
                }
            }
        });

        console.log('🔗 Event listeners bound');
    }

    // Handle navigation clicks
    onNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
            Utils.scrollToElement(targetId);
            
            // Close mobile menu if open
            const navToggle = document.getElementById('nav-toggle');
            if (navToggle && navToggle.checked) {
                navToggle.checked = false;
                navToggle.dispatchEvent(new Event('change'));
            }
        }
    }

    // Handle scroll events
    onScroll() {
        this.scrollPosition = window.pageYOffset;
        this.updateActiveSection();
        this.updateScrollProgress();
    }

    // Handle resize events
    onResize() {
        // Refresh ScrollTrigger on resize
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
        
        console.log('📱 Viewport resized, animations refreshed');
    }

    // Update active navigation section
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (this.scrollPosition >= sectionTop && 
                this.scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (current && current !== this.activeSection) {
            this.activeSection = current;
            
            // Update nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Update scroll progress
    updateScrollProgress() {
        const progress = Utils.getScrollProgress();
        
        // Could be used for scroll indicator
        document.documentElement.style.setProperty('--scroll-progress', progress);
    }

    // Start entry animation sequence
    startEntrySequence() {
        // Add a small delay for better UX
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    // Public method to get app state
    getState() {
        return {
            isInitialized: this.isInitialized,
            activeSection: this.activeSection,
            scrollPosition: this.scrollPosition,
            isMobile: Utils.isMobile(),
            prefersReducedMotion: Utils.prefersReducedMotion()
        };
    }
}

// Initialize the application
const portfolioApp = new PortfolioApp();

// Auto-initialize when script loads
portfolioApp.init();

// Make app globally available for debugging
window.portfolioApp = portfolioApp;

// Performance logging
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    }
});
