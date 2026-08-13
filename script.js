/* =========================================================
   MSANII RECORDS - MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* MOMENTS — USE THE NEW ORIGINAL MSANII PHOTOS */
    const momentImages = document.querySelectorAll(".gallery-card img");
    const momentFiles = ["bridge.jpg", "aircraft.jpg", "portrait.jpg"];
    const momentLabels = [
        ["01 / BRIDGE", "A moment across the bridge."],
        ["02 / AVIATION", "Sound, vision and movement."],
        ["03 / PORTRAIT", "The people behind the moments."]
    ];

    momentImages.forEach(function (image, index) {
        if (momentFiles[index]) {
            image.src = momentFiles[index];
            image.removeAttribute("loading");
            image.parentElement.querySelector("small").textContent = momentLabels[index][0];
            image.parentElement.querySelector("strong").textContent = momentLabels[index][1];
        } else {
            image.parentElement.style.display = "none";
        }
    });

    /* LOADER */
    const loader = document.querySelector(".loader");
    if (loader) {
        window.addEventListener("load", function () {
            setTimeout(function () {
                loader.classList.add("hidden");
                setTimeout(function () { loader.remove(); }, 900);
            }, 800);
        });
    }

    /* NAVBAR */
    const navbar = document.getElementById("navbar");
    if (navbar) {
        window.addEventListener("scroll", function () {
            navbar.classList.toggle("scrolled", window.scrollY > 30);
        });
    }

    /* SCROLL REVEAL */
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealElements.forEach(function (element) { observer.observe(element); });

    /* MOBILE MENU */
    const menu = document.querySelector(".menu");
    const nav = document.querySelector(".navbar nav");
    if (menu && nav) {
        menu.addEventListener("click", function () {
            nav.classList.toggle("open");
            menu.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
        });
        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("open");
                menu.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* CONTACT FORM */
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const status = document.getElementById("formStatus");
            if (status) status.textContent = "Thank you — your enquiry has been received.";
            form.reset();
        });
    }

    /* CLOUD PARALLAX */
    const clouds = document.querySelectorAll(".hero-cloud");
    window.addEventListener("scroll", function () {
        const y = window.scrollY;
        clouds.forEach(function (cloud, index) {
            const movementX = y * 0.025 * (index + 1);
            const movementY = -(y * 0.035 * (index + 1));
            cloud.style.transform = `translate3d(${movementX}px, ${movementY}px, 0)`;
        });
    });
});