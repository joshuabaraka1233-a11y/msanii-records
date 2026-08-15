document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     PAGE LOADER
  ========================= */

  const loader = document.getElementById("loader");

  window.addEventListener("load", function () {
    setTimeout(function () {
      if (loader) {
        loader.classList.add("hidden");

        setTimeout(function () {
          loader.remove();
        }, 700);
      }
    }, 500);
  });


  /* =========================
     HEADER SCROLL
  ========================= */

  const header = document.getElementById("header");

  function handleScroll() {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  handleScroll();


  /* =========================
     MOBILE MENU
  ========================= */

  const menuButton = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuButton && nav) {

    menuButton.addEventListener("click", function () {

      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      document.body.classList.toggle(
        "lock",
        isOpen
      );

    });


    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        nav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove("lock");

      });

    });

  }


  /* =========================
     SMOOTH INTERNAL LINKS
  ========================= */

  const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId = link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId.length < 2
      ) {
        return;
      }

      const target = document.querySelector(
        targetId
      );

      if (!target) return;

      event.preventDefault();

      const headerHeight =
        header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(function (element) {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(function (element) {

      element.classList.add("visible");

    });

  }


  /* =========================
     ACTIVE NAV LINK
  ========================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navigationLinks =
    document.querySelectorAll("#nav a");


  if (
    "IntersectionObserver" in window &&
    sections.length &&
    navigationLinks.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (!entry.isIntersecting) {
              return;
            }

            const currentId =
              entry.target.getAttribute("id");


            navigationLinks.forEach(
              function (link) {

                link.classList.remove(
                  "active"
                );

                const linkTarget =
                  link.getAttribute("href");


                if (
                  linkTarget ===
                  "#" + currentId
                ) {

                  link.classList.add(
                    "active"
                  );

                }

              }
            );

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    sections.forEach(function (section) {

      sectionObserver.observe(section);

    });

  }


  /* =========================
     REAL IMAGE CHECK
  ========================= */

  const images =
    document.querySelectorAll("img");


  images.forEach(function (image) {

    image.addEventListener(
      "error",
      function () {

        image.classList.add(
          "image-error"
        );

        console.warn(
          "Image failed to load:",
          image.src
        );

      }
    );

  });


  /* =========================
     UNCLE TIM PHOTO
     KEEP FULL PHOTO VISIBLE
  ========================= */

  const uncleImages =
    document.querySelectorAll(
      'img[src*="uncle-tim.jpg"]'
    );


  uncleImages.forEach(function (image) {

    image.style.objectFit = "contain";
    image.style.objectPosition = "center top";

  });


  /* =========================
     CONTACT FORM
     
     IMPORTANT:
     The form submits normally to
     FormSubmit using the HTML form
     action in index.html.
     
     JavaScript does NOT intercept it.
  ========================= */

  const contactForm =
    document.querySelector(
      'form[action*="formsubmit.co"]'
    );


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      function () {

        const button =
          contactForm.querySelector(
            'button[type="submit"]'
          );


        if (button) {

          button.disabled = true;

          button.dataset.originalText =
            button.innerHTML;

          button.innerHTML =
            "Sending...";

        }

      }
    );

  }


  /* =========================
     PROTECT AGAINST DOUBLE
     FORM SUBMISSIONS
  ========================= */

  if (contactForm) {

    let submitted = false;


    contactForm.addEventListener(
      "submit",
      function (event) {

        if (submitted) {

          event.preventDefault();

          return;

        }

        submitted = true;

      }
    );

  }


  /* =========================
     ESCAPE KEY
     CLOSE MOBILE MENU
  ========================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key !== "Escape") {
        return;
      }


      if (nav) {
        nav.classList.remove("open");
      }


      if (menuButton) {

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }


      document.body.classList.remove(
        "lock"
      );

    }
  );


});