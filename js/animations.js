/**
 * GSAP Animations for Ahmed's Portfolio
 * Smooth, lightweight, and performant animations
 */

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animation configurations
const AnimationConfig = {
    // Default durations
    durations: {
        fast: 0.3,
        normal: 0.6,
        slow: 0.8,
        typing: 0.05
    },
    
    // Custom easing curves
    easing: {
        smooth: "power2.out",
        bounce: "back.out(1.7)",
        elastic: "elastic.out(1, 0.5)",
        sharp: "power3.inOut"
    },
    
    // Stagger delays
    stagger: {
        fast: 0.1,
        normal: 0.15,
        slow: 0.2
    }
};

// Core Animation Library
const Animations = {
    
    // Initialize all animations
    init: () => {
        if (Utils.prefersReducedMotion()) {
            console.log('Reduced motion detected, skipping animations');
            return;
        }
        
        Animations.setupScrollTriggers();
        Animations.initHeroAnimations();
        Animations.initNavigationAnimations();
        Animations.initProjectAnimations();
        Animations.initSkillsAnimations();
        Animations.initContactAnimations();
        Animations.initScrollEffects();
        Animations.initParallaxEffects();
        Animations.initTextAnimations();
        Animations.initCustomCursor();
        Animations.initSectionNavigation();
        Animations.initBackToTop();
        Animations.initScrollHint();
        Animations.initPageLoadSequence();
    },

    // Setup scroll-based triggers
    setupScrollTriggers: () => {
        // Fade in sections as they enter viewport
        gsap.utils.toArray('section').forEach((section, i) => {
            gsap.fromTo(section, 
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: AnimationConfig.durations.normal,
                    ease: AnimationConfig.easing.smooth,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Animate section headers
        gsap.utils.toArray('section h2').forEach((heading) => {
            gsap.fromTo(heading,
                {
                    opacity: 0,
                    y: 30,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: AnimationConfig.durations.normal,
                    ease: AnimationConfig.easing.bounce,
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    },

    // Hero section animations
    initHeroAnimations: () => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroBtn = document.querySelector('.hero-content .btn');

        // Title entrance
        gsap.fromTo(heroTitle,
            {
                opacity: 0,
                y: 100,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: AnimationConfig.durations.slow,
                ease: AnimationConfig.easing.bounce,
                delay: 0.2
            }
        );

        // Typing effect for subtitle
        if (heroSubtitle) {
            const text = heroSubtitle.textContent;
            heroSubtitle.textContent = '';
            heroSubtitle.style.opacity = '1';
            
            gsap.to({}, {
                duration: text.length * AnimationConfig.durations.typing,
                ease: "none",
                delay: 0.8,
                onUpdate: function() {
                    const progress = this.progress();
                    const currentLength = Math.floor(progress * text.length);
                    heroSubtitle.textContent = text.substring(0, currentLength);
                }
            });
        }

        // Button entrance
        gsap.fromTo(heroBtn,
            {
                opacity: 0,
                y: 50,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: AnimationConfig.durations.normal,
                ease: AnimationConfig.easing.bounce,
                delay: 1.5
            }
        );
    },

    // Navigation animations
    initNavigationAnimations: () => {
        const nav = document.querySelector('nav');
        
        // Nav entrance
        gsap.fromTo(nav,
            {
                opacity: 0,
                y: -50
            },
            {
                opacity: 1,
                y: 0,
                duration: AnimationConfig.durations.normal,
                ease: AnimationConfig.easing.smooth,
                delay: 0.1
            }
        );

        // Stagger nav links
        gsap.fromTo('.nav-links li',
            {
                opacity: 0,
                y: -20
            },
            {
                opacity: 1,
                y: 0,
                duration: AnimationConfig.durations.fast,
                ease: AnimationConfig.easing.smooth,
                stagger: AnimationConfig.stagger.fast,
                delay: 0.3
            }
        );
    },

    // Project cards animations
    initProjectAnimations: () => {
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            // Card entrance
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: AnimationConfig.durations.normal,
                    ease: AnimationConfig.easing.smooth,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    delay: i * AnimationConfig.stagger.normal
                }
            );

            // Enhanced hover effect
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    y: -15,
                    duration: AnimationConfig.durations.fast,
                    ease: AnimationConfig.easing.smooth
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    y: 0,
                    duration: AnimationConfig.durations.fast,
                    ease: AnimationConfig.easing.smooth
                });
            });
        });
    },

    // Skills animations
    initSkillsAnimations: () => {
        gsap.fromTo('.skills-list li',
            {
                opacity: 0,
                scale: 0.8,
                y: 30
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: AnimationConfig.durations.fast,
                ease: AnimationConfig.easing.bounce,
                stagger: AnimationConfig.stagger.fast,
                scrollTrigger: {
                    trigger: '.skills-list',
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Skill hover effects
        document.querySelectorAll('.skills-list li').forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                gsap.to(skill, {
                    scale: 1.1,
                    duration: AnimationConfig.durations.fast,
                    ease: AnimationConfig.easing.bounce
                });
            });

            skill.addEventListener('mouseleave', () => {
                gsap.to(skill, {
                    scale: 1,
                    duration: AnimationConfig.durations.fast,
                    ease: AnimationConfig.easing.smooth
                });
            });
        });
    },

    // Contact section animations
    initContactAnimations: () => {
        gsap.fromTo('.contact-links a',
            {
                opacity: 0,
                x: -50,
                scale: 0.9
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: AnimationConfig.durations.normal,
                ease: AnimationConfig.easing.bounce,
                stagger: AnimationConfig.stagger.normal,
                scrollTrigger: {
                    trigger: '.contact-links',
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    },

    // Button press animation
    animateButtonPress: (button) => {
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    },

    // Profile card flip enhancement
    enhanceProfileCard: () => {
        const profileCard = document.querySelector('.profile-card');
        if (profileCard) {
            profileCard.addEventListener('mouseenter', () => {
                gsap.to(profileCard, {
                    rotateY: 180,
                    duration: 0.6,
                    ease: "power2.inOut"
                });
            });

            profileCard.addEventListener('mouseleave', () => {
                gsap.to(profileCard, {
                    rotateY: 0,
                    duration: 0.6,
                    ease: "power2.inOut"
                });
            });
        }
    },

    // Advanced scroll effects
    initScrollEffects: () => {
        // Parallax effect for hero section
        gsap.to('.hero-content', {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Section titles sliding in
        gsap.utils.toArray('section h2').forEach((title) => {
            gsap.fromTo(title,
                {
                    x: -100,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // About text reveal animation
        const aboutText = document.querySelector('.about-content p');
        if (aboutText) {
            gsap.fromTo(aboutText,
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: aboutText,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    },

    // Parallax effects
    initParallaxEffects: () => {
        // Subtle parallax for project videos
        gsap.utils.toArray('.project-card video').forEach((video) => {
            gsap.to(video, {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: video.closest('.project-card'),
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

        // Navigation background blur effect
        ScrollTrigger.create({
            start: "top -50",
            end: 99999,
            toggleClass: {className: "scrolled", targets: "nav"}
        });
    },

    // Advanced text animations
    initTextAnimations: () => {
        // Animate strong text with typewriter effect
        const strongElements = document.querySelectorAll('strong');
        strongElements.forEach((element) => {
            const text = element.textContent;
            element.textContent = '';
            
            ScrollTrigger.create({
                trigger: element,
                start: "top 80%",
                onEnter: () => {
                    gsap.to({}, {
                        duration: text.length * 0.03,
                        ease: "none",
                        onUpdate: function() {
                            const progress = this.progress();
                            const currentLength = Math.floor(progress * text.length);
                            element.textContent = text.substring(0, currentLength);
                        }
                    });
                }
            });
        });

        // Word-by-word animation for important paragraphs
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            const words = heroSubtitle.textContent.split(' ');
            heroSubtitle.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
            
            gsap.fromTo('.word',
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.1,
                    delay: 1
                }
            );
        }
    },

    // Enhanced section transitions
    initSectionTransitions: () => {
        gsap.utils.toArray('section').forEach((section, i) => {
            // Create a timeline for each section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play none none reverse",
                    onEnter: () => Animations.animateSection(section),
                    onLeave: () => Animations.resetSection(section)
                }
            });
        });
    },

    // Animate individual sections
    animateSection: (section) => {
        const elements = section.querySelectorAll('h2, p, .project-card, .skills-list li, .contact-links a');
        
        gsap.fromTo(elements,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1
            }
        );
    },

    // Reset section for exit animation
    resetSection: (section) => {
        // Optional: add exit animations if needed
    },

    // Mouse movement parallax
    initMouseParallax: () => {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
            
            // Subtle parallax for navigation
            gsap.to('nav', {
                x: mouseX * 10,
                y: mouseY * 5,
                duration: 0.6,
                ease: "power2.out"
            });
            
            // Parallax for project cards
            gsap.utils.toArray('.project-card').forEach((card, i) => {
                gsap.to(card, {
                    x: mouseX * (5 + i * 2),
                    y: mouseY * (3 + i),
                    duration: 0.8,
                    ease: "power2.out"
                });
            });
        });
    },

    // Smooth scroll reveal for skills
    initAdvancedSkillsAnimation: () => {
        const skillsList = document.querySelector('.skills-list');
        if (skillsList) {
            const skills = skillsList.querySelectorAll('li');
            
            // Create a wave effect
            gsap.fromTo(skills,
                {
                    scale: 0,
                    rotation: 45,
                    opacity: 0
                },
                {
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    stagger: {
                        amount: 1.2,
                        from: "center",
                        grid: "auto"
                    },
                    scrollTrigger: {
                        trigger: skillsList,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Add hover magnetic effect
            skills.forEach(skill => {
                skill.addEventListener('mouseenter', () => {
                    gsap.to(skill, {
                        scale: 1.15,
                        z: 50,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    
                    // Push nearby skills away
                    const rect = skill.getBoundingClientRect();
                    skills.forEach(otherSkill => {
                        if (otherSkill !== skill) {
                            const otherRect = otherSkill.getBoundingClientRect();
                            const distance = Math.sqrt(
                                Math.pow(rect.left - otherRect.left, 2) + 
                                Math.pow(rect.top - otherRect.top, 2)
                            );
                            
                            if (distance < 150) {
                                const angle = Math.atan2(
                                    otherRect.top - rect.top,
                                    otherRect.left - rect.left
                                );
                                const pushDistance = (150 - distance) / 10;
                                
                                gsap.to(otherSkill, {
                                    x: Math.cos(angle) * pushDistance,
                                    y: Math.sin(angle) * pushDistance,
                                    duration: 0.3,
                                    ease: "power2.out"
                                });
                            }
                        }
                    });
                });
                
                skill.addEventListener('mouseleave', () => {
                    gsap.to(skill, {
                        scale: 1,
                        z: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    
                    // Reset other skills
                    gsap.to(skills, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                });
            });
        }
    },

    // Loading sequence animation
    initLoadingSequence: () => {
        const loadingOverlay = document.querySelector('.loading-overlay');
        const loadingBar = document.querySelector('.loading-bar');
        
        if (loadingOverlay && loadingBar) {
            // Animate loading bar
            gsap.to(loadingBar, {
                width: '100%',
                duration: 2,
                ease: "power2.inOut",
                onComplete: () => {
                    // Hide loading overlay
                    gsap.to(loadingOverlay, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            loadingOverlay.classList.add('hidden');
                            document.body.classList.add('loaded');
                        }
                    });
                }
            });
        }
    },

    // Custom cursor animation
    initCustomCursor: () => {
        if (Utils.isMobile() || Utils.isTouchDevice()) return;
        
        const cursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorRing = document.querySelector('.cursor-ring');
        
        if (!cursor) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor following
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            gsap.set(cursorDot, {
                x: cursorX,
                y: cursorY
            });
            
            gsap.set(cursorRing, {
                x: cursorX,
                y: cursorY
            });
            
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skills-list li');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    },

    // Section navigation indicator
    initSectionNavigation: () => {
        const navDots = document.querySelectorAll('.nav-dot');
        const sections = document.querySelectorAll('section[id]');
        
        navDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const sectionId = dot.getAttribute('data-section');
                Utils.scrollToElement(sectionId);
            });
        });
        
        // Update active dot on scroll
        const updateActiveDot = () => {
            const scrollPosition = window.pageYOffset + 200;
            
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navDots.forEach(dot => dot.classList.remove('active'));
                    const activeDot = document.querySelector(`[data-section="${sectionId}"]`);
                    if (activeDot) activeDot.classList.add('active');
                }
            });
        };
        
        window.addEventListener('scroll', Utils.throttle(updateActiveDot, 100));
        updateActiveDot(); // Initial call
    },

    // Back to top functionality
    initBackToTop: () => {
        const backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;
        
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };
        
        window.addEventListener('scroll', Utils.throttle(toggleVisibility, 100));
        
        backToTop.addEventListener('click', () => {
            gsap.to(window, {
                scrollTo: { y: 0 },
                duration: 1.5,
                ease: "power2.inOut"
            });
        });
    },

    // Scroll hint animation
    initScrollHint: () => {
        const scrollHint = document.querySelector('.scroll-hint');
        if (scrollHint) {
            // Hide scroll hint when user scrolls
            const hideOnScroll = () => {
                if (window.pageYOffset > 100) {
                    gsap.to(scrollHint, {
                        opacity: 0,
                        y: 20,
                        duration: 0.5,
                        onComplete: () => {
                            scrollHint.style.display = 'none';
                        }
                    });
                    window.removeEventListener('scroll', hideOnScroll);
                }
            };
            
            window.addEventListener('scroll', hideOnScroll);
        }
    },

    // Enhanced page load sequence
    initPageLoadSequence: () => {
        const tl = gsap.timeline();
        
        // Wait for loading to complete
        window.addEventListener('load', () => {
            tl.delay(0.5) // Small delay for better UX
              .call(() => Animations.initLoadingSequence())
              .delay(2.5)
              .from('.hero-title', {
                  opacity: 0,
                  y: 100,
                  scale: 0.8,
                  duration: 1,
                  ease: "back.out(1.7)"
              })
              .from('.hero-subtitle .word', {
                  opacity: 0,
                  y: 50,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: "power2.out"
              }, "-=0.5")
              .from('.hero-content .btn', {
                  opacity: 0,
                  y: 30,
                  scale: 0.9,
                  duration: 0.6,
                  ease: "back.out(1.7)"
              }, "-=0.3")
              .from('.scroll-hint', {
                  opacity: 0,
                  y: 20,
                  duration: 0.5,
                  ease: "power2.out"
              }, "-=0.2");
        });
    }
};

// Export for global use
window.Animations = Animations;
window.AnimationConfig = AnimationConfig;
