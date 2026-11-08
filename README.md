# Wedding Reception Invitation Website

A luxury, cinematic wedding reception invitation website crafted in vanilla HTML5, CSS3, and modern JavaScript. Features deep burgundy tones, champagne gold foil accents, elegant typography, subtle botanical filigree, countdown timer, Google Maps integration, calendar sync, and a mobile-friendly RSVP form with privacy protections.

Compatible with **GitHub Pages** out of the box with zero build steps or external dependencies.

---

## ⚜️ Features & Highlights

- **Luxury Burgundy & Champagne Gold Aesthetic:** Frosted glass cards, gold foil typography gradients, subtle floral borders, and responsive layouts.
- **Hero Invitation & Countdown:** Royal announcement framing, couple-name placeholders, animated wax seal / monogram crest, and a live countdown to the reception date.
- **Event Schedule (Itinerary):** Elegant timeline detailing reception milestones (Welcome Cocktails, Grand Entrance, Banquet Dinner, Cake Cutting, and Dancing).
- **Venue & Google Maps:** High-resolution venue showcase, responsive interactive map embed, "Open in Google Maps" link, and 1-click address copy.
- **Add to Calendar:** 1-click sync to Google Calendar and `.ics` file download (compatible with Apple Calendar, Outlook, and mobile devices).
- **Privacy-First RSVP Form:**
  - Full mobile responsiveness with tactile radio card selection.
  - Form validation with personalized client-side confirmation modal.
  - **Zero Public Data Exposure:** Operates in client-side preview mode by default. No guest responses are publicly stored or exposed.
- **Interactive Ambient Enhancements:**
  - Gentle golden dust particle canvas that automatically sleeps when the browser tab is inactive.
  - Ambient Harmony toggle powered by Web Audio API (soft harp chimes) with no external audio file required.

---

## 📁 Repository Structure

```text
reception-website/
├── index.html                  # Main invitation landing page
├── css/
│   └── style.css               # Burgundy & gold styling, responsive layout & animations
├── js/
│   └── main.js                 # Countdown, calendar links, RSVP validation & audio
├── assets/
│   └── images/
│       ├── monogram-crest.svg  # Gold royal monogram crest & laurel wreath
│       ├── floral-divider.svg  # Botanical vine & bloom gold divider
│       ├── corner-ornament.svg # Baroque floral filigree corners
│       └── wax-seal.svg        # Deep burgundy & gold wax seal emblem
└── README.md                   # Documentation & setup guide
```

---

## 🛠️ Customization Guide

### 1. Update Names, Date, and Venue
Open `index.html` and `js/main.js`:
- Search for `[Bride's Name]` and `[Groom's Name]` and replace them with the couple's names.
- Update the date placeholder `[Saturday, November 14, 2026]` and the countdown date in `index.html` (`data-event-date="YYYY-MM-DDTHH:MM:SS"`) and `js/main.js` (`EVENT_CONFIG.eventDate`).
- Update `[The Grand Ballroom at Heritage Manor]` and the street address.
- In `index.html`, update the Google Maps embed URL with your exact venue coordinates or place ID.

### 2. Connect RSVP to a Private Backend
By default, the RSVP form runs in safe demonstration mode (displaying a receipt modal with no public exposure). To collect real guest submissions into a private spreadsheet or inbox:

1. Open `js/main.js`.
2. Locate `BACKEND_CONFIG` at the top:
   ```javascript
   const BACKEND_CONFIG = {
     enabled: true,
     endpointUrl: "https://formspree.io/f/YOUR_FORM_ID", // Or Google Apps Script web app URL
   };
   ```
3. Recommended options:
   - **Formspree / Formkeep:** Instant email notifications whenever a guest responds.
   - **Google Apps Script Web App:** Appends responses directly to a private Google Sheet.
   - **Supabase / Firebase:** Stores responses in an authenticated private database.

---

## 🚀 How to Run Locally

Because the project uses standard web technologies, you can preview it immediately:

### Option A: Python Built-in Server
In PowerShell or Terminal from the repository folder:
```powershell
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option B: Direct Browser Opening
Double-click `index.html` to open it in Chrome, Safari, Edge, or Firefox.

---

## 🌐 Deploying to GitHub Pages

1. Push your repository to GitHub.
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and set folder to `/ (root)`.
4. Click **Save**. Within 1–2 minutes, your site will be live at `https://<username>.github.io/<repo-name>/`.