document.addEventListener("DOMContentLoaded", function () {
  // Get browser language
  let userLang = navigator.language || navigator.userLanguage;
  userLang = userLang.split("-")[0]; // Extract base language (en, pt, etc.)

  // Default to English if language is not supported
  if (userLang !== "pt" && userLang !== "en") {
    userLang = "en";
  }

  // Set html lang attribute
  document.documentElement.lang = userLang === "pt" ? "pt-br" : "en";

  // Language toggle button with flag icons
  const languageToggle = document.createElement("div");
  languageToggle.className = "language-toggle";
  languageToggle.innerHTML = `
    <button class="lang-btn ${
      userLang === "en" ? "active" : ""
    }" data-lang="en">
      <img src="./assets/images/usa-flag.svg" alt="English" class="flag-icon" />
    </button>
    <button class="lang-btn ${
      userLang === "pt" ? "active" : ""
    }" data-lang="pt">
      <img src="./assets/images/brazil-flag.svg" alt="Português" class="flag-icon" />
    </button>
  `;

  // Insert language toggle after sidebar
  const sidebar = document.querySelector(".sidebar");
  if (sidebar && sidebar.parentNode) {
    sidebar.parentNode.insertBefore(languageToggle, sidebar.nextSibling);
  }

  // Add language toggle styles
  const style = document.createElement("style");
  style.textContent = `
    .language-toggle {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      display: flex;
      gap: 5px;
      background-color: var(--bg-color);
      padding: 5px;
      border-radius: 20px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .lang-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      border-radius: 15px;
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
      height: 24px;
      border-radius: 4px;
    }
    
    @media (max-width: 768px) {
      .language-toggle {
        top: 10px;
        right: 10px;
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
      document.documentElement.lang = lang === "pt" ? "pt-br" : "en";

      // Apply translations
      applyTranslations(lang);
    });
  });

  // Function to create flag SVGs if they don't exist
  function createFlagSVGs() {
    // Create folder if it doesn't exist
    const assetsPath = "./assets/images/";

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

    // Create SVG files if they don't exist
    createSVGFile(assetsPath + "usa-flag.svg", usaFlagSVG);
    createSVGFile(assetsPath + "brazil-flag.svg", brazilFlagSVG);
  }

  function createSVGFile(path, svgContent) {
    // In the browser context, we can't create files directly.
    // Instead, we'll use inline SVG in the HTML elements
    const flags = document.querySelectorAll(".flag-icon");
    flags.forEach((flag) => {
      if (flag.src.includes("usa-flag.svg")) {
        flag.style.display = "none";
        const svgContainer = document.createElement("div");
        svgContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="24" height="24">
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
        svgContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="24" height="24">
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
        // Special handling for time elements
        if (el.tagName.toLowerCase() === "time") {
          el.datetime = el.getAttribute("datetime");
          el.textContent = translations[lang][key];
        }
        // Handle inputs (placeholder, value)
        else if (el.tagName.toLowerCase() === "input") {
          if (el.placeholder) {
            el.placeholder = translations[lang][key];
          } else {
            el.value = translations[lang][key];
          }
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
    // Sidebar
    document
      .querySelector(".info_more-btn span")
      .setAttribute("data-i18n", "Show Contacts");

    document.querySelectorAll(".contact-title").forEach((el) => {
      el.setAttribute("data-i18n", el.textContent.trim());
    });

    const birthdayTime = document.querySelector(".contact-info time");
    if (birthdayTime) {
      birthdayTime.setAttribute("data-i18n", birthdayTime.textContent.trim());
    }

    const locationAddress = document.querySelector(".contact-info address");
    if (locationAddress) {
      locationAddress.setAttribute(
        "data-i18n",
        locationAddress.textContent.trim()
      );
    }

    // Navbar
    document.querySelectorAll(".navbar-link").forEach((el) => {
      el.setAttribute("data-i18n", el.textContent.trim());
    });

    // About section
    const aboutTitle = document.querySelector(".about .article-title");
    if (aboutTitle) {
      aboutTitle.setAttribute("data-i18n", aboutTitle.textContent.trim());
    }

    document.querySelectorAll(".about-text p").forEach((el, index) => {
      if (index === 0) {
        el.setAttribute(
          "data-i18n",
          "I am a Fullstack Developer and UI/UX Designer..."
        );
      } else if (index === 1) {
        el.setAttribute(
          "data-i18n",
          "My goal is to communicate your message..."
        );
      }
    });

    // Experience section
    const experienceTitle = document.querySelector(".service-title");
    if (experienceTitle) {
      experienceTitle.setAttribute(
        "data-i18n",
        experienceTitle.textContent.trim()
      );
    }

    document.querySelectorAll(".service-item-title").forEach((el) => {
      el.setAttribute("data-i18n", el.textContent.trim());
    });

    document.querySelectorAll(".service-item-text").forEach((el, index) => {
      if (index === 0) {
        el.setAttribute("data-i18n", "Possuo experiência UI/UX moderno...");
      } else if (index === 1) {
        el.setAttribute(
          "data-i18n",
          "Desenvolvimento usando as principais tecnologias..."
        );
      } else if (index === 2) {
        el.setAttribute(
          "data-i18n",
          "Desenvolvo aplicativos para iOS e Android..."
        );
      }
    });
  }

  // Initialize i18n attributes
  addI18nAttributes();

  // Apply initial translations
  applyTranslations(userLang);
});
