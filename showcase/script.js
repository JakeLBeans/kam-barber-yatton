/* ==========================================================
   Clevedon Barber 1 — showcase
   Everything a non-developer might need to change is in SETTINGS.
   ========================================================== */

const SETTINGS = {
  // What Google Maps should search for to place the pin. The full street address is most reliable,
  // e.g. "Clevedon Barber 1, 12 Example Street, Clevedon BS21 7AA".
  mapQuery: "Clevedon Barber 1, Clevedon",

  // Online booking page (Booksy, Fresha, Setmore...). Leave empty to hide the "Book online" button.
  bookingUrl: "",

  // Instagram profile, e.g. "https://www.instagram.com/clevedonbarber1/". Leave empty to hide the link.
  instagramUrl: "",

  // Live Google reviews. Needs both of these; see README.md for how to get them.
  // The API key must be restricted to this website's domain in Google Cloud.
  googleApiKey: "",
  googlePlaceId: "",
};

/* ---------- Small helpers ---------- */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const enc = encodeURIComponent;
const starString = (n) => "★★★★★".slice(0, Math.round(n)) + "☆☆☆☆☆".slice(0, 5 - Math.round(n));

/* ---------- Links, map and directions ---------- */
(function wireLinks() {
  const q = enc(SETTINGS.mapQuery);
  const google = SETTINGS.googlePlaceId
    ? `https://www.google.com/maps/dir/?api=1&destination=${q}&destination_place_id=${enc(SETTINGS.googlePlaceId)}`
    : `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  const apple = `https://maps.apple.com/?daddr=${q}`;
  $$('[data-directions="google"]').forEach((a) => (a.href = google));
  $$('[data-directions="apple"]').forEach((a) => (a.href = apple));

  // The map only loads once it's close to being seen
  const map = $("[data-map]");
  if (map) {
    const src = `https://maps.google.com/maps?q=${q}&z=16&output=embed`;
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          map.src = src;
          io.disconnect();
        }
      }, { rootMargin: "600px" });
      io.observe(map);
    } else {
      map.src = src;
    }
  }

  $$("[data-book-external]").forEach((a) => {
    if (SETTINGS.bookingUrl) a.href = SETTINGS.bookingUrl;
    else a.setAttribute("hidden", "");
  });

  $$("[data-instagram-link]").forEach((a) => {
    if (SETTINGS.instagramUrl) a.href = SETTINGS.instagramUrl;
    else a.setAttribute("hidden", "");
  });

  if (SETTINGS.googlePlaceId) {
    $$("[data-review-link]").forEach((a) => (a.href = `https://search.google.com/local/reviews?placeid=${enc(SETTINGS.googlePlaceId)}`));
    $$("[data-write-review-link]").forEach((a) => (a.href = `https://search.google.com/local/writereview?placeid=${enc(SETTINGS.googlePlaceId)}`));
  }

  const year = $("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();

/* ---------- Header turns solid once you scroll past the photo ---------- */
(function header() {
  const el = $("[data-header]");
  const hero = $(".hero");
  if (!el || !hero) return;
  const update = () => el.classList.toggle("is-solid", window.scrollY > hero.offsetHeight - 80);
  update();
  window.addEventListener("scroll", update, { passive: true });
})();

/* ---------- Gallery lightbox ---------- */
(function lightbox() {
  const dialog = $("[data-lightbox]");
  const img = $("[data-lightbox-img]");
  if (!dialog || !img || typeof dialog.showModal !== "function") return;

  const shots = $$("[data-gallery] button.shot img");
  let index = 0;
  const show = (i) => {
    index = (i + shots.length) % shots.length;
    img.src = shots[index].currentSrc || shots[index].src;
    img.alt = shots[index].alt;
  };

  shots.forEach((s, i) => s.closest("button").addEventListener("click", () => {
    show(i);
    dialog.showModal();
  }));

  const many = shots.length > 1;
  $("[data-lightbox-prev]").hidden = !many;
  $("[data-lightbox-next]").hidden = !many;
  $("[data-lightbox-prev]").addEventListener("click", () => show(index - 1));
  $("[data-lightbox-next]").addEventListener("click", () => show(index + 1));
  $("[data-lightbox-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && many) show(index - 1);
    if (e.key === "ArrowRight" && many) show(index + 1);
  });
})();

