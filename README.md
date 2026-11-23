# Kam Barber Yatton

**https://kambarberyatton.com**

A static website for Kam Barber Yatton, 110 High Street, Yatton BS49 4DW. It's a copy of the Clevedon Barber 1 site (https://clevedonbarber1.com) with the Yatton details swapped in. Plain HTML, CSS and a little JavaScript: no build step and no framework, so it can be hosted for free (it's set up for Vercel).

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

- [ ] **Website on his Google Business Profile.** Add `https://kambarberyatton.com` in the *Website* field of the "Kam barber yatton" listing. This matters most for local searches like "barber Yatton". Jake suggested it on Google on 23 Nov 2026; tick this off once it shows.
- [ ] **Fix the hours on Google.** His Google listing shows Mon 8:30am to midnight, and Tue and Wed starting at 12am. Change them to match the site (Mon to Sat 8:30am to 6:30pm, Sun 10am to 4pm). Google trusts matching details. Jake suggested the fix on Google on 23 Nov 2026; tick this off once it shows.
- [ ] **Fix the address on Google.** The shop is at 110 High Street (confirmed 23 Nov 2026), but his Google listing says 108 High St. Change it to 110 so it matches the site, Companies House and Facebook. Jake suggested the fix on Google on 23 Nov 2026; tick this off once it shows.
- [ ] **Booking.** No Booksy (or other) page found for Yatton, so the "Book on Booksy" button is hidden and people call or walk in. If he sets one up, put the link in `SETTINGS.bookingUrl`.

### Needs you

- [ ] **Same details everywhere.** Facebook and any directory listings should use exactly the same name, address and phone as the site and Google, and link to it.

## Already done

- **Google Search Console:** set up for `https://kambarberyatton.com` with the sitemap submitted (23 Nov 2026).
- **Domain ownership:** checked it's in Kam's name, with auto-renew on (23 Nov 2026).
- **www:** `www.kambarberyatton.com` redirects to `https://kambarberyatton.com` (checked 23 Nov 2026).
- **Reviews:** six real 5-star Google reviews for the Yatton shop, copied word for word on 23 Nov 2026 (Ezekwesirim's is the last paragraph of a longer one). Rating 5.0 from 13 reviews.
- **Phone** 07393 538789, the same as Clevedon (confirmed by Jake 23 Nov 2026).
- **Name, address and phone:** 110 High Street, confirmed by Jake 23 Nov 2026 (Google wrongly says 108). Used in the text, call buttons, map pin, directions and the Google search data.
- **Top photo:** inside the Yatton shop, from Kam on 23 Nov 2026 (`assets/photos/inside.jpg`, original in `haircut-images/inside-yatton.JPG`).
- **Domain:** live at https://kambarberyatton.com on Vercel (23 Nov 2026). The canonical address, share tags, Google business data, `robots.txt` and `sitemap.xml` all use it.
- **Prices:** the same as Clevedon, confirmed 23 Nov 2026.
- **Opening hours** Mon to Sat 8:30am to 6:30pm, Sun 10am to 4pm, confirmed 23 Nov 2026 (same as Clevedon). To change them, edit the hours table (`data-open` / `data-close` in 24-hour time, plus the visible text) **and** the `openingHoursSpecification` near the top of `index.html`.
- **Share image:** `assets/og-image.jpg`, 1200×630, with the Yatton name over the Yatton interior. Shows in WhatsApp and Facebook previews.
- **Icons:** `favicon.ico`, `assets/favicon.svg` and the PNGs in `assets/icons/` show a gold Y in the hexagon.
- **Google business data:** name, address, phone, hours, map pin (51.3882, -2.8223) and a link to the Google listing (`hasMap`), matching the Google Business Profile.
- **Gallery:** the 23 Clevedon cuts were swapped for 8 Yatton photos Kam sent on 23 Nov 2026. The originals are in `haircut-images/`. The screenshot bars at the top and bottom were cropped off, and none of the files has location data. Parents of the children in cuts 02, 03, 05 and 06 agreed to the photos being used (confirmed 23 Nov 2026).
- **Wheelchair access:** the shop is wheelchair accessible (confirmed 23 Nov 2026). Shown under the address and in the Google business data.
- **Logo** reads "Kam Barber", with a Y for Yatton in the hexagon.


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

    sips -s format jpeg -s formatOptions 74 -Z 800  photo.jpg --out cut-09-small.jpg
    sips -s format jpeg -s formatOptions 80 -Z 1600 photo.jpg --out cut-09.jpg

### Adding reviews

Copy a card in the "What people say" list in `index.html`. There's a ready-made template in the comment just above the list. Change the words, name and stars. The slider grows to fit.

### Turning on live Google reviews

1. Make sure Kam's **Google Business Profile** is claimed in his name (it's free).
2. Find its **Place ID** with Google's Place ID Finder: https://developers.google.com/maps/documentation/places/web-service/place-id
3. In **Google Cloud Console** (in Kam's account), create a project, turn on **Maps JavaScript API** and **Places API (New)**, and create an **API key**.
4. Restrict the key. Under *Application restrictions* choose *Websites* and add the live domain (`https://kambarberyatton.com/*`). Under *API restrictions* allow only those two APIs.
5. Put both values in `SETTINGS.googleApiKey` and `SETTINGS.googlePlaceId` in `script.js`.

Google's free monthly allowance is far more than one shop's site will use, but it asks for a billing card. Set a £1 budget alert for peace of mind. The map and directions buttons don't need a key.

## Avoiding the scams he's hit before

- The domain, Google Business Profile and any Google Cloud account should all be in **Kam's own name and email**, with two-factor login and auto-renew on.
- Hosting this site costs nothing. The domain is the only yearly cost, roughly £10 to £15.
- Any call offering to "verify" or "rank" his Google listing for a fee is a scam. Claiming it is free.
