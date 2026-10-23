# RADHEE ♡ BHAIYA — Premium Cinematic 3D Birthday Website

> *"Chahe duniya kitni bhi badal jaaye, mere liye aap hamesha mere favourite Bhaiya rahoge."*

An interactive, cinematic, 3D birthday world crafted with love by Radhee for her beloved Bhaiya. Featuring a 3D cozy room environment, an interactive birthday cake with extinguishable candles and wish-making, a floating memory scrapbook, an unfolding letter from the heart, reasons why he is special, and a magical secret birthday surprise reveal.

---

## 🌟 Key Features

1. **Cinematic 3D Room Environment**:
   - Built with **Three.js**, **React Three Fiber (R3F)**, and **Drei**.
   - Cozy room with wooden desk, glowing desk lamp with volumetric cone light, sunset cityscape skyline window, hanging fairy lights, and floating picture frames.
   - Smooth camera choreography that flies between scenes as you travel through the story.
   - Parallax responsiveness on mouse pointer and mobile touch.

2. **Interactive Birthday Cake & Candles**:
   - 2-tier chocolate cake with cream frosting, golden sprinkle pearls, and 5 lit candles.
   - **"Make a Wish"** interaction:
     - Dims the room lighting and zooms into the cake.
     - Extinguishes candle flames one by one with a realistic puff sound effect.
     - Releases golden celebration confetti.
     - Features both an accessible **manual button** and an **optional microphone blowing detection** mode.

3. **Our Little Universe — Memory Gallery**:
   - Scrapbook of 5 editable memory cards with dynamic 3D perspective tilt on hover/touch.
   - Includes high-resolution SVG illustrative placeholders matching the visual identity.
   - Click to open the **accessible lightbox viewer** with full photograph, captions, next/previous navigation, and Escape-key support.

4. **A Letter From Radhee**:
   - 3D/CSS folded envelope with a golden wax seal stamped with `♡`.
   - On click, the wax seal breaks, the flap opens, and warm cream stationery paper unfolds.
   - Emotional letter text fades in progressively line-by-line, with a "Show full letter" skip button.

5. **Why You're Special, Bhaiya**:
   - 5 interactive cards detailing heartfelt qualities:
     - *My Forever Protector*
     - *My Favourite Person to Tease*
     - *My Biggest Cheerleader*
     - *My Safe Place*
     - *My Very Own Bhaiya*
   - Interactive accordion cards with warm golden illumination and soft chimes.

6. **The Secret Birthday Surprise**:
   - Midnight-blue wrapped gift box with golden ribbon on a pedestal.
   - Clicking **"Open Your Surprise ✨"** lifts and rotates the lid, illuminates a golden beam of light from within, bursts confetti, and displays the final heartfelt birthday blessing.
   - Includes a **Replay** button to re-trigger the surprise anytime.

7. **Grand Birthday Finale**:
   - Full-screen celebration with celebratory confetti, cake glow, and options to cleanly restart the experience or jump back to memories.

8. **Pure Web Audio API Sound Engine**:
   - 100% self-contained synthesized audio without external file download dependencies.
   - Gentle, warm acoustic synthesizer soundtrack, candle puff breath noise, sparkling chimes, wax seal pop, and magic reveal chords.
   - Unobtrusive sound toggle in the header (starts muted by default per modern browser autoplay rules).

9. **Complete Responsiveness & WebGL Fallback**:
   - Fully tested across mobile phones (360px+), tablets, laptops, and large screens.
   - Automatic CSS 3D fallback for devices without WebGL support or with reduced motion enabled.

---

## 🎨 Visual Identity & Color Palette

- **Midnight Navy**: `#10172D`
- **Deep Blue**: `#171D35`
- **Dark Indigo**: `#252744`
- **Warm Gold**: `#F5C86A`
- **Amber Light**: `#EBA75E`
- **Soft Cream**: `#FAF0E1`
- **Rose Brown**: `#8F5146`
- **Lavender Glow**: `#C8A8FF`

---

## 📸 Replacing Photographs & Customizing Content

All personalized text, memories, letter paragraphs, and configuration live in a single central file:

```
src/config/birthday.ts
```

### Adding Real Photographs:
1. Place your photos in the `public/images/memories/` directory:
   - `public/images/memories/memory-1.jpg` (or `.png`, `.webp`)
   - `public/images/memories/memory-2.jpg`
   - `public/images/memories/memory-3.jpg`
   - `public/images/memories/memory-4.jpg`
   - `public/images/memories/memory-5.jpg`
2. In `src/config/birthday.ts`, update the `image` path for each memory:
   ```ts
   {
     id: "memory-1",
     title: "My Favourite Memory",
     caption: "That unforgettable trip we took together!",
     image: "/images/memories/memory-1.jpg",
     alt: "Photo of Bhaiya and Radhee",
     tag: "Favourite",
   }
   ```

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in your browser
http://localhost:3000 (or http://localhost:3001 if port 3000 is busy)
```

---

## ☁️ Deploying to Vercel

This project is built with standard **Next.js 14** and is 100% optimized for zero-config one-click deployment on **Vercel**:

### Option 1: Via Vercel CLI
```bash
npx vercel
```

### Option 2: Via GitHub & Vercel Dashboard
1. Create a GitHub repository and push this code:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Radhee Bhaiya 3D birthday website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/radhee-bhaiya-birthday.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) -> **Add New Project** -> Import your GitHub repository.
3. Click **Deploy**. Vercel will automatically build and assign a free HTTPS URL (e.g. `https://radhee-bhaiya-birthday.vercel.app`) to share with Bhaiya!

---

## 🔒 Privacy Notice
Any photos added to `public/` will be publicly accessible to anyone with the website link once deployed. If deploying publicly, ensure the recipient and family are comfortable with the URL being shared.

---

*Made with all my love, Radhee. ♡*
