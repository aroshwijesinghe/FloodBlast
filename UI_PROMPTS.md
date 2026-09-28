# FloodBlast — Ultra-Detailed AI Image Generation Prompts (Grok 4.6)

> **Target Tool:** Grok 4.6 Image Generation  
> **Fidelity:** High-fidelity, pixel-perfect, production-ready mockups  
> **Modes:** Dark mode + Light mode variants for every screen  
> **Language:** English-only UI labels  

---

## 🔤 GLOBAL DESIGN SYSTEM — Prepend This to EVERY Prompt

```
GLOBAL DESIGN SYSTEM — Apply these rules to every element in the design:

━━━ TYPOGRAPHY SYSTEM ━━━
Font family hierarchy (use exactly these):
  — HEADINGS (H1–H3, screen titles, section headers): "Inter" font family, or "SF Pro Display" as fallback. Always use the SemiBold (600) or Bold (700) weight. Headings should feel sharp, geometric, and modern — never rounded or playful.
  — BODY TEXT (descriptions, paragraphs, labels, subtitles): "Inter" font family, Regular (400) or Medium (500) weight. Optimized for readability at small sizes on mobile screens.
  — MONOSPACE (ticket IDs like "INC-2026-00142", GPS coordinates, phone numbers, code-like data): "JetBrains Mono" or "SF Mono" font family, Regular (400) weight. This creates a clear visual distinction for technical/data content.
  — NUMBERS & STATS (large KPI numbers, counters, confidence scores): "Inter" font family, Bold (700) or ExtraBold (800) weight. Numbers should feel heavy, impactful, and instantly readable.
  — BUTTON TEXT: "Inter" SemiBold (600), always uppercase for primary CTAs, sentence case for secondary buttons.
  — BADGE/PILL TEXT: "Inter" Bold (700), ALL CAPS, letter-spacing 0.5px.

Typography scale (exact sizes — use these consistently):
  — Display Large: 36pt / line-height 44pt (KPI dashboard numbers, hero stats)
  — Display Medium: 28pt / line-height 36pt (screen titles on web dashboard)
  — Display Small: 24pt / line-height 32pt (mobile screen primary headings, emergency phone numbers)
  — Headline Large: 22pt / line-height 28pt (section headers like "What happened?")
  — Headline Medium: 20pt / line-height 26pt (card titles, section names)
  — Headline Small: 18pt / line-height 24pt (app bar titles, list item primary text)
  — Title Large: 16pt / line-height 22pt (card subtitles, bold labels)
  — Title Medium: 15pt / line-height 21pt (body emphasis, incident titles in lists)
  — Title Small: 14pt / line-height 20pt (form labels, dropdown labels)
  — Body Large: 14pt / line-height 20pt (primary body text, descriptions)
  — Body Medium: 13pt / line-height 18pt (secondary descriptions, helper text)
  — Body Small: 12pt / line-height 16pt (timestamps, metadata, character counters)
  — Label Large: 12pt / line-height 16pt, SemiBold (button labels, chip text)
  — Label Medium: 11pt / line-height 14pt, Medium (badge text, pill labels, ALL CAPS section dividers)
  — Label Small: 10pt / line-height 12pt, Medium (tiny annotations, map labels)
  — Caption: 9pt / line-height 12pt (micro-labels inside donut charts, chart axis labels)

Letter spacing:
  — All CAPS text: +0.5px to +1.0px letter-spacing for readability.
  — Body text: 0px (default).
  — Monospace: +0.3px for improved character distinction.

━━━ SPACING & GRID SYSTEM ━━━
Base unit: 4dp. All spacing values are multiples of 4dp.
  — Micro: 4dp (between icon and adjacent text, between badge dot and label)
  — Small: 8dp (between chips in a row, between inline elements, inner padding of small pills/badges)
  — Medium: 12dp (between stacked cards, between form fields, card internal section gaps)
  — Standard: 16dp (screen horizontal margin/padding, card internal horizontal padding, between major sections)
  — Large: 20dp (between screen sections, above/below section headers)
  — XL: 24dp (bottom sheet top padding, major section separation on dashboards)
  — XXL: 32dp (top margin below app bar content, hero section padding)

Screen edge padding: Always 16dp on mobile, 24dp on web dashboard content areas.
Card internal padding: 16dp horizontal, 12dp–16dp vertical.
Card gaps (between stacked cards): 12dp vertical.

━━━ CORNER RADIUS SYSTEM ━━━
  — Small pills/badges/chips: 100dp (fully rounded, capsule shape)
  — Buttons (primary CTAs): 12dp
  — Cards: 16dp
  — Bottom sheets: 24dp (top-left and top-right only)
  — Modal dialogs: 28dp
  — Input fields: 12dp
  — Avatar circles: 50% (perfectly circular)
  — Photo thumbnails: 8dp
  — Map containers: 12dp (when not full-bleed)
  — FAB (floating action button): 50% (circular)
  — Progress bars: 8dp (fully rounded pill shape)

━━━ SHADOW & ELEVATION SYSTEM ━━━
  — Level 0 (flat): No shadow. Used for inline elements, dividers.
  — Level 1 (subtle): 0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1). Used for cards at rest.
  — Level 2 (default cards): 0 2px 4px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.1). Used for elevated cards, bottom navigation.
  — Level 3 (floating): 0 4px 6px rgba(0,0,0,0.07), 0 10px 15px rgba(0,0,0,0.1). Used for FABs, floating bars, dropdowns.
  — Level 4 (modal): 0 10px 25px rgba(0,0,0,0.15), 0 20px 48px rgba(0,0,0,0.15). Used for modals, bottom sheets in expanded state.
  — Level 5 (SOS glow): 0 0 40px rgba(accent,0.4), 0 0 80px rgba(accent,0.2). Used for SOS button, critical pulsing elements.
  In dark mode: multiply all shadow opacities by 1.5× (shadows need to be stronger against dark backgrounds). Additionally, add a 1px top border in rgba(255,255,255,0.05) to cards for subtle edge definition.

━━━ ICON SYSTEM ━━━
  — Icon library style: Material Symbols Outlined (Google's latest icon set, rounded variant). NOT the old Material Icons — use the newer, thinner, more elegant "Symbols" versions.
  — Icon sizes: 
    • Navigation bar icons: 24dp, stroke weight 300 (regular), 600 (filled when selected/active).
    • In-card icons: 20dp, stroke weight 300.
    • Button icons (leading icon in buttons): 18dp, stroke weight 400.
    • Tiny inline icons (next to text): 16dp, stroke weight 300.
    • Large feature icons (category cards): 36dp, stroke weight 200 (thin, elegant).
    • Map marker icons (inside pins): 16dp, stroke weight 400, white color on colored background.
  — Emoji usage: Use native emoji rendering for category icons (🌊, ⛰️, 🚧, 🌉, 🏚️, 🆘, 🤰, 🏥, 👴, ♿, 👶, 👥, 🍱, 💧) at their specified sizes. Emojis should render in full color (Apple-style or Google Noto Color Emoji style).
  — Active vs Inactive: Active/selected navigation icons use FILLED variant in accent color. Inactive icons use OUTLINED variant in secondary text color.

━━━ ANIMATION & MOTION DESIGN (Show frozen-frame visual hints) ━━━
Since this is a static image, IMPLY animations through these visual techniques:

  PULSING EFFECTS (for live/urgent elements):
  — SOS button: Draw 3 concentric semi-transparent rings expanding outward from the button edge (at 40%, 20%, 10% opacity), with the outermost ring slightly faded/blurred to suggest radial expansion. The rings use the button's color (red for SOS, blue for location dot).
  — UNVERIFIED incident markers: Draw each red marker with 2 concentric rings — inner ring at 30% opacity (1.2× marker size), outer ring at 10% opacity (1.8× marker size). This implies a pulsing "sonar" animation.
  — Live connection indicator: The green dot next to "LIVE" text should have a subtle green glow (0 0 6px rgba(34,197,94,0.6)) implying it's pulsing.
  — CRITICAL severity dots: The small red dot (8dp) next to "CRITICAL" badges should have a tiny red glow ring around it.
  
  MOTION BLUR / TRANSITION HINTS:
  — Bottom sheet grabber: Show the bottom sheet at ~25% peek height with a very subtle upward arrow (▲) above the grabber bar, implying it can be dragged up.
  — Slide-in panels (web detail panel): Draw a 4px soft shadow on the LEFT edge of the slide-in panel, implying it animated in from the right.
  — Step wizard transitions: On the 5-screen composite (M3), show very faint motion arrows (→) between screens, or slightly overlap screen edges by 2px to imply swiping.
  
  LOADING & PROGRESS STATES:
  — Shimmer placeholder: Where images are loading, show a shimmer gradient effect — three diagonal bands of slightly lighter color (card surface at +5% brightness) sweeping across a gray rectangle, frozen mid-sweep. The bands should be at ~30° angle, each about 40px wide, with soft edges.
  — Skeleton screens: Any list that's loading shows skeleton cards — rectangles of the card surface color with rounded corners, containing 3 horizontal bars of slightly different widths (80%, 60%, 40% of card width) in shimmer effect.
  — Progress bar animation: On segmented progress bars, add a subtle highlight streak — a thin white line (2px wide, 30% opacity) at a 45° angle positioned at the leading edge of the filled segment, implying the bar recently moved/grew.
  — Circular progress (SOS hold timer): Draw the arc with a slightly thicker endpoint (the leading edge is 6px thick, tapering to 4px) and a tiny rounded cap, implying clockwise motion.
  
  GESTURE AFFORDANCES:
  — Draggable map pins: Show a subtle shadow (10dp blur, shifted 4dp down) beneath the pin, as if the pin is slightly lifted off the map surface, implying drag-ability.
  — Swipeable cards: On the first card in any list, show the card at 100% position. On mobile, very subtly show the second card peeking 8dp from behind the first card's bottom edge.
  — Pull-to-refresh: At the very top of scrollable lists, show a tiny downward-facing circular arrow (↻) icon at 20% opacity, hinting at pull-to-refresh capability.
  — Horizontal scroll indicators: For chip rows / filter bars, show the rightmost chip partially cropped (cut off at the screen edge by ~30%), proving the row scrolls horizontally. Add a 24px-wide gradient fade on the right edge (from transparent to background color).

  MICRO-INTERACTIONS (show visual states):
  — Button press states: On one button in each screen, show the ":hover" state — the button is 2% darker/lighter than its rest state, with the shadow increasing from Level 2 to Level 3. This implies interactivity.
  — Toggle switch states: Toggle switches should show the thumb (circle) positioned at one end with a 2px motion trail (a faint afterimage of the thumb in its previous position at 10% opacity), implying it was just toggled.
  — Checkbox interactions: Checked checkboxes show the accent color fill with a white checkmark. The checkmark should look slightly playful — drawn as a path that's slightly thicker at the bottom-left corner, as if it was "stamped" with a spring animation.
  — Card selection: Selected cards have a 2px border in accent color that appears to glow slightly (add 0 0 4px rgba(accent,0.3) to the border).
  — Navigation tab selection: The active tab has a filled icon + accent color + a small accent-colored dot/indicator bar (3px tall, 24px wide, rounded) positioned directly below the icon. The indicator implies it slid to this position.
  — Ripple effects: On one tapped button, show a circular ripple originating from the center — a faint circle (accent color at 8% opacity) expanding to cover 70% of the button's area, with the center being more opaque than the edges.

━━━ IMAGE & PHOTO TREATMENT ━━━
  — All photos shown in the UI (flood scenes, disaster areas, document thumbnails) should be PHOTOREALISTIC. Use realistic disaster photography style: muddy brown floodwater, overcast gray-blue sky, green tropical vegetation, concrete/brick structures, real-looking vehicles partially submerged, people in wading postures wearing everyday clothing. NOT stock-photo-perfect — should feel raw, documentary, captured by a phone camera in difficult conditions.
  — Photo thumbnails: Always have 8dp corner radius. When inside cards, maintain 4dp margin from card edges. Show a subtle inner shadow (inset 0 1px 3px rgba(0,0,0,0.2)) along the top edge to create depth.
  — Photo overlays: Image galleries show a media counter pill in the bottom-right corner (e.g., "1/3 📷") — the pill is a 28dp tall rounded capsule with dark semi-transparent background (rgba(0,0,0,0.7)) and white text in Label Medium size.
  — Avatar placeholders: Use circular containers (variable size) filled with a gradient from the card surface to a slightly lighter shade, containing a centered person-outline icon (Material Symbols "person" at 60% of the circle's diameter) in secondary text color. Do NOT use photo-realistic faces.
  — Map imagery: Maps should use a dark tile style — land is #1a1a2e to #2d2d44 depending on palette, water is #0a1628 to #1a2744, roads are thin lines at 20% white opacity, labels are sparse and in Label Small size at 40% white opacity. The map should look like Mapbox Dark or Google Maps Night mode. Show realistic geography — river bends, coastline contours, road intersections.
  — Document thumbnails (NIC cards, badges): Show as rectangles with heavy Gaussian blur (30px radius) applied — content is deliberately unreadable for privacy. A small magnifying glass icon overlays the center at 50% opacity, suggesting "click to enlarge."
  — Empty states: Empty photo slots use a dashed border (2px dashed, secondary color at 40% opacity, dash pattern: 8px dash, 4px gap) with a centered camera icon (Material Symbols "photo_camera", 32dp, secondary color at 50%) and "Add Photo" text in Label Medium below it.

━━━ PROGRESS BAR SPECIFICATIONS ━━━
  — Height: 12dp on mobile, 10dp on web dashboard, 16dp when it's the "visual hero" of a card.
  — Corner radius: Always fully rounded (height/2).
  — Background track: Use divider color at 100% opacity on dark mode, or #E5E7EB on light mode.
  — Fill gradient: Solid color fill (no gradient within a single segment), but add a 2px-wide highlight line at 60% white opacity along the top edge of the filled segment to create a subtle 3D/glass effect.
  — Segmented bars: When showing multiple segments (e.g., Pledged/InTransit/Remaining), each segment butts directly against the next with no gap. The first segment has rounded left corners, the last segment has rounded right corners, middle segments are flat-edged.
  — Labels on bars: When the segment is wide enough (>60px), overlay the label text (Label Small, white, centered within the segment). When too narrow, place the label below the bar with a thin line connecting it to the segment.
  — Animation hint: Place a diagonal highlight streak (a thin parallelogram of white at 15% opacity, 30° angle, 20px wide) at the leading edge of the most recently changed segment.

━━━ MAP MARKER SPECIFICATIONS ━━━
  — Unverified (red): 24dp solid circle, #EF4444 fill, NO icon inside (just solid red). Surrounded by 2 pulsing rings (as described in animation section). 
  — Verified (orange): 32dp teardrop/pin shape (pointed at bottom, rounded at top), #F97316 fill, white 16dp icon inside (category-specific: water_drop for flood, landscape for landslide, construction for road).
  — Road/Bridge issues (yellow): 28dp equilateral triangle (point-up), #EAB308 fill with #78350F dark border (1.5px), white "!" exclamation mark inside (16dp, Bold).
  — Safe places (green): 28dp rounded square (8dp corner radius), #22C55E fill, white "+" cross icon inside (16dp).
  — Clusters (blue): 36dp circle, #3B82F6 fill with 2px white border, white cluster count number inside (Title Large, Bold). Subtle blue glow (0 0 12px rgba(59,130,246,0.5)).
  — Closed/Dismissed (gray): Same shapes as their category but in #6B7280 fill at 60% opacity. No pulse rings. No glow.
  — User location: 14dp circle, #3B82F6 fill with 3px white border. Surrounded by a 40dp semi-transparent circle (#3B82F6 at 12% opacity) representing GPS accuracy radius. Subtle pulsing ring at 60dp (blue at 6% opacity).
  — All markers cast a tiny drop shadow: 0 2px 4px rgba(0,0,0,0.3).

━━━ TRANSITIONS BETWEEN SCREENS (for composite/multi-screen images) ━━━
  — When showing multiple screens side-by-side (like the 5-step wizard), add a very subtle connecting arrow between screens — a thin chevron "›" in secondary color at 30% opacity, centered vertically between adjacent screens.
  — The step indicator dots across the 5 screens should visually "progress" — creating a clear narrative arc from left (step 1, mostly empty progress) to right (step 5, all complete).
  — Screen backgrounds should be perfectly identical across all screens in a composite, reinforcing they belong to the same app flow.
```

