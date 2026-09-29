const routePath = window.location.pathname.replace(/\/+$/, "") || "/";
const main = document.querySelector("main");

const routeMeta = {
  "/field-map": {
    title: "Field Map — Yemberzal",
    description: "View the field map of ten Sikh and Dogra-era heritage sites across Rawalakot and Poonch.",
  },
  "/archaeological": {
    title: "Archaeological Significance — Yemberzal",
    description: "Study masonry, plans, water systems, building phases and condition notes for the Yemberzal heritage register.",
    eyebrow: "Archaeological significance",
    heading: "Structures and strata",
    intro: "Masonry, plans, water systems, building phases, condition and evidence of reuse across forts, baolis, gurdwaras, temples and civic structures.",
  },
  "/cultural": {
    title: "Cultural Significance — Yemberzal",
    description: "Read how Pahari memory, place-names and oral traditions keep the monuments of Rawalakot legible.",
    eyebrow: "Cultural significance",
    heading: "Pahari memory",
    intro: "Place-names, oral traditions and everyday encounters keep these structures legible even where formal records are incomplete.",
  },
  "/religious": {
    title: "Religious Significance — Yemberzal",
    description: "Explore gurdwaras, temples and memorial structures preserved in the sacred geography of Kashmir.",
    eyebrow: "Religious significance",
    heading: "Sacred sites after displacement",
    intro: "Gurdwaras, temples and memorial structures preserve the sacred geography of communities displaced in 1947.",
  },
  "/historical": {
    title: "Historical Significance — Yemberzal",
    description: "Follow the Yemberzal register from Poonch rulers through Sikh and Dogra periods, Partition and rediscovery.",
    eyebrow: "Historical significance",
    heading: "From construction to rediscovery",
    intro: "The register follows the region from early Poonch rulers through Sikh and Dogra periods, Partition, legal protection and contemporary documentation.",
  },
  "/mission": {
    title: "Mission Statement — Yemberzal",
    description: "Yemberzal’s mission to preserve a public multilingual record of Sikh, Dogra and shared heritage.",
    eyebrow: "Mission statement",
    heading: "A structure survives its congregation.",
    intro: "Our mission is to preserve a public, multilingual record of Sikh, Dogra and shared heritage through crowd-funded historiography.",
  },
  "/recordings": {
    title: "Recordings and Films — Yemberzal",
    description: "Listen to oral-history recordings and watch multilingual films for the Yemberzal heritage archive.",
  },
  "/book-a-tour": {
    title: "Book a Tour — Yemberzal",
    description: "Contact the Yemberzal archive to plan a heritage visit to Rawalakot and the Poonch region.",
  },
  "/admin": {
    title: "Archive Editor — Yemberzal",
    description: "Private editor access for the Yemberzal field archive.",
  },
};

const archiveCards = [
  ["Gurdwara / Samadhi", "Sikh era", "Gurdwara Gulshan-e-Shauda", "One of Rawalakot’s most important surviving Sikh-period buildings.", "gulshan-e-shauda.jpg"],
  ["Gurdwara / Samadhi", "Sikh era", "Gurdwara Sahib Draid", "A field-study companion to Gulshan-e-Shauda.", "gurdwara-sahib-draid.jpg"],
  ["Stepwell", "Sikh–Dogra era", "Upper Koiyan Baoli", "A stone stepwell built for hill travellers and villagers.", "upper-koiyan.jpg"],
  ["Multiple structures", "Sikh era", "Sikh Structures, Poonch District", "Memorial platforms, wells, walls and outbuildings.", "gulshan-e-shauda.jpg"],
  ["Fort-palace and settlement", "1713–1947", "Old Poonch (Purani Poonch)", "The pre-Partition centre of the undivided Poonch jagir.", "poonch-fort.jpg"],
  ["Hill fort", "Late medieval / Dogra", "Baral Fort", "A compact fort overlooking three valleys.", "baral-fort.jpg"],
  ["Hill fort", "Mongral / Sikh / Dogra", "Kotli Kachayi Fort", "A limestone hilltop fort also known as Qila Karchai.", "kotli-kachayi.jpg"],
  ["Temple", "Historic", "Seri Temple", "A protected temple in the regional heritage register.", "seri-temple.jpg"],
  ["Baradari", "Dogra era", "Ranbir Singh Baradari", "A riverside pavilion associated with Maharaja Ranbir Singh.", "ranbir-singh-baradari.jpg"],
  ["Gurdwara", "Sikh era", "Gurdwara Chatti Badshahi", "A Sikh sacred site in the wider AJK heritage record.", "chatti-badshahi.jpg"],
];

