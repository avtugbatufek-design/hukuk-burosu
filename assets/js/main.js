/* =========================================================
   main.js — etkileşimler
   Mobil menü • scroll header • sayaç animasyonu •
   SSS akordeon • reveal • iletişim formu
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Header: scroll'da kompakt ---------- */
  const header = document.querySelector(".header");
  const onScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobil menü ---------- */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav__links");
  if (hamburger && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove("is-open");
      hamburger.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    };
    hamburger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      hamburger.classList.toggle("is-open", open);
      hamburger.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  /* ---------- Sayaç animasyonu ---------- */
  const counters = document.querySelectorAll("[data-target]");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.target);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased).toLocaleString("tr-TR");
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("tr-TR");
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window) {
    const counterObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => counterObs.observe(c));

    /* ---------- Reveal on scroll ---------- */
    const revealObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));
  } else {
    counters.forEach((c) => (c.textContent = parseFloat(c.dataset.target).toLocaleString("tr-TR")));
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- SSS akordeon ---------- */
  document.querySelectorAll(".faq__q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq__item");
      const answer = item.querySelector(".faq__a");
      const isOpen = q.getAttribute("aria-expanded") === "true";

      // Diğerlerini kapat (akordeon davranışı)
      document.querySelectorAll(".faq__q[aria-expanded='true']").forEach((other) => {
        if (other !== q) {
          other.setAttribute("aria-expanded", "false");
          other.closest(".faq__item").querySelector(".faq__a").style.maxHeight = null;
        }
      });

      q.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + "px";
    });
  });

  /* ---------- İletişim formu ---------- */
  const form = document.querySelector("#contact-form");
  if (form) {
    const msg = form.querySelector(".form__msg");
    const showMsg = (key, ok) => {
      const lang = document.documentElement.lang || "tr";
      const dict = (window.translations && window.translations[lang]) || {};
      msg.textContent = dict[key] || (ok ? "Gönderildi." : "Hata.");
      msg.className = "form__msg " + (ok ? "is-ok" : "is-err");
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Basit doğrulama
      const required = form.querySelectorAll("[required]");
      let valid = true;
      required.forEach((f) => {
        if (!f.value.trim()) {
          valid = false;
          f.style.borderColor = "var(--c-copper)";
        } else {
          f.style.borderColor = "";
        }
      });
      if (!valid) {
        showMsg("form.required", false);
        return;
      }

      const action = form.getAttribute("action");
      const usingFormspree = action && action.includes("formspree.io") && !action.includes("YOUR_FORM_ID");

      // Formspree uç noktası yapılandırılmamışsa demo başarı mesajı göster
      if (!usingFormspree) {
        showMsg("form.ok", true);
        form.reset();
        return;
      }

      try {
        const res = await fetch(action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          showMsg("form.ok", true);
          form.reset();
        } else {
          showMsg("form.err", false);
        }
      } catch {
        showMsg("form.err", false);
      }
    });
  }

  /* ---------- Footer yılı ---------- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// i18n sözlüğünü main.js içinden erişilebilir kıl (form mesajları için)
window.translations = window.translations || (typeof translations !== "undefined" ? translations : {});
