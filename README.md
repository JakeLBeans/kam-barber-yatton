# Clevedon Barber 1

A static website: plain HTML, CSS and a little JavaScript. There's no build step and no framework, so it runs on any static host (Netlify, Cloudflare Pages, GitHub Pages) for free.

## Two versions

| Folder | Look |
| --- | --- |
| `black-gold/` | Black with gold-leaf lettering and a gold pier |
| `navy-red/` | Barber-pole navy, red and white |

Open the top-level `index.html` to compare them side by side. Once Kam picks one, deploy only that folder; the comparison page is just for choosing. The two versions share the same content and structure, so any change to the words (prices, hours, phone) needs making in both until one is chosen.

## Files in each version

| File | What's in it |
| --- | --- |
| `index.html` | All the words: prices, opening hours, address, phone |
| `styles.css` | Colours, fonts and layout |
| `script.js` | Booking and Instagram links (`SETTINGS` at the top), the pier drawing, the "open now" status |
| `assets/` | Favicon, social share image, and `photos/` for shop photos |

## Before going live: things to get from the shop

Everything below is a placeholder right now.

- [ ] **Phone number.** Find and replace `01275 000000` and `+441275000000` in `index.html` and `script.js`.
- [ ] **Address.** Replace "Shop address" in the Find us section, and `SHOP ADDRESS` / `BS21` in the structured data at the top of `index.html`. Also update the "Get directions" link query.
- [ ] **Prices.** All of them are sample figures. Confirm each service and price.
- [ ] **Opening hours.** Update both the table (`data-open` / `data-close` in 24-hour time, plus the visible text) and the `openingHoursSpecification` near the top of `index.html`.
- [ ] **Booking link.** If he uses Booksy, Fresha, Setmore or similar, put the URL in `SETTINGS.bookingUrl` in `script.js`. Leave it empty and the site tells people to call instead.
- [ ] **Instagram.** Put the profile URL in `SETTINGS.instagramUrl`. The Instagram links stay hidden until it's set.
- [x] **Interior photo.** In place as `assets/photos/inside.webp` in both versions.
- [ ] **Two more photos.** Add a shop front and a recent cut to `assets/photos/`, then swap each placeholder `<div class="photo">` for an `<img>` with a short description in `alt`.
- [ ] **Small print.** Check the details about parking, step-free access, over-65s on weekdays, card or cash, and washes.
- [ ] **Domain.** Once it's chosen (clevedonbarber1 or clevedonbarberone), add `<link rel="canonical">` and make the `og:image` URL absolute.

## Avoiding the scams he's hit before

- Register the domain in **his own name and email**, with a mainstream registrar (Cloudflare, Namecheap, 123-reg). Turn on auto-renew and two-factor login.
- A site like this costs nothing to host. The domain is the only yearly cost, roughly £10 to £15.
- Claim his **Google Business Profile** himself, for free. Any call offering to "verify" or "rank" it for a fee is a scam.
