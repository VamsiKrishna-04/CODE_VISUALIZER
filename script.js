document.addEventListener('DOMContentLoaded', () => {
    // Navbar Dropdown Functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener('mouseover', () => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.display = 'block';
            }
        });

        dropdown.addEventListener('mouseout', () => {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.display = 'none';
            }
        });
    });

    // Smooth Scrolling for Internal Links
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (event) => {
            event.preventDefault();
            const target = document.querySelector(ctaButton.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Add Scroll Effect for Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Feature Card Animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Dynamic Footer Year
    const footer = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} CODE VISUALIZER. All rights reserved.`;

    // Responsive Dropdown Menu (Optional Toggle for Mobile)
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.createElement('button');
    mobileToggle.classList.add('mobile-toggle');
    mobileToggle.textContent = '☰';
    navbar.insertBefore(mobileToggle, navLinks);

    mobileToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
    });

    // Close Dropdown on Outside Click (Mobile)
    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target) && window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Effect for New Sections
    const sections = document.querySelectorAll('.why-code-visualizer, .advantages, .achievements, .usefulness');
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
});


