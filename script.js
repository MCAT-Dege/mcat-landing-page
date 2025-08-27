// Initialize all animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions in the correct order
    addRippleStyles();
    initBackgroundAnimations();
    initFormAnimations();
    initContentAnimations();
    initWaitlistForms();
    initSmoothScrolling();
    initMobileHeader();
    
    // Enhanced input focus animations
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            anime({
                targets: this,
                translateY: -2,
                scale: 1.02,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        input.addEventListener('blur', function() {
            anime({
                targets: this,
                translateY: 0,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Option hover effects
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        option.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add scroll-triggered parallax for content sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.feature-card, .story-card');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
});

function initBackgroundAnimations() {
    // Initialize floating shapes with elegant movements
    const shapes = document.querySelectorAll('.shape');
    const particles = document.querySelectorAll('.particle');
    const flowLines = document.querySelectorAll('.flow-line');
    
    // Create enhanced floating particles
    createEnhancedParticles();
    
    // Create neural network nodes and connections
    createNeuralNetwork();
    
    // Add subtle mouse parallax effect to shapes (invincible.bio style)
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3; // Reduced speed for elegance
            const x = (mouseX - 0.5) * speed * 15;
            const y = (mouseY - 0.5) * speed * 15;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Very subtle particle movement
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.15; // Minimal movement
            const x = (mouseX - 0.5) * speed * 8;
            const y = (mouseY - 0.5) * speed * 8;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Add subtle hover effects to shapes (invincible.bio style)
    shapes.forEach(shape => {
        shape.addEventListener('mouseenter', () => {
            anime({
                targets: shape,
                scale: [1, 1.1],
                opacity: [0.08, 0.2],
                duration: 400,
                easing: 'easeOutCubic'
            });
        });
        
        shape.addEventListener('mouseleave', () => {
            anime({
                targets: shape,
                scale: [1.1, 1],
                opacity: [0.2, 0.08],
                duration: 400,
                easing: 'easeOutCubic'
            });
        });
    });
    
    // Enhanced DNA helix animation
    const helixStrands = document.querySelectorAll('.helix-strand');
    helixStrands.forEach((strand, index) => {
        anime({
            targets: strand,
            rotateY: [0, 360],
            duration: 10000 + (index * 1500),
            easing: 'linear',
            loop: true
        });
    });
    
    // Elegant grid overlay movement
    const gridOverlay = document.querySelector('.grid-overlay');
    if (gridOverlay) {
        anime({
            targets: gridOverlay,
            translateX: [0, 80],
            translateY: [0, 80],
            duration: 60000,
            easing: 'linear',
            loop: true
        });
    }
    
    // Recreate neural network on resize
    window.addEventListener('resize', () => {
        const neuralContainer = document.getElementById('neural-network');
        if (neuralContainer) {
            neuralContainer.innerHTML = '';
            createNeuralNetwork();
        }
    });
}

// Create enhanced floating particles
function createEnhancedParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
    }
}

// Create neural network nodes and connections
function createNeuralNetwork() {
    const container = document.getElementById('neural-network');
    if (!container) return;
    
    const nodeCount = 12;
    const nodes = [];
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        node.style.left = x + 'px';
        node.style.top = y + 'px';
        node.style.animationDelay = Math.random() * 3 + 's';
        
        nodes.push({ element: node, x, y });
        container.appendChild(node);
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = Math.sqrt(
                Math.pow(nodes[i].x - nodes[j].x, 2) + 
                Math.pow(nodes[i].y - nodes[j].y, 2)
            );
            
            if (distance < 300) {
                const connection = document.createElement('div');
                connection.className = 'connection';
                
                const angle = Math.atan2(
                    nodes[j].y - nodes[i].y,
                    nodes[j].x - nodes[i].x
                );
                
                connection.style.left = nodes[i].x + 'px';
                connection.style.top = nodes[i].y + 'px';
                connection.style.width = distance + 'px';
                connection.style.transform = `rotate(${angle}rad)`;
                connection.style.animationDelay = Math.random() * 4 + 's';
                
                container.appendChild(connection);
            }
        }
    }
}