---

## 🎨 5 COLOR PALETTES — Prepend ONE of these (AFTER the Global Design System block)

### Palette 1 — "Midnight Command"
```
COLOR SCHEME: Primary background #0A1628 (deep, inky midnight navy that feels almost black but has blue undertones). Card surfaces #111D35 (slightly lighter navy, creating subtle depth separation — difference visible but not jarring). Primary accent #FF6B2C (warm, urgent safety orange — all primary CTAs, active tabs, toggle ON state, progress fills). Secondary accent #3B82F6 (crisp electric blue — hyperlinks, info badges, map UI, secondary buttons). Semantic: success #22C55E, warning #F59E0B, danger #EF4444, critical/SOS #EC4899. Primary text #F1F5F9 (off-white, faint blue tint — never pure white). Secondary text #94A3B8 (muted blue-gray). Dividers #1E293B. Button text on accent: pure #FFFFFF. Icons: primary #F1F5F9, secondary #94A3B8. 
LIGHT MODE: Background #F8FAFC, cards #FFFFFF with shadow Level 1, navbar white with bottom border #E2E8F0. Accents unchanged. Primary text #0F172A, secondary #64748B. Dividers #E2E8F0.
```

### Palette 2 — "Volcanic Alert"
```
COLOR SCHEME: Primary background #18181B (zinc-900, true neutral dark gray, industrial). Card surfaces #27272A (zinc-800). Primary accent #DC2626 (red-600 — commanding red for SOS, critical CTAs). Secondary accent #F59E0B (amber-500 — warm golden amber for warnings, in-progress). Tertiary #8B5CF6 (violet-500 — info badges, links). Success #16A34A. Primary text #FAFAFA (zinc-50). Secondary text #A1A1AA (zinc-400). Dividers #3F3F46. Buttons on red: white text, on amber: #18181B dark text.
LIGHT MODE: Background #FAFAFA, cards #FFFFFF with 1px border #E4E4E7. Red darkens to #B91C1C. Amber stays. Primary text #18181B, secondary #71717A.
```

### Palette 3 — "Ocean Rescue"
```
COLOR SCHEME: Primary background #042F2E (teal-950, extremely deep teal, almost black with green-blue soul). Card surfaces #134E4A (teal-900, like deep ocean catching moonlight). Primary accent #14B8A6 (teal-500 — navigation highlights, active tabs, primary non-emergency buttons). Secondary accent #F97316 (orange-500 — SOS, alerts, high-severity, beautiful complementary contrast against teal). Warning #EAB308. Danger #E11D48. Success #10B981. Primary text #F0FDF4 (slightly green-tinted white). Secondary text #99F6E4 at 70% (translucent teal-mist). Dividers #1A4644. Buttons on teal/orange: white text.
LIGHT MODE: Background #F0FDFA (teal-50, whisper of mint), cards #FFFFFF with teal-tinted shadow. Accent #0D9488 (teal-600). Orange stays. Primary text #134E4A, secondary #5F6B6A.
```

### Palette 4 — "Storm Gray"
```
COLOR SCHEME: Primary background #111827 (gray-900, cool-toned with subtle blue undertones). Card surfaces #1F2937 (gray-800). Primary accent #7C3AED (violet-600 — rich electric purple for CTAs, navigation, selected states). Secondary accent #06B6D4 (cyan-500 — map elements, info highlights, links). Danger #EF4444. Warning #F59E0B. Success #22C55E. Primary text #F9FAFB. Secondary text #9CA3AF. Dividers #374151. Buttons on violet: white text.
LIGHT MODE: Background #F9FAFB, cards #FFFFFF with 1px border #E5E7EB and subtle shadow. Violet #6D28D9. Cyan stays. Primary text #111827, secondary #6B7280.
```

### Palette 5 — "Earth Guardian"
```
COLOR SCHEME: Primary background #14120E (warm near-black, brown undertones, rich soil in darkness). Card surfaces #1C1917 (stone-900, warm charcoal, organic not synthetic). Primary accent #CA8A04 (gold/yellow-600 — muted authoritative gold for CTAs, highlights, feels like government seal). Secondary accent #16A34A (green-600 — safe places, positive states). Tertiary #0EA5E9 (sky-500 — map elements, links, cool contrast to warm palette). Danger #DC2626. Warning #EA580C (warmer orange, matches earthy palette). Primary text #FAFAF9 (stone-50, warm off-white). Secondary text #A8A29E (stone-400). Dividers #292524. Buttons on gold: #14120E dark text, on green: white text.
LIGHT MODE: Background #FAFAF9, cards #FFFFFF with warm shadow (0 1px 4px rgba(120,100,80,0.08)). Gold #A16207. Green stays. Primary text #1C1917, secondary #78716C.
```

---

## 📱 MOBILE APP PROMPTS

---

### PROMPT M1 — Home Map Screen

```
[INSERT GLOBAL DESIGN SYSTEM HERE]
[INSERT PALETTE HERE]

Generate a single high-fidelity mobile app UI screenshot at 390×844 pixels (iPhone 14 / standard Android proportions). Do NOT wrap this in a phone frame or device mockup — show ONLY the flat UI screen itself as if it were a screenshot taken from the phone. The app is called "FloodBlast" and this is its main home screen — a real-time disaster map.

The screen is dominated by a large, photorealistic map that fills approximately 70% of the visible area. The map shows a realistic geographic region with winding rivers, coastline, roads, and terrain — imagine a zoomed-in view of a tropical coastal area. Use a dark-themed map tile style where land is #1a1a2e, water bodies are #0a1628 with a subtle blue sheen, roads are thin lines at 20% white opacity, and sparse place-name labels use the Label Small font size (10pt "Inter" Medium) at 40% white opacity. The map should feel real and cartographic — NOT a cartoon, wireframe, or illustration. Show realistic river bends, coastline contours, and road intersections.

Scattered across this map are exactly 12 custom incident markers following the Map Marker Specifications:
— 4 RED pulsing circles (24dp solid circles, #EF4444 fill, each with 2 concentric semi-transparent rings radiating outward at 30% and 10% opacity, creating a frozen sonar-pulse animation effect). Position these near river bends and low-lying areas.
— 3 ORANGE teardrop pins (32dp, #F97316 fill, white 16dp category icon inside — water_drop for floods, landscape for landslide). These represent VERIFIED incidents.
— 2 YELLOW warning triangles (28dp, #EAB308 fill with #78350F dark 1.5px border, white "!" inside). Position along road lines to represent road blockages.
— 2 GREEN rounded squares (28dp, 8dp corner radius, #22C55E fill, white "+" icon inside). Position in town areas away from rivers — safe places.
— 1 BLUE cluster circle (36dp, #3B82F6 fill with 2px white border, white number "5" in Title Large Inter Bold inside, with a blue glow 0 0 12px rgba(59,130,246,0.5)). Represents 5 overlapping incidents.
— User's current location dot: 14dp circle, #3B82F6 fill with 3px white border, surrounded by a 40dp semi-transparent accuracy circle (#3B82F6 at 12% opacity) and a faint outer pulsing ring at 60dp (6% opacity).
— All markers cast drop shadow: 0 2px 4px rgba(0,0,0,0.3).

FLOATING TOP BAR (overlaying the map):
Standard mobile status bar at very top (time "12:45" left in Label Small Inter Medium, WiFi/signal/battery right).
Below it, a floating navigation bar with glassmorphism effect — the bar has the card surface color at 85% opacity with a 16px backdrop-blur filter applied, creating a frosted-glass look where the map behind it is blurred but color-visible. The bar is 56dp tall, 16dp horizontal margin from screen edges, 16dp corner radius, shadow Level 3. Inside the bar:
— Far left: Hamburger menu icon (Material Symbols "menu", 24dp, stroke weight 300, primary text color).
— Center: "FloodBlast" in Headline Small (18pt "Inter" Bold, primary text color). Immediately right of the name, with 4dp spacing, a tiny rounded pill badge (fully rounded, 20dp tall, 8dp horizontal padding) with a small green dot (6dp, #22C55E, with glow 0 0 6px rgba(34,197,94,0.4)) + "± 12m" in Label Small (10pt "Inter" Medium, #22C55E text).
— Far right: Bell notification icon (Material Symbols "notifications", 24dp, outlined, primary text color) with a red circle badge (16dp diameter, #EF4444 fill) overlapping its top-right corner, containing "3" in 9pt "Inter" Bold white text.
Below this bar, floating with 8dp gap: a connection quality pill (28dp tall, fully rounded, 12dp horizontal padding, card surface at 90% opacity) showing "4G" in Label Medium (11pt "Inter" SemiBold, #22C55E) with 3 small signal strength bars icon in green.

CATEGORY FILTER CHIPS (horizontal scrolling row):
Floating above the bottom sheet, with 12dp gap from the sheet. A horizontal row of pill-shaped chips, each 36dp tall, 16dp horizontal padding, fully rounded corners (100dp radius).
— "All": SELECTED — filled with primary accent color, "All" in Label Large (12pt "Inter" SemiBold, white #FFFFFF).
— "🌊 Floods", "⛰️ Landslides", "🚧 Roads", "🌉 Bridges", "🏥 Safe Places": UNSELECTED — card surface background, 1px border in divider color, text in Body Small (12pt "Inter" Regular, secondary text color), emoji at 14pt.
— 8dp gaps between chips. The rightmost chip ("🏥 Safe Places") is partially cropped at the screen edge (cut off by ~30%), with a 24px-wide gradient fade from transparent to background color on the right edge — proving horizontal scrollability.

PERSISTENT BOTTOM SHEET (peek state, ~25% screen height):
Slides up from the bottom. Top corners 24dp radius. Card surface background. Shadow Level 4. 
— Grabber handle: centered, 36px wide, 4px tall, fully rounded, secondary text color at 40% opacity. A tiny upward chevron (▲) in 8pt secondary text at 15% opacity sits 4dp above the grabber, implying drag-up affordance.
— Header row (16dp below grabber): "Active Incidents" in Headline Small (18pt "Inter" SemiBold, primary text) on the left. Right side: rounded badge pill (fully rounded, accent background at 15% opacity, accent-colored border 1px) containing "24 active" in Label Medium (11pt "Inter" SemiBold, secondary accent color).

Two preview incident cards stacked with 12dp vertical gap, 16dp horizontal margin:

CARD 1: Card surface background, 16dp corner radius, shadow Level 1, with a 4px-wide left border in #EF4444 (danger red). Inside (16dp padding):
— Row 1: A small red circle (8dp, #EF4444, with tiny glow 0 0 4px rgba(239,68,68,0.4)) + 4dp gap + "CRITICAL" in Label Medium (11pt "Inter" Bold, ALL CAPS, #EF4444 text, letter-spacing 0.5px) inside a pill with #EF4444 at 12% background fill + fully rounded corners.
— Row 2 (4dp below): "River Overflow — Kalu Ganga" in Title Medium (15pt "Inter" SemiBold, primary text).
— Row 3 (4dp below): "Ratnapura District • 2 hours ago" in Body Small (12pt "Inter" Regular, secondary text). The bullet "•" is a middle-dot character.
— Row 4 (8dp below): Stats row with tiny inline icons (16dp, secondary color): "👥 45 affected" · "✓ 12 confirmations" · "📷 3" — all in Body Small, secondary text, with 12dp spacing between groups.
— Row 5 (8dp below): Confidence bar — full card width, 12dp tall, 6dp corner radius (fully rounded pill). Background track in divider color. Filled 78% from left in primary accent color, with a 2px highlight line at 60% white opacity along the top edge of the fill for glass effect. A diagonal highlight streak (white at 15% opacity, 30° angle, 20px wide parallelogram) at the leading edge of the fill. "78%" in Caption (9pt "Inter" SemiBold) positioned at the leading edge of the fill, inside the filled area.

CARD 2: Same structure but with 4px amber/yellow (#F59E0B) left border. Yellow dot + "MEDIUM" amber badge. Title: "Road Blocked — Fallen Tree". Subtitle: "Matara District • 35 min ago". Stats: "👥 0 affected" · "✓ 3 confirmations". Confidence bar 42% filled in amber.

FLOATING ACTION BUTTONS (right side, above bottom sheet):
Two FABs stacked vertically with 16dp gap, positioned 16dp from right screen edge:
— Bottom FAB (SOS): 64dp diameter, perfectly circular, #EF4444 fill. "SOS" text in 16pt "Inter" ExtraBold (800 weight), white, centered. Shadow Level 5: 0 0 40px rgba(239,68,68,0.4), 0 0 80px rgba(239,68,68,0.2) — creating a dramatic red glow that radiates energy. Two faint pulsing rings around it at 72dp and 84dp diameter, #EF4444 at 15% and 8% opacity.
— Top FAB (Report): 56dp diameter, circular, primary accent color fill. White "+" icon (Material Symbols "add", 24dp, stroke weight 600). Shadow Level 3.

BOTTOM NAVIGATION BAR (fixed, 64dp tall):
Solid card surface background with 1px top border in divider color. Shadow Level 2 (upward shadow). 5 equally-spaced tab items, each 48dp wide touch target:
— Tab 1: Map pin icon (Material Symbols "map", 24dp, FILLED variant, stroke weight 600, primary accent color) + "Map" label (Label Small, 10pt "Inter" Medium, accent color) + accent-colored indicator bar (3dp tall, 24dp wide, fully rounded) directly below the icon — implying it slid to this position. THIS TAB IS SELECTED.
— Tab 2: Clipboard icon (Material Symbols "list_alt", 24dp, OUTLINED, stroke 300, secondary text) + "Incidents" in secondary text.
— Tab 3: Plus-circle icon (Material Symbols "add_circle", 24dp, OUTLINED, secondary) + "Report" label + a tiny accent-colored dot (6dp) above the icon.
— Tab 4: Siren icon (Material Symbols "emergency", 24dp, OUTLINED, secondary) + "Emergency".
— Tab 5: Person icon (Material Symbols "person", 24dp, OUTLINED, secondary) + "Profile".

OVERALL IMPRESSION: This should look like a Dribbble or Behance showcase — polished, production-ready, beautiful, with perfect spacing and visual hierarchy. Material 3 design language. Every element follows the 4dp spacing grid. Touch targets are minimum 48dp. The map markers pop against the dark map. The glassmorphism top bar feels premium. The bottom sheet creates a natural layered depth.

Generate the DARK MODE version using the palette colors above.
```

