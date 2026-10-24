// Taif Alsufiani — Portfolio behavior
// Tabs, project filters, Ask Taif panel, copy buttons, missing images.

const PANELS = ["about", "projects", "cv", "contact"];

// ---------- Missing images ----------
// Remove an image that fails to load so its fallback ("T" or project name) shows.
function hideMissingImages() {
  document.querySelectorAll("img").forEach((img) => {
    const remove = () => img.remove();
    if (img.complete && img.naturalWidth === 0) remove();
    else img.addEventListener("error", remove);
  });
}

// ---------- Tabs ----------
function setupTabs() {
  const bar = document.querySelector(".choose");
  const tabs = [...bar.querySelectorAll(".tab")];

  // Show one panel and mark its tab as selected
  function show(id, focus = false) {
    tabs.forEach((tab) => {
      const on = tab.getAttribute("aria-controls") === id;
      tab.setAttribute("aria-selected", on);
      tab.tabIndex = on ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !on;
      if (on && focus) tab.focus();
    });
  }

  // Show a panel, update the URL, and scroll up to the tab bar if needed
  function go(id) {
    show(id);
    history.replaceState(null, "", `#${id}`);
    const barTop = bar.getBoundingClientRect().top + window.scrollY - 1;
    if (window.scrollY > barTop) window.scrollTo({ top: barTop, behavior: "smooth" });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => go(tab.getAttribute("aria-controls")));

    // Left / right arrows move between tabs
    tab.addEventListener("keydown", (e) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      const next = tabs[(i + step + tabs.length) % tabs.length];
      show(next.getAttribute("aria-controls"), true);
    });
  });

  // Previous / next buttons at the end of each panel
  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => go(btn.dataset.go));
  });

  // Shadow under the tab bar once it sticks to the top
  window.addEventListener("scroll", () => {
    const stuck = bar.getBoundingClientRect().top <= 1 && window.scrollY > 200;
    bar.classList.toggle("stuck", stuck);
  }, { passive: true });

  // Open the panel named in the URL, e.g. #projects
  const start = location.hash.slice(1);
  if (PANELS.includes(start)) show(start);
}

// ---------- Project filters ----------
function setupFilters() {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = [...document.querySelectorAll("#project-list .pcard")];
  const matches = (card, filter) => filter === "all" || card.dataset.status === filter;

  buttons.forEach((btn) => {
    const filter = btn.dataset.filter;

    // Count comes from the cards, so it never goes out of date
    btn.querySelector(".n").textContent = cards.filter((c) => matches(c, filter)).length;

    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.setAttribute("aria-pressed", b === btn));
      cards.forEach((card) => { card.hidden = !matches(card, filter); });
    });
  });
}

// ---------- Ask Taif panel ----------
function setupAssistant() {
  const panel = document.getElementById("assistant");
  const launch = document.getElementById("launch");
  const input = document.getElementById("chat-input");
  const note = document.getElementById("chat-note");
  const msgs = panel.querySelector(".msgs");

  function setOpen(open) {
    panel.hidden = !open;
    launch.hidden = open;
    launch.setAttribute("aria-expanded", open);
    if (open) {
      msgs.scrollTop = msgs.scrollHeight;
      input.focus();
    }
  }

  function close() {
    setOpen(false);
    launch.focus();
  }

  document.querySelectorAll("[data-open-chat]").forEach((btn) => {
    btn.addEventListener("click", () => setOpen(true));
  });

  document.getElementById("close-chat").addEventListener("click", close);
  panel.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  // Suggested questions fill the input
  panel.querySelectorAll(".chips button").forEach((chip) => {
    chip.addEventListener("click", () => {
      input.value = chip.textContent;
      input.focus();
    });
  });

  // Placeholder: no real answers yet
  document.getElementById("chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    note.hidden = false;
  });
}

// ---------- Copy buttons ----------
// <button data-copy="email"> copies the text of #email
function setupCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    const source = document.getElementById(btn.dataset.copy);
    const label = btn.textContent;

    // If the clipboard is blocked, select the text so it can be copied by hand
    function selectText() {
      const range = document.createRange();
      range.selectNodeContents(source);
      const selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      btn.textContent = "Selected";
    }

    btn.addEventListener("click", () => {
      if (!navigator.clipboard) return selectText();
      navigator.clipboard.writeText(source.textContent.trim()).then(() => {
        btn.textContent = "Copied";
        setTimeout(() => { btn.textContent = label; }, 1800);
      }, selectText);
    });
  });
}

// ---------- Start ----------
hideMissingImages();
setupTabs();
setupFilters();
setupAssistant();
setupCopyButtons();