const MEDIA_STORAGE_KEY = "yemberzal-media-library-v1";
const defaultMedia = [
  ["field-map", "image", "Field map", "Ten Sikh-era heritage sites across the Poonch region.", "/images/field-map.jpg", "field-map.jpg"],
  ["gulshan-e-shauda", "image", "Gurdwara Gulshan-e-Shauda", "Rawalakot, Poonch District.", "/images/gulshan-e-shauda.jpg", "gulshan-e-shauda.jpg"],
  ["gurdwara-sahib-draid", "image", "Gurdwara Sahib Draid", "Draid, near Rawalakot.", "/images/gurdwara-sahib-draid.jpg", "gurdwara-sahib-draid.jpg"],
  ["upper-koiyan", "image", "Upper Koiyan Baoli", "Upper Koiyan, Poonch District.", "/images/upper-koiyan.jpg", "upper-koiyan.jpg"],
  ["poonch-fort", "image", "Old Poonch", "Historic Poonch fort-palace and settlement.", "/images/poonch-fort.jpg", "poonch-fort.jpg"],
  ["baral-fort", "image", "Baral Fort", "Poonch–Rajouri frontier.", "/images/baral-fort.jpg", "baral-fort.jpg"],
  ["kotli-kachayi", "image", "Kotli Kachayi Fort", "Kotli District.", "/images/kotli-kachayi.jpg", "kotli-kachayi.jpg"],
  ["seri-temple", "image", "Seri Temple", "Poonch region.", "/images/seri-temple.jpg", "seri-temple.jpg"],
  ["ranbir-singh-baradari", "image", "Ranbir Singh Baradari", "Muzaffarabad.", "/images/ranbir-singh-baradari.jpg", "ranbir-singh-baradari.jpg"],
  ["chatti-badshahi", "image", "Gurdwara Chatti Badshahi", "Azad Jammu and Kashmir.", "/images/chatti-badshahi.jpg", "chatti-badshahi.jpg"],
].map(([id, type, title, caption, src, fileName]) => ({
  id,
  type,
  title,
  caption,
  src,
  fileName,
  bundled: true,
}));

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[character]));
}

function getMediaItems() {
  try {
    const stored = localStorage.getItem(MEDIA_STORAGE_KEY);
    if (!stored) return [...defaultMedia];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [...defaultMedia];
  } catch {
    return [...defaultMedia];
  }
}

function saveMediaItems(items) {
  localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(items));
}

function mediaTypeLabel(type) {
  return ({ image: "Photo / image", video: "Video", audio: "Audio" }[type] || "Media");
}

function mediaPreviewMarkup(item, className = "media-preview") {
  const src = escapeHtml(item.src || "");
  const title = escapeHtml(item.title || "Archive media");
  if (item.type === "video") {
    return `<video class="${className}" controls preload="metadata" src="${src}" aria-label="${title}"></video>`;
  }
  if (item.type === "audio") {
    return `<div class="${className} media-preview--audio">${iconVolume()}<audio controls preload="metadata" src="${src}" aria-label="${title}"></audio></div>`;
  }
  return `<img class="${className}" src="${src}" alt="${title}">`;
}

function mediaCardsMarkup(items, { admin = false } = {}) {
  return items.map((item) => `
    <article class="media-card" data-media-type="${escapeHtml(item.type)}">
      ${mediaPreviewMarkup(item)}
      <div class="media-card__body">
        <p class="media-card__type">${mediaTypeLabel(item.type)}${item.bundled ? " · bundled archive asset" : ""}</p>
        <h3>${escapeHtml(item.title || "Untitled media")}</h3>
        <p class="media-card__caption">${escapeHtml(item.caption || "No caption added.")}</p>
        ${admin ? `
          <div class="media-card__actions">
            <button class="button button--secondary button--small" type="button" data-media-edit="${escapeHtml(item.id)}">Edit</button>
            <button class="button button--danger button--small" type="button" data-media-delete="${escapeHtml(item.id)}">Remove</button>
          </div>
        ` : ""}
      </div>
    </article>
  `).join("");
}

