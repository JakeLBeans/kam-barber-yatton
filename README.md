# Clevedon Barber 1

A static website: plain HTML, CSS and a little JavaScript. There's no build step and no framework, so it runs on any static host (Netlify, Cloudflare Pages, GitHub Pages) for free.

## Two versions

| Folder | Look |
| --- | --- |
| `black-gold/` | Black with gold-leaf lettering and a gold pier |
| `navy-red/` | Barber-pole navy, red and white |
| `showcase/` | Photo-led on white, with a gallery of cuts, live Google reviews, and a map with directions |

Open the top-level `index.html` to compare them side by side.

`showcase/` keeps its settings (map location, booking link, Instagram, Google reviews) in `SETTINGS` at the top of its `script.js`. Once Kam picks one, deploy only that folder; the comparison page is just for choosing. The two versions share the same content and structure, so any change to the words (prices, hours, phone) needs making in both until one is chosen.

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

## Showcase: turning on live Google reviews

The reviews section shows three clearly labelled sample cards until this is set up. Once it is, the star rating and the latest reviews come straight from Google and keep themselves up to date.

1. Make sure the shop has a **Google Business Profile** and that it's claimed in Kam's name.
2. Find its **Place ID** with Google's Place ID Finder: https://developers.google.com/maps/documentation/places/web-service/place-id
3. In **Google Cloud Console**, create a project (in Kam's account), turn on **Maps JavaScript API** and **Places API (New)**, and create an **API key**.
4. Restrict the key: under *Application restrictions*, choose *Websites* and add the live domain (e.g. `https://clevedonbarber1.co.uk/*`). Under *API restrictions*, allow only those two APIs.
5. Put both values into `SETTINGS.googleApiKey` and `SETTINGS.googlePlaceId` in `showcase/script.js`.

Google gives a free monthly allowance that a single shop's site won't come close to, but it does ask for a billing card on the account. Set a budget alert at £1 for peace of mind.

The map and directions buttons need no key. Set `SETTINGS.mapQuery` to the full street address once you have it.

## Showcase: details already filled in

From the shop's public listings (Fresha and OurLocals, checked 22 Nov 2026), now used in `showcase/`:

- Address: 13 Old Church Road, Clevedon BS21 6LZ (map pin, directions, Google structured data)
- Phone: 07393 538789
- Hours: Mon to Sat 8:30am to 6:30pm, Sun 9:30am to 4pm. **Check these against Google Maps**: OurLocals lists 9am to 6:30pm and Sun 10am to 4pm instead. Once live Google reviews are switched on, the hours update themselves from Google.

## Showcase: star rating

The reviews section shows a big star rating. Until there's a real figure it shows 4.9 with a "Sample rating" tag. To use the real one without setting up the Google API, read the rating and review count off the shop's Google Maps listing and set `SETTINGS.rating` and `SETTINGS.reviewCount` in `showcase/script.js`. This also shows the rating badge on the opening photo. With live Google reviews switched on, both fill in automatically and stay current.

## Showcase: gallery photos

The 23 photos Kam supplied (originals in `haircut-images/`) are in `showcase/assets/photos/work/`, each in two sizes: `cut-NN-small.jpg` (600px wide, for the grid) and `cut-NN.jpg` (1200px wide, opened full screen). The first 8 show straight away; "Show all 23 cuts" reveals the rest.

To add more, resize with macOS's built-in tool and add a matching `<li>` in `showcase/index.html`:

    sips -s format jpeg -s formatOptions 74 -Z 800  photo.jpg --out cut-24-small.jpg
    sips -s format jpeg -s formatOptions 80 -Z 1600 photo.jpg --out cut-24.jpg

The `haircut-images/` folder is only the source; it doesn't need deploying.

## Showcase: logo

`showcase/assets/logo-white.svg`, `logo-black.svg` and `logo-mark-white.svg` (the hexagon on its own). The lettering is DM Serif Display; convert the text to outlines before sending the files to a printer or signwriter.

## Showcase: adding reviews

The reviews section is a slider, so it can hold any number of reviews. To add one, copy a card in the "What people say" list in `showcase/index.html` (there's a ready-made template in the comment just above it) and change the words, name and stars. Delete the six `is-sample` cards once real reviews are in. If live Google reviews are switched on, the samples are removed automatically, and Google's latest five are added after any you've written by hand.
