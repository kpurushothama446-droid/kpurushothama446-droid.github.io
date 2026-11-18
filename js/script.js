
document.addEventListener("DOMContentLoaded", () => {

    // ==================================
    // 1. PROFESSIONAL TYPING ANIMATION
    // ==================================

    const typingElement = document.getElementById("typing-text");

    const words = [
        "Embedded Systems",
        "Firmware Development",
        "Embedded C Programming",
        "Linux Applications",
        "Microcontroller Projects",
        "Low-Level Software"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    function typeEffect() {

        if (!typingElement) return;

        const currentWord = words[wordIndex];

        if (!deleting) {

            charIndex++;

            typingElement.textContent =
                currentWord.substring(0, charIndex);

            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }

        } else {

            charIndex--;

            typingElement.textContent =
                currentWord.substring(0, charIndex);

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 40 : 85);
    }

    if (typingElement) {
        if (reducedMotion) {
            typingElement.textContent = words[0];
        } else {
            typeEffect();
        }
    }


    // ==================================
    // 2. MOBILE MENU
    // ==================================

    const menuButton = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            const opened = navLinks.classList.toggle("active");

            menuButton.setAttribute(
                "aria-expanded",
                String(opened)
            );

            const icon = menuButton.querySelector("i");

            if (icon) {
                icon.className = opened
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";
            }
        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuButton.setAttribute("aria-expanded", "false");

                const icon = menuButton.querySelector("i");

                if (icon) {
                    icon.className = "fa-solid fa-bars";
                }
            });
        });
    }


    // ==================================
    // 3. SCROLL REVEAL
    // ==================================

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-main, .detail-card, " +
        ".skill-card, .project-card, .timeline-item, .contact-box"
    );

    if (reducedMotion) {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    } else if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    // ==================================
    // 4. ACTIVE NAVIGATION
    // ==================================

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navItems = document.querySelectorAll(
        ".nav-links a"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

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

            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    // ==================================
    // 5. CIRCUIT BOARD BACKGROUND
    // ==================================

    const canvas = document.getElementById("circuit-canvas");
    const context = canvas ? canvas.getContext("2d") : null;

    if (canvas && context && !reducedMotion) {

        let width = 0;
        let height = 0;
        let particles = [];

        function resizeCanvas() {

            const dpr = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            context.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.min(
                35,
                Math.floor(width / 35)
            );

            particles = Array.from(
                { length: count },
                () => ({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    speed: 0.15 + Math.random() * 0.3,
                    size: 1 + Math.random() * 2
                })
            );
        }

        function drawCircuit() {

            context.clearRect(0, 0, width, height);

            particles.forEach((particle, index) => {

                particle.y -= particle.speed;

                if (particle.y < -10) {
                    particle.y = height + 10;
                    particle.x = Math.random() * width;
                }

                context.beginPath();

                context.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                context.fillStyle = "rgba(0,240,160,0.55)";
                context.fill();

                particles.slice(index + 1).forEach(other => {

                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 110) {

                        context.beginPath();

                        context.moveTo(particle.x, particle.y);
                        context.lineTo(other.x, other.y);

                        context.strokeStyle =
                            `rgba(53,202,255,${0.12 * (1 - distance / 110)})`;

                        context.stroke();
                    }
                });
            });

            requestAnimationFrame(drawCircuit);
        }

        resizeCanvas();
        drawCircuit();

        window.addEventListener("resize", resizeCanvas);
    }


    // ==================================
    // 6. AUTOMATIC COPYRIGHT YEAR
    // ==================================

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