function updateMeta() {
  const meta = routeMeta[routePath];
  if (!meta) return;
  document.title = meta.title;
  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (description) description.content = meta.description;
  if (ogTitle) ogTitle.content = meta.title;
  if (ogDescription) ogDescription.content = meta.description;
  if (twitterTitle) twitterTitle.content = meta.title;
  if (twitterDescription) twitterDescription.content = meta.description;
  if (routePath === "/admin") {
    document.querySelector('meta[name="robots"]')?.setAttribute("content", "noindex");
  }
}

function iconVolume() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5V4.7Z"></path><path d="M16 9a5 5 0 0 1 0 6M19.4 18.4a9 9 0 0 0 0-12.8"></path></svg>`;
}

function archiveMarkup() {
  return archiveCards.map(([type, period, title, copy, image], index) => `
    <article class="archive-card">
      <img class="archive-card__image" src="/images/${image}" alt="">
      <div class="archive-card__body">
        <p class="archive-card__type">${type} · ${period}</p>
        <h2>${title}</h2>
        <p class="archive-card__copy">${copy}</p>
      </div>
    </article>
  `).join("");
}

function renderArchivePage(meta) {
  main.className = "route-main route-main--archive";
  main.innerHTML = `
    <p class="eyebrow">${meta.eyebrow}</p>
    <h1>${meta.heading}</h1>
    <p class="route-intro">${meta.intro}</p>
    <div class="archive-grid">${archiveMarkup()}</div>
  `;
}

function renderMapPage() {
  const mapPanel = document.querySelector("#field-map");
  const register = document.querySelector("#register");
  main.className = "route-main route-main--map";
  main.replaceChildren(mapPanel.cloneNode(true), register.cloneNode(true));
}

function renderRecordingsPage() {
  const register = document.querySelector("#register");
  const media = getMediaItems().filter((item) => item.type === "audio" || item.type === "video");
  main.className = "route-main";
  main.innerHTML = `
    <p class="eyebrow">Oral archive</p>
    <h1 class="route-main--archive">Recordings &amp; films</h1>
    <p class="route-intro">Voice recordings explain each monument, and films can document the archive in English, Urdu and Pahari.</p>
    ${media.length ? `<div class="media-grid media-grid--public">${mediaCardsMarkup(media)}</div>` : `<div class="recordings-empty">${iconVolume()}<span>Recordings will appear here as they are uploaded by the archive editor.</span></div>`}
  `;
  const registerClone = register.cloneNode(true);
  registerClone.classList.add("route-register");
  main.append(registerClone);
}

function renderTourPage() {
  main.className = "route-main";
  main.innerHTML = `
    <div class="tour-layout">
      <div>
        <p class="eyebrow">Travel &amp; tourism in Pakistan</p>
        <h1>Visit Rawalakot</h1>
        <p class="route-intro">Plan a field visit to the monuments, connect with local knowledge, or ask how to support the next survey.</p>
        <img class="tour-image" src="/images/gulshan-e-shauda.jpg" alt="Gurdwara Gulshan-e-Shauda at dusk">
      </div>
      <form class="tour-form" id="tour-form">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m22 7-8.99 5.73a2 2 0 0 1-2.01 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>
        <h2>Tourism inbox</h2>
        <div class="form-fields">
          <input class="field-input" required placeholder="Your name" name="name" aria-label="Your name">
          <input class="field-input" required type="email" placeholder="Email address" name="email" aria-label="Email address">
          <input class="field-input" placeholder="Phone or WhatsApp (optional)" name="phone" aria-label="Phone or WhatsApp (optional)">
          <textarea class="field-textarea" required name="message" placeholder="Tell us when you hope to visit and what you would like to see" aria-label="Tell us when you hope to visit and what you would like to see"></textarea>
          <button class="button button--primary form-submit" type="submit">Send to the archive</button>
        </div>
      </form>
    </div>
  `;
}

