// ===========================
// BRIGHT AUTOMATIONS - FUTURISTIC JAVASCRIPT
// ===========================

// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.dotX = 0;
        this.dotY = 0;

        this.init();
    }

    init() {
        // Don't initialize on mobile or touch devices
        if (window.innerWidth <= 768 || 'ontouchstart' in window) return;

        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.body.appendChild(this.cursor);

        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'cursor-dot';
        document.body.appendChild(this.cursorDot);

        // Enable custom cursor mode (hides default cursor)
        document.body.classList.add('custom-cursor-active');

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .feature-card, input, textarea, select');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
            this.cursorDot.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
            this.cursorDot.style.opacity = '1';
        });

        this.animate();
    }

    animate() {
        // Smooth cursor movement
        this.cursorX += (this.mouseX - this.cursorX) * 0.15;
        this.cursorY += (this.mouseY - this.cursorY) * 0.15;

        // Faster dot movement
        this.dotX += (this.mouseX - this.dotX) * 0.35;
        this.dotY += (this.mouseY - this.dotY) * 0.35;

        if (this.cursor) {
            this.cursor.style.left = this.cursorX + 'px';
            this.cursor.style.top = this.cursorY + 'px';
        }

        if (this.cursorDot) {
            this.cursorDot.style.left = this.dotX + 'px';
            this.cursorDot.style.top = this.dotY + 'px';
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Particle System
class ParticleSystem {
    constructor() {
        this.container = null;
        this.particleCount = 50;
        this.init();
    }

    init() {
        // Create container
        this.container = document.createElement('div');
        this.container.className = 'particles-bg';
        document.body.prepend(this.container);

        // Create particles
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 20 + 15;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;

        this.container.appendChild(particle);
    }
}

// Grid Background
class GridBackground {
    constructor() {
        this.init();
    }

    init() {
        const grid = document.createElement('div');
        grid.className = 'grid-bg';
        document.body.prepend(grid);
    }
}

// Glowing Text Effect
class GlowingText {
    constructor() {
        this.init();
    }

    init() {
        const highlights = document.querySelectorAll('.text-highlight');
        highlights.forEach(text => {
            text.setAttribute('data-text', text.textContent);
        });
    }
}

// Mouse Trail Effect
class MouseTrail {
    constructor() {
        this.trail = [];
        this.trailLength = 20;
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        if (window.innerWidth <= 768) return;

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Create trail elements
        for (let i = 0; i < this.trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'trail-dot';
            dot.style.cssText = `
                position: fixed;
                width: ${3 + (this.trailLength - i) * 0.3}px;
                height: ${3 + (this.trailLength - i) * 0.3}px;
                background: rgba(46, 125, 138, ${0.1 + (this.trailLength - i) * 0.03});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s;
            `;
            document.body.appendChild(dot);
            this.trail.push({
                element: dot,
                x: 0,
                y: 0
            });
        }

        this.animate();
    }

    animate() {
        let x = this.mouseX;
        let y = this.mouseY;

        this.trail.forEach((dot, index) => {
            const nextDot = this.trail[index + 1] || this.trail[0];

            dot.x += (x - dot.x) * (0.35 - index * 0.01);
            dot.y += (y - dot.y) * (0.35 - index * 0.01);

            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';

            x = dot.x;
            y = dot.y;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Tilt Effect replaced by Vanilla Tilt.js library

// Magnetic Buttons
class MagneticButtons {
    constructor() {
        this.init();
    }

    init() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Typing Effect
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Mobile Menu Toggle — navbar goes full-screen when menu opens
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    let isOpen = false;

    function openMenu() {
        if (!navMenu || isOpen) return;
        isOpen = true;
        navbar.classList.add('nav-open');
        navMenu.classList.add('mobile-open');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';

        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', closeMenu, { once: true });
        });
    }

    function closeMenu() {
        if (!navMenu || !isOpen) return;
        isOpen = false;
        navbar.classList.remove('nav-open');
        navMenu.classList.remove('mobile-open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isOpen) { closeMenu(); } else { openMenu(); }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOpen) closeMenu();
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Navigation Link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Smooth Scroll for Anchor Links (uses Lenis when available)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            if (window._lenis) {
                window._lenis.scrollTo(targetElement, { offset: -80 });
            } else {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }
    });
});

// Animate on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => observer.observe(element));
};

document.addEventListener('DOMContentLoaded', animateOnScroll);

// Form Submission Handler
function setupFormHandlers() {
    const forms = document.querySelectorAll('form[data-form-type]');

    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formType = this.getAttribute('data-form-type');
            const submitBtn = this.querySelector('[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';

            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('Success! We\'ll get back to you soon.', 'success');

                // Reset form
                this.reset();

                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }, 1500);
        });
    });
}

