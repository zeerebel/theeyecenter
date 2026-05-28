/* ============================================================
   The Eye Care Center — shared site script
   Injects the header + footer on every page (so navigation lives
   in one place), then wires up interactions.
   ============================================================ */
(function () {
  "use strict";

  // Pages in nav order. `key` matches data-page on each <body>.
  var NAV = [
    { key: "eye-services",      label: "Eye Services",      href: "eye-services.html" },
    { key: "cosmetic-services", label: "Cosmetic Services", href: "cosmetic-services.html" },
    { key: "doctors",           label: "Doctors",           href: "doctors.html" },
    { key: "locations",         label: "Locations",         href: "locations.html" },
    { key: "about",             label: "About",             href: "about.html" }
  ];

  var current = document.body.getAttribute("data-page") || "home";

  function navLinksHTML(activeClass) {
    return NAV.map(function (item) {
      var active = item.key === current ? " " + activeClass : "";
      return '<a href="' + item.href + '" class="' + active.trim() + '">' + item.label + "</a>";
    }).join("");
  }

  /* ---------- HEADER ---------- */
  function renderHeader() {
    var mount = document.getElementById("site-header");
    if (!mount) return;
    mount.innerHTML =
      '<nav class="nav">' +
        '<div class="nav-inner">' +
          '<a href="index.html" class="brand" aria-label="The Eye Care Center home">' +
            '<span class="brand-glyph" aria-hidden="true"></span>' +
            '<span class="brand-name">eyecare<sup>&reg;</sup></span>' +
          '</a>' +
          '<div class="nav-links">' + navLinksHTML("active") + '</div>' +
          '<div class="nav-right">' +
            '<a class="pill" href="pay-bill-online.html"><span>Pay Bill</span></a>' +
            '<a class="pill lime" href="contact.html"><span>Book</span><span class="arr">&rarr;</span></a>' +
            '<button class="icon-btn nav-burger" id="navBurger" aria-label="Open menu" aria-expanded="false">' +
              '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 3h12M1 7h12M1 11h12"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</nav>' +
      '<div class="mobile-menu" id="mobileMenu" aria-hidden="true">' +
        '<div class="mobile-menu-top">' +
          '<a href="index.html" class="brand">' +
            '<span class="brand-glyph" aria-hidden="true"></span>' +
            '<span class="brand-name">eyecare<sup>&reg;</sup></span>' +
          '</a>' +
          '<button class="icon-btn" id="mobileClose" aria-label="Close menu">' +
            '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 2l10 10M12 2L2 12"/></svg>' +
          '</button>' +
        '</div>' +
        '<nav>' +
          '<a href="index.html"' + (current === "home" ? ' class="active"' : "") + ">Home</a>" +
          navLinksHTML("active") +
        '</nav>' +
        '<div class="mobile-menu-actions">' +
          '<a class="pill" href="contact.html"><span>Pay Bill</span></a>' +
          '<a class="pill lime" href="contact.html"><span>Book a consultation</span><span class="arr">&rarr;</span></a>' +
        '</div>' +
      '</div>';

    wireMobileMenu();
  }

  function wireMobileMenu() {
    var burger = document.getElementById("navBurger");
    var menu = document.getElementById("mobileMenu");
    var close = document.getElementById("mobileClose");
    if (!burger || !menu) return;

    function open() {
      menu.classList.add("open");
      menu.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function shut() {
      menu.classList.remove("open");
      menu.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    burger.addEventListener("click", open);
    if (close) close.addEventListener("click", shut);
    menu.querySelectorAll("nav a").forEach(function (a) {
      a.addEventListener("click", shut);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") shut();
    });
  }

  /* ---------- FOOTER ---------- */
  function renderFooter() {
    var mount = document.getElementById("site-footer");
    if (!mount) return;
    mount.innerHTML =
      '<footer class="foot">' +
        '<div class="foot-card">' +
          '<div class="foot-locs">' +
            footLoc("01 &mdash; Flagship", "Canandaigua", "Canandaigua", "325 West Street", "Canandaigua, NY 14424", "585 &middot; 394 &middot; 2020") +
            footLoc("02", "Geneva", "Geneva", "784 Pre-Emption Road", "Geneva, NY 14456", "585 &middot; 394 &middot; 2020") +
            footLoc("03", "Macedon", "Macedon", "1025 Brixton Drive", "Macedon, NY 14502", "585 &middot; 394 &middot; 2020") +
          '</div>' +
          '<div class="foot-top">' +
            '<div class="foot-brand">' +
              '<a href="index.html" class="brand">' +
                '<span class="brand-glyph" aria-hidden="true"></span>' +
                '<span class="brand-name" style="color:#F1F0EA;">eyecare<sup style="opacity:.6;">&reg;</sup></span>' +
              '</a>' +
              '<p class="quote">&ldquo;Considered eye care, <span class="em">quietly practiced</span> in the Finger Lakes since 1973.&rdquo;</p>' +
              '<a class="pill lime" href="contact.html"><span>Book a consultation</span><span class="arr">&rarr;</span></a>' +
            '</div>' +
            footCol("Practice", [
              ["About", "about.html"], ["Our Doctors", "doctors.html"], ["Employment", "employment.html"],
              ["Testimonials", "testimonials.html"], ["Contact", "contact.html"]
            ]) +
            footCol("Services", [
              ["Eye Services", "eye-services.html"], ["Cosmetic Services", "cosmetic-services.html"],
              ["Locations", "locations.html"], ["Canandaigua", "location-canandaigua.html"]
            ]) +
            footCol("Patients", [
              ["Patient Information", "patient-information.html"], ["Pay Bill Online", "pay-bill-online.html"],
              ["Testimonials", "testimonials.html"], ["Contact", "contact.html"]
            ]) +
          '</div>' +
          '<div class="foot-bot">' +
            "<span>&copy; " + new Date().getFullYear() + " The Eye Care Center, P.C.</span>" +
            '<div class="links">' +
              '<a href="#">Privacy</a><a href="#">Sitemap</a><a href="#">HIPAA</a><a href="#">Accessibility</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  function footLoc(idx, est, name, street, city, phone) {
    return '<article class="foot-loc">' +
      '<div class="foot-loc-top"><span>' + idx + "</span><span>" + est + "</span></div>" +
      "<h4>" + name + "</h4>" +
      '<div class="addr">' + street + "<br>" + city + "</div>" +
      '<div class="phone">' + phone + "</div>" +
      '<div class="lf"><span>Finger Lakes, NY</span><a href="locations.html">Directions &rarr;</a></div>' +
      "</article>";
  }

  function footCol(title, links) {
    var items = links.map(function (l) {
      return '<li><a href="' + l[1] + '">' + l[0] + "</a></li>";
    }).join("");
    return '<div class="foot-col"><h5>' + title + "</h5><ul>" + items + "</ul></div>";
  }

  /* ---------- STICKY BOOKING BAR ---------- */
  function renderStickyBar() {
    var mount = document.getElementById("site-sticky");
    if (!mount) return;
    mount.innerHTML =
      '<div class="sticky-book" id="stickyBook" aria-label="Book a consultation">' +
        '<div class="sb-loc" id="sbLoc">' +
          '<span class="lbl">Location</span>' +
          '<span class="val" id="sbLocVal">Canandaigua</span>' +
          '<div class="sb-dropdown" id="sbDropdown">' +
            '<div class="sb-opt active" data-city="Canandaigua"><span class="city">Canandaigua</span><span class="dist">325 West St &middot; Flagship</span></div>' +
            '<div class="sb-opt" data-city="Geneva"><span class="city">Geneva</span><span class="dist">784 Pre-Emption Rd</span></div>' +
            '<div class="sb-opt" data-city="Macedon"><span class="city">Macedon</span><span class="dist">1025 Brixton Dr</span></div>' +
          '</div>' +
        '</div>' +
        '<a class="sb-book" href="contact.html"><span>Book consultation</span><span>&rarr;</span></a>' +
      '</div>';
    wireSticky();
  }

  function wireSticky() {
    var sticky = document.getElementById("stickyBook");
    if (!sticky) return;
    var anchor = document.querySelector(".hero, .page-hero");

    if (anchor && "IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          sticky.classList.toggle("show", !en.isIntersecting);
        });
      }, { threshold: 0.05 });
      obs.observe(anchor);
    } else {
      sticky.classList.add("show");
    }

    var sbLoc = document.getElementById("sbLoc");
    var sbLocVal = document.getElementById("sbLocVal");
    if (sbLoc) {
      sbLoc.addEventListener("click", function (e) {
        e.stopPropagation();
        sbLoc.classList.toggle("open");
      });
      document.querySelectorAll(".sb-opt").forEach(function (opt) {
        opt.addEventListener("click", function (e) {
          e.stopPropagation();
          document.querySelectorAll(".sb-opt").forEach(function (o) { o.classList.remove("active"); });
          opt.classList.add("active");
          sbLocVal.textContent = opt.getAttribute("data-city");
          sbLoc.classList.remove("open");
        });
      });
      document.addEventListener("click", function () { sbLoc.classList.remove("open"); });
    }
  }

  /* ---------- PARALLAX (home hero cards only) ---------- */
  function wireParallax() {
    var cards = document.querySelectorAll(".card-rail .gcard");
    if (!cards.length) return;
    var rates = [0.05, -0.03, 0.04, -0.06];
    var ticking = false;
    function onScroll() {
      var y = window.scrollY;
      cards.forEach(function (c, i) {
        var clamped = Math.max(-80, Math.min(80, y * rates[i % rates.length]));
        c.style.translate = "0 " + clamped + "px";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  function wireReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- FAQ ACCORDION ---------- */
  function wireFaq() {
    document.querySelectorAll(".faq-item .faq-q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".faq-item");
        var ans = item.querySelector(".faq-a");
        var isOpen = item.classList.toggle("open");
        ans.style.maxHeight = isOpen ? ans.scrollHeight + "px" : "0px";
      });
    });
  }

  /* ---------- CONTACT FORM ---------- */
  function wireContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    function setError(field, on) {
      field.classList.toggle("invalid", on);
    }

    function validate() {
      var ok = true;
      form.querySelectorAll(".field[data-required]").forEach(function (field) {
        var input = field.querySelector("input, select, textarea");
        var val = (input.value || "").trim();
        var bad = !val;
        if (!bad && input.type === "email") {
          bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        }
        if (!bad && input.type === "tel") {
          bad = val.replace(/[^0-9]/g, "").length < 7;
        }
        setError(field, bad);
        if (bad) ok = false;
      });
      return ok;
    }

    // Clear error state as the user fixes a field.
    form.querySelectorAll(".field[data-required] input, .field[data-required] select, .field[data-required] textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        input.closest(".field").classList.remove("invalid");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstBad = form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea");
        if (firstBad) firstBad.focus();
        return;
      }

      var btn = form.querySelector(".btn-submit");
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      // NOTE: No backend is wired up yet. To deliver real emails, set the
      // form's `action` to a handler (e.g. Formspree) and `method="post"`,
      // or post to your own endpoint here. For now we confirm success in-page.
      var action = form.getAttribute("action");
      if (action && action !== "#") {
        fetch(action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
          .then(showSuccess)
          .catch(showSuccess);
      } else {
        setTimeout(showSuccess, 600);
      }
    });

    function showSuccess() {
      var wrap = document.getElementById("contactWrap");
      var success = document.getElementById("formSuccess");
      if (wrap) wrap.classList.add("sent");
      if (success) success.classList.add("show");
    }
  }

  /* ---------- INIT ---------- */
  function init() {
    renderHeader();
    renderFooter();
    renderStickyBar();
    wireParallax();
    wireReveal();
    wireFaq();
    wireContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
