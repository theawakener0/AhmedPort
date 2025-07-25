/**
 * Utility Functions for Ahmed's Portfolio
 * Lightweight helpers for performance and accessibility
 */

// Performance utilities
const Utils = {
    // Debounce function for scroll/resize events
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for high-frequency events
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport: (element, threshold = 0.1) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top <= windowHeight * (1 - threshold) &&
            rect.bottom >= windowHeight * threshold &&
            rect.left <= windowWidth &&
            rect.right >= 0
        );
    },

    // Check for reduced motion preference
    prefersReducedMotion: () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    // Check if device is mobile
    isMobile: () => {
        return window.innerWidth <= 768;
    },

    // Check if device supports touch
    isTouchDevice: () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    // Get scroll position
    getScrollProgress: () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        return Math.min(scrollTop / scrollHeight, 1);
    },

    // Smooth scroll to element
    scrollToElement: (elementId, offset = 80) => {
        const element = document.getElementById(elementId.replace('#', ''));
        if (element) {
            const targetPosition = element.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Random number generator for subtle variations
    random: (min, max) => {
        return Math.random() * (max - min) + min;
    },

    // Map value from one range to another
    mapRange: (value, inMin, inMax, outMin, outMax) => {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    },

    // Clamp value between min and max
    clamp: (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    },

    // Linear interpolation
    lerp: (start, end, factor) => {
        return start + (end - start) * factor;
    },

    // Distance between two points
    distance: (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    },

    // Get mouse position relative to element
    getMousePosition: (e, element) => {
        const rect = element.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    },

    // Check if element is visible
    isElementVisible: (element) => {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    },

    // Get scroll velocity
    getScrollVelocity: (() => {
        let lastScrollTop = 0;
        let lastTimestamp = 0;
        
        return () => {
            const currentScrollTop = window.pageYOffset;
            const currentTimestamp = Date.now();
            
            const velocity = Math.abs(currentScrollTop - lastScrollTop) / 
                           (currentTimestamp - lastTimestamp || 1);
            
            lastScrollTop = currentScrollTop;
            lastTimestamp = currentTimestamp;
            
            return velocity;
        };
    })(),

    // Preload images
    preloadImages: (urls) => {
        return Promise.all(urls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            });
        }));
    }
};

// Performance observer for monitoring
const PerformanceMonitor = {
    init: () => {
        if (!Utils.prefersReducedMotion() && 'PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        if (entry.name === 'first-contentful-paint' && entry.startTime > 3000) {
                            console.warn('Slow FCP detected, reducing animation complexity');
                            document.body.classList.add('reduce-animations');
                        }
                    });
                });
                observer.observe({ entryTypes: ['paint'] });
            } catch (e) {
                console.log('PerformanceObserver not supported');
            }
        }
    }
};

// Export for use in other files
window.Utils = Utils;
window.PerformanceMonitor = PerformanceMonitor;
