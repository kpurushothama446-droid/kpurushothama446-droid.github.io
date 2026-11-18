/* =====================================
   PURUSHOTHAMA K
   PORTFOLIO INTERACTIONS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    // 1. TYPING ANIMATION

    const typingElement = document.getElementById("typing-text");

    const words = [
        "Engineer",
        "Firmware Developer",
        "Embedded C Programmer",
        "Systems Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingElement) return;

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1300);
                return;
            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 45 : 90);
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typeEffect();
    }


    // 2. MOBILE NAVIGATION

    const menuButton = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("active");

            menuButton.setAttribute("aria-expanded", String(isOpen));

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            });

        });
    }


    // 3. SCROLL REVEAL

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-main, .about-info, " +
        ".skill-card, .project-card, .timeline-item, .contact-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    obs.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }


    // 4. COPYRIGHT YEAR

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // 5. ACTIVE NAVIGATION

    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navItems.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        );

                    });

                }

            });

        }, {
            rootMargin: "-30% 0px -60% 0px"
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

});

