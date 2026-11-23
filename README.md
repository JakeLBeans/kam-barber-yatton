# Kam Barber Yatton

**https://kam-barber-yatton.vercel.app** (until Kam has his own domain)

A static website for Kam Barber Yatton, 108 High Street, Yatton BS49 4DW. It's a copy of the Clevedon Barber 1 site (https://clevedonbarber1.com) with the Yatton details swapped in. Plain HTML, CSS and a little JavaScript: no build step and no framework, so it can be hosted for free (it's set up for Vercel).

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

- [ ] **Opening hours.** His Google listing shows Mon 8:30am to midnight, Tue 12am to 6:30am then 8:30am to midnight, and Wed 12am to 6:30am then 8:30am to 6:30pm, which looks like a mistake. The site shows Mon to Sat 8:30am to 6:30pm and Sun 9:30am to 4pm (Thu to Sun as Google has them). Confirm with Kam, and fix the Google listing.
- [ ] **Address.** Google says 108 High St. Companies House, his Facebook posts and other directories say 110 High Street. The site uses 108 to match Google. Check which is right and make them all match.
- [ ] **Prices.** These are the Clevedon prices. Check Yatton charges the same.
- [ ] **Booking.** No Booksy (or other) page found for Yatton, so the "Book on Booksy" button is hidden and people call or walk in. If he sets one up, put the link in `SETTINGS.bookingUrl`.
- [ ] **Permission for the children's photos.** Four of the new gallery photos are of children (cuts 02, 03, 05 and 06). Check the parents are happy for them to be on the site, as was done for Clevedon.
- [ ] **Wheelchair access.** Removed, because it was about the Clevedon shop. Add it back if the Yatton shop is step-free.
- [ ] **Website on his Google Business Profile** once it's live.

### Needs you

- [ ] **Domain.** Decide whether he wants one. If so, replace `https://kam-barber-yatton.vercel.app` in `index.html` (canonical, share tags and business data), `robots.txt` and `sitemap.xml`.
- [ ] **Share image.** `assets/og-image.jpg` still shows the Clevedon name and address, so it's switched off in `index.html` for now. Make a Yatton one and add the `og:image` tags back.
- [ ] **Icons.** `assets/favicon.svg` and the logos now show a Y in the hexagon, but `favicon.ico` and the PNGs in `assets/icons/` still show the Clevedon 1. Regenerate them from `assets/favicon.svg`.

## Already done

- **Reviews:** six real 5-star Google reviews for the Yatton shop, copied word for word on 23 Nov 2026 (Ezekwesirim's is the last paragraph of a longer one). Rating 5.0 from 13 reviews.
- **Phone** 07393 538789, the same as Clevedon (confirmed by Jake 23 Nov 2026).
- **Name, address and phone** from the Google listing (23 Nov 2026), used in the text, call buttons, map pin, directions and the Google search data.
- **Top photo:** inside the Yatton shop, from Kam on 23 Nov 2026 (`assets/photos/inside.jpg`, original in `haircut-images/inside-yatton.JPG`).
- **Gallery:** the 23 Clevedon cuts were swapped for 8 Yatton photos Kam sent on 23 Nov 2026. The originals are in `haircut-images/`. The screenshot bars at the top and bottom were cropped off, and none of the files has location data.
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
4. Restrict the key. Under *Application restrictions* choose *Websites* and add the live domain (`https://kam-barber-yatton.vercel.app/* (or his own domain once he has one)`). Under *API restrictions* allow only those two APIs.
5. Put both values in `SETTINGS.googleApiKey` and `SETTINGS.googlePlaceId` in `script.js`.

Google's free monthly allowance is far more than one shop's site will use, but it asks for a billing card. Set a £1 budget alert for peace of mind. The map and directions buttons don't need a key.

## Avoiding the scams he's hit before

- The domain, Google Business Profile and any Google Cloud account should all be in **Kam's own name and email**, with two-factor login and auto-renew on.
- Hosting this site costs nothing. The domain is the only yearly cost, roughly £10 to £15.
- Any call offering to "verify" or "rank" his Google listing for a fee is a scam. Claiming it is free.
