// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Sticky Header
  const header = document.querySelector("header");
  const heroSection = document.querySelector(".hero");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const ctaButtons = document.querySelector(".cta-buttons");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      ctaButtons.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          ctaButtons.classList.remove("active");
          mobileMenuBtn.classList.remove("active");
        }

        window.scrollTo({
          top: targetElement.offsetTop - header.offsetHeight,
          behavior: "smooth",
        });
      }
    });
  });

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section[id]");

  function highlightNavLink() {
    const scrollPosition = window.scrollY + header.offsetHeight + 50;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(
        `.nav-links a[href="#${sectionId}"]`
      );

      if (
        navLink &&
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active");
        });
        navLink.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);
  highlightNavLink(); // Call once on page load

  // Maps Carousel
  const mapsCarousel = document.querySelector(".maps-carousel");
  const mapCards = document.querySelectorAll(".map-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dots = document.querySelectorAll(".dot");

  if (mapsCarousel && mapCards.length > 0) {
    let currentIndex = 0;
    const cardWidth = mapCards[0].offsetWidth;
    const cardMargin = 16; // Equivalent to 1rem gap
    const totalCards = mapCards.length;

    // For mobile view, we'll show one card at a time
    function updateCarousel() {
      if (window.innerWidth <= 992) {
        // Mobile view - vertical layout
        mapsCarousel.style.transform = "translateY(0)";
        mapCards.forEach((card, index) => {
          if (index === currentIndex) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      } else {
        // Desktop view - horizontal layout
        mapCards.forEach((card) => {
          card.style.display = "block";
        });

        // Center the current card
        const offset = currentIndex * (cardWidth + cardMargin * 2);
        mapsCarousel.style.transform = `translateX(-${offset}px)`;
      }

      // Update dots
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    // Initialize carousel
    updateCarousel();

    // Event listeners for carousel controls
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
      });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        currentIndex = index;
        updateCarousel();
      });
    });

    // Update carousel on window resize
    window.addEventListener("resize", updateCarousel);
  }

  // Video Placeholder Click
  const videoPlaceholder = document.querySelector(".video-placeholder");

  if (videoPlaceholder) {
    videoPlaceholder.addEventListener("click", function () {
      const videoContainer = this.parentElement;

      // Replace placeholder with YouTube embed
      // In a real implementation, you would use the actual YouTube video ID
      const iframe = document.createElement("iframe");
      iframe.setAttribute(
        "src",
        "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
      );
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      );
      iframe.setAttribute("allowfullscreen", "");
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";

      videoContainer.innerHTML = "";
      videoContainer.appendChild(iframe);
    });
  }

  // Newsletter Form Submission
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (email === "") {
        // Show error
        emailInput.classList.add("error");
        return;
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        // Show error
        emailInput.classList.add("error");
        return;
      }

      // Success - in a real implementation, you would send this to a server
      emailInput.classList.remove("error");
      emailInput.value = "";

      // Show success message
      const successMessage = document.createElement("p");
      successMessage.classList.add("success-message");

      // Get current language
      const currentLang = document.documentElement.lang || "en";

      // Get translated success message or fallback to English
      if (
        window.translations &&
        window.translations[currentLang] &&
        window.translations[currentLang]["Thank you for subscribing!"]
      ) {
        successMessage.textContent =
          window.translations[currentLang]["Thank you for subscribing!"];
      } else {
        successMessage.textContent = "Thank you for subscribing!";
      }

      const existingMessage = newsletterForm.querySelector(".success-message");
      if (existingMessage) {
        existingMessage.remove();
      }

      newsletterForm.appendChild(successMessage);

      // Remove success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    });
  }

  // Animation on scroll
  const animatedElements = document.querySelectorAll(
    ".feature-card, .weapon-card, .map-card, .social-card"
  );

  function checkIfInView() {
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isVisible =
        elementTop < window.innerHeight - 100 && elementBottom > 0;

      if (isVisible) {
        element.classList.add("animate");
      }
    });
  }

  // Initial check
  checkIfInView();

  // Check on scroll
  window.addEventListener("scroll", checkIfInView);
});

// Add CSS class for animation on scroll
document.addEventListener("DOMContentLoaded", function () {
  const style = document.createElement("style");
  style.textContent = `
        .feature-card, .weapon-card, .map-card, .social-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .weapon-card.animate, .map-card.animate, .social-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        header.scrolled {
            background-color: rgba(22, 22, 31, 0.95);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
        
        .nav-links.active, .cta-buttons.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background-color: rgba(22, 22, 31, 0.95);
            padding: 1rem 0;
            z-index: 1000;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
        
        .nav-links.active {
            align-items: center;
            gap: 1rem;
        }
        
        .cta-buttons.active {
            top: calc(70px + 5 * 40px); /* Header height + number of nav links * height */
            align-items: center;
            gap: 1rem;
            padding-bottom: 2rem;
        }
        
        .cta-buttons.active .discord-btn {
            margin-left: 0;
            margin-top: 1rem;
        }
        
        .mobile-menu-btn.active i:before {
            content: "\\f00d"; /* Font Awesome times icon */
        }
        
        .newsletter-form input.error {
            border: 2px solid var(--primary-color);
        }
        
        .success-message {
            color: #4BB543;
            margin-top: 1rem;
            font-weight: 600;
        }
    `;
  document.head.appendChild(style);
});