function renderAdminPage() {
  main.className = "route-main";
  main.innerHTML = `
    <section class="admin-workspace" aria-labelledby="admin-heading">
      <div class="admin-heading">
        <div>
          <p class="eyebrow eyebrow--jade">Archive editor</p>
          <h1 id="admin-heading">Manage your media archive.</h1>
          <p class="route-intro">Add, edit, preview and remove photos, images, audio and video from this browser.</p>
        </div>
        <a class="button button--secondary" href="/">Return to the archive</a>
      </div>
      <p class="admin-notice">This vanilla editor stores changes in this browser. Use a hosted media URL for large files; small local uploads are saved in the browser.</p>
      <div class="admin-columns">
        <form class="media-form surface" id="media-form">
          <input type="hidden" name="mediaId">
          <div class="form-heading">
            <div>
              <p class="eyebrow">Media details</p>
              <h2 id="media-form-heading">Add media</h2>
            </div>
            <button class="button button--secondary button--small is-hidden" id="media-cancel" type="button">Cancel edit</button>
          </div>
          <div class="form-fields">
            <label class="field-label">Type
              <select class="field-input" name="type">
                <option value="image">Photo / image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>
            </label>
            <label class="field-label">Title
              <input class="field-input" required name="title" placeholder="e.g. Oral history at Draid">
            </label>
            <label class="field-label">Media URL <span>(optional if uploading a file)</span>
              <input class="field-input" type="text" name="src" placeholder="https://example.com/media.mp4 or /images/file.jpg">
            </label>
            <label class="field-label">Upload a file <span>(small files only)</span>
              <input class="field-input field-input--file" type="file" name="file" accept="image/*,video/*,audio/*">
            </label>
            <label class="field-label">Caption
              <textarea class="field-textarea field-textarea--short" name="caption" placeholder="Add context for visitors"></textarea>
            </label>
            <button class="button button--primary form-submit" type="submit">Save media</button>
          </div>
          <p class="form-status" id="media-form-status" aria-live="polite"></p>
        </form>
        <section class="media-library surface" aria-labelledby="media-library-heading">
          <div class="media-library__head">
            <div>
              <p class="eyebrow">Library</p>
              <h2 id="media-library-heading">Archive media</h2>
            </div>
            <label class="filter-wrap">Filter
              <select class="field-input" id="media-filter">
                <option value="all">All media</option>
                <option value="image">Photos &amp; images</option>
                <option value="video">Videos</option>
                <option value="audio">Audio</option>
              </select>
            </label>
          </div>
          <div class="media-grid" id="media-library-list"></div>
          <p class="media-empty is-hidden" id="media-empty">No media in this view yet.</p>
        </section>
      </div>
    </section>
  `;
}

function renderRoute() {
  if (routePath === "/field-map") renderMapPage();
  if (routePath === "/recordings") renderRecordingsPage();
  if (routePath === "/book-a-tour") renderTourPage();
  if (routePath === "/admin") renderAdminPage();
  if (routeMeta[routePath]?.heading) renderArchivePage(routeMeta[routePath]);
}

function renderAdminLibrary(filter = "all") {
  const list = document.querySelector("#media-library-list");
  const empty = document.querySelector("#media-empty");
  if (!list || !empty) return;
  const items = getMediaItems().filter((item) => filter === "all" || item.type === filter);
  list.innerHTML = mediaCardsMarkup(items, { admin: true });
  empty.classList.toggle("is-hidden", items.length > 0);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(new Error("The file could not be read.")));
    reader.readAsDataURL(file);
  });
}

