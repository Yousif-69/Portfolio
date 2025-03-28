// Performance Optimizations
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    const welcomeText = document.querySelector('.welcome-text');
    const loaderText = document.querySelector('.loader-text');
    const loader = document.querySelector('.loader');
    
    // Show welcome text after loading
    setTimeout(() => {
        loader.style.display = 'none';
        loaderText.style.display = 'none';
        welcomeText.classList.add('show');
    }, 1500);
    
    // Fade out everything after showing welcome text
    setTimeout(() => {
        preloader.classList.add('fade-out');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    }, 3000);
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Prevent scrolling during preloader
    document.body.style.overflow = 'hidden';

    // Mobile Navigation with improved performance
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body;

    // Toggle Navigation with improved performance
    burger.addEventListener('click', () => {
        requestAnimationFrame(() => {
            nav.classList.toggle('nav-active');
            body.style.overflow = nav.classList.contains('nav-active') ? 'hidden' : '';
            burger.classList.toggle('toggle');
        });
    });

    // Close mobile menu when clicking outside with improved performance
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('nav-active') && 
            !nav.contains(e.target) && 
            !burger.contains(e.target)) {
            requestAnimationFrame(() => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                body.style.overflow = '';
            });
        }
    });

    // Enhanced Smooth Scrolling with improved performance
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

                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    requestAnimationFrame(() => {
                        nav.classList.remove('nav-active');
                        burger.classList.remove('toggle');
                        body.style.overflow = '';
                    });
                }
            }
        });
    });

    // Form Submission with Loading State and Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                } else {
                    input.classList.remove('invalid');
                }
            });

            if (!isValid) {
                return;
            }

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            try {
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                }, 2000);
            } catch (error) {
                // Show error state
                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                }, 2000);
            }
        });

        // Remove invalid class on input
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('invalid');
            });
        });
    }

    // Enhanced Scroll Animations with improved performance
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                    
                    // Add animation to child elements
                    const children = entry.target.querySelectorAll('.animate-on-scroll');
                    children.forEach((child, index) => {
                        child.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
                    });
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Project Card Hover Effect with Touch Support and improved performance
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        if (overlay) {
            const handleHover = (show) => {
                requestAnimationFrame(() => {
                    overlay.style.opacity = show ? '1' : '0';
                });
            };

            card.addEventListener('mouseenter', () => handleHover(true));
            card.addEventListener('mouseleave', () => handleHover(false));

            // Touch support with improved handling
            let touchTimeout;
            card.addEventListener('touchstart', (e) => {
                e.preventDefault();
                handleHover(true);
            });

            card.addEventListener('touchend', () => {
                touchTimeout = setTimeout(() => handleHover(false), 100);
            });

            card.addEventListener('touchmove', () => {
                clearTimeout(touchTimeout);
            });
        }
    });

    // Skills Animation with improved performance
    const skills = document.querySelectorAll('.skills li');
    skills.forEach((skill, index) => {
        requestAnimationFrame(() => {
            skill.style.animation = `fadeInRight 0.5s ease forwards ${index * 0.1}s`;
        });
    });

    // Enhanced Scroll Progress Indicator with improved performance
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    let ticking = false;
    window.addEventListener('scroll', debounce(() => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (window.scrollY / windowHeight) * 100;
                progressBar.style.width = `${progress}%`;
                ticking = false;
            });
            ticking = true;
        }
    }, 10));

    // Typing Animation for Hero Section with improved performance
    const heroText = document.querySelector('.hero-content h1');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                requestAnimationFrame(() => {
                    heroText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                });
            }
        }

        typeWriter();
    }

    // Parallax Effect for Hero Section with improved performance
    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        window.addEventListener('scroll', debounce(() => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
                    ticking = false;
                });
                ticking = true;
            }
        }, 10));
    }
}); 