---

### PROMPT M2 — SOS Emergency Button Screen

```
[INSERT GLOBAL DESIGN SYSTEM HERE]
[INSERT PALETTE HERE]

Generate a single high-fidelity mobile app UI screenshot at 390×844 pixels. No phone frame — flat UI only. This is the SOS EMERGENCY SCREEN for "FloodBlast." This screen appears as a full-screen overlay when a panicking user taps the SOS button. Every design decision must prioritize MAXIMUM CLARITY for someone in extreme distress — oversized touch targets (minimum 64dp on this screen), minimal text, extreme contrast, zero clutter.

BACKGROUND OVERRIDE (ignore palette background for this screen): 
The entire background is a deep, ominous vertical gradient from #7F1D1D (dark crimson-red) at the top to #450A0A (almost-black blood red) at the bottom. Over this gradient, render 4 very subtle concentric circular rings radiating outward from the exact center of the screen in #991B1B at decreasing opacities: innermost ring at 12%, then 8%, 5%, 3%. The rings are at approximately 240dp, 320dp, 400dp, and 500dp diameter. This creates a faint radar/sonar pulse frozen in time. The overall feeling should be VISCERAL and ALARMING — like a submarine red-alert screen.

TOP-LEFT: White "✕" close icon (Material Symbols "close", 28dp, stroke weight 400) inside a 48×48dp circular touch target with white at 15% opacity background fill. Positioned 16dp from left edge, 8dp below status bar.

GPS STATUS (centered, 60dp below close button):
Row 1: Green dot (8dp, #22C55E, with glow 0 0 8px rgba(34,197,94,0.5) implying pulse) + 4dp gap + "GPS LOCKED" in Label Large (12pt "Inter" Bold, ALL CAPS, #22C55E, letter-spacing 1px) + " — ± 8m accuracy" in Body Large (14pt "Inter" Regular, white #FFFFFF).
Row 2 (8dp below): GPS coordinates in "JetBrains Mono" Regular, 14pt, white: "6.9271° N, 79.8612° E"
Row 3 (4dp below): "Colombo District, Western Province" in Body Medium (13pt "Inter" Regular, white at 70% opacity).
Row 4 (4dp below): "28 Sep 2026, 12:45 PM" in Body Small (12pt "Inter" Regular, white at 50% opacity).

THE SOS BUTTON (absolute visual hero, exact center of screen):
A MASSIVE 200dp diameter perfectly circular button. Fill: solid #EF4444 red. Inside, perfectly centered: "SOS" in 54pt "Inter" ExtraBold (800 weight), white #FFFFFF, letter-spacing 2px. 
Shadow: Level 5 glow — 0 0 40px rgba(239,68,68,0.6), 0 0 80px rgba(239,68,68,0.3), 0 0 120px rgba(239,68,68,0.15) — creating a DRAMATIC triple-layered red radiance that makes the button feel like it's emitting energy.
PULSE RINGS: 3 concentric circular rings around the button at 220dp, 260dp, 300dp diameter. Ring stroke: 2px. Opacities: innermost 40% white, middle 20% white, outermost 10% white. These rings create a frozen pulsing animation.
HOLD PROGRESS ARC: A 4px-thick white arc overlaid on the button's outer circumference (at 204dp diameter, just outside the button edge). The arc starts at 12 o'clock (top) and sweeps clockwise to approximately 8 o'clock position (~240° of 360° = 67% complete). The leading edge of the arc is slightly thicker (6px) with a rounded cap, tapering to 4px — implying clockwise motion. The remaining arc path (from 8 o'clock back to 12 o'clock) is shown as a 1px white line at 10% opacity, completing the circle guide.

INSTRUCTION TEXT (24dp below outermost pulse ring):
"TAP AND HOLD FOR 3 SECONDS" in Title Small (14pt "Inter" SemiBold, white, letter-spacing 1.5px, ALL CAPS). Subtle text-shadow: 0 2px 8px rgba(0,0,0,0.5).

QUICK SITUATION SELECTOR (32dp below instruction):
Three rectangular buttons in a horizontal row with 12dp gaps. Each is 110×80dp, 12dp corner radius, semi-transparent white border (white at 25% opacity), transparent background fill.
— Left: 🌊 emoji (28pt, centered) + below it "TRAPPED BY FLOOD" in Label Medium (11pt "Inter" Bold, white, ALL CAPS, letter-spacing 0.5px), vertically centered in the remaining space.
— Center: ⛰️ emoji + "LANDSLIDE" — THIS IS SELECTED: border changes to solid primary accent color (orange) at 100% opacity (2px), background fills with accent at 10% opacity, creating a faint warm glow inside. A thin accent-colored inner shadow (inset 0 0 12px rgba(accent,0.15)).
— Right: 🏚️ emoji + "BUILDING COLLAPSE" — unselected, same as left.

EXPLANATORY TEXT (16dp below selectors):
"This will send your exact GPS location and emergency signal to nearby responders and the Emergency Operations Center." in Body Medium (13pt "Inter" Regular, white at 70% opacity, centered, max-width 320dp, line-height 18pt).

BOTTOM CALL BUTTONS (fixed to bottom, 16dp margin from bottom edge, 16dp horizontal margin):
— Top button: White (#FFFFFF) background, full width (358dp), 56dp tall, 12dp corner radius. Inside: red phone icon (Material Symbols "call", 20dp, #DC2626) + 8dp gap + "Call 117 — Disaster Management" in Title Large (16pt "Inter" SemiBold, #DC2626). Shadow Level 2. One button shows a subtle ripple effect — a faint circle (#DC2626 at 6% opacity) expanding from center, covering 60% of button area, implying tappability.
— Bottom button (12dp below): Transparent background, 2px white border, same dimensions. White phone icon + "Call 1990 — Ambulance" in Title Large (16pt "Inter" SemiBold, white).

OVERALL: This screen screams EMERGENCY. A person with shaking hands should find the SOS button in 0.5 seconds. Nothing is small. Nothing is ambiguous. The red glow, the massive button, the oversized elements — it's a spacecraft red alert screen. Every touch target is 64dp minimum.

Generate the DARK MODE version (the red gradient IS the dark mode).
For LIGHT MODE: background gradient becomes white (#FFFFFF) → very light pink (#FFF1F2). SOS button stays red with glow. All text becomes #1C1917 dark. Situation selector borders become #FECDD3 light red. Call buttons invert appropriately.
```

---

### PROMPT M3 — Incident Reporting Wizard (5 Steps)

