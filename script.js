/* ========================================
   TASTYBITES — INTERACTIVE JS ENGINE
   ======================================== */

// ---- LOADING SCREEN ----
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 2200);
});
// Prevent scrolling while loading
document.body.style.overflow = 'hidden';

// ---- NAVBAR SCROLL EFFECT ----
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav-link:not(.btn-reserve-nav)');
const sections = document.querySelectorAll('section[id]');

function updateHeader() {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', updateHeader);

// ---- ACTIVE NAV LINK HIGHLIGHT ----
function highlightNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', highlightNav);

// ---- MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ---- HERO PARTICLES ----
function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    const count = 30;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        // Random warm colors
        const colors = ['#ff4500', '#ff6600', '#ffd700', '#ff073a', '#ff8c00'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(particle);
    }
}
createParticles();

// ---- COUNT-UP ANIMATION (Hero Stats) ----
function animateCountUp() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            if (isDecimal) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    });
}

// Trigger count-up when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCountUp();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
const heroSection = document.getElementById('home');
if (heroSection) heroObserver.observe(heroSection);

// ---- SCROLL REVEAL ANIMATIONS ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
});

// ---- MENU FILTER TABS ----
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-tab');

        menuCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
                // Staggered animation
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = 'fadeInUp 0.4s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ---- ADD TO CART BUTTON FEEDBACK ----
document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Added!';
        btn.style.background = '#22c55e';
        btn.style.color = '#fff';
        btn.style.borderColor = '#22c55e';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 1500);
    });
});

// ---- GALLERY MODAL ----
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const modalClose = document.getElementById('modal-close');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
let currentGalleryIndex = 0;

function openModal(index) {
    currentGalleryIndex = index;
    const item = galleryItems[index];
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalCaption.textContent = caption || '';
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openModal(index));
});

modalClose.addEventListener('click', closeModal);
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) closeModal();
});

modalPrev.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    openModal(currentGalleryIndex);
});
modalNext.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    openModal(currentGalleryIndex);
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') modalPrev.click();
    if (e.key === 'ArrowRight') modalNext.click();
});

// ---- REVIEWS SLIDER ----
const reviewCards = document.querySelectorAll('.review-card');
const dotsContainer = document.getElementById('review-dots');
let currentReview = 0;
let reviewInterval;

function initReviewDots() {
    reviewCards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('review-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToReview(i));
        dotsContainer.appendChild(dot);
    });
}

function goToReview(index) {
    reviewCards.forEach(card => card.classList.remove('active'));
    document.querySelectorAll('.review-dot').forEach(dot => dot.classList.remove('active'));
    reviewCards[index].classList.add('active');
    document.querySelectorAll('.review-dot')[index].classList.add('active');
    currentReview = index;
}

function nextReview() {
    const next = (currentReview + 1) % reviewCards.length;
    goToReview(next);
}

function startReviewAutoplay() {
    reviewInterval = setInterval(nextReview, 5000);
}

function stopReviewAutoplay() {
    clearInterval(reviewInterval);
}

if (reviewCards.length > 0) {
    initReviewDots();
    startReviewAutoplay();
    // Pause on hover
    const slider = document.querySelector('.reviews-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopReviewAutoplay);
        slider.addEventListener('mouseleave', startReviewAutoplay);
    }
}

// ---- RESERVATION FORM VALIDATION ----
const reserveForm = document.getElementById('reserve-form');
if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('res-name').value.trim();
        const email = document.getElementById('res-email').value.trim();
        const date = document.getElementById('res-date').value;
        const time = document.getElementById('res-time').value;
        const guests = document.getElementById('res-guests').value;

        // Basic validation
        if (!name || !email || !date || !time || !guests) {
            showFormError('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormError('Please enter a valid email address.');
            return;
        }

        // Date validation (must be future)
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            showFormError('Please select a future date.');
            return;
        }

        // Success
        const btn = document.getElementById('btn-submit');
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Reservation Confirmed!';
        btn.classList.add('success');
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<span>Confirm Reservation</span><i class="fas fa-check-circle"></i>';
            btn.classList.remove('success');
            btn.disabled = false;
            reserveForm.reset();
        }, 3000);
    });
}

function showFormError(message) {
    // Remove existing error
    const existing = document.querySelector('.form-error');
    if (existing) existing.remove();

    const error = document.createElement('div');
    error.className = 'form-error';
    error.style.cssText = `
        background: rgba(255, 7, 58, 0.1);
        border: 1px solid rgba(255, 7, 58, 0.3);
        color: #ff073a;
        padding: 0.8rem 1.2rem;
        border-radius: 10px;
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 1rem;
        animation: fadeInUp 0.3s ease;
    `;
    error.textContent = message;
    const btn = document.getElementById('btn-submit');
    btn.parentNode.insertBefore(error, btn);

    setTimeout(() => {
        if (error.parentNode) error.remove();
    }, 4000);
}

// ---- NEWSLETTER FORM ----
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const btn = newsletterForm.querySelector('button');

        if (input.value.trim()) {
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#22c55e';
            input.value = '';
            input.placeholder = 'You\'re in! 🔥';

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-arrow-right"></i>';
                btn.style.background = '';
                input.placeholder = 'Your email';
            }, 3000);
        }
    });
}

// ---- SMOOTH SCROLL (with offset for fixed header) ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 10;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