document.addEventListener('DOMContentLoaded', setupFormHandlers);

// Notification System
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                max-width: 400px;
                padding: 1rem 1.5rem;
                background: rgba(14, 30, 50, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(46, 125, 138, 0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease;
                border: 1px solid rgba(46, 125, 138, 0.2);
                color: #fff;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }

            .notification-content i {
                font-size: 1.25rem;
            }

            .notification-success {
                border-left: 4px solid #00E676;
            }

            .notification-success i {
                color: #00E676;
                text-shadow: 0 0 10px rgba(0, 230, 118, 0.5);
            }

            .notification-error {
                border-left: 4px solid #FF5252;
            }

            .notification-error i {
                color: #FF5252;
            }

            .notification-info {
                border-left: 4px solid #4AABB8;
            }

            .notification-info i {
                color: #4AABB8;
                text-shadow: 0 0 10px rgba(74, 171, 184, 0.5);
            }

            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #829AB1;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                transition: color 0.3s;
            }

            .notification-close:hover {
                color: #4AABB8;
            }

            @media (max-width: 768px) {
                .notification {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Modal System
class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        if (!this.modal) return;

        this.closeBtn = this.modal.querySelector('.modal-close');
        this.overlay = this.modal.querySelector('.modal-overlay');

        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    isOpen() {
        return this.modal.classList.contains('active');
    }
}

// Stats Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Initialize counters when they come into view
const initCounters = () => {
    const counters = document.querySelectorAll('[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
};

document.addEventListener('DOMContentLoaded', initCounters);

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(err => {
        showNotification('Failed to copy', 'error');
    });
}

// Back to Top Button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Back to top');
    // Hide on mobile — conflicts with chatbot button
    var isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2E7D8A 0%, #4AABB8 100%);
        color: white;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(46, 125, 138, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('click', () => {
        if (window._lenis) {
            window._lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 8px 30px rgba(46, 125, 138, 0.6)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 20px rgba(46, 125, 138, 0.4)';
    });
}

document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Parallax Effect for Hero
function initParallax() {
    const hero = document.querySelector('.hero, .hero-video-section');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content, .hero-video-content');
        const heroVisual = hero.querySelector('.hero-visual, .hero-video-wrapper');

        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - scrolled / 700;
        }

        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

document.addEventListener('DOMContentLoaded', initParallax);

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor disabled — using normal browser cursor

    // Initialize particle system
    new ParticleSystem();

    // Initialize grid background
    new GridBackground();

    // Initialize glowing text
    new GlowingText();

    // Initialize magnetic buttons
    new MagneticButtons();

    // Add scramble effect style
    const scrambleStyle = document.createElement('style');
    scrambleStyle.textContent = `
        .scramble-char {
            color: #4AABB8;
            text-shadow: 0 0 10px rgba(74, 171, 184, 0.5);
        }
    `;
    document.head.appendChild(scrambleStyle);
});

// Reveal sections on scroll with stagger
function initRevealSections() {
    const sections = document.querySelectorAll('.section, .section-full');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Stagger children animations
                const children = entry.target.querySelectorAll('.card, .feature-card, .process-item, .stat-item');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', initRevealSections);

// Smooth page transitions (enhanced)
function initPageTransitions() {
    document.body.classList.add('page-loaded');

    const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="tel"])');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('.html') || !href.includes('.')) {
                e.preventDefault();
                document.body.classList.add('page-leaving');
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initPageTransitions);

// Fix back button: restore visibility when page is loaded from bfcache
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        document.body.classList.remove('page-leaving');
        document.body.classList.add('page-loaded');
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
});