function initMobileHeader() {
    // Handle mobile header visibility and interactions
    const mobileHeader = document.querySelector('.mobile-logo-header');
    
    if (mobileHeader) {
        // Add scroll effect to mobile header (subtle shadow change)
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mobileHeader.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2)';
            } else {
                mobileHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            }
        });
        
        // Add click effect to mobile logo
        const mobileLogo = mobileHeader.querySelector('.mobile-logo-container');
        mobileLogo.addEventListener('click', () => {
            // Scroll to top when mobile logo is clicked
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initFormAnimations() {
    // Animate form container entrance
    anime({
        targets: '.form-container',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutCubic',
        delay: 300
    });

    // Animate hero section elements
    anime({
        targets: '.hero-section > *',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutCubic',
        delay: anime.stagger(100, {start: 400})
    });

    // Animate features with staggered delays
    anime({
        targets: '.feature',
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 500,
        easing: 'easeOutCubic',
        delay: anime.stagger(100, {start: 800})
    });
}



// Mouse movement parallax effect
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.shape');
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        
        anime({
            targets: shape,
            translateX: x,
            translateY: y,
            duration: 1000,
            easing: 'easeOutQuart'
        });
    });
});

function initContentAnimations() {
    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const storyCards = document.querySelectorAll('.story-card');
    
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    [...featureCards, ...storyCards, document.querySelector('.cta-section')].forEach(el => {
        if (el) {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        }
    });
    
    // Add hover animations for interactive elements
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card.querySelector('.feature-icon'),
                scale: [1, 1.1],
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card.querySelector('.feature-icon'),
                scale: [1.1, 1],
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
    
    // Add click animations for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Button press animation
            anime({
                targets: button,
                scale: [1, 0.95],
                duration: 150,
                easing: 'easeOutCubic',
                complete: () => {
                    anime({
                        targets: button,
                        scale: [0.95, 1],
                        duration: 150,
                        easing: 'easeOutCubic'
                    });
                }
            });
        });
    });
}

function initWaitlistForms() {
    console.log('initWaitlistForms called - setting up form listeners');
    
    const forms = [
        { id: 'waitlistForm', messageId: 'formMessage' },
        { id: 'footerWaitlistForm', messageId: 'footerFormMessage' }
    ];

    forms.forEach(form => {
        const formElement = document.getElementById(form.id);
        const messageElement = document.getElementById(form.messageId);

        if (formElement) {
            // Remove any existing listeners first
            const newFormElement = formElement.cloneNode(true);
            formElement.parentNode.replaceChild(newFormElement, formElement);
            
            // Add the new listener
            newFormElement.addEventListener('submit', function (e) {
                console.log('Form submitted:', form.id);
                e.preventDefault();
                handleWaitlistSubmission(newFormElement, messageElement);
            });
            
            console.log('Form listener added for:', form.id);
        } else {
            console.log('Form not found:', form.id);
        }
    });
}

