/* ============================================
   ABEL'S HOUSE - Documentation Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize navigation
  initNavigation();

  // Initialize gallery lightbox
  initLightbox();

  // Initialize mobile menu
  initMobileMenu();

  // Initialize scroll spy
  initScrollSpy();
});

/**
 * Navigation Toggle
 */
function initNavigation() {
  const categories = document.querySelectorAll('.nav-category');

  categories.forEach(category => {
    const header = category.querySelector('.nav-category-header');
    const subcategories = category.querySelector('.nav-subcategories');

    if (header && subcategories) {
      header.addEventListener('click', (e) => {
        // If clicking on a link, don't toggle
        if (e.target.tagName === 'A') return;

        // Close other categories
        categories.forEach(cat => {
          if (cat !== category) {
            cat.classList.remove('open');
          }
        });

        // Toggle current category
        category.classList.toggle('open');
      });
    }

    // Direct link navigation
    const directLink = header?.querySelector('a');
    if (directLink) {
      directLink.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });

  // Subcategory click handling
  const subcategoryLinks = document.querySelectorAll('.nav-subcategory');
  subcategoryLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Remove active from all
      subcategoryLinks.forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.nav-category-header').forEach(h => h.classList.remove('active'));

      // Add active to clicked
      this.classList.add('active');
      this.closest('.nav-category')?.querySelector('.nav-category-header')?.classList.add('active');
    });
  });
}

/**
 * Gallery Lightbox
 */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption p')?.textContent;

      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }

      if (lightboxCaption) {
        lightboxCaption.textContent = caption || '';
      }

      lightbox?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Mobile Menu
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const sidebar = document.querySelector('.sidebar');

  menuBtn?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      if (!sidebar?.contains(e.target) && !menuBtn?.contains(e.target)) {
        sidebar?.classList.remove('open');
      }
    }
  });

  // Close sidebar when clicking a link on mobile
  const navLinks = document.querySelectorAll('.sidebar a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar?.classList.remove('open');
      }
    });
  });
}

/**
 * Scroll Spy - Highlight active section in nav
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-subcategory, .nav-category-header a');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        // Remove active from all
        navLinks.forEach(link => {
          link.classList.remove('active');
          link.closest('.nav-category-header')?.classList.remove('active');
        });

        // Add active to current
        const activeLink = document.querySelector(`a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');

          // Also highlight parent category
          const parentCategory = activeLink.closest('.nav-category');
          if (parentCategory) {
            parentCategory.classList.add('open');
            parentCategory.querySelector('.nav-category-header')?.classList.add('active');
          }
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