/* ---------- Live Google reviews ---------- */
(function googleReviews() {
  if (!SETTINGS.googleApiKey || !SETTINGS.googlePlaceId) return; // sample cards stay, clearly labelled

  window.__cb1MapsReady = async () => {
    try {
      const { Place } = await google.maps.importLibrary("places");
      const place = new Place({ id: SETTINGS.googlePlaceId });
      await place.fetchFields({ fields: ["rating", "userRatingCount", "reviews", "googleMapsURI"] });
      render(place);
    } catch (err) {
      console.warn("Google reviews could not load:", err);
    }
  };

  const s = document.createElement("script");
  s.src = `https://maps.googleapis.com/maps/api/js?key=${enc(SETTINGS.googleApiKey)}&v=weekly&loading=async&callback=__cb1MapsReady`;
  s.async = true;
  document.head.appendChild(s);

  function render(place) {
    const rating = place.rating;
    const count = place.userRatingCount;

    if (rating) {
      const label = `${rating.toFixed(1)} stars from ${count} Google reviews`;
      $$("[data-stars]").forEach((el) => (el.textContent = starString(rating)));
      const chip = $("[data-rating-chip]");
      $("[data-rating-text]").textContent = label;
      chip.setAttribute("aria-label", label);
      chip.hidden = false;
      $("[data-score-num]").textContent = rating.toFixed(1);
      $("[data-score-count]").textContent = `from ${count} Google reviews`;
      $("[data-score]").hidden = false;
    }

    const list = $("[data-reviews]");
    const reviews = (place.reviews || []).filter((r) => r.text).slice(0, 3);
    if (!reviews.length) return;
    list.replaceChildren(...reviews.map(card));
    $("[data-reviews-credit]").hidden = false;
  }

  function card(r) {
    const li = document.createElement("li");
    li.className = "review";

    const stars = document.createElement("span");
    stars.className = "stars";
    stars.textContent = starString(r.rating);
    stars.setAttribute("aria-label", `${r.rating} out of 5 stars`);

    const quote = document.createElement("blockquote");
    const p = document.createElement("p");
    p.textContent = r.text;
    quote.appendChild(p);

    const by = document.createElement("p");
    by.className = "review-by";
    const author = r.authorAttribution;
    if (author?.photoURI) {
      const pic = document.createElement("img");
      pic.src = author.photoURI;
      pic.alt = "";
      pic.loading = "lazy";
      pic.referrerPolicy = "no-referrer";
      by.appendChild(pic);
    }
    const who = document.createElement("span");
    const name = document.createElement(author?.uri ? "a" : "span");
    name.textContent = author?.displayName || "Google user";
    if (author?.uri) { name.href = author.uri; name.rel = "noopener"; }
    const when = document.createElement("span");
    when.className = "review-when";
    when.textContent = r.relativePublishTimeDescription || "";
    who.append(name, when);
    by.appendChild(who);

    li.append(stars, quote, by);
    return li;
  }
})();

/* ---------- Opening hours ---------- */
(function openingHours() {
  const table = $("[data-hours]");
  const status = $("[data-status]");
  if (!table) return;

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const byDay = {};
  $$("[data-day]", table).forEach((el) => {
    byDay[el.dataset.day] = { open: el.dataset.open, close: el.dataset.close, el };
  });

  const toMins = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
  const pretty = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    const suffix = h >= 12 ? "pm" : "am";
    const h12 = h % 12 || 12;
    return m ? `${h12}:${String(m).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
  };

  // Always use UK time, wherever the visitor is
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London", weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const today = days.indexOf(get("weekday"));
  const now = Number(get("hour")) * 60 + Number(get("minute"));

  const todayInfo = byDay[today];
  if (todayInfo) {
    todayInfo.el.classList.add("is-today");
    todayInfo.el.setAttribute("aria-current", "date");
  }
  if (!status) return;

  if (todayInfo?.open && now >= toMins(todayInfo.open) && now < toMins(todayInfo.close)) {
    status.textContent = `Open now until ${pretty(todayInfo.close)}`;
    status.classList.add("is-open");
    return;
  }
  if (todayInfo?.open && now < toMins(todayInfo.open)) {
    status.textContent = `Closed now. Opens today at ${pretty(todayInfo.open)}`;
    return;
  }
  for (let step = 1; step <= 7; step++) {
    const d = (today + step) % 7;
    const info = byDay[d];
    if (info?.open) {
      status.textContent = `Closed now. Opens ${step === 1 ? "tomorrow" : days[d]} at ${pretty(info.open)}`;
      return;
    }
  }
})();
