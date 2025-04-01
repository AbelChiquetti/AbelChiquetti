document.addEventListener("DOMContentLoaded", function () {
  // Get browser language
  let userLang = navigator.language || navigator.userLanguage;
  userLang = userLang.split("-")[0]; // Extract base language (en, pt, etc.)

  // Default to English if language is not supported
  if (userLang !== "pt" && userLang !== "en") {
    userLang = "en";
  }

  // Set html lang attribute
  document.documentElement.lang = userLang;

  // Language toggle button with flag icons
  const languageToggle = document.createElement("div");
  languageToggle.className = "language-toggle";
  languageToggle.innerHTML = `
    <button class="lang-btn ${
      userLang === "en" ? "active" : ""
    }" data-lang="en">
      <img src="images/usa-flag.svg" alt="English" class="flag-icon" />
    </button>
    <button class="lang-btn ${
      userLang === "pt" ? "active" : ""
    }" data-lang="pt">
      <img src="images/brazil-flag.svg" alt="Português" class="flag-icon" />
    </button>
  `;

  // Insert language toggle in the header
  const nav = document.querySelector("header nav");
  if (nav) {
    nav.appendChild(languageToggle);
  }

  // Add language toggle styles
  const style = document.createElement("style");
  style.textContent = `
    .language-toggle {
      display: flex;
      gap: 5px;
      margin-left: 15px;
      align-items: center;
    }
    
    .lang-btn {
      background: transparent;
      border: 1px solid var(--primary-color);
      cursor: pointer;
      padding: 5px;
      border-radius: 4px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .lang-btn.active {
      background-color: var(--primary-color);
    }
    
    .flag-icon {
      width: 24px;
      height: 16px;
      border-radius: 2px;
    }
    
    @media (max-width: 992px) {
      .language-toggle {
        position: absolute;
        top: 20px;
        right: 70px;
      }
    }
    
    @media (max-width: 768px) {
      .language-toggle {
        right: 60px;
      }
    }
  `;
  document.head.appendChild(style);

  // Create flag SVGs if they don't exist
  createFlagSVGs();

  // Apply translations on page load
  applyTranslations(userLang);

  // Handle language toggle buttons
  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");

      // Update language buttons
      langButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Update html lang attribute
      document.documentElement.lang = lang;

      // Apply translations
      applyTranslations(lang);
    });
  });

  // Function to create flag SVGs if they don't exist
  function createFlagSVGs() {
    // Create USA flag SVG
    const usaFlagSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
      <path fill="#bd3d44" d="M0 0h640v480H0"/>
      <path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203.3h640M0 277.3h640M0 351.3h640M0 425.3h640"/>
      <path fill="#192f5d" d="M0 0h364.8v258.5H0"/>
      <marker id="us-a" markerHeight="30" markerWidth="30">
        <path fill="#fff" d="m14 0 9 27L0 10h28L5 27z"/>
      </marker>
      <path fill="none" marker-mid="url(#us-a)" d="m0 0 16 11h61 61 61 61 60L47 37h61 61 60 61L16 63h61 61 61 61 60L47 89h61 61 60 61L16 115h61 61 61 61 60L47 141h61 61 60 61L16 167h61 61 61 61 60L47 193h61 61 60 61L16 219h61 61 61 61 60L0 258"/>
    </svg>`;

    // Create Brazil flag SVG
    const brazilFlagSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
      <path fill="#229e45" d="M0 0h640v480H0z"/>
      <path fill="#f8e509" d="M320 240 29.6 480h580.8L320 240z"/>
      <path fill="#f8e509" d="m320 240 290.4-240H29.6L320 240Z"/>
      <circle r="68.5" cx="320" cy="240" fill="#2b49a3"/>
      <path fill="#ffffef" d="M307.8 195.4a69.2 69.2 0 0 0-12.4 19.3 211.9 211.9 0 0 0 48.1 11.1 82.2 82.2 0 0 0-10-18.9 215 215 0 0 0-25.7-11.5z"/>
      <path fill="#ffffef" d="M331.9 207.3a68 68 0 0 1 16.3 15 186.7 186.7 0 0 0 24.5-14.4 70.8 70.8 0 0 0-23.3-17.4 204.2 204.2 0 0 0-17.5 16.8z"/>
      <path fill="#ffffef" d="M289.8 205.2a67.8 67.8 0 0 0-16.6 14.6 186.7 186.7 0 0 1-24.4-14.7 70.8 70.8 0 0 1 23.2-17.2 203.8 203.8 0 0 1 17.8 17.3z"/>
      <path fill="#ffffef" d="m320 273.4-3-1.7-3.4.2-1.8-2.9-3-1.6-1.1-3.2-3.3-.7.1-3.4-2.9-2 1.2-3.1-2-2.8 2.3-2.5-.7-3.3 3-1.6.8-3.3 3.3-.7 2-2.7 3.2.1 2.8-2 2.6 2 3.3-.6 1.8 2.9 3.5-.3 1 3.2 3.5 1 .2 3.4 3.2 1.3-1 3.2 2.3 2.5-2 2.8 1.3 3-2.7 2 .3 3.4-3 1.6-.5 3.3-3.3.9-.1 3.4-3.3.2-1.5 3-3-.3-2.4 2.4-2.7-1.8-3 1.2-2-2.8-2.8 2.2-1.3-3.1z"/>
    </svg>`;

    // Create SVG files and place them in the images folder
    createSVGFile("images/usa-flag.svg", usaFlagSVG);
    createSVGFile("images/brazil-flag.svg", brazilFlagSVG);
  }

  function createSVGFile(path, svgContent) {
    // In the browser context, we can't create files directly.
    // Instead, we'll use inline SVG in the HTML elements
    const flags = document.querySelectorAll(".flag-icon");
    flags.forEach((flag) => {
      if (flag.src.includes("usa-flag.svg")) {
        flag.style.display = "none";
        const svgContainer = document.createElement("div");
        svgContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="24" height="16">
          <rect width="640" height="480" fill="#bd3d44"/>
          <path d="M0 55.3h640M0 129h640M0 203.3h640M0 277.3h640M0 351.3h640M0 425.3h640" stroke="#fff" stroke-width="37"/>
          <rect width="364.8" height="258.5" fill="#192f5d"/>
          <g fill="#fff">
            <g id="d">
              <g id="c">
                <g id="b">
                  <g id="a">
                    <path d="M30.2 110.5l-3 9.3H17l8 5.9-3 9.3 8-5.9 8 5.9-3-9.3 8-5.9H32.8z"/>
                    <path d="M30.2 55.3l-3 9.3H17l8 5.9-3 9.3 8-5.9 8 5.9-3-9.3 8-5.9H32.8z"/>
                  </g>
                  <path d="M60.4 55.3l-3 9.3H47.1l8 5.9-3 9.3 8-5.9 8 5.9-3-9.3 8-5.9H63z"/>
                </g>
                <path d="M90.6 55.3l-3 9.3H77.3l8 5.9-3 9.3 8-5.9 8 5.9-3-9.3 8-5.9H93.2z"/>
              </g>
              <path d="M120.8 55.3l-3 9.3h-10.3l8 5.9-3 9.3 8-5.9 8 5.9-3-9.3 8-5.9h-10.3z"/>
            </g>
            <use xlink:href="#a" x="120.8"/>
            <use xlink:href="#b" x="120.8"/>
            <use xlink:href="#c" x="120.8"/>
            <path d="M30.2 165.8l-3 9.3H17l8 5.8-3 9.3 8-5.8 8 5.8-3-9.3 8-5.8H32.8z"/>
          </g>
          <use xlink:href="#d" y="55.3"/>
          <use xlink:href="#d" y="110.6"/>
        </svg>`;
        flag.parentNode.appendChild(svgContainer.firstChild);
      } else if (flag.src.includes("brazil-flag.svg")) {
        flag.style.display = "none";
        const svgContainer = document.createElement("div");
        svgContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="24" height="16">
          <path fill="#229e45" d="M0 0h640v480H0z"/>
          <path fill="#f8e509" d="M320 240 29.6 480h580.8L320 240zm0 0L29.6 0h580.8L320 240z"/>
          <circle r="68.5" fill="#2b49a3" cx="320" cy="240"/>
          <path fill="#ffffef" d="M300 216.4c-19.8 0-36.7 6.7-46.2 16.2 1.1 39 20.9 71.5 48 92a155 155 0 0 0 36.4 0c27.1-20.5 47-53 48-92-9.5-9.5-26.4-16.2-46.1-16.2h-40.1z"/>
          <path fill="#ffffef" d="M320 239.3l-4.8-14.8h-15.5l12.5-9.1-4.8-14.7 12.6 9.1 12.5-9.1-4.8 14.7 12.6 9.1h-15.5zm-72.5 22.3L242.8 247h-15.5l12.5-9.1-4.8-14.8 12.5 9.2 12.6-9.2-4.8 14.8 12.5 9.1h-15.5zm143.4 0l-4.8-14.6h-15.5l12.5-9.1-4.8-14.8 12.6 9.2 12.5-9.2-4.8 14.8 12.6 9.1h-15.5zm-71.7 60.2l-4.8-14.7h-15.5l12.6-9.1-4.9-14.7 12.6 9.1 12.5-9.1-4.8 14.7 12.6 9.1h-15.5zM255 260l-4.8-14.7h-15.5l12.5-9.1-4.8-14.7 12.6 9.1 12.5-9.1-4.8 14.7 12.6 9.1h-15.5zm129.9 0l-4.8-14.7h-15.5l12.5-9.1-4.8-14.7 12.6 9.1 12.5-9.1-4.8 14.7 12.6 9.1h-15.5z"/>
        </svg>`;
        flag.parentNode.appendChild(svgContainer.firstChild);
      }
    });
  }

  // Function to apply translations
  function applyTranslations(lang) {
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");

      if (translations[lang] && translations[lang][key]) {
        // Handle inputs (placeholder, value)
        if (el.tagName.toLowerCase() === "input") {
          if (el.placeholder) {
            el.placeholder = translations[lang][key];
          } else {
            el.value = translations[lang][key];
          }
        }
        // Handle span elements in heading with highlight class
        else if (el.classList.contains("highlight")) {
          el.textContent = translations[lang][key];
        }
        // Handle buttons, links and regular text elements
        else {
          el.textContent = translations[lang][key];
        }
      }
    });
  }

  // Apply data-i18n attributes to all translatable elements
  function addI18nAttributes() {
    // Navigation
    document.querySelectorAll(".nav-links a").forEach((el) => {
      el.setAttribute("data-i18n", el.textContent.trim());
    });

    // CTA Buttons
    const emailBtn = document.querySelector(".play-btn");
    if (emailBtn) {
      emailBtn.setAttribute("data-i18n", "Email");
    }

    // Hero Section
    const heroTitle = document.querySelector(".hero-content h1");
    if (heroTitle) {
      const titleText = heroTitle.childNodes[0].textContent.trim();
      heroTitle.childNodes[0].textContent = "";
      const textNode = document.createTextNode(titleText);
      heroTitle.insertBefore(textNode, heroTitle.firstChild);
      textNode.parentNode.setAttribute("data-i18n", titleText);

      const highlight = heroTitle.querySelector(".highlight");
      if (highlight) {
        highlight.setAttribute("data-i18n", highlight.textContent.trim());
      }
    }

    const heroDescription = document.querySelector(".hero-content p");
    if (heroDescription) {
      heroDescription.setAttribute(
        "data-i18n",
        heroDescription.textContent.trim()
      );
    }

    // Stats
    document.querySelectorAll(".stat-label").forEach((el) => {
      el.setAttribute("data-i18n", el.textContent.trim());
    });

    // Features Section
    const featuresHeader = document.querySelector(
      "#features .section-header h2"
    );
    if (featuresHeader) {
      const textNodes = Array.from(featuresHeader.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE
      );

      if (textNodes.length > 0) {
        const textNode = textNodes[0];
        textNode.textContent = "";
        const newTextNode = document.createTextNode("GAME ");
        featuresHeader.insertBefore(newTextNode, featuresHeader.firstChild);
        newTextNode.parentNode.setAttribute("data-i18n", "GAME");
      }

      const highlight = featuresHeader.querySelector(".highlight");
      if (highlight) {
        highlight.setAttribute("data-i18n", highlight.textContent.trim());
      }
    }

    const featuresDesc = document.querySelector("#features .section-header p");
    if (featuresDesc) {
      featuresDesc.setAttribute("data-i18n", featuresDesc.textContent.trim());
    }

    // Feature Cards
    document.querySelectorAll(".feature-card h3").forEach((el) => {
      el.setAttribute("data-i18n", el.textContent.trim());
    });

    document.querySelectorAll(".feature-card p").forEach((el) => {
      el.setAttribute("data-i18n", el.textContent.trim());
    });

    // Weapons Section
    const weaponsHeader = document.querySelector("#weapons .section-header h2");
    if (weaponsHeader) {
      const textNodes = Array.from(weaponsHeader.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE
      );

      if (textNodes.length > 0) {
        const textNode = textNodes[0];
        textNode.textContent = "";
        const newTextNode = document.createTextNode("DEADLY ");
        weaponsHeader.insertBefore(newTextNode, weaponsHeader.firstChild);
        newTextNode.parentNode.setAttribute("data-i18n", "DEADLY");
      }

      const highlight = weaponsHeader.querySelector(".highlight");
      if (highlight) {
        highlight.setAttribute("data-i18n", highlight.textContent.trim());
      }
    }

    const weaponsDesc = document.querySelector("#weapons .section-header p");
    if (weaponsDesc) {
      weaponsDesc.setAttribute("data-i18n", weaponsDesc.textContent.trim());
    }

    // Weapon Cards
    document.querySelectorAll(".weapon-card h3").forEach((el) => {
      el.setAttribute("data-i18n", el.textContent.trim());
    });

    // Maps Section
    const mapsHeader = document.querySelector("#maps .section-header h2");
    if (mapsHeader) {
      const textNodes = Array.from(mapsHeader.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE
      );

      if (textNodes.length > 0) {
        const textNode = textNodes[0];
        textNode.textContent = "";
        const newTextNode = document.createTextNode("BATTLE ");
        mapsHeader.insertBefore(newTextNode, mapsHeader.firstChild);
        newTextNode.parentNode.setAttribute("data-i18n", "BATTLE");
      }

      const highlight = mapsHeader.querySelector(".highlight");
      if (highlight) {
        highlight.setAttribute("data-i18n", highlight.textContent.trim());
      }
    }

    const mapsDesc = document.querySelector("#maps .section-header p");
    if (mapsDesc) {
      mapsDesc.setAttribute("data-i18n", mapsDesc.textContent.trim());
    }

    // Map Cards
    document.querySelectorAll(".map-card h3").forEach((el) => {
      el.setAttribute("data-i18n", el.textContent.trim());
    });

    document.querySelectorAll(".map-card p").forEach((el) => {
      el.setAttribute("data-i18n", el.textContent.trim());
    });

    // Community Section
    const communityHeader = document.querySelector(
      "#community .section-header h2"
    );
    if (communityHeader) {
      const textNodes = Array.from(communityHeader.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE
      );

      if (textNodes.length > 0) {
        const textNode = textNodes[0];
        textNode.textContent = "";
        const newTextNode = document.createTextNode("JOIN OUR ");
        communityHeader.insertBefore(newTextNode, communityHeader.firstChild);
        newTextNode.parentNode.setAttribute("data-i18n", "JOIN OUR");
      }

      const highlight = communityHeader.querySelector(".highlight");
      if (highlight) {
        highlight.setAttribute("data-i18n", highlight.textContent.trim());
      }
    }

    const communityDesc = document.querySelector(
      "#community .section-header p"
    );
    if (communityDesc) {
      communityDesc.setAttribute("data-i18n", communityDesc.textContent.trim());
    }

    // Social buttons
    document.querySelectorAll(".social-card span").forEach((el) => {
      el.setAttribute("data-i18n", el.textContent.trim());
    });

    // Newsletter
    const newsletterTitle = document.querySelector(".newsletter h3");
    if (newsletterTitle) {
      newsletterTitle.setAttribute(
        "data-i18n",
        newsletterTitle.textContent.trim()
      );
    }

    const newsletterDesc = document.querySelector(".newsletter p");
    if (newsletterDesc) {
      newsletterDesc.setAttribute(
        "data-i18n",
        newsletterDesc.textContent.trim()
      );
    }

    const emailInput = document.querySelector(
      '.newsletter input[type="email"]'
    );
    if (emailInput) {
      emailInput.setAttribute("data-i18n", emailInput.placeholder);
    }

    const subscribeBtn = document.querySelector(".newsletter button");
    if (subscribeBtn) {
      subscribeBtn.setAttribute("data-i18n", subscribeBtn.textContent.trim());
    }
  }

  // Initialize i18n attributes
  addI18nAttributes();

  // Apply initial translations
  applyTranslations(userLang);

  // Override newsletter success message
  const originalNewsletterSubmit =
    document.querySelector(".newsletter-form")?.onsubmit;
  if (originalNewsletterSubmit) {
    document.querySelector(".newsletter-form").onsubmit = function (e) {
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

      // Show success message in current language
      const successMessage = document.createElement("p");
      successMessage.classList.add("success-message");
      successMessage.textContent =
        translations[userLang]["Thank you for subscribing!"];

      const existingMessage = this.querySelector(".success-message");
      if (existingMessage) {
        existingMessage.remove();
      }

      this.appendChild(successMessage);

      // Remove success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    };
  }
});