```
[INSERT GLOBAL DESIGN SYSTEM HERE]
[INSERT PALETTE HERE]

Generate a single HIGH-FIDELITY composite image showing 5 mobile app screens arranged side by side horizontally (each screen 390×844px, total image ~2050×900px with 10px gaps between screens). No phone frames. These 5 screens are a sequential multi-step incident reporting wizard for "FloodBlast." Between each screen, place a subtle connecting chevron "›" (in secondary text at 25% opacity, 20pt, vertically centered) to imply navigation flow.

SHARED FRAMEWORK (identical on all 5 screens):
— Top bar (56dp): Back arrow icon (Material Symbols "arrow_back", 24dp, outlined, primary text) on left. "Report Incident" in Headline Small (18pt "Inter" SemiBold, primary text) center-left. "Step X of 5" in Body Small (12pt "Inter" Regular, secondary text) on right.
— Step indicator (16dp below top bar, centered): 5 circles in a horizontal row connected by thin lines (2px). 
  • Completed steps: 14dp circle, accent fill, white checkmark icon (Material Symbols "check", 10dp, stroke 600) inside. Connecting line to next step is accent-colored.
  • Current step: 16dp circle (slightly larger), accent fill, white dot (6dp) inside. Subtle accent glow (0 0 8px rgba(accent,0.3)).
  • Future steps: 12dp circle, transparent fill, 2px border in secondary text at 40%. Connecting line is secondary text at 20%.
  The line segments between circles are 32dp long, 2px thick.
— Bottom area (80dp from bottom): "← Back" in Body Large (14pt "Inter" Medium, secondary text color, left-aligned, hidden on step 1). "Next →" button on right — wide (220dp if Back is showing, full width 358dp if not), 48dp tall, 12dp radius, accent fill, "Next →" in Label Large (12pt "Inter" SemiBold, white, uppercase). On step 5, this becomes "Submit Report ✓" — 52dp tall (4dp taller for emphasis), same styling.

═══ SCREEN 1: CATEGORY SELECTION ═══
Step indicator: circle 1 = current (16dp, accent, white dot), circles 2-5 = future.
Heading: "What happened?" in Headline Large (22pt "Inter" Bold, primary text, left-aligned, 16dp margin).
Subheading (4dp below): "Select the type of incident" in Body Medium (13pt "Inter" Regular, secondary text).

2-column grid (16dp horizontal margin, 12dp gap between cards) of 6 category cards, each ~170×120dp, card surface background, 16dp corner radius, shadow Level 1:
Inside each card (centered content):
— Top: Large emoji (36pt, native color rendering, centered) with 8dp padding above.
— Middle: Category name in Title Small (14pt "Inter" SemiBold, primary text, centered).
— Bottom: Subtitle in Body Small (12pt "Inter" Regular, secondary text, centered, max 2 lines).
Cards in order:
  1. 🌊 "Flood" / "River, urban, tank overflow" — SELECTED: 2px solid accent border, accent at 8% opacity background fill, checkmark circle (20dp, accent fill, white check icon 12dp) in top-right corner with 8dp offset. Card has selection glow: 0 0 4px rgba(accent,0.3).
  2. ⛰️ "Landslide" / "Slope failure, mudslide, rockfall" — unselected.
  3. 🚧 "Road Problem" / "Broken, flooded, tree fall"
  4. 🌉 "Bridge Problem" / "Damaged or collapsed"
  5. 🏚️ "Building Collapse" / "Structure failure"
  6. 🆘 "Other Emergency" / "Accident, stranded"

Sub-type chips (appear 12dp below grid because "Flood" selected): 3 horizontal pills, each fully rounded, 36dp tall, 16dp h-padding:
— "River Overflow": SELECTED — accent fill, white Label Large text.
— "Tank/Reservoir Overflow": UNSELECTED — card surface, 1px divider-color border, secondary text.
— "Urban Flooding": UNSELECTED — same.
8dp gaps between chips.

Bottom: "Next →" button is ACTIVE (full accent opacity) because category selected.

═══ SCREEN 2: LOCATION & DESCRIPTION ═══
Step indicator: circle 1 = completed (accent + check), circle 2 = current, 3-5 = future.

MINI MAP (top 38% of content area, 16dp margin, 12dp corner radius): Dark-themed map zoomed to a location, showing a GPS pin marker (orange teardrop, 32dp) at center. The pin has a subtle drop shadow shifted 4dp downward and a motion shadow below it (10dp blur, indicating drag-ability). Below the map, a card-style row (full width, card surface, 12dp radius, 12dp padding):
— "📍 Auto-detected: Ratnapura District" in Title Small (14pt "Inter" Medium, primary text) + edit/pencil icon (Material Symbols "edit", 16dp, secondary text, 8dp gap from text).
— Next line: "± 15m accuracy" inside a pill (fully rounded, 24dp tall, amber #F59E0B at 15% background, amber text in Label Medium 11pt "Inter" SemiBold).

SEVERITY SELECTOR (16dp below map section):
Label: "Severity" in Label Large (12pt "Inter" SemiBold, secondary text, ALL CAPS, letter-spacing 0.5px).
4 horizontal pills (12dp gap between), each 80×40dp, 8dp corner radius:
— "LOW": #22C55E outlined (2px border, green text, transparent fill) — not selected.
— "MEDIUM": #F59E0B FILLED (amber fill, #18181B dark text, shadow Level 2, scale 1.05× — slightly larger to show selection). THIS IS SELECTED.
— "HIGH": #F97316 outlined — not selected.
— "CRITICAL": #EF4444 outlined, with tiny red pulsing dot (6dp) at top-right corner — not selected.

TEXT INPUT (16dp below severity):
Large multiline field, full width, 120dp tall, 12dp corner radius, 1.5px border in divider color (changes to accent when focused). 16dp internal padding.
Placeholder text in secondary text at 40%: "Describe the situation..."
Typed text in Body Large (14pt "Inter" Regular, primary text, line-height 20pt): "Water level rising rapidly near main road. Several houses affected. Approx 2 feet of water on the road and entering nearby homes."
Bottom-right of field: "127/500" in Caption (9pt "Inter" Regular, secondary text).
The field border has a subtle accent-colored bottom border (2px, accent at 50%) implying it's focused.

VOICE NOTE BUTTON (12dp below text field):
Full width, 48dp tall, 12dp radius, transparent background, 1.5px dashed border (secondary text at 40% opacity, dash: 8px, gap: 4px). Inside: microphone icon (Material Symbols "mic", 20dp, secondary text) + 8dp gap + "Record voice note (max 2 min)" in Body Medium (13pt "Inter" Regular, secondary text). This button has a ":hover/ready" state — no animation, just static.

═══ SCREEN 3: PHOTO CAPTURE ═══
Steps 1-2 completed, step 3 current.
Heading: "Add Photos" in Headline Medium (20pt "Inter" Bold, primary text) + 8dp gap + "(Optional)" in Headline Medium (20pt "Inter" Regular, secondary text).
Subheading: "Photos help verify the incident faster" in Body Medium (13pt "Inter" Regular, secondary text).

2×2 photo grid (16dp margin, 12dp gap), each slot ~170×130dp, 8dp corner radius:
— Slot 1 (top-left): FILLED — photorealistic thumbnail of a flooded road: brown muddy water covering a road, partially submerged white van, green tropical trees on both sides, gray overcast sky. The photo has a subtle inner shadow (inset 0 1px 3px rgba(0,0,0,0.2)) along top edge. Top-right corner: circular delete button (24dp, rgba(0,0,0,0.7) fill, white "✕" icon 12dp, Material Symbols "close" stroke 500).
— Slot 2 (top-right): EMPTY — dashed border (2px dashed, secondary color at 40%, dash 8px gap 4px), camera icon (Material Symbols "photo_camera", 32dp, secondary text at 50%) centered, "Add Photo" in Label Medium (11pt "Inter" Medium, secondary text at 60%) below icon. Background is card surface at 50% opacity.
— Slots 3-4: EMPTY — same dashed border style, but only a faint "+" icon (Material Symbols "add", 24dp, secondary text at 30%) centered. No text.

Info line (12dp below grid): "📦" emoji (14pt) + "Images auto-compressed to ~200KB for fast upload" in Body Small (12pt "Inter" Regular, secondary text). Package emoji + 4dp gap.

Bandwidth notice card (12dp below, full width, card surface, 12dp radius, 4px left border in secondary accent):
Inside (12dp padding): ⚡ emoji (16pt) + "On 2G/slow connection? Skip photos — your text report is already queued for immediate upload." in Body Medium (13pt "Inter" Regular, primary text, line-height 18pt). The card has a faint info-tinted background (secondary accent at 5% opacity).

Bottom button: "Next →" active. A secondary text below button: "or Skip →" in Body Small (12pt "Inter" Medium, secondary text, underlined).

═══ SCREEN 4: VICTIM INFORMATION ═══
Steps 1-3 completed, step 4 current.
Heading: "Affected People" in Headline Medium (20pt "Inter" Bold, primary text).
Subheading: "Help responders prepare the right resources" in Body Medium (13pt, secondary text).

6 demographic counter rows, each full width, 60dp tall, separated by 1px dividers in divider color:
Left side: emoji (24pt) + 12dp gap + label text in Title Small (14pt "Inter" Medium, primary text).
Right side: stepper control — "−" button (36dp circular, 1.5px border in divider color, "−" in 18pt "Inter" Medium, secondary text, transparent fill) + 16dp gap + number in Headline Small (18pt "Inter" Bold, primary text) + 16dp gap + "+" button (36dp circular, accent fill, "+" in 18pt "Inter" Bold, white).

The 6 rows:
  1. 🤰 "Pregnant Women" → [−] 2 [+]
  2. 🏥 "Medical / Wounded" → [−] 5 [+]
  3. 👴 "Elderly (65+)" → [−] 3 [+]
  4. ♿ "Disabled" → [−] 1 [+]
  5. 👶 "Children (< 12)" → [−] 4 [+]
  6. 👥 "Total Persons" → [−] 45 [+] — THIS ROW IS EMPHASIZED: text is Title Large (16pt "Inter" Bold), the row has a 4px accent-colored left border, and a faint accent background (accent at 5% opacity). The number "45" is in Headline Medium (20pt "Inter" ExtraBold).

Status dropdown (16dp below rows): Label "Current Status" in Label Large (12pt "Inter" SemiBold, secondary text, ALL CAPS). Below: a dropdown field (full width, 48dp tall, 12dp radius, card surface, 1.5px border) showing "STRANDED" inside a red pill badge (#EF4444 at 15% bg, #EF4444 text, Label Medium, ALL CAPS) + dropdown chevron icon (Material Symbols "expand_more", 20dp, secondary text) on right. Below dropdown, helper text: "Evacuated, At Safe Place, Missing" in Caption (9pt "Inter" Regular, secondary text at 60%).

Medical notes (12dp below): Text field, 72dp tall, 12dp radius, 1.5px border. Label: "Medical notes (optional)" in Label Large (12pt) above field. Inside: typed text "2 elderly persons require insulin. 1 child has severe asthma." in Body Large (14pt "Inter" Regular, primary text).

═══ SCREEN 5: REVIEW & SUBMIT ═══
ALL 5 step circles: completed (accent fill, white checkmarks). All connecting lines accent-colored.
Heading: "Review Your Report" in Headline Medium (20pt "Inter" Bold, primary text).

Summary card (full width, card surface, 16dp radius, shadow Level 2). Inside, sections separated by 1px divider lines:

Section "Category" (16dp padding): "🌊 Flood — River Overflow" in Title Medium (15pt "Inter" SemiBold, primary text) + 8dp gap + "MEDIUM" amber pill badge (Label Medium, ALL CAPS, #F59E0B text on #F59E0B at 15% bg).

Section "Location" (16dp padding): Mini map thumbnail (full card width minus 32dp, 80dp tall, 8dp radius, showing pinned location on dark map). Below (4dp): "Ratnapura District, Sabaragamuwa Province" in Body Large (14pt "Inter" Regular, primary text). Below (2dp): "6.5325° N, 80.2340° E" in Body Small (12pt "JetBrains Mono" Regular, secondary text).

Section "Description" (16dp padding): Truncated text "Water level rising rapidly near main road. Several houses affected..." in Body Large (14pt, primary text, 2 lines, overflow ellipsis). "Read more" link in Body Small (12pt "Inter" Medium, secondary accent, underlined).

Section "Media" (16dp padding): "1 photo attached" in Body Medium (13pt, primary text) + flood photo thumbnail (48×48dp, 8dp radius, inner shadow top edge).

Section "Affected People" (16dp padding): "45 people — 2 pregnant, 5 wounded, 3 elderly, 1 disabled, 4 children" in Body Large (14pt, primary text). "STRANDED" red pill badge. Below (4dp): "Notes: 2 elderly need insulin, 1 child has asthma." in Body Small (12pt "Inter" Italic, secondary text).

Privacy toggle (16dp below card): Row with "Share my phone number with responders" in Body Large (14pt "Inter" Regular, primary text) left, toggle switch right (52×32dp, OFF state — track in secondary text at 30%, thumb circle 28dp in secondary text at 60%). Thumb has a faint afterimage (10% opacity ghost) at the ON position, implying it was just toggled OFF. Below toggle: "Your identity remains anonymous by default." in Caption (9pt "Inter" Regular, secondary text).

Offline notice (12dp below): Card with info-tint background (secondary accent at 8%), 12dp radius, 12dp padding: "📡 You're offline — Report will be saved locally and auto-synced when connected." in Body Medium (13pt, primary text).

Bottom: "Submit Report ✓" button — 52dp tall (taller than previous "Next" buttons), full width, accent fill, white text, 12dp radius. The checkmark "✓" is a Material Symbols "check" icon 18dp inline. Below button: "GPS + text sent immediately (~2KB). Photos upload in background." in Caption (9pt "Inter" Regular, secondary text, centered).

The 5 screens side-by-side form a coherent visual story — step progression is clearly visible across the composite.

Generate the DARK MODE version.
```

---

### PROMPT M4 — Incident Detail / Ticket View

```
[INSERT GLOBAL DESIGN SYSTEM HERE]
[INSERT PALETTE HERE]

Generate a single high-fidelity mobile app UI screenshot at 390×844 pixels. No phone frame. This is the INCIDENT DETAIL SCREEN for "FloodBlast" — a comprehensive, scrollable view of a single disaster incident / master ticket. Show at natural top scroll position with a thin scroll indicator track (4dp wide, secondary text at 15% opacity) on the right edge, with the thumb indicator covering ~40% of track height, implying more content below.

TOP APP BAR (56dp, card surface background, shadow Level 1):
— Back arrow (Material Symbols "arrow_back", 24dp, outlined, primary text) left.
— "INC-2026-00142" in Title Large (16pt "JetBrains Mono" Regular, primary text) center-left.
— Share icon (Material Symbols "share", 24dp, outlined, secondary text) + three-dot overflow (Material Symbols "more_vert", 24dp, secondary text) right.

STATUS BANNER (full width, 36dp, directly below app bar): Semi-transparent orange (#F97316 at 20%) background. "VERIFIED" in Label Medium (11pt "Inter" Bold, ALL CAPS, letter-spacing 1px, #F97316) centered, with a white checkmark icon (16dp) to its left.

HERO IMAGE (full width including 0 margin — edge-to-edge, 16:9 aspect ratio ~220dp tall):
A PHOTOREALISTIC disaster photograph: muddy brown floodwater covering a residential road, 2-3 partially submerged cars (realistic sedan shapes, dark colored), 2 people in the mid-distance wading through knee-deep muddy water wearing everyday clothing (t-shirts, sarongs), green tropical palm trees and breadfruit trees in background, two-story concrete houses with water reaching doorstep level, overcast gray-blue sky with heavy monsoon clouds. The image should look like it was taken with a smartphone camera in difficult conditions — slightly imperfect exposure, natural lighting, NOT stock-photo-polished.
Bottom-right overlay: media counter pill (28dp tall, fully rounded, rgba(0,0,0,0.7) fill, 12dp h-padding) — "1/3 📷" in Label Medium (11pt "Inter" SemiBold, white). Tiny left/right chevron arrows (8dp, white at 50%) flanking the text.
Subtle inner shadow at top edge of image: inset 0 2px 4px rgba(0,0,0,0.2).

INCIDENT HEADER CARD (card surface, full width, 16dp h-padding, 12dp v-padding):
— Row 1: 🌊 emoji (24pt) + 8dp gap + "Flood — River Overflow" in Headline Small (18pt "Inter" SemiBold, primary text).
— Row 2 (8dp below): "CRITICAL" badge — red pill (#EF4444 at 15% bg, #EF4444 text, Label Medium, ALL CAPS) with a pulsing red dot (8dp, #EF4444, glow 0 0 4px rgba(239,68,68,0.4)) to its left (4dp gap).
— Row 3 (4dp below): "Kalu Ganga River Overflow — Ratnapura" in Title Large (16pt "Inter" Bold, primary text).
— Row 4 (4dp below): "Reported 3 hours ago • Last updated 12 min ago" in Body Small (12pt "Inter" Regular, secondary text).
— Row 5 (4dp below): "📍 Ratnapura District, Sabaragamuwa Province" in Body Medium (13pt, secondary text), right-aligned: "Navigate →" in Body Small (12pt "Inter" Medium, secondary accent, underlined).

CONFIDENCE SCORE CARD (12dp below, card surface, 16dp radius, 16dp padding):
— Left: Circular donut gauge, 64dp diameter. Ring: 8px thick. 78% of ring filled with primary accent, remaining 22% in divider color. Fill has the 2px top-edge highlight at 60% white opacity for glass effect. Center: "78%" in Display Small (24pt "Inter" ExtraBold, primary text). Below number: "confidence" in Caption (9pt "Inter" Regular, secondary text).
— Right (12dp gap from donut): "12 confirms" in Body Small (#22C55E text) + " · " + "2 denies" in Body Small (#EF4444 text) + line break + "Time-decay: ×0.92" in Caption (9pt "JetBrains Mono", secondary text).
— Below (12dp): Two buttons side-by-side (50% width each, 8dp gap):
  "✓ Confirm" — accent fill, white text, 44dp tall, 12dp radius. Check icon (Material Symbols "check", 18dp) inline. Shows subtle ripple effect (accent at 8% opacity circle, 60% coverage) implying interactivity.
  "✗ Deny" — transparent fill, 1.5px border in secondary text at 40%, secondary text color, 44dp tall. X icon (Material Symbols "close", 18dp) inline.

VICTIM DEMOGRAPHICS CARD (12dp below, card surface, 16dp radius, 16dp padding):
— Title: "👥 Affected People" in Title Large (16pt "Inter" SemiBold, primary text).
— Horizontal row of 6 stat chips (8dp below title), evenly spaced, each 50dp wide:
  Each chip: emoji (20pt) on top, number in Headline Small (18pt "Inter" Bold, primary text) below. The chips: 🤰 **2** | 🏥 **5** | 👴 **3** | ♿ **1** | 👶 **4** | 👥 **45** — the last one (total) has the number in Headline Medium (20pt "Inter" ExtraBold) and accent text color.
— Below (8dp): "Status:" in Body Small (secondary text) + "STRANDED" red pill badge.
— Below (4dp): "Special notes: 2 persons need insulin, 1 child requires oxygen" in Body Small (12pt "Inter" Italic, secondary text).

ACTIVITY TIMELINE (12dp below, card surface, 16dp radius, 16dp padding):
— Title: "📋 Activity Timeline" in Title Large (16pt "Inter" SemiBold, primary text).
— Vertical timeline (8dp below title): A thin vertical line (2px, divider color) running down the left side (24dp from card left edge). At each event, a colored dot (10dp, centered on the line) with the event text indented 20dp from the dot:
  • #22C55E dot: "12:30 PM" in Label Medium (11pt "Inter" SemiBold, secondary text) + "Report created by anonymous citizen" in Body Medium (13pt "Inter" Regular, primary text). 
  • #3B82F6 dot: "12:45 PM" + "3 nearby citizens confirmed (+3.0 score)" — score in green.
  • #F97316 dot (12dp, larger): "1:15 PM" + "Police OIC verified (+10.0, auto-verify)" — bold, score in green. This dot is larger to emphasize officer action.
  • #22C55E dot: "1:30 PM" + "Photo uploaded successfully"
  • Accent dot: "2:15 PM" + "Relief request linked: 200 lunch packs"
  Each entry is 48dp tall. Alternate entries have a faint row background (card surface at +3% brightness) for zebra-stripe readability.

LINKED SECTIONS (12dp below):
— "📦 Relief Requests (2)" — EXPANDED card (card surface, 16dp radius, 16dp padding, downward chevron "expand_more"): 
  Inside: "200 Lunch Packs — 120/200 pledged" in Body Medium + 12dp-tall progress bar (60% green fill, glass highlight, animation streak). 
  "50 Water Bottles — FULFILLED ✓" + full green bar.
— "🏥 Nearby Safe Places (1)" — COLLAPSED (card surface, 48dp tall, right chevron "chevron_right", title only).
— "📞 Emergency Contacts" — COLLAPSED.

FIXED BOTTOM BAR (64dp, card surface, 1px top border in divider, shadow Level 2 upward):
— Left: "📞 Call GN Officer" — accent fill, white text, 44dp tall, 12dp radius, 55% width. Phone icon (Material Symbols "call", 18dp) inline.
— Right (8dp gap): "🗺️ Navigate" — transparent, 1.5px secondary accent border, secondary accent text, 44dp tall, 12dp radius, 40% width. Navigation icon inline.
— Centered below (touching bottom safe area): "⚠️ Report Duplicate" in Body Small (12pt "Inter" Medium, secondary text, underlined).

Generate the DARK MODE version.
```

