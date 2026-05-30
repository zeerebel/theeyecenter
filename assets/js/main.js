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
      var active = item.key === current;
      return '<a href="' + item.href + '"' +
        (active ? ' class="' + activeClass + '" aria-current="page"' : "") +
        ">" + item.label + "</a>";
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
    var footer = document.querySelector("footer.foot");

    if ("IntersectionObserver" in window) {
      // Show once the hero is scrolled past, but hide again when the footer
      // comes into view so the bar never covers the copyright row.
      var state = { past: !anchor, footer: false };
      function update() {
        sticky.classList.toggle("show", state.past && !state.footer);
      }
      if (anchor) {
        new IntersectionObserver(function (entries) {
          state.past = !entries[0].isIntersecting;
          update();
        }, { threshold: 0.05 }).observe(anchor);
      }
      if (footer) {
        new IntersectionObserver(function (entries) {
          state.footer = entries[0].isIntersecting;
          update();
        }, { rootMargin: "0px 0px -40px 0px" }).observe(footer);
      }
      update();
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
    // On small screens the cards become a sticky scroll-stack — skip the
    // translate-based parallax so it doesn't fight the sticky positioning.
    if (window.matchMedia && window.matchMedia("(max-width: 900px)").matches) return;
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
    document.querySelectorAll(".faq-item").forEach(function (item, idx) {
      var btn = item.querySelector(".faq-q");
      var ans = item.querySelector(".faq-a");
      if (!btn || !ans) return;
      // Wire ARIA so screen readers announce expanded/collapsed state.
      var ansId = ans.id || ("faq-a-" + idx);
      ans.id = ansId;
      ans.setAttribute("role", "region");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-controls", ansId);
      btn.addEventListener("click", function () {
        var isOpen = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        ans.style.maxHeight = isOpen ? ans.scrollHeight + "px" : "0px";
      });
    });
  }

  /* ---------- SKIP-TO-CONTENT LINK ---------- */
  function injectSkipLink() {
    if (document.querySelector(".skip-link")) return;
    var sk = document.createElement("a");
    sk.className = "skip-link";
    sk.href = "#main";
    sk.textContent = "Skip to main content";
    document.body.prepend(sk);
    // Assign id="main" to the first content region after the header mount.
    var mount = document.getElementById("site-header");
    var target = mount && mount.nextElementSibling;
    while (target && !/^(HEADER|SECTION|MAIN|ARTICLE)$/.test(target.tagName)) {
      target = target.nextElementSibling;
    }
    if (target && !target.id) target.id = "main";
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

  /* ---------- HEADER SCROLL STATE ---------- */
  function wireNavScroll() {
    var nav = document.querySelector(".nav");
    if (!nav) return;
    var ticking = false;
    function apply() {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(apply); ticking = true; }
    }, { passive: true });
    apply();
  }

  /* ---------- ACCENT SWITCHER (preview tool) ---------- */
  var ACCENTS = [
    { val: "lime",  color: "#D6F25E", name: "Lime" },
    { val: "coral", color: "#FF7B5A", name: "Coral" },
    { val: "teal",  color: "#1F8A7E", name: "Deep teal" },
    { val: "brass", color: "#B0894E", name: "Muted brass" }
  ];

  function applyStoredAccent() {
    try {
      var saved = localStorage.getItem("tec-accent");
      if (saved) document.body.dataset.accent = saved;
    } catch (e) {}
  }

  function renderAccentSwitcher() {
    var bar = document.createElement("div");
    bar.className = "accent-switch";
    bar.setAttribute("aria-label", "Preview accent color");
    var current = document.body.dataset.accent || "lime";
    bar.innerHTML =
      '<span class="lbl">Accent</span><div class="sws">' +
      ACCENTS.map(function (a) {
        return '<button class="sw' + (a.val === current ? " active" : "") +
          '" data-accent="' + a.val + '" title="' + a.name +
          '" aria-label="' + a.name + '" style="background:' + a.color + ';"></button>';
      }).join("") +
      "</div>";
    document.body.appendChild(bar);

    bar.querySelectorAll(".sw").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var val = btn.getAttribute("data-accent");
        document.body.dataset.accent = val;
        try { localStorage.setItem("tec-accent", val); } catch (e) {}
        bar.querySelectorAll(".sw").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
      });
    });
  }

  /* ---------- CURSOR SHEEN ON CARDS ---------- */
  function wireCardGlare() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll(".card-rail .gcard").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
      });
    });
  }

  /* ---------- COUNT-UP STATS ---------- */
  function wireCountUp() {
    var els = document.querySelectorAll(".stats-inner .stat .v");
    if (!els.length) return;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    function plan(raw) {
      var suffix = (raw.match(/[+%]$/) || [""])[0];
      var core = raw.replace(/[+%]$/, "");
      if (!/^[\d,]+(\.\d+)?$/.test(core)) return null; // skip "24/7", "All", etc.
      var comma = core.indexOf(",") !== -1;
      var dec = core.indexOf(".") !== -1 ? core.split(".")[1].length : 0;
      var pad = (!comma && dec === 0 && /^0\d/.test(core)) ? core.length : 0;
      return { target: parseFloat(core.replace(/,/g, "")), suffix: suffix, comma: comma, dec: dec, pad: pad };
    }

    function fmt(v, p) {
      var s = p.dec > 0 ? v.toFixed(p.dec) : String(Math.round(v));
      if (p.pad) s = s.padStart(p.pad, "0");
      if (p.comma) {
        var parts = s.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        s = parts.join(".");
      }
      return s + p.suffix;
    }

    function run(el, p) {
      var dur = 1200, start = null;
      function step(ts) {
        if (start === null) start = ts;
        var t = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(p.target * eased, p);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = fmt(p.target, p);
      }
      requestAnimationFrame(step);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, p = plan(el.textContent.trim());
        io.unobserve(el);
        if (p) run(el, p);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- SCROLL-STACK CARDS ---------- */
  function wireCardStack() {
    document.querySelectorAll(".stack-section").forEach(function (section) {
      var stack = section.querySelector(".stack-cards");
      if (!stack) return;
      var cards = Array.prototype.slice.call(stack.querySelectorAll(".stack-card"));
      if (cards.length < 2) return;

      var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { section.classList.add("static"); return; }

      var N = cards.length;
      // Tighter scroll length so the deck doesn't feel "stuck" after the
      // last card lands — each card transition takes ~70vh of scroll.
      section.style.height = (N * 70 + 30) + "vh";

      var counter = section.querySelector(".stack-counter");
      // Card sizing is bounded by viewport (clamp height in CSS), so the
      // whole deck always fits — the front card stays at viewport center
      // and previous cards stack above it with a small "peek" of each.
      var cardH = cards[0].offsetHeight || 460;
      var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
      var ticking = false;

      function update() {
        var rect = section.getBoundingClientRect();
        var winH = window.innerHeight;
        var total = section.offsetHeight - winH;
        var scrolled = Math.max(0, Math.min(total, -rect.top));
        var p = total > 0 ? scrolled / total : 0;

        // Fit the whole deck (front card + peeks) inside the viewport.
        var ch = cards[0].offsetHeight || cardH;
        var maxOffset = Math.floor(((winH * 0.85) - ch) / Math.max(1, N - 1));
        var offset = Math.max(60, Math.min(130, maxOffset));

        // "Scroll index": which card is currently centered.
        var P = p * (N - 1);
        var activeIdx = Math.max(0, Math.min(N - 1, Math.round(P)));

        cards.forEach(function (c, i) {
          var y, revealLocal = 1;
          if (P < i) {
            // Card i has not yet entered — animate up from below center.
            var t = Math.max(0, Math.min(1, P - (i - 1)));
            revealLocal = t;
            var eased = ease(t);
            y = (1 - eased) * (winH * 1.1) + eased * 0;
          } else {
            // Card i has been pushed up into its stack slot above center.
            var advance = Math.min(P - i, N - 1 - i);
            y = -advance * offset;
          }
          c.style.transform = "translate(-50%, calc(-50% + " + y + "px))";
          // Later cards (most recent to enter) sit on top of earlier ones.
          c.style.zIndex = i + 1;
          // Image mask-reveal as the card slides into focus.
          var img = c.querySelector("img");
          if (img) {
            var pct = (1 - ease(revealLocal)) * 100;
            img.style.clipPath = "inset(0 " + pct + "% 0 0)";
          }
        });

        if (counter) counter.textContent =
          String(activeIdx + 1).padStart(2, "0") + " / " + String(N).padStart(2, "0");

        ticking = false;
      }
      function onScroll() {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
    });
  }

  /* ---------- SECTION INDEX RAIL ---------- */
  function wireSectionIndex() {
    var labels = {
      services: "Services", eyewear: "Eyewear", doctors: "Doctors",
      portal: "Patients", insights: "Journal", locations: "Locations"
    };
    var sections = [].slice.call(document.querySelectorAll("section[id]"));
    if (sections.length < 3) return;

    var rail = document.createElement("nav");
    rail.className = "section-rail";
    rail.setAttribute("aria-label", "Section navigation");
    rail.innerHTML = sections.map(function (s) {
      var id = s.id;
      var label = s.getAttribute("data-nav-label") || labels[id] ||
        id.charAt(0).toUpperCase() + id.slice(1);
      return '<a href="#' + id + '" data-target="' + id + '">' +
        '<span class="lbl">' + label + '</span><span class="dot"></span></a>';
    }).join("");
    document.body.appendChild(rail);

    var links = {};
    rail.querySelectorAll("a").forEach(function (a) {
      links[a.getAttribute("data-target")] = a;
    });

    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.remove("active"); });
        var active = links[e.target.id];
        if (active) active.classList.add("active");
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- SCROLL PROGRESS BAR ---------- */
  function wireScrollProgress() {
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    var ticking = false;
    function apply() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.width = (p * 100) + "%";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(apply); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", apply);
    apply();
  }

  /* ---------- MAGNETIC PRIMARY BUTTONS ---------- */
  function wireMagnetic() {
    if (window.matchMedia) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(hover: none)").matches) return; // skip on touch
    }
    document.querySelectorAll(".pill.lime, .sb-book, .btn-submit").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        btn.style.translate = (mx * 0.22) + "px " + (my * 0.28) + "px";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.translate = "0 0";
      });
    });
  }

  /* ---------- WORD-BY-WORD HEADLINE REVEAL ---------- */
  function splitWords(el) {
    var words = [];
    function walk(node) {
      if (node.nodeType === 3) {
        var parts = node.textContent.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        parts.forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) {
            frag.appendChild(document.createTextNode(p));
          } else {
            var s = document.createElement("span");
            s.className = "w";
            s.textContent = p;
            frag.appendChild(s);
            words.push(s);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        if (node.tagName === "BR") return;
        Array.prototype.slice.call(node.childNodes).forEach(walk);
      }
    }
    walk(el);
    words.forEach(function (w, i) { w.style.setProperty("--i", i); });
    return words;
  }

  function wireWordReveal() {
    var targets = document.querySelectorAll(".section-head h2, .page-hero h1, .stack-head h2");
    if (!targets.length) return;
    targets.forEach(function (t) {
      if (t.querySelector(".w")) return; // already split
      splitWords(t);
    });
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (t) { t.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- CUSTOM CURSOR ---------- */
  function wireCursor() {
    if (!window.matchMedia) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var c = document.createElement("div");
    c.className = "custom-cursor";
    document.body.appendChild(c);
    document.body.classList.add("has-cursor");

    var x = -100, y = -100;
    document.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      c.style.transform = "translate3d(" + x + "px," + y + "px,0) translate(-50%,-50%)";
    });

    var hoverSelector = "a, button, .pill, .gcard, .svc, .doc, .prod, .loc, .stack-card, .sw, .faq-q, .icon-btn, .arr-btn, .sb-loc, .prod-ar, .nav-burger, .ins, label";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest && e.target.closest(hoverSelector)) c.classList.add("grow");
    }, true);
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest(hoverSelector)) c.classList.remove("grow");
    }, true);
  }

  /* ---------- BRANDED FAVICON ---------- */
  function injectFavicon() {
    if (document.querySelector('link[rel="icon"]')) return;
    var svg = "data:image/svg+xml," + encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>" +
      "<circle cx='16' cy='16' r='16' fill='#191D1A'/>" +
      "<circle cx='16' cy='16' r='8.5' fill='none' stroke='#F1F0EA' stroke-width='2'/>" +
      "<circle cx='16' cy='16' r='3' fill='#FF7B5A'/></svg>"
    );
    var link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = svg;
    document.head.appendChild(link);
  }

  /* ---------- INIT ---------- */
  function init() {
    applyStoredAccent();
    renderHeader();
    renderFooter();
    renderStickyBar();
    renderAccentSwitcher();
    wireParallax();
    wireReveal();
    wireFaq();
    wireContactForm();
    wireNavScroll();
    wireCardGlare();
    wireCountUp();
    wireSectionIndex();
    wireCardStack();
    wireScrollProgress();
    wireMagnetic();
    wireWordReveal();
    wireCursor();
    injectSkipLink();
    injectFavicon();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