function bindAdminPanel() {
  const form = document.querySelector("#media-form");
  if (!form) return;

  const status = document.querySelector("#media-form-status");
  const heading = document.querySelector("#media-form-heading");
  const cancel = document.querySelector("#media-cancel");
  const filter = document.querySelector("#media-filter");
  const idField = form.elements.mediaId;
  const typeField = form.elements.type;
  const titleField = form.elements.title;
  const sourceField = form.elements.src;
  const fileField = form.elements.file;
  const captionField = form.elements.caption;

  const setStatus = (message, kind = "") => {
    status.textContent = message;
    status.className = `form-status${kind ? ` form-status--${kind}` : ""}`;
  };

  const resetForm = () => {
    form.reset();
    idField.value = "";
    heading.textContent = "Add media";
    cancel.classList.add("is-hidden");
    setStatus("");
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("Saving…");
    const file = fileField.files?.[0];
    const title = titleField.value.trim();
    let source = sourceField.value.trim();
    if (!title) {
      setStatus("Add a title before saving.", "error");
      titleField.focus();
      return;
    }
    if (!source && !file) {
      setStatus("Add a media URL or choose a file.", "error");
      return;
    }
    if (file && file.size > 6 * 1024 * 1024) {
      setStatus("This file is larger than 6 MB. Add a hosted media URL instead.", "error");
      return;
    }

    try {
      if (file) source = await readFileAsDataUrl(file);
      const items = getMediaItems();
      const id = idField.value || `media-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const existing = items.find((item) => item.id === id);
      const nextItem = {
        id,
        type: typeField.value,
        title,
        caption: captionField.value.trim(),
        src: source,
        fileName: file?.name || existing?.fileName || "",
        bundled: false,
        createdAt: existing?.createdAt || new Date().toISOString(),
      };
      const nextItems = existing
        ? items.map((item) => item.id === id ? nextItem : item)
        : [nextItem, ...items];
      saveMediaItems(nextItems);
      renderAdminLibrary(filter.value);
      resetForm();
      setStatus(existing ? "Media updated." : "Media added.", "success");
    } catch {
      setStatus("The media could not be saved. Try a smaller file or a hosted URL.", "error");
    }
  });

  cancel.addEventListener("click", resetForm);
  filter.addEventListener("change", () => renderAdminLibrary(filter.value));

  document.querySelector("#media-library-list")?.addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-media-edit]");
    const deleteButton = event.target.closest("[data-media-delete]");
    const items = getMediaItems();

    if (editButton) {
      const item = items.find((entry) => entry.id === editButton.dataset.mediaEdit);
      if (!item) return;
      idField.value = item.id;
      typeField.value = item.type;
      titleField.value = item.title || "";
      sourceField.value = item.src || "";
      captionField.value = item.caption || "";
      heading.textContent = "Edit media";
      cancel.classList.remove("is-hidden");
      setStatus(`Editing ${item.title || "media"}.`);
      titleField.focus();
      return;
    }

    if (deleteButton) {
      const item = items.find((entry) => entry.id === deleteButton.dataset.mediaDelete);
      if (!item || !window.confirm(`Remove “${item.title || "this media"}” from the browser library?`)) return;
      saveMediaItems(items.filter((entry) => entry.id !== item.id));
      renderAdminLibrary(filter.value);
      if (idField.value === item.id) resetForm();
      setStatus("Media removed from the browser library.", "success");
    }
  });

  renderAdminLibrary();
}

function updateActiveNavigation() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPath = link.getAttribute("href");
    const active = routePath === "/" ? linkPath === "/" : linkPath === routePath;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function bindMobileNavigation() {
  const button = document.querySelector(".menu-button");
  const nav = document.querySelector("#mobile-nav");
  if (!button || !nav) return;
  const close = () => {
    nav.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open archive navigation");
  };
  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Close archive navigation" : "Open archive navigation");
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
}

function bindRegister() {
  document.querySelectorAll(".site-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const card = toggle.closest(".site-card");
      if (!card) return;
      const open = card.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  });

  const search = document.querySelector(".search-input");
  const cards = [...document.querySelectorAll(".site-card")];
  const noResults = document.querySelector(".no-results");
  search?.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();
    let count = 0;
    cards.forEach((card) => {
      const visible = !query || card.dataset.search.toLowerCase().includes(query);
      card.classList.toggle("is-hidden", !visible);
      if (visible) count += 1;
    });
    noResults?.classList.toggle("is-visible", count === 0);
  });
}

function bindTourForm() {
  document.querySelector("#tour-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

updateMeta();
if (routePath !== "/") renderRoute();
updateActiveNavigation();
bindMobileNavigation();
bindRegister();
bindTourForm();
bindAdminPanel();