---

### PROMPT M5 — Emergency Contacts Screen

```
[INSERT GLOBAL DESIGN SYSTEM HERE]
[INSERT PALETTE HERE]

Generate a single high-fidelity mobile app UI screenshot at 390×844 pixels. No phone frame. EMERGENCY CONTACTS screen for "FloodBlast." Design priority: a panicking person finds the right number and calls in under 3 seconds. Green call buttons are the dominant visual element — they should practically LEAP off the screen.

TOP APP BAR (56dp, card surface, shadow Level 1): Back arrow left. "Emergency Contacts" in Headline Small (18pt "Inter" SemiBold, primary text) center-left. Search icon (Material Symbols "search", 24dp, secondary text) right.

LOCATION BANNER (full width, 52dp, secondary accent at 8% opacity background, 16dp h-padding):
"📍 Showing contacts for: Colombo District" in Title Small (14pt "Inter" SemiBold, primary text). Below (2dp): "Based on your current GPS location" in Body Small (12pt "Inter" Regular, secondary text). Right side: "Change ▾" in Body Small (12pt "Inter" Medium, secondary accent color, underlined).

═══ NATIONAL EMERGENCY HOTLINES ═══
Section container (16dp margin, card surface, 16dp radius, 4px LEFT border in #EF4444 danger red, danger at 8% opacity background wash):
Header (16dp padding): "🆘 National Emergency Hotlines" in Title Large (16pt "Inter" Bold, primary text) + 8dp gap + green pill badge ("Always Available", fully rounded, 24dp tall, #22C55E at 15% bg, #22C55E text, Label Medium ALL CAPS).

2-column grid inside (12dp gap between buttons, 12dp margin from container edges). 6 large call buttons, each ~165×72dp, card surface background, 12dp radius, shadow Level 2:
Each button structure — left 75%: phone number in Display Small (24pt "Inter" ExtraBold, primary text) on top line + service name in Body Small (12pt "Inter" Regular, secondary text) below. Right 25%: circular green call button (40dp diameter, #22C55E fill, white phone icon Material Symbols "call" 20dp, shadow Level 2, glow 0 0 8px rgba(34,197,94,0.3)).
The 6 buttons:
  1. **117** / "Disaster Mgmt"
  2. **119** / "Police Emergency"  
  3. **1990** / "Ambulance (Free)"
  4. **110** / "Fire & Rescue"
  5. **105** / "Navy Flood Rescue"
  6. **116** / "Air Force Helicopter"
One button (117) shows a subtle ripple effect (green at 6% opacity, 60% coverage) implying tappability.

═══ YOUR AREA OFFICERS ═══
Section divider (16dp below hotlines): "YOUR AREA OFFICERS" in Label Medium (11pt "Inter" SemiBold, ALL CAPS, letter-spacing 1px, secondary text) centered, with horizontal lines (#divider color, 1px) extending from both sides to screen edges.

5 officer cards (stacked with 12dp gap, 16dp h-margin):
Each card: full width, card surface background, 16dp radius, shadow Level 1, 4px colored left border (varies by officer type), 16dp internal padding.
Structure per card:
— Left column (78%):
  Row 1: Officer type in Label Medium (11pt "Inter" Bold, ALL CAPS, letter-spacing 0.5px, secondary text color).
  Row 2 (2dp below): Area in Body Medium (13pt "Inter" Regular, primary text).
  Row 3 (2dp below): Officer name in Title Small (14pt "Inter" SemiBold, primary text).
  Row 4 (4dp below): Phone in Title Medium (15pt "JetBrains Mono" Regular, primary text).
  Row 5 (if secondary number, 2dp below): Alt phone in Body Medium (13pt "JetBrains Mono" Regular, secondary text).
— Right column (22%, vertically centered):
  Primary call button: 48dp circular, #22C55E fill, white phone icon (Material Symbols "call", 22dp, stroke 400), shadow Level 3, glow 0 0 10px rgba(34,197,94,0.25). This button is THE MOST PROMINENT element on each card.
  If secondary number exists: smaller call button (36dp circular, transparent, 2px #22C55E border, green phone icon 18dp) below primary, 8dp gap.

The 5 officers:
  1. Blue (#3B82F6) left border — "GRAMA NILADHARI" — "Colombo North Division" — "Mr. K. W. Perera" — "+94 11 234 5678"
  2. Purple (#8B5CF6) border — "DIVISIONAL SECRETARY" — "Colombo DS Office" — "Mrs. S. Fernando" — "+94 11 345 6789" / "+94 77 234 5678"
  3. Navy (#1E3A5F) border — "POLICE OIC" — "Colombo North Station" — "SI M. R. Silva" — "+94 11 456 7890"
  4. Rose (#E11D48) border — "PUBLIC HEALTH INSPECTOR" — "Colombo MOH Area" — "Dr. N. Jayawardena" — "+94 11 567 8901"
  5. Orange (#F97316) border — "DISASTER RELIEF OFFICER" — "DRSO — Colombo" — "Mr. R. Bandara" — "+94 11 678 9012"

Bottom link (16dp below last card, centered): "Can't find your officer? Report missing contact →" in Body Small (12pt "Inter" Medium, secondary accent, underlined).

KEY VISUAL HIERARCHY: Green call buttons > Phone numbers > Officer names > Everything else. The 48dp green circles with their glow effect should be the first thing the eye sees on every card.

Generate the DARK MODE version.
```

---

### PROMPT M6 — Relief Requests & Food Queue

```
[INSERT GLOBAL DESIGN SYSTEM HERE]
[INSERT PALETTE HERE]

Generate a single high-fidelity mobile app UI screenshot at 390×844 pixels. No phone frame. RELIEF REQUESTS & FOOD QUEUE screen for "FloodBlast." The progress bars are the visual hero — they tell the story of community response at a glance. The segmented fill pattern should be instantly readable.

TOP APP BAR (56dp): Back arrow + "Relief Requests" in Headline Small (18pt "Inter" SemiBold) + filter icon (Material Symbols "filter_list", 24dp, secondary).

MEAL WINDOW SELECTOR (12dp below app bar, 16dp h-margin):
Container: full width, card surface, 8dp radius, 4dp padding inside. 3 equally-sized tab buttons (each ~112dp × 48dp, 8dp radius):
— "🌅 Breakfast" (emoji 16pt) + "06–09" in Caption (9pt "Inter" Regular) below — INACTIVE: card surface bg (same as container, appearing flat), secondary text.
— "☀️ Lunch" + "11–14" — ACTIVE: accent fill, white text (Title Small 14pt "Inter" SemiBold for "Lunch", Caption for time), shadow Level 2, elevated 1dp above neighbors.
— "🌙 Dinner" + "17–20" — INACTIVE.

Status strip (4dp below tabs, full width, accent at 8% bg, 32dp tall, 16dp h-padding):
"🕐 LUNCH WINDOW ACTIVE — Closes in 1h 15m" in Label Large (12pt "Inter" SemiBold, accent color). The time "1h 15m" uses "JetBrains Mono" SemiBold.

Stats row (8dp below, 4 metrics, separated by 1px vertical dividers, evenly spaced):
"18 requests" (Body Small, primary) | "2,400 needed" (Body Small "Inter" Bold, #EF4444) | "1,680 pledged" (Body Small Bold, #22C55E) | "720 remaining" (Body Small Bold, #F59E0B).

═══ REQUEST CARDS ═══

CARD 1 — URGENT (16dp h-margin, card surface, 16dp radius, 4px red left border, 16dp padding, shadow Level 2):
— Header: "🍱 200 Lunch Packs Needed" in Title Medium (15pt "Inter" SemiBold, primary text). Right: "URGENT" red pill badge (Label Medium, ALL CAPS) + 4dp below it "⏰ 1:30 PM" in Body Small (#F59E0B "JetBrains Mono").
— Location: "📍 Ratnapura Safe Center — 3.2km away" in Body Small (12pt, secondary text).
— PROGRESS BAR (12dp below, 16dp tall — visual hero size, full card width, fully rounded 8dp radius):
  Background track: divider color.
  Three abutting segments left→right:
  — GREEN (#22C55E): 60% width. Overlaid label "120 Pledged" in Label Small (10pt "Inter" SemiBold, white, centered in segment). 2px top-edge highlight at 60% white opacity. Diagonal animation streak (white 15%, 30° angle, 20px wide) at leading edge.
  — BLUE (#3B82F6): 15% width. "30 In Transit" in Label Small (white).
  — RED (#EF4444 at 25% opacity): remaining 25%. "50 Remaining" in Label Small (secondary text at 80%).
  First segment has left rounded corners, last segment has right rounded corners.
— Below bar (4dp): "4 donors contributing · 60% fulfilled" in Caption (9pt, secondary text).
— CTA (12dp below): Full card-width button, 44dp tall, accent fill, 12dp radius: "Pledge Food →" in Label Large (12pt "Inter" SemiBold, white, uppercase). Arrow is "→" character.

CARD 2 — FULFILLED (12dp below Card 1, same structure, slightly reduced opacity 92%):
— "💧 500 Water Bottles" in Title Medium.
— "📍 Matara Community Hall — 8.1km"
— Progress bar: 100% solid #22C55E fill. Centered label "500/500 DELIVERED ✓" in Label Medium (white). No animation streak.
— "FULFILLED" green pill badge. No CTA button. "Completed 2 hours ago" in Caption (secondary text).

CARD 3 (12dp below):
— "🍱 150 Dinner Packs Needed" — amber left border.
— Progress bar: 40% green (labeled "60"), 60% red empty (labeled "90 Remaining").
— "2 donors · No deadline set" caption.
— "Pledge Food →" accent button.

OTHER RELIEF (12dp below, collapsible section):
Header: "OTHER RELIEF" in Label Medium (ALL CAPS, secondary text) with downward chevron (Material Symbols "expand_more", 20dp). 3 tappable rows (48dp each, 1px bottom divider):
— "🏥 Medical Supplies" + right-aligned badge "3" in accent pill + chevron "chevron_right" 20dp.
— "🧸 Baby Items" + "1" badge.
— "🧥 Clothing & Blankets" + "2" badge.

BOTTOM-RIGHT FAB: 56dp circular, accent fill, white "+" icon, shadow Level 3. Positioned 16dp from right, 16dp above bottom navigation.

PLEDGE MODAL (overlaying from bottom, 60% screen height, dimmed background rgba(0,0,0,0.5)):
Card surface, top corners 28dp radius, shadow Level 4. Grabber handle (36px wide, 4dp tall, centered).
— "Pledge Lunch Packs" in Headline Medium (20pt "Inter" Bold, primary text, 16dp from top).
— "Ratnapura Safe Center" in Body Medium (secondary text).
— "How many packs can you provide?" in Body Large (14pt, primary text), 16dp below.
— Large stepper (centered, 24dp below): "−" circle (48dp, 1.5px border, "−" 24pt "Inter" Medium, secondary text) + 24dp gap + "50" in Display Large (36pt "Inter" ExtraBold, primary text) + 24dp gap + "+" circle (48dp, accent fill, "+" 24pt "Inter" Bold, white). The number "50" has a subtle scale-up feeling (slightly larger than expected).
— "Remaining need: 50 packs" in Body Medium (13pt, secondary text), 12dp below. "Your pledge covers the remaining balance!" in Body Medium (#22C55E text).
— Green CTA (16dp below): Full width (minus 32dp margin), 52dp tall, #22C55E fill, 12dp radius: "Pledge 50 Packs ✓" in Label Large (white, uppercase). Shadow Level 2.
— Below button: "You can deliver partial amounts. Other donors will cover the rest." in Caption (9pt, secondary text, centered).

Generate the DARK MODE version.
```