// Page transition styles — only fade page content, never fixed elements (navbar, chatbot, toast)
// Uses body > *:not() to skip fixed-position overlays
const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
    body > *:not(.navbar):not(.social-proof-toast):not(.ba-chatbot):not(script):not(style):not(link) {
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    body.page-loaded > *:not(.navbar):not(.social-proof-toast):not(.ba-chatbot):not(script):not(style):not(link) {
        opacity: 1;
        transform: translateY(0);
    }
    body.page-leaving > *:not(.navbar):not(.social-proof-toast):not(.ba-chatbot):not(script):not(style):not(link) {
        opacity: 0;
        transform: translateY(-8px);
    }
`;
document.head.appendChild(transitionStyles);

// Safety fallback: ensure page becomes visible even if DOMContentLoaded handler fails
setTimeout(function() {
    if (!document.body.classList.contains('page-loaded')) {
        document.body.classList.add('page-loaded');
    }
}, 800);

// ===========================
// LENIS SMOOTH SCROLLING
// ===========================
function initLenis() {
    if (typeof Lenis === 'undefined') return;

    // Skip Lenis on iOS/touch devices — native scroll is better there
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isIOS || (isTouchDevice && window.innerWidth <= 1024)) return;

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false
    });

    window._lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    } else {
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
}

document.addEventListener('DOMContentLoaded', initLenis);

// ===========================
// VANILLA TILT.JS INITIALIZATION
// ===========================
function initVanillaTilt() {
    if (typeof VanillaTilt === 'undefined') return;
    if (window.innerWidth <= 768 || 'ontouchstart' in window) return;

    const tiltElements = document.querySelectorAll('.card, .feature-card, .pricing-card, .pricing-card-main, .step-card, .faq-item, .system-card, .team-card, .portfolio-card');

    VanillaTilt.init(tiltElements, {
        max: 6,
        speed: 400,
        glare: true,
        'max-glare': 0.12,
        scale: 1.02
    });
}

document.addEventListener('DOMContentLoaded', initVanillaTilt);

// ===========================
// GSAP SCROLL ANIMATIONS
// ===========================
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 768;

    // Counter animations for stat numbers (GSAP-only — AOS can't do this)
    document.querySelectorAll('.stat-number').forEach(stat => {
        const text = stat.textContent;
        const match = text.match(/^(\d+)/);
        if (!match) return;

        const target = parseInt(match[1]);
        const suffix = text.replace(match[1], '');

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            onEnter: () => {
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 1.8,
                    ease: 'power2.out',
                    onUpdate: () => {
                        stat.textContent = Math.ceil(obj.val) + suffix;
                    }
                });
            },
            once: true
        });
    });

    // Parallax on hero orbs (desktop only — causes jank on mobile)
    if (!isMobile) {
        document.querySelectorAll('.hero-orb').forEach((orb, i) => {
            gsap.to(orb, {
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: (i + 1) * 80,
                ease: 'none'
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', initGSAPAnimations);

// ===========================
// VANTA.JS FOR INNER PAGE HEADERS
// ===========================
function initPageHeaderVanta() {
    if (typeof VANTA === 'undefined' || typeof THREE === 'undefined') return;
    if (window.innerWidth <= 768) return; // Skip on mobile for performance

    const pageHeader = document.querySelector('.page-header');
    if (!pageHeader) return;
    // Don't apply to homepage hero (it has its own Vanta init)
    if (document.querySelector('#hero-vanta')) return;

    try {
        VANTA.NET({
            el: pageHeader,
            mouseControls: true,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x4AABB8,
            backgroundColor: 0x0a1628,
            points: 8.00,
            maxDistance: 20.00,
            spacing: 20.00,
            showDots: true
        });
    } catch(e) {
        console.log('Page header Vanta fallback to CSS gradient');
    }
}

document.addEventListener('DOMContentLoaded', initPageHeaderVanta);

// ===========================
// BUTTON RIPPLE EFFECT
// ===========================
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .pricing-cta, .btn-cta, .hero-cta-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            circle.classList.add('btn-ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            circle.style.width = circle.style.height = size + 'px';
            circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
            circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(circle);
            setTimeout(() => circle.remove(), 600);
        });
    });
}

document.addEventListener('DOMContentLoaded', initButtonRipple);

// Export functions for use in other scripts
window.BrightAutomations = {
    showNotification,
    Modal,
    copyToClipboard,
    TextScramble,
    TypingEffect
};