// Handle waitlist form submission
async function handleWaitlistSubmission(formElement, messageElement) {
    console.log('handleWaitlistSubmission called for form:', formElement.id);
    
    // Prevent multiple submissions
    if (formElement.dataset.submitting === 'true') {
        console.log('Form already submitting, preventing duplicate submission');
        return;
    }
    
    // Mark form as submitting
    formElement.dataset.submitting = 'true';
    console.log('Form marked as submitting');
    
    const formData = new FormData(formElement);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    
    // Basic validation
    if (!name) {
        showMessage(messageElement, 'Please enter your full name.', 'error');
        formElement.dataset.submitting = 'false';
        return;
    }
    
    if (!email) {
        showMessage(messageElement, 'Please enter your email address.', 'error');
        formElement.dataset.submitting = 'false';
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage(messageElement, 'Please enter a valid email address.', 'error');
        formElement.dataset.submitting = 'false';
        return;
    }
    
    // Show loading state
    showMessage(messageElement, 'Submitting...', 'loading');
    
    // Execute reCAPTCHA v3
    const formId = formElement.id;
    const recaptchaResponse = await executeRecaptcha(formId);
    
    if (!recaptchaResponse) {
        showMessage(messageElement, 'reCAPTCHA verification failed. Please try again.', 'error');
        formElement.dataset.submitting = 'false';
        return;
    }
    
    try {
        // Submit to API
        const response = await submitWaitlistData(name, email, recaptchaResponse);
        
        // Handle API response
        const result = handleAPIResponse(response);
        
        if (result.success) {
            // Show success message
            showMessage(messageElement, result.message || 'Thank you! Redirecting to confirmation page...', 'success');
            
            // Reset reCAPTCHA after successful submission
            resetRecaptcha(formId);
            
            // Track successful submission
            trackEvent('waitlist_signup', { name, email });
            
            // Only redirect to thank you page if API status is true
            if (result.apiStatus === true) {
                setTimeout(() => {
                    const params = new URLSearchParams({
                        status: result.success.toString(),
                        message: encodeURIComponent(result.message || 'Successfully subscribed to newsletter'),
                        name: encodeURIComponent(name)
                    });
                    window.location.href = `/thank-you.html?${params.toString()}`;
                }, 2000);
            } else {
                // Show success message but don't redirect if API status is false
                showMessage(messageElement, result.message || 'Thank you for signing up! You will receive updates soon.', 'success');
            }
        } else {
            showMessage(messageElement, result.message || 'Something went wrong. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Waitlist submission error:', error);
        showMessage(messageElement, 'Network error. Please check your connection and try again.', 'error');
    } finally {
        // Reset submitting flag
        formElement.dataset.submitting = 'false';
    }
}

async function submitWaitlistData(name, email, recaptchaResponse) {
    const apiEndpoint = 'https://api.mcatedge.com/api/v1/newsletter-subscribe';

    try {
        const bot = 'bot';
        const bot_capture = null;

        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                bot: bot,
                bot_capture: bot_capture,
                captcha: recaptchaResponse
            })
        });

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        throw error;
    }
}

async function executeRecaptcha(formId) {
    try {
        const response = await grecaptcha.execute('6LcYr60rAAAAAHqHNM9-Aldd44dXPcjZl8JVphsC', { action: 'submit' });


        if (formId === 'waitlistForm') {
            document.getElementById('g-recaptcha-response').value = response;
        } else if (formId === 'footerWaitlistForm') {
            document.getElementById('footerGRecaptchaResponse').value = response;
        }

        return response;
    } catch (error) {
        console.error('reCAPTCHA execution error:', error);
        return null;
    }
}


function getRecaptchaResponse(formId) {
    if (formId === 'waitlistForm') {
        return document.getElementById('g-recaptcha-response').value;
    } else if (formId === 'footerWaitlistForm') {
        return document.getElementById('footerGRecaptchaResponse').value;
    }
    return '';
}


function resetRecaptcha(formId) {

}

function handleAPIResponse(response) {
    // Check if API has status field
    if (response.status !== undefined) {
        return {
            success: response.status === true,
            apiStatus: response.status, // Preserve the actual API status
            message: response.message || 'Operation completed'
        };
    }

    // Check if API has success field
    if (response.success !== undefined) {
        return {
            success: response.success,
            apiStatus: response.success, // Use success as API status
            message: response.message || 'Operation completed'
        };
    }

    // If only message is present, assume success but no redirect
    if (response.message) {
        return {
            success: true,
            apiStatus: false, // Don't redirect if no explicit status
            message: response.message
        };
    }

    // Default fallback - success but no redirect
    return {
        success: true,
        apiStatus: false, // Don't redirect by default
        message: 'Successfully subscribed to newsletter'
    };
}


function showMessage(messageElement, message, type) {
    if (!messageElement) return;

    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;


    if (type === 'success') {
        setTimeout(() => {
            messageElement.textContent = '';
            messageElement.className = 'form-message';
        }, 8000);
    }


    if (type === 'loading') {
        setTimeout(() => {
            if (messageElement.textContent === 'Submitting...') {
                messageElement.textContent = '';
                messageElement.className = 'form-message';
            }
        }, 10000);
    }
}


function isValidEmail(email) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function trackEvent(eventName, eventData) {

    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }


    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }


    console.log('Event tracked:', eventName, eventData);
}


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}







window.MCATEdge = {
    submitWaitlist: submitWaitlistData,
    trackEvent: trackEvent,
    isValidEmail: isValidEmail
};

// Add ripple animation CSS
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}