---

### PROMPT M7 — Safe Places / Evacuation Centers

```
[INSERT GLOBAL DESIGN SYSTEM HERE]
[INSERT PALETTE HERE]

Generate a single high-fidelity mobile app UI screenshot at 390×844 pixels. No phone frame. SAFE PLACES & EVACUATION CENTERS screen for "FloodBlast." The occupancy capacity bars are the visual centerpiece — they instantly communicate whether a shelter has room. Green = come here, amber = limited, red = full.

TOP APP BAR (56dp): Back arrow + "Safe Places" in Headline Small (18pt "Inter" SemiBold) + two right icons: map/list toggle (Material Symbols "view_list", 24dp, currently in list mode, secondary text) + filter icon.

MAP SECTION (top 38% of content, edge-to-edge horizontal, 12dp bottom margin):
Dark-themed map zoomed into a city area. 3 green safe-place markers (rounded squares, 28dp, #22C55E):
— Marker 1: bright green glow (0 0 8px rgba(34,197,94,0.4)) — available capacity.
— Marker 2: amber glow (0 0 8px rgba(245,158,11,0.4)) — filling up.
— Marker 3: red glow (0 0 8px rgba(239,68,68,0.4)) — full.
User's blue location dot (14dp, accuracy ring). Floating chip on map (card surface at 90%, 28dp tall, 16dp h-padding, fully rounded, shadow Level 2): "3 safe places within 5km" in Label Large (12pt "Inter" SemiBold, primary text).

═══ SAFE PLACE CARDS ═══

CARD 1 — AVAILABLE (card surface, 16dp radius, shadow Level 1, 4px #22C55E left border, 16dp padding):
— Row 1: "Dharmasala Community Hall" in Title Medium (15pt "Inter" SemiBold, primary text) + right: "✓ VERIFIED" green pill (Label Medium, #22C55E, ALL CAPS, #22C55E at 15% bg).
— Row 2 (4dp): "2.3 km" in Body Small (12pt "JetBrains Mono" SemiBold, secondary accent) + navigation arrow (Material Symbols "near_me", 16dp, secondary accent) — right-aligned.
— OCCUPANCY BAR (12dp below, 14dp tall, full width, fully rounded 7dp):
  Background track: divider color. GREEN fill (#22C55E) at 61% width (182/300). Fill has 2px top-edge highlight at 60% white for glass effect. Subtle gradient within green: slightly darker green on left (#1DA34A) to brighter green on right (#22C55E), creating momentum feel. Animation streak at leading edge (white 15%, 20px parallelogram).
  Below bar (4dp): "Capacity: **300**" (Body Small, primary) | "Current: **182**" (secondary text) | "Available: **118**" (#22C55E "Inter" SemiBold). Pipe separators in secondary text.
— FACILITIES (12dp below): Horizontal scrollable row of small chips (each 28dp tall, fully rounded, 8dp h-padding, 4dp gap):
  💧 "Water" ✓ — green tint (#22C55E at 12% bg), green text, green border 1px.
  ⚡ "Power" ✓ — green tint.
  🚽 "Sanitation" ✓ — green.
  🍳 "Kitchen" ✗ — gray/red tint (#EF4444 at 8% bg), secondary text, strikethrough or red ✗ icon.
  🏥 "Medical" ✓ — green.
  ♿ "Wheelchair" ✗ — gray. 
  Last chip partially cropped at screen edge with gradient fade (horizontal scroll hint).
— Demographics (8dp below): "Housing: 12 pregnant, 8 elderly, 23 children, 139 general" in Caption (9pt "Inter" Regular, secondary text).
— Two buttons (12dp below, 8dp gap): "🗺️ Navigate" (accent fill, white text, 40dp tall, 55% width, 12dp radius) + "📞 Contact" (outlined secondary accent, 40dp tall, 40% width).

CARD 2 — FULL (12dp below, card surface, 4px #EF4444 left border, overall opacity 93%):
— "Central School Hall" + "FULL" red pill badge.
— OCCUPANCY BAR: 100% filled solid #EF4444 red. No animation streak (static, maxed out). Below: "Capacity: **300** | Current: **300** | Available: **0**" — "0" in #EF4444 Bold.
— Overlay banner at card bottom: semi-transparent red strip (#EF4444 at 12% bg, 36dp tall, full width inside card margins): "🚫 NO VACANCY — Find alternatives nearby" in Label Large (12pt "Inter" SemiBold, #EF4444).
— Facilities: 💧✓ ⚡✓ 🚽✗ 🍳✓ 🏥✗ ♿✗ — mixed.

CARD 3 (12dp below, 4px gray/secondary-text left border):
— "Temple Grounds Shelter" + "UNVERIFIED" gray pill (secondary text at 60%).
— OCCUPANCY BAR: 22% filled in #F59E0B amber (45/200). Mostly empty.
  Below: "Available: **155**" in #22C55E.
— Facilities: Only 💧✓ 🚽✓, rest ✗/unknown.
— Buttons: "Navigate" + "Verify This Place" (outlined accent, accent text — encouraging officer verification).

BOTTOM-RIGHT FAB: 56dp circular, accent fill, "+" white icon, shadow Level 3.

Generate the DARK MODE version.
```

---

## 💻 WEB DASHBOARD PROMPTS

---

### PROMPT W1 — EOC Command Center Dashboard

```
[INSERT GLOBAL DESIGN SYSTEM HERE]
[INSERT PALETTE HERE]

Generate a single high-fidelity web dashboard UI screenshot at 1920×1080 pixels. No browser chrome — flat UI only. This is the EMERGENCY OPERATIONS CENTER (EOC) COMMAND CENTER for "FloodBlast" — the main overview for disaster management admins. The aesthetic should feel like air traffic control meets Bloomberg terminal — dense information, perfectly organized, real-time feel.

LEFT SIDEBAR (260px wide, full 1080px height, card surface background, 1px right border in divider color):
TOP (24dp padding): FloodBlast logo — a shield icon with a stylized water wave rendered in primary accent, 36×36dp. Next to it: "FloodBlast" in Headline Small (18pt "Inter" Bold, primary text). Below: "EOC Dashboard v2.0" in Caption (9pt "Inter" Regular, secondary text).

NAVIGATION (20dp below logo, full sidebar width): Vertically stacked items, each 48dp tall, 16dp left padding:
— 🏠 "Dashboard" — SELECTED: accent at 12% bg fill, 3px left border in accent, icon (Material Symbols "dashboard", 22dp, FILLED, stroke 600, accent color) + "Dashboard" in Body Large (14pt "Inter" SemiBold, accent color). Transition hint: the left border has a very subtle accent glow (0 0 4px rgba(accent,0.2)).
— 🗺️ "Live Map" — unselected: icon (outlined, stroke 300, secondary text) + label (Body Large, secondary text).
— 📋 "Incidents" + right badge "142" red pill (Label Small, #EF4444).
— 🎫 "Tickets" + badge "67" accent pill.
— 📦 "Relief & Donations" — unselected.
— 🏥 "Safe Places"
— 📞 "Contacts"
— 👤 "Officer Mgmt" + badge "5" amber pill.
— ⚙️ "Settings"
12dp gap between items. Unselected items show a subtle hover hint on one item — slight background tint (primary text at 3% opacity) on "Live Map", implying hover state.

BOTTOM of sidebar: User section (16dp padding, 1px top border): Avatar circle (36dp, gradient placeholder, person icon 20dp secondary), "System Admin" in Title Small (14pt "Inter" SemiBold, primary text), "admin@floodblast.lk" in Caption (9pt, secondary text). Green dot (8dp, #22C55E) at avatar bottom-right indicating online.

TOP NAVBAR (64dp tall, full width minus sidebar, card surface bg, 1px bottom border):
— Left: "Dashboard" breadcrumb in Body Large (14pt "Inter" Regular, secondary text).
— Center: Connection pill (160×36dp, fully rounded, #22C55E at 8% bg, 1px #22C55E border): green dot (8dp, glow 0 0 6px rgba(34,197,94,0.4)) + "LIVE" in Label Medium (11pt "Inter" Bold, #22C55E, ALL CAPS) + "WebSocket Connected" in Body Small (12pt "Inter" Regular, secondary text). The green dot implies pulsing animation.
— Right group: District dropdown ("All Districts ▾", 150×36dp, card surface, 12dp radius, 1.5px border, Body Small text, map-pin icon 16dp inline) + 16dp gap + bell icon (Material Symbols "notifications", 22dp, secondary) with red badge "7" (14dp, #EF4444, white 9pt text) + 16dp gap + avatar (32dp) + "Admin" in Body Small + "ADMIN" accent pill badge (Label Small).

═══ MAIN CONTENT (24dp padding all sides, below navbar, right of sidebar) ═══

TOP ROW — 4 KPI CARDS (equal width ~380px, 120dp tall, card surface, 16dp radius, shadow Level 1, 20dp padding, 16dp gap between):

Card 1: Red dot (12dp, #EF4444, glow) top-left + "Active Incidents" in Body Small (secondary text). Below: "142" in Display Large (36pt "Inter" ExtraBold, primary text). Below: upward arrow icon (12dp, #EF4444) + "+12 in last hour" in Body Small (#EF4444). Bottom-right: tiny sparkline chart (60×32px, red line #EF4444, 1.5px stroke, showing upward trend over 24 data points, no axes, area fill below line at 5% opacity).

Card 2: Amber dot + "People Affected". "3,847" in 36pt. "+234 today" amber. Amber sparkline upward.

Card 3: Green dot + "Verified Tickets". "67" in 36pt. "47% verification rate" secondary text. Bottom-right: mini donut chart (32×32px, ring 4px thick, 47% green fill, rest divider color, "47%" in 8pt centered).

Card 4: Blue dot + "Safe Place Capacity". "2,450 / 8,200" (Body Large: "2,450" in 28pt Bold primary, "/ 8,200" in 20pt Regular secondary). "70% available" in #22C55E. Bottom: horizontal bar (60×8px, fully rounded, 30% blue fill for occupancy, 70% green-tinted empty for availability).

MIDDLE ROW — 2 COLUMNS (60/40 split, 16dp gap):

LEFT (60%) — LIVE MAP (card surface, 16dp radius, shadow Level 1):
Header bar (48dp, 16dp padding): "🗺️ Live Map" in Title Large (16pt "Inter" SemiBold) + right: category checkboxes with colored dots and counts — ✅ "Floods (67)" [blue dot] + ✅ "Landslides (23)" [brown dot] + ✅ "Roads (34)" [orange dot] + ✅ "Bridges (8)" [red dot]. Each checkbox is 16dp with accent fill when checked.
Map area (~400dp tall, 12dp radius, overflow hidden): Dark-themed map showing Sri Lanka's full teardrop island silhouette. Show realistic island shape with:
— Multiple red pulsing circles (with double rings at 30%/10% opacity) concentrated in southwestern coast.
— Orange pins in central highlands.
— Yellow triangles along road lines.
— Green squares near cities.
— Blue cluster circles: "5" (Ratnapura area), "12" (Colombo area), "8" (Galle area), "3" (Matara area).
— Semi-transparent RED polygon (#EF4444 at 15%, 2px solid border) along a river in southwest, flood extent.
— Map legend (bottom-left, 140×120dp, card surface at 90%, 8dp radius): colored markers with Label Small labels — Unverified (red), Verified (orange), Road Issue (yellow), Safe Place (green), Cluster (blue), Flood Zone (red polygon icon).
— Map controls (top-right, stacked 36×36dp buttons, card surface, 8dp radius, shadow Level 2): zoom +/−, fullscreen, layers.

RIGHT (40%) — LIVE ACTIVITY FEED (card surface, 16dp radius, shadow Level 1, same height as map):
Header (48dp, 16dp padding): "📡 Live Activity Feed" in Title Large + green dot (8dp, pulse glow) + right: "View All →" in Body Small (secondary accent, underlined).
Scrollable list, 8-10 entries (each 52dp tall, 16dp h-padding, 1px bottom divider):
Each entry: colored dot (10dp) matching event type + 8dp gap + timestamp "12:45 PM" in Label Medium (11pt "JetBrains Mono" SemiBold, secondary text) + 8dp gap + description in Body Medium (13pt "Inter" Regular, primary text) + right chevron (16dp, secondary text at 30%).
  1. 🔴 red dot + "12:45 PM" + "New FLOOD near Kalu Ganga, Ratnapura" — 4px left border red.
  2. ✅ green dot + "12:42 PM" + "INC-00142 verified by Police OIC" — green border.
  3. 📦 blue dot + "12:38 PM" + "Relief: 120/200 lunch packs pledged" — blue border.
  4. 🏥 amber dot + "12:35 PM" + "Temple Hall at 85% capacity" — amber border.
  5. ⚠️ yellow dot + "12:30 PM" + "Road Blocked: A2 Highway, Matara" — yellow border.
  6. 🔴 red dot + "12:28 PM" + "New LANDSLIDE, Kandy District" — red border.
  7. 👤 purple dot + "12:25 PM" + "Officer application: Police OIC" — purple border.
  8. ✅ gray dot + "12:20 PM" + "INC-00139 closed — water receded" — gray border.
Alternate entries have faint background tinting (+2% brightness) for zebra readability. First entry (newest) has a subtle slide-in shadow on its left edge implying it just appeared.

BOTTOM ROW — 3 ANALYTICS CARDS (equal width ~520px, 220dp tall, card surface, 16dp radius, 20dp padding):

Card A — "📊 Incidents by Category" (Title Large, 16pt Bold):
Horizontal bar chart (12dp below title), 5 bars (each 20dp tall, 8dp gap, fully rounded):
  "Floods" label (Body Small, left-aligned, 80px) → blue bar (#3B82F6), longest (~280px) → "67" (Body Small, right of bar).
  "Roads" → orange bar (#F97316), ~180px → "34"
  "Landslides" → brown/amber bar (#92400E), ~130px → "23"
  "Other" → gray bar (#6B7280), ~60px → "10"
  "Bridges" → red bar (#EF4444), ~48px → "8"
Bars have the 2px top-edge highlight for glass effect. Subtle grid lines (divider color at 10%, vertical, every 20 units) behind bars.

Card B — "📈 24-Hour Trend" (Title Large):
Smooth line chart. X-axis: hours "00" to "24" in Caption (9pt "JetBrains Mono", secondary text, every 4 hours labeled). Y-axis: "0" to "20" in Caption, 4 horizontal gridlines (divider at 10%).
Accent-colored line (2.5px stroke) showing: low at night (2-3 incidents/hr), dip at 3AM, sharp rise from 6AM, peak at 10AM (~18/hr), slight dip at noon, second peak at 2PM (~15/hr), declining toward 6PM. Area below line filled with accent at 8% opacity gradient (fading to transparent at bottom).
Current hour highlighted: vertical dashed line (accent at 30%, 1px dashed) at the "12:45" position, with a dot (8dp, accent, glow) on the line at the current value.

Card C — "🗺️ District Heatmap" (Title Large):
Small silhouette outline of Sri Lanka island (~180dp tall, centered). The island shape is recognizable — teardrop shape, with Jaffna peninsula visible at top. Divided into approximate district regions, each filled with intensity color:
  Green gradient (#22C55E at 20-40%): Northern, Eastern districts (fewer incidents).
  Yellow (#F59E0B at 40%): Central, North-Central.
  Orange (#F97316 at 50%): Kandy, Matale.
  Red (#EF4444 at 60-80%): Ratnapura (deepest red), Colombo, Kalutara, Galle (high incidents).
Gradient legend below (100×12px, horizontal bar from green → yellow → orange → red, with "Low" and "High" Label Small labels at ends).

OVERALL: Dense, professional, alive. The green LIVE pill, pulsing red markers on the map, and the streaming feed create urgency. Every number is readable. Every chart is clean. 16dp gaps everywhere. Perfect grid alignment.

Generate the DARK MODE version.
```

