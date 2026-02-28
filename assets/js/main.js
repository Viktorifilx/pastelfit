(() => {
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // Reveal on scroll
  const revealEls = $$(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Smooth scroll to about
  const aboutEl = $("#about");
  $("#scrollToAbout")?.addEventListener("click", () => {
    aboutEl?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Toast
  const toastEl = $("#toast");
  let toastTimer = null;
  function toast(msg){
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }
  $$("[data-toast]").forEach(btn => {
    btn.addEventListener("click", () => toast(btn.dataset.toast || "Готово"));
  });

  // Pricing modal
  const pricingModal = $("#pricingModal");
  const openPricing = () => pricingModal && (pricingModal.style.display = "flex");
  const closePricing = () => pricingModal && (pricingModal.style.display = "none");

  $("#openPricing")?.addEventListener("click", openPricing);
  $("#openPricing2")?.addEventListener("click", openPricing);
  $("#closePricing")?.addEventListener("click", closePricing);
  pricingModal?.addEventListener("click", (e) => { if (e.target === pricingModal) closePricing(); });

  // Note modal
  const noteModal = $("#noteModal");
  const openNote = () => noteModal && (noteModal.style.display = "flex");
  const closeNote = () => noteModal && (noteModal.style.display = "none");

  $("#openNote")?.addEventListener("click", openNote);
  $("#closeNote")?.addEventListener("click", closeNote);
  $("#noteOk")?.addEventListener("click", () => { closeNote(); toast("Поехали маленькими шагами ✨"); });
  noteModal?.addEventListener("click", (e) => { if (e.target === noteModal) closeNote(); });

  // ESC closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closePricing(); closeNote(); }
  });

  // small welcome toast (once)
  setTimeout(() => toast("Добро пожаловать в PastelFit ✨"), 600);
})();