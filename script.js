// Enhanced Custom Cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor hover effects
const interactiveElements = document.querySelectorAll(
    'a, button, .resource-item, .card, .quick-nav a, .nav-links a, li'
);

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-active');
        el.style.transform = 'translateY(-2px)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-active');
        el.style.transform = 'translateY(0)';
    });
});

// Scroll effects
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.syllabus-nav');
    if (window.scrollY > 50) {
        nav.classList.add('syllabus-nav-scrolled');
    } else {
        nav.classList.remove('syllabus-nav-scrolled');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Animate elements on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .section-title').forEach(el => {
    observer.observe(el);
});