---

### PROMPT W2 — Incident Management Table

```
[INSERT GLOBAL DESIGN SYSTEM HERE]
[INSERT PALETTE HERE]

Generate a single high-fidelity web dashboard UI at 1920×1080px. No browser chrome. INCIDENT MANAGEMENT page — split panel 62/38. Left sidebar with "Incidents" selected (red "142" badge). Same navbar as W1.

LEFT PANEL (62%) — DATA TABLE:

TOOLBAR (56dp, 16dp padding, card surface bg, 16dp radius top):
— Search input (320×40dp, 12dp radius, 1.5px border, divider color, magnifying glass icon 18dp inside left): "Search incidents, locations, IDs..." placeholder in Body Medium (secondary text at 50%). Font: "Inter" Regular 13pt.
— Filter dropdowns (row, 8dp gap, each 130×36dp, 8dp radius, 1.5px border, card surface bg, Body Small 12pt "Inter" Regular text, chevron icon 16dp right):
  "Category ▾" · "Severity ▾" · "Status ▾" · "District ▾" · "Date Range ▾"
— Active filter tags (8dp below dropdowns, 4dp gap): Three pills (28dp tall, fully rounded, 8dp h-padding, accent at 12% bg): "Floods ×" (#3B82F6 text + "✕" 10dp) + "Critical ×" (#EF4444 text) + "Last 24h ×" (accent text). "✕" is tappable.
— Right of toolbar: View toggles (3 grouped buttons, 32×32dp each, card surface, first selected with accent bg): "☰ Table" (selected) · "▦ Cards" · "🗺️ Map". + 8dp gap + "📥 Export CSV" outlined button (36dp tall, 100px wide, 8dp radius, 1.5px border, secondary text).

DATA TABLE (card surface, 16dp radius, 1px border divider, shadow Level 1):
Column headers (40dp tall, card surface at +3% brightness, bold bottom border 2px divider):
Columns in Label Medium (11pt "Inter" SemiBold, ALL CAPS, letter-spacing 0.5px, secondary text):
☐ (40px) | ID (110px) | Category (80px) | Severity (85px) | Status (105px) | Location (190px) | Affected (70px) | Confidence (110px) | Reported (85px) | Actions (90px)
Sortable headers: "Reported" has ▼ icon (indicating descending sort, accent color).

10 data rows (each 52dp tall, 16dp h-padding, 1px bottom divider):
Zebra striping: odd rows card surface, even rows card surface at +2% brightness.

Row 1 — SELECTED (accent 3px left border, accent at 5% bg fill, entire row highlighted):
  ☑ (checked checkbox, 18dp, accent fill, white check) | "INC-00142" (Title Small, "JetBrains Mono", primary) | 🌊 (18pt emoji) | 🔴 dot 8dp + "CRIT" (Label Small, #EF4444) | "VERIFIED" orange pill (Label Small, ALL CAPS, #F97316) | "Ratnapura, Sab..." (Body Small, primary, truncated with ellipsis) | "45" (Title Small Bold, primary) | [mini progress bar 60×8dp, 78% accent fill, rounded] + "78%" (Label Small) | "3h ago" (Body Small, secondary) | 👁️ (eye icon 18dp, secondary) + ✏️ (edit icon 18dp, secondary)

Row 2: ☐ | INC-00141 | ⛰️ | 🟠 + "HIGH" | "UNVERIFIED" red pill | "Kandy, Centr..." | "12" | bar 34% amber, "34%" | "5h" | icons
Row 3: ☐ | INC-00140 | 🚧 | 🟡 + "MED" | "VERIFIED" orange | "Matara, South..." | "0" | bar 62%, "62%" | "7h" | icons
Row 4: ☐ | INC-00139 | 🌊 | 🟢 + "LOW" | "CLOSED" gray pill | "Galle, South..." | "8" | bar 91% green, "91%" | "12h" | icons
Row 5: ☐ | INC-00138 | 🌉 | 🔴 + "CRIT" | "VERIFIED" | "Kalutara, West..." | "0" | bar 85%, "85%" | "14h" | icons
Rows 6-10: Varied data following same pattern.

Bulk action bar (visible because Row 1 is checked — slim 40dp strip between toolbar and headers, accent at 8% bg):
"1 selected" in Body Small (accent text) + "Merge Selected" (accent outlined btn, 32dp tall) + "Change Status ▾" (dropdown, 32dp) + "Export Selected" (outlined, 32dp).

Table footer (40dp, 1px top border): "Showing 1-10 of 142 incidents" in Body Small (secondary) left. Pagination right: [←] prev (32dp square, 8dp radius, outlined) + page numbers "1" (accent fill, white text, 32dp square) "2" "3" "..." "15" (all outlined) + [→] next. Numbers in Body Small (12pt "Inter" SemiBold).

RIGHT PANEL (38%) — DETAIL PANEL (card surface bg, 4px left shadow Level 3, implying slide-in from right):
"✕" close (top-right, 36dp square, secondary text). 
"INC-2026-00142" in Title Large (16pt "JetBrains Mono" SemiBold, primary) + "VERIFIED" orange pill, 16dp below panel top.
Below (4dp): "🌊 Flood — River Overflow" (Title Medium, 15pt Bold) + "CRITICAL" red pill.
MINI MAP (full panel width, 150dp, 12dp radius, dark-themed, red pin at location).
DETAILS (Body Medium 13pt, 24dp row height, 12dp gap above):
  "District:" "Ratnapura" | "GN:" "Kuruwita" | "Reported:" "3h ago, anonymous" | "GPS:" "6.5325°N, 80.2340°E" (JetBrains Mono 11pt).
DESCRIPTION: paragraph 3 lines, Body Medium, primary.
MEDIA: 3 photo thumbnails (64×48dp, 8dp radius, inner shadow, side by side, 8dp gap). First shows flooded road, others show shimmer loading state (diagonal bands at 30° angle, +5% brightness, 40px wide, frozen mid-sweep).
VICTIMS: stat grid — 🤰2 🏥5 👴3 ♿1 👶4 Total 45, Label Medium. "STRANDED" red pill.
CONFIDENCE: mini donut (48dp, 78% accent, "78%" Caption center) + "12 confirms, 2 denies" Body Small.
TIMELINE: compact 5 entries (each 28dp, small dots 6dp + timestamp Label Small + text Body Small, truncated).

ACTIONS FOOTER (sticky bottom of panel, 56dp, 1px top border, card surface):
"Update Status ▾" (accent outlined dropdown, 36dp) + "Assign to Ticket ▾" (accent fill, 36dp, white text) + "Dismiss" (red outlined, 36dp, small).

Generate the DARK MODE version.
```

---

### PROMPT W3 — Full-Screen Live Map

```
[INSERT GLOBAL DESIGN SYSTEM HERE]
[INSERT PALETTE HERE]

Generate a single high-fidelity web dashboard UI at 1920×1080px. No browser chrome. FULL-SCREEN LIVE MAP for "FloodBlast" EOC. Left sidebar COLLAPSED (64px wide, showing only icons — "Map" icon selected in accent, filled variant). The map dominates ~90% of screen area.

THE MAP (everything except collapsed sidebar):
Dark-themed cartographic map of Sri Lanka's southwestern quadrant (Ratnapura, Kalutara, Colombo, Galle, Matara districts). Realistic geography: Kalu Ganga and Gin Ganga rivers visible as winding blue-gray (#1a2744) lines. Coastline along bottom/left. Roads as thin gray lines (white at 15% opacity). Town labels in Label Small (10pt "Inter" Medium, white at 35%).

25+ MARKERS following Map Marker Specifications:
— 8 red pulsing circles (24dp, #EF4444, with double concentric rings at 30%/10% opacity) near rivers.
— 5 orange teardrop pins (32dp, #F97316, white category icons 16dp inside) — VERIFIED.
— 4 yellow warning triangles (28dp, #EAB308, "!" inside) along roads.
— 3 green rounded squares (28dp, #22C55E, "+" inside) near towns. Each has a tiny white number inside showing occupancy count ("182", "45", "300").
— 4 blue cluster circles (36dp, #3B82F6, 2px white border, white numbers "5", "12", "3", "8", blue glow).
— 2 gray faded pins (same shapes at 60% opacity) — DISMISSED.
— FLOOD POLYGON: Large irregular semi-transparent red overlay (#EF4444 at 15%, 2px solid red border) along Kalu Ganga floodplain. Polygon follows natural terrain — not rectangular.
— ROAD HAZARD LINES: 2 orange dashed lines (4px, dash 12px gap 6px, #F97316) overlaid on road segments, with small ⚠️ icons (16dp) at each end.
— All markers have shadow: 0 2px 4px rgba(0,0,0,0.3).

FILTER SIDEBAR (280px wide, overlaying map left, card surface at 92% opacity, 16px backdrop-blur, 16dp radius right corners, shadow Level 3):
— "FILTERS" in Label Medium (11pt ALL CAPS, primary text) + "«" collapse toggle (Material Symbols "chevron_left", 20dp, secondary, 36dp touch target) right.
— CATEGORY (16dp below, 12dp gap between checkboxes):
  ✅ 🌊 Floods (67) — checked (18dp accent checkbox), red dot, Body Medium count.
  ✅ ⛰️ Landslides (23) — checked, brown dot.
  ✅ 🚧 Road Problems (34) — checked, orange dot.
  ☐ 🌉 Bridge Issues (8) — UNCHECKED (18dp empty checkbox, divider border), gray dot, dimmed text.
— SEVERITY (16dp below): Label "Severity" Label Medium ALL CAPS. Multi-select pills (4dp gap):
  "Critical" (red, selected — filled), "High" (orange, selected), "Medium" (amber, unselected — outlined), "Low" (green, unselected). Each pill 60×32dp, 8dp radius.
— STATUS (16dp below): Label "Status". Toggle buttons — "Unverified" (red tint bg, ON), "Verified" (orange tint, ON), "Closed" (gray, OFF). Each 90×32dp, 8dp radius.
— DATE: dropdown "Last 24 hours ▾" (full sidebar width minus padding, 36dp, 8dp radius).
— DISTRICT: searchable dropdown "All Districts ▾" (same styling).
— "Reset All Filters" in Body Small (secondary accent, underlined), 16dp from bottom of section.

MAP CONTROLS (top-right of map, 16dp margin, stacked 40×40dp buttons, card surface, 8dp radius, shadow Level 2, 4dp gap):
— Zoom + (Material Symbols "add") / Zoom − ("remove")
— Fullscreen (Material Symbols "fullscreen")
— Map style selector — shown EXPANDED: 4 small thumbnails (60×40dp each, 4dp radius, 1px border) in a horizontal popup card: "Standard" (light map preview), "Satellite" (aerial), "Dark ✓" (dark map, accent border indicating selected, checkmark overlay), "Terrain" (topo). The popup card is 280×56dp, card surface, 8dp radius, shadow Level 3.
— My location (Material Symbols "my_location", crosshair)
— Measure distance (Material Symbols "straighten", ruler)
— Heatmap toggle (Material Symbols "local_fire_department")
— Cluster toggle (Material Symbols "bubble_chart")
Active buttons have accent-tinted background (accent at 12%).

INCIDENT POPUP (shown as if orange pin was clicked, floating near clicked marker):
Card: 340×220dp, card surface, 16dp radius, shadow Level 4, "✕" close 24dp top-right. Pointer triangle (12dp) pointing down toward the marker below.
Inside (16dp padding):
— Row: "🌊 Flood — River Overflow" (Title Small 14pt Bold) + "CRITICAL" red pill + "VERIFIED" orange pill.
— "Kalu Ganga Overflow" in Title Medium (15pt "Inter" SemiBold, primary).
— "Ratnapura District • 3 hours ago" in Body Small (secondary).
— "Water rising rapidly. Multiple houses affected. 45 people stranded." in Body Medium (primary, 2 lines).
— Stats: "👥 45 · 📷 3 photos · Confidence: 78%" in Body Small.
— Buttons row (8dp gap): "View Details →" (accent fill, 32dp tall, 8dp radius, white Label Large) + "✓ Confirm" (green outlined, 32dp) + "✗ Deny" (red outlined, 32dp).

LEGEND (bottom-right, 200×180dp, card surface at 90%, 12dp radius, shadow Level 2, 12dp padding):
"Map Legend" in Label Large (12pt Bold). Rows (20dp each): colored marker + Label Medium label — Unverified (red circle), Verified (orange pin), Road Issue (yellow triangle), Safe Place (green square), Cluster (blue circle), Closed (gray pin), Flood Zone (red polygon swatch). Bottom: "Last updated: 12s ago" in Caption + green dot (6dp, pulse glow).

STATS BAR (bottom, 48dp, full width, card surface at 95%, 1px top border, 16dp h-padding):
Left: "142 incidents shown | 3,847 affected | 67 verified | 12 safe places | Last sync: 12s ago" in Body Small (12pt, key numbers in "Inter" SemiBold primary text, labels in secondary text). Pipes in secondary at 30%.
Right: "6.5325° N, 80.2340° E" in Caption (9pt "JetBrains Mono", secondary text) — cursor coordinates.

Generate the DARK MODE version.
```

