/**
 * KEEM CAPITAL - MAIN JAVASCRIPT
 * Handles navigation, interactivity, and dynamic content
 */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    // Close menu when clicking a link (mobile)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('show');
            }
        });
    });

    // Active page highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // Read More functionality for blog posts
    const readMoreBtns = document.querySelectorAll('.read-more');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const fullContent = this.nextElementSibling;
            if (fullContent && fullContent.classList.contains('full-content')) {
                if (fullContent.style.display === 'none' || !fullContent.style.display) {
                    fullContent.style.display = 'block';
                    this.textContent = 'Show less ↑';
                } else {
                    fullContent.style.display = 'none';
                    this.textContent = 'Read more →';
                }
            }
        });
    });

    // Analysis filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            blogPosts.forEach(post => {
                if (filter === 'all' || post.getAttribute('data-category') === filter) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add year to footer
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Form submission handling (if using Formspree)
const contactForm = document.querySelector('.contact-form-box form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Form will submit normally to Formspree
        // Add loading state if desired
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }
    });
}

// Lazy loading for TikTok iframes
const iframes = document.querySelectorAll('iframe');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            const src = iframe.getAttribute('data-src');
            if (src) {
                iframe.src = src;
                iframe.removeAttribute('data-src');
            }
            observer.unobserve(iframe);
        }
    });
});

iframes.forEach(iframe => {
    if (iframe.getAttribute('data-src')) {
        observer.observe(iframe);
    }
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.card, .video-card, .blog-post, .feature');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    revealObserver.observe(el);
});

console.log('Keem Capital website loaded successfully!');
