# Clevedon Barber 1

**https://clevedonbarber1.com**

A static website for Clevedon Barber 1, 13 Old Church Road, Clevedon. Plain HTML, CSS and a little JavaScript: no build step and no framework, so it can be hosted for free (it's set up for Vercel).

## What's on the site

Real contact details and hours, the 23 cut photos with a full-screen viewer, the Google rating and a reviews slider, a map with directions, wheelchair access, its own logo, scroll animations, a phone burger menu and the "Website by" credit. It was checked against WCAG 2.2 AA (contrast, text size, keyboard use, screen-reader labels, 320px screens).

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole page: content, prices, hours |
| `styles.css` | Colours, fonts and layout |
| `script.js` | Behaviour, plus the `SETTINGS` block at the top |
| `assets/` | Logos, favicon, share image and photos |
| `haircut-images/` | Kam's original photos (not deployed) |
| `vercel.json` | Hosting settings |
| `robots.txt`, `sitemap.xml` | Tell search engines what to index |
| `favicon.ico`, `site.webmanifest` | Browser tab and home-screen icons |

## Still to do

### Needs Kam

- [ ] **Website on his Google Business Profile.** Jake suggested the edit on 22 Nov 2026. Kam should add `https://clevedonbarber1.com` in the *Website* field himself so it goes through. This matters most for local searches like "barber Clevedon".
- [ ] **Booksy name.** His Booksy page is called "Clevedon barber1" and is marked as a mobile service. Change it to "Clevedon Barber 1" and the shop so it matches the site and Google.

### Needs you

- [ ] **Check the domain is in Kam's name.** If you registered it in your account to get things moving, move it to his name and email (or make sure he can log in), and turn on auto-renew.
- [ ] **Same details everywhere.** Make sure Fresha, Booksy, OurLocals, Facebook and so on use exactly the same name, address and phone number as the site, and link to it. Google trusts matching details.

### Optional

- [ ] **Live Google reviews.** Makes the rating, the latest reviews and the opening hours update themselves. Needs a Google Cloud account with a billing card. Usually free for a shop this size, but not guaranteed. The hand-copied reviews work fine without it. Setup is below.
- [ ] **Instagram.** He doesn't seem to have one. If he sets one up, put the profile link in `SETTINGS.instagramUrl` and the Instagram links appear by themselves.
- [ ] **Printing the logo.** The logo files' lettering is live text. Convert it to outlines (Figma or Illustrator) before sending to a printer or signwriter.

## Already done

- **Confirmed by Kam:** he takes card and cash, and parents have given permission for the gallery photos of children.
- **Checked 22 Nov 2026:** Google's Rich Results Test finds a valid Local business and Organization with no warnings. The share preview tags and image (1200×630, 156KB) are served correctly to Facebook and WhatsApp.
- **Google Search Console** set up on 22 Nov 2026, with the sitemap (`https://clevedonbarber1.com/sitemap.xml`) submitted and indexing requested. Check back in a week for any problems under *Pages*.
- **Live** at https://clevedonbarber1.com on Vercel (Root Directory empty). http and www redirect to it.
- **Address** 13 Old Church Road, Clevedon BS21 6LZ and **phone** 07393 538789, from the shop's public listings (Fresha and OurLocals, checked 22 Nov 2026). They're used in the text, call buttons, map pin, directions and the Google search data.
- **Google rating** of 4.9 from 164 reviews. Google's own map card shows the same figures.
- **Photos:** the interior shot plus 23 cuts in two sizes, with no location data in the files.
- **Wheelchair access**, shown on the page and in the Google search data.
- **Hosting files:** `vercel.json` (clean addresses with no `.html`, security headers, image caching), `.vercelignore` (keeps `haircut-images/` and this README off the live site) and `.gitignore`.
- **Domain set up:** the canonical address `https://clevedonbarber1.com/`, the full-address share image and page address for WhatsApp and Facebook previews, and the site address and logo in Google's data.
- **Prices** from Kam's price list (22 Nov 2026), in the price section of `index.html`. The price range in the business data near the top (`priceRange`) is £10–£39; update it if the cheapest or dearest price changes.
- **Booking** goes to his Booksy page (https://booksy.com/en-gb/190439_clevedon-barber1_barber_1143398_clevedon), set in `SETTINGS.bookingUrl` in `script.js`. The "Book on Booksy" button is in Find us.
- **Reviews:** six real 5-star Google reviews, copied word for word on 22 Nov 2026 with the reviewer's first name and initial. Swap in newer ones now and then (see "Adding reviews"), and update `rating` and `reviewCount` in `script.js` from his Google listing.
- **Opening hours** Mon to Sat 8:30am to 6:30pm, Sun 10am to 4pm, confirmed by Kam on 22 Nov 2026. To change them, edit the hours table (`data-open` / `data-close` in 24-hour time, plus the visible text) **and** the `openingHoursSpecification` near the top of `index.html`. Keep his Google Business Profile matching.
- **Search engine basics:** page title and description, canonical address, `robots.txt`, `sitemap.xml`, and Google business data (address, phone, hours, map location, wheelchair access, logo). http and www both redirect to `https://clevedonbarber1.com/`. If the hours, phone or address change, update the business data near the top of `index.html` too. Update `<lastmod>` in `sitemap.xml` after a big change.
- **Icons:** `favicon.ico`, `assets/favicon.svg`, and PNGs in `assets/icons/` for iPhone home screens, Android and Google results, plus `site.webmanifest`.
- **Share image:** `assets/og-image.jpg`, 1200×630, 156KB, regenerated with the current font and logo.
- **Live Google reviews key:** when setting up the API key, restrict it to `https://clevedonbarber1.com/*`.

## Where to change things

Everyday settings are in `SETTINGS` at the top of `script.js`:

| Setting | What it does |
| --- | --- |
| `bookingUrl` | Online booking page. Empty means "call to book". |
| `instagramUrl` | Instagram profile. Empty hides the links. |
| `mapQuery` | What the map and directions search for. |
| `rating`, `reviewCount` | The Google rating shown on the page. Update now and then from his Google listing. |
| `creditName`, `creditUrl` | The "Website by" credit in the footer. |
| `googleApiKey`, `googlePlaceId` | Live Google reviews, as set up below. |

Everything else (prices, hours, wording) is in `index.html`, and colours, fonts and layout are in `styles.css`.

### Adding gallery photos

The originals Kam sent are in `haircut-images/` (not deployed). Each photo on the site comes in two sizes in `assets/photos/work/`: `cut-NN-small.jpg` for the grid and `cut-NN.jpg` for full screen. To add one, make both sizes with macOS's built-in tool, then copy one of the gallery `<li>` lines in `index.html`, point it at the new files and write a short description in `alt`:

    sips -s format jpeg -s formatOptions 74 -Z 800  photo.jpg --out cut-24-small.jpg
    sips -s format jpeg -s formatOptions 80 -Z 1600 photo.jpg --out cut-24.jpg

### Adding reviews

Copy a card in the "What people say" list in `index.html`. There's a ready-made template in the comment just above the list. Change the words, name and stars. The slider grows to fit.

### Turning on live Google reviews

1. Make sure Kam's **Google Business Profile** is claimed in his name (it's free).
2. Find its **Place ID** with Google's Place ID Finder: https://developers.google.com/maps/documentation/places/web-service/place-id
3. In **Google Cloud Console** (in Kam's account), create a project, turn on **Maps JavaScript API** and **Places API (New)**, and create an **API key**.
4. Restrict the key. Under *Application restrictions* choose *Websites* and add the live domain (`https://clevedonbarber1.com/*`). Under *API restrictions* allow only those two APIs.
5. Put both values in `SETTINGS.googleApiKey` and `SETTINGS.googlePlaceId` in `script.js`.

Google's free monthly allowance is far more than one shop's site will use, but it asks for a billing card. Set a £1 budget alert for peace of mind. The map and directions buttons don't need a key.

## Avoiding the scams he's hit before

- The domain, Google Business Profile and any Google Cloud account should all be in **Kam's own name and email**, with two-factor login and auto-renew on.
- Hosting this site costs nothing. The domain is the only yearly cost, roughly £10 to £15.
- Any call offering to "verify" or "rank" his Google listing for a fee is a scam. Claiming it is free.