---

### PROMPT W4 — Relief & Donation Tracking

```
[INSERT GLOBAL DESIGN SYSTEM HERE]
[INSERT PALETTE HERE]

Generate a single high-fidelity web dashboard UI at 1920×1080px. No browser chrome. RELIEF & DONATION TRACKING page. Left sidebar with "Relief & Donations" selected. Same navbar.

PAGE HEADER (80dp, 24dp padding):
"📦 Relief & Donation Management" in Display Medium (28pt "Inter" Bold, primary text). Below (4dp): "Track food queues, medical supplies, and donor pledges across all active disaster tickets" in Body Large (14pt "Inter" Regular, secondary text). Right: "➕ Create New Request" accent fill button (44dp tall, 12dp radius, white Label Large).

MEAL WINDOW SELECTOR (full width card, 80dp, card surface, 16dp radius, 16dp padding):
3 tab buttons (each 33%, 56dp tall, 12dp radius):
— "🌅 Breakfast (06:00 – 09:00)" — INACTIVE: card surface nested, secondary text, Body Large (14pt).
— "☀️ Lunch (11:00 – 14:00)" — ACTIVE: accent-colored 3px bottom border, accent text (Title Medium 15pt SemiBold), faint accent bg (accent 5%). Tab has subtle scale: appears 1px taller than inactive tabs.
— "🌙 Dinner (17:00 – 20:00)" — INACTIVE.
Status strip below tabs (inside same card, 36dp): "LUNCH WINDOW ACTIVE — Closes in 1h 15m" in Label Large (12pt "Inter" SemiBold, accent). Time "1h 15m" in "JetBrains Mono" SemiBold. Stat pills (separated by " | "): "18 requests" (primary) · "2,400 needed" (#EF4444 Bold) · "1,680 pledged" (#22C55E Bold) · "720 remaining" (#F59E0B Bold).

═══ KANBAN 3-COLUMN LAYOUT (equal width ~520px, 16dp gap) ═══

COLUMN 1 — "📋 OPEN REQUESTS":
Column header (48dp, 4px red left border): "Open" in Title Large (16pt Bold) + "8" red pill (Label Small) + "1,240 packs unmet" (Body Small, secondary).

Card 1 (card surface, 16dp radius, shadow Level 1, 4px red left border, 16dp padding):
— "🍱 200 Lunch Packs" in Title Medium (15pt Bold) + right "URGENT" red pill.
— "📍 Ratnapura Safe Center — INC-2026-00142" Body Small (12pt, secondary).
— PROGRESS BAR (12dp below, 12dp tall, full width, rounded pill):
  [GREEN 60% "120 Pledged"] [BLUE 15% "30 In Transit"] [RED 25% at 25% opacity "50 Remaining"] — Labels in Label Small (10pt white, centered per segment). 2px glass highlight on green. Animation streak at green leading edge.
— "4 donors · Deadline: 1:30 PM (47 min)" in Caption, time in amber "JetBrains Mono".
— "📋 Assign Donor" accent outlined btn (32dp, 8dp radius).
Card 2: "💧 300 Water" — 40% green, 60% red empty. MEDIUM. Accent outlined button.
Card 3: "🍱 150 Dinner" — 0%. "No donors yet" red text. "NEW" green pill.

COLUMN 2 — "🚚 IN TRANSIT":
Header: blue left border, "In Transit" + "4" blue pill + "380 moving" secondary.
Card 1: "50 Lunch → Ratnapura" Title Small. "Donor: Red Cross Chapter 3" Body Small. "ETA: 45 min" in "JetBrains Mono" Body Small, blue text. Two buttons: "📞 Contact" outlined + "✅ Mark Delivered" green fill 32dp.
Card 2: "100 Lunch → Matara" — "Lions Club" — "ETA: 1.5 hours".

COLUMN 3 — "✅ DELIVERED":
Header: green left border, "Delivered" + "12" green pill + "1,680 total" secondary.
Card 1 (92% opacity): "100 Breakfast ✓" Title Small. "Delivered 8:45 AM by Lions Club" Body Small. Green checkmark overlay (24dp, #22C55E, semi-transparent). Timestamp "3h ago" Caption.
Card 2: "200 Water ✓" — "7:30 AM" — green check.

═══ BOTTOM SECTION ═══

Relief type tabs (full width, 48dp): "🍱 Food" (selected, accent underline 3px) · "🏥 Medical" (badge "3") · "💧 Water" · "🧸 Baby Items" · "🧥 Clothing" — all Body Large, 16dp gap.

Data table (5 columns × 5 rows, compact): Headers in Label Medium. "REL-001" (JetBrains Mono) | "🏥 First Aid" | "50 needed" | "Ratnapura" | "OPEN" red pill | [Assign btn]. Row height 44dp.

RIGHT SIDEBAR (240px, card surface, 1px left border):
"🏆 Top Donors Today" Title Large (16pt Bold). Ranked list (Body Medium, 44dp rows):
  🥇 "Sri Lanka Red Cross" — "450 packs" Bold + mini bar (80px×6dp, green, proportional).
  🥈 "Lions Club Colombo" — "200 packs" + shorter bar.
  🥉 "Local Volunteers" — "150 packs"
  4-5: more donors, no medals.
"Total active donors: 23" in Caption. "Invite Donors →" secondary accent link.

Generate the DARK MODE version.
```

---

### PROMPT W5 — Officer Verification & Admin Panel

```
[INSERT GLOBAL DESIGN SYSTEM HERE]
[INSERT PALETTE HERE]

Generate a single high-fidelity web dashboard UI at 1920×1080px. No browser chrome. OFFICER VERIFICATION & ADMIN page. Left sidebar with "Officer Mgmt" selected (amber "5" badge). Same navbar.

PAGE HEADER (80dp, 24dp padding):
"👤 Officer Management & Verification" in Display Medium (28pt "Inter" Bold). Subtitle: "Approve trusted field officers, manage roles, and audit system activity" Body Large (14pt, secondary).

TAB NAVIGATION (48dp, full width, 1px bottom border):
"⏳ Pending Approval (5)" — ACTIVE: accent 3px bottom border, accent text, Title Small (14pt "Inter" SemiBold). + "✅ Active Officers (34)" inactive secondary + "🚫 Suspended (2)" inactive + "📋 Audit Log" inactive. Tabs 16dp apart.

═══ SPLIT: 58% TABLE, 42% REVIEW PANEL ═══

LEFT (58%) — PENDING TABLE:
Column headers (40dp, Label Medium ALL CAPS): Photo (60px) | Full Name (170px) | NIC Number (130px) | Role Applied (170px) | Badge ID (90px) | District (110px) | Applied (85px) | Actions (200px)

5 rows (56dp each):
Row 1 — HIGHLIGHTED (accent at 5% bg, currently being reviewed):
[Avatar circle 36dp, gradient placeholder, person icon 20dp secondary] | "K. W. Fernando" (Title Small 14pt "Inter" SemiBold) | "1992•••••••V" ("JetBrains Mono" Body Small, partially masked with "•" characters) | "Police Officer (OIC)" + small police badge icon (Material Symbols "local_police", 16dp, secondary) | "PO-2345" (JetBrains Mono Label Medium) | "Colombo" (Body Small) | "2h ago" (Body Small secondary) | [✅ "Approve" green fill 32dp btn] [❌ "Reject" red outlined 32dp] [👁️ "Review" accent outlined 32dp, slightly glowing border 0 0 4px rgba(accent,0.2)]

Row 2: avatar | "S. Rajapaksa" | masked NIC | "Grama Niladhari" + GN icon | "GN-5678" | "Kandy" | "5h" | same buttons.
Row 3: "T. Kumarasinghe" | "Medical Officer (MOH)" + medical icon | "MOH-912" | "Matara" | "1d"
Row 4: "R. N. Bandara" | "Disaster Relief Officer" | "DRSO-333" | "Galle" | "2d"
Row 5: "M. Perera" | "Military Officer (Army)" + military icon | "MIL-456" | "Ratnapura" | "3d"

RIGHT (42%) — REVIEW PANEL (card surface, 4px left shadow Level 3, slide-in effect implied):

HEADER (24dp padding):
— Large avatar (80×80dp, circular, gradient placeholder #374151→#4B5563, person icon 40dp secondary text). Online dot (12dp, #22C55E) bottom-right of avatar.
— "K. W. Fernando" in Headline Medium (20pt "Inter" Bold, primary). Below (2dp): "Police Officer — Officer in Charge (OIC)" in Body Large (14pt, secondary). Below (4dp): "⏳ PENDING REVIEW" amber pill (Label Medium, ALL CAPS, #F59E0B).

DETAILS SECTION (16dp padding, 12dp below header, card surface nested at +2% brightness, 12dp radius):
Label-value pairs (28dp row height, labels in Label Medium ALL CAPS secondary, values in Body Large primary, "JetBrains Mono" for NIC/phone/badge):
— "NIC NUMBER:" "199234XXXXXV"
— "PHONE:" "+94 77 123 4567"
— "SERVICE ID:" "PO-2345"
— "DISTRICT:" "Colombo"
— "STATION:" "Colombo North Police Station"

DOCUMENTS SECTION (16dp below, 16dp padding):
"📄 Submitted Documents" in Title Large (16pt Bold). 3 document thumbnails (16dp below, each 150×100dp, 8dp radius, 8dp gap):
— "NIC Front" (Label Medium centered below): Rectangle with heavy Gaussian blur (30px radius) applied to content — colors suggest an ID card but text is unreadable for privacy. Magnifying glass overlay icon (Material Symbols "zoom_in", 28dp, white at 50%) centered on thumbnail. Subtle inner shadow (inset 0 1px 3px rgba(0,0,0,0.2)).
— "NIC Back": Same blur treatment with different base color tones.
— "Service Badge": Blurred rectangle suggesting a badge photo, slightly bluer base.
Below thumbnails: "Click to enlarge and verify" in Caption (9pt, secondary, italic).

DECISION SECTION (20dp below, 16dp padding, 3px top border in accent):
"⚖️ Approval Decision" in Title Large (16pt Bold, primary). The accent top border gives this section visual weight.
— Dropdown 1: "Assign Role ▾" (full width, 40dp, 12dp radius, 1.5px border, Body Large text): pre-filled "Police Officer (OIC)".
— Dropdown 2: "Assign District ▾": "Colombo" pre-filled.
— Dropdown 3 (8dp below): "Assign GN/DS Division ▾": "Select division..." placeholder (secondary text at 50%).
— Textarea (12dp below): "Admin Notes" (Label Large above, Body Large inside). 80dp tall, 12dp radius, 1.5px border. Placeholder: "Add verification notes, reasons for decision..." (secondary at 40%).
— 3 action buttons (16dp below, full width, 12dp gap, stacked):
  "✅ Approve Officer" — #22C55E fill, white text, 48dp tall, 12dp radius, Label Large UPPERCASE. Shadow Level 2. Shows subtle ripple (green at 6%, 50% coverage). This is the PRIMARY action.
  "❌ Reject Application" — transparent, 2px #EF4444 border, #EF4444 text, 44dp tall, Label Large.
  "📎 Request More Documents" — transparent, 2px #F59E0B border, #F59E0B text, 40dp tall (smallest), Label Large.

OVERALL: Secure administrative panel. The review panel feels thorough and official — government HR system quality. Document blur treatment shows privacy awareness. Action buttons have clear color hierarchy: green = approve, red = reject, amber = defer.

Generate the DARK MODE version.
```

---

## 📝 USAGE INSTRUCTIONS

### Assembly order for each prompt:
1. Copy the **GLOBAL DESIGN SYSTEM** block (the large system block at the top).
2. Copy ONE **PALETTE** block (e.g., Palette 1).
3. Copy ONE **SCREEN PROMPT** (e.g., M1).
4. In the screen prompt, replace `[INSERT GLOBAL DESIGN SYSTEM HERE]` with the full design system text.
5. Replace `[INSERT PALETTE HERE]` with the palette text.
6. Change last line to "Generate the LIGHT MODE version." for the alternate.
7. Paste combined text into Grok 4.6 and generate.

### If prompt is too long for Grok:
Split into 3 messages:
— Message 1: Design System block → "Remember this design system."
— Message 2: Palette block → "Apply this color palette."
— Message 3: Screen prompt → generates the image.

### Total possible outputs:
12 screens × 5 palettes × 2 modes = **120 unique mockups**

### Recommended starting order:
1. **M1 + Palette 1** dark → mobile identity
2. **W1 + Palette 1** dark → web identity
3. **M2 + Palette 1** dark → SOS validation
4. Pick favorite palette → generate all 12 screens with it
5. Light mode variants for all 12
6. Explore 1-2 alternate palettes for hero screens
