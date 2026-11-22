# Clevedon Barber 1

**https://clevedonbarber1.com**

A static website for Clevedon Barber 1, 13 Old Church Road, Clevedon. Plain HTML, CSS and a little JavaScript: no build step and no framework, so it can be hosted for free (it's set up for Vercel).

## The three versions

| Folder | Look | Status |
| --- | --- | --- |
| `showcase/` | Photo-led on white, black and gold accents, serif headings | **The chosen version**, sent to Kam |
| `black-gold/` | Black with gold-leaf lettering and a gold line drawing of the pier | Alternative |
| `navy-red/` | Barber-pole navy, red and white, with the pier drawing | Alternative |

The top-level `index.html` shows all three side by side. It's only for choosing and doesn't need to go live.

All three have the same content: real contact details and hours, the 23 cut photos with a full-screen viewer, the Google rating, a map with directions, wheelchair access, a phone burger menu, and the "Website by" credit. `showcase/` also has its own logo, a reviews slider, scroll animations and a scroll cue on phones. All three were checked against WCAG 2.2 AA (contrast, text size, keyboard use, screen-reader labels, 320px screens).

## Still to do

### Needs Kam

- [ ] **Prices.** Every price on all three versions is a sample figure. Get the real list and update the price section in each `index.html`.
- [ ] **Opening hours.** Currently Mon to Sat 8:30am to 6:30pm, Sun 9:30am to 4pm, taken from Fresha. OurLocals says 9am to 6:30pm and Sun 10am to 4pm instead. Check against his Google Maps listing. To change them, edit the hours table (`data-open` / `data-close` in 24-hour time, plus the visible text) **and** the `openingHoursSpecification` near the top of `index.html`.
- [ ] **Small print to confirm.** On all three: "Card or cash" and "Over 65s, Tuesday to Friday". On the two alternatives only: "Prices include a wash on request" and "Saturdays fill up fast". Remove anything that isn't true.
- [ ] **Booking.** There's no online booking link, so every "Book" button tells people to call. The shop appears on Booksy; if he takes bookings there (or on Fresha, Setmore and so on), put the link in `SETTINGS.bookingUrl` in `script.js`.
- [ ] **Photo permission.** Many of the gallery photos are of children. Check he has the parents' OK to put them on the website.
- [ ] **Real reviews (showcase).** The reviews slider holds six cards labelled "Sample review". Either replace them with real reviews (see "Adding reviews" below) or switch on live Google reviews (see below), which removes them automatically.

### Needs you

- [ ] **Deploy.** In the Vercel project settings, set **Root Directory** to `showcase`, then add `clevedonbarber1.com` under *Domains* and follow Vercel's instructions for the DNS records at the registrar. Vercel sets up HTTPS on its own. (`showcase/` already has its own `vercel.json`.)
- [ ] **Check the domain is in Kam's name.** If you registered it in your account to get things moving, move it to his name and email (or make sure he can log in), and turn on auto-renew.
- [ ] **Test the link preview.** Once it's live, paste the link into a WhatsApp chat to yourself, or Facebook's Sharing Debugger (https://developers.facebook.com/tools/debug/), to check the preview image and text appear.
- [ ] **Tell Google.** Add the site to Google Search Console (free), and put the web address on his Google Business Profile.

### Optional

- [ ] **Live Google reviews (showcase).** Makes the rating, the latest reviews and the opening hours update themselves. Setup is below.
- [ ] **Instagram.** He doesn't seem to have one. If he sets one up, put the profile link in `SETTINGS.instagramUrl` and the Instagram links appear by themselves.
- [ ] **Printing the logo.** The logo files' lettering is live text. Convert it to outlines (Figma or Illustrator) before sending to a printer or signwriter.

## Already done

- **Address** 13 Old Church Road, Clevedon BS21 6LZ and **phone** 07393 538789, from the shop's public listings (Fresha and OurLocals, checked 22 Nov 2026). They're used in the text, call buttons, map pin, directions and the Google search data.
- **Google rating** of 4.9 from 164 reviews. Google's own map card shows the same figures.
- **Photos:** the interior shot plus 23 cuts in two sizes, with no location data in the files.
- **Wheelchair access**, shown on the page and in the Google search data.
- **Hosting files:** `vercel.json` (clean addresses with no `.html`, security headers, image caching; a copy is in `showcase/` for the Root Directory setting), `.vercelignore` (keeps `haircut-images/` and this README off the live site) and `.gitignore`.
- **Domain set up in the showcase:** the canonical address `https://clevedonbarber1.com/`, the full-address share image and page address for WhatsApp and Facebook previews, and the site address and logo in Google's data.
- **Share image:** `showcase/assets/og-image.jpg`, 1200×630, 156KB, regenerated with the current font and logo.
- **Live Google reviews key:** when setting up the API key, restrict it to `https://clevedonbarber1.com/*`.

## Where to change things

Each version keeps its everyday settings in `SETTINGS` at the top of its `script.js`:

| Setting | What it does |
| --- | --- |
| `bookingUrl` | Online booking page. Empty means "call to book". |
| `instagramUrl` | Instagram profile. Empty hides the links. |
| `mapQuery` | What the map and directions search for. |
| `rating`, `reviewCount` | The Google rating shown on the page. Update now and then from his Google listing. |
| `creditName`, `creditUrl` | The "Website by" credit in the footer. |
| `googleApiKey`, `googlePlaceId` | (showcase only) Live Google reviews, as set up below. |

Everything else (prices, hours, wording) is in that version's `index.html`, and colours, fonts and layout are in `styles.css`.

### Adding gallery photos

The originals Kam sent are in `haircut-images/` (not deployed). Each photo on the site comes in two sizes in `assets/photos/work/`: `cut-NN-small.jpg` for the grid and `cut-NN.jpg` for full screen. To add one, make both sizes with macOS's built-in tool, then copy one of the gallery `<li>` lines in `index.html`, point it at the new files and write a short description in `alt`:

    sips -s format jpeg -s formatOptions 74 -Z 800  photo.jpg --out cut-24-small.jpg
    sips -s format jpeg -s formatOptions 80 -Z 1600 photo.jpg --out cut-24.jpg

### Adding reviews (showcase)

Copy a card in the "What people say" list in `showcase/index.html`. There's a ready-made template in the comment just above the list. Change the words, name and stars. The slider grows to fit.

### Turning on live Google reviews (showcase)

1. Make sure Kam's **Google Business Profile** is claimed in his name (it's free).
2. Find its **Place ID** with Google's Place ID Finder: https://developers.google.com/maps/documentation/places/web-service/place-id
3. In **Google Cloud Console** (in Kam's account), create a project, turn on **Maps JavaScript API** and **Places API (New)**, and create an **API key**.
4. Restrict the key. Under *Application restrictions* choose *Websites* and add the live domain (`https://clevedonbarber1.com/*`). Under *API restrictions* allow only those two APIs.
5. Put both values in `SETTINGS.googleApiKey` and `SETTINGS.googlePlaceId` in `showcase/script.js`.

Google's free monthly allowance is far more than one shop's site will use, but it asks for a billing card. Set a £1 budget alert for peace of mind. The map and directions buttons don't need a key.

## Avoiding the scams he's hit before

- The domain, Google Business Profile and any Google Cloud account should all be in **Kam's own name and email**, with two-factor login and auto-renew on.
- Hosting this site costs nothing. The domain is the only yearly cost, roughly £10 to £15.
- Any call offering to "verify" or "rank" his Google listing for a fee is a scam. Claiming it is free.
