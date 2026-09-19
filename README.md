# FloodBlast — Disaster Management Platform for Sri Lanka
## Software Requirements Specification & Feature Checklist

> **Core Philosophy:** *Text & Location First → Voice Second → Images Third → Videos Last*  
> Designed for life-saving resilience under extreme conditions: weak 2G/EDGE connectivity, prolonged blackouts, and high-stress disaster environments across Sri Lanka.

---

## 1. User Personas & Role-Based Access (RBAC)

### 1.1 Normal User / Victim
- [ ] **FR-USR-01: Zero-Login Access:** Access all emergency reporting, map visualization, and safety features without mandatory account registration or login.
- [ ] **FR-USR-02: Device Fingerprint Registration:** Automatically register an anonymous device UUID on first launch to allow local draft persistence and rate-limiting.
- [ ] **FR-USR-03: Privacy & Contact Shielding:** Keep reporter contact details private by default; require explicit user opt-in before exposing phone numbers to responders.
- [ ] **FR-USR-04: Full Citizen Privileges:**
  - View live disaster map and incident cards.
  - Submit incident and road damage reports.
  - Report vulnerable victims (pregnant, injured, elderly, disabled, children).
  - Request emergency relief (food, water, medicine, baby items).
  - Search location-aware emergency contacts and safe places.
  - Cast proximity verification votes on nearby incidents.

### 1.2 Verified Citizen / Donor
- [ ] **FR-USR-05: Phone OTP Authentication:** Authenticate via Sri Lankan mobile phone number (+94) using SMS OTP.
- [ ] **FR-USR-06: Resource Pledging:** View active food and medical requests, pledge full or partial quantities, and track delivery status (`PLEDGED` $\rightarrow$ `IN_TRANSIT` $\rightarrow$ `DELIVERED`).
- [ ] **FR-USR-07: Donor History:** Maintain a history of fulfilled pledges and active commitments.

### 1.3 Trusted User / Field Officer
- [ ] **FR-USR-08: Mandatory Officer Verification:** Require login with National Identity Card (NIC), official service/badge ID, and administrative role assignment.
- [ ] **FR-USR-09: Supported Administrative Roles:**
  - Police Officer (OIC / ASP / HQI)
  - Grama Niladhari (GN Officer)
  - Divisional Secretary (DS Officer)
  - Disaster Relief Services Officer (DRSO / NDRSC)
  - Medical Officer of Health (MOH / Public Health Inspector)
  - Military / Tri-Forces SAR (Army, Navy Flood Rescue, Air Force)
  - Sri Lanka Red Cross / Civil Defence Force
  - Irrigation Department Hydrology Officer
- [ ] **FR-USR-10: Elevated Operational Authority:**
  - Instant auto-verification of incident reports (10x vote weight).
  - Instant incident status updates and severity overrides.
  - Manage and update safe place capacities and evacuee counts.
  - Request or execute ticket closures.
  - Direct coordination with emergency dispatch.

### 1.4 Emergency Operations Center (EOC) / System Admin
- [ ] **FR-USR-11: Centralized Governance:** Access web dashboard for nationwide situational awareness, audit logs, officer vetting/approval, and broadcast alerts.

---

## 2. Functional Requirements (FR)

### 2.1 Geospatial & Location Services
- [ ] **FR-GEO-01: Hardware GPS Acquisition:** Automatically capture device latitude, longitude, altitude, horizontal accuracy (± meters), and timestamp without requiring mobile data.
- [ ] **FR-GEO-02: Accuracy Confidence Warning:** Display visual indicator of GPS precision (High $\le 15\text{m}$, Moderate $15\text{--}50\text{m}$, Low $> 50\text{m}$) and support manual pin adjustment on map.
- [ ] **FR-GEO-03: Administrative Boundary Reverse-Geocoding:** Automatically resolve GPS coordinates to Sri Lanka's 4-tier administrative hierarchy using PostGIS polygon containment:
  $$\text{GPS Point} \implies \text{Grama Niladhari (GN)} \implies \text{Divisional Secretariat (DS)} \implies \text{District} \implies \text{Province}$$

---

### 2.2 Incident Reporting & Progressive Media Ingestion
- [ ] **FR-REP-01: Multi-Hazard Classification:** Support reporting across predefined and dynamic hazard categories:
  1. Flood (River Overflow, Reservoir/Tank Spillage, Urban Inundation)
  2. Landslide (Slope Failure, Mudslide, Rockfall)
  3. Road Problem (Road Broken, Road Flooded, Tree Fall, Rockfall)
  4. Bridge Problem (Bridge Damaged, Bridge Collapsed)
  5. Building / Structure Collapse
  6. Accident / Stranded Victims
  7. Other Emergency
- [ ] **FR-REP-02: 1-Tap Emergency SOS Mode:** A prominent, zero-typing emergency trigger that packages current GPS + timestamp + "Trapped / Urgent Help" signal in a single tap.
- [ ] **FR-REP-03: Tiered Bandwidth Priority Pipeline:**
  - **Tier 1 (Immediate, 1–2 KB):** GPS coordinates, category, timestamp, text description, victim counts. Sent immediately.
  - **Tier 2 (High, 30–60 KB):** Voice note compressed with Opus codec (16 kbps mono, max 2 min).
  - **Tier 3 (Medium, 150–250 KB):** Photo compressed client-side to WebP (max 1280×720 @ 70% quality).
  - **Tier 4 (Low, 5–20 MB):** Video recording deferred until stable Wi-Fi or 4G connection.
- [ ] **FR-REP-04: Non-Blocking Media State Machine:**
  - Reports containing images must not fail if the network drops during upload.
  - Text/GPS payload is uploaded immediately $\rightarrow$ marked `MEDIA_PENDING` $\rightarrow$ pin appears on map.
  - Image is uploaded in background via resumable chunked protocol (Tus.io) $\rightarrow$ transitioned to `MEDIA_AVAILABLE`.

---

### 2.3 Vulnerable Population & Victim Tracking
- [ ] **FR-VIC-01: Disaggregated Demographic Counters:** Collect headcounts for high-risk individuals:
  - Pregnant women
  - Medical emergencies / Wounded persons
  - Elderly persons (65+)
  - Disabled / Mobility-impaired persons
  - Infants and children (< 12 years)
  - General stranded population
- [ ] **FR-VIC-02: Critical Medical Notes:** Capture urgent medical requirements (e.g., insulin dependency, dialysis needed, oxygen, asthma, severe trauma).
- [ ] **FR-VIC-03: Victim Status Tracking:** Track whether victims are `STRANDED`, `EVACUATED`, `AT_SAFE_PLACE`, or `MISSING`.

---

### 2.4 Incident Deduplication & Master Ticket System
- [ ] **FR-TCK-01: One-Event-One-Ticket Rule:** Prevent duplicate pins for the same geographic disaster event.
- [ ] **FR-TCK-02: Spatial Clustering (PostGIS):** Automatically cluster reports within 75–100m radius using `ST_ClusterDBSCAN` partitioned by disaster category.
- [ ] **FR-TCK-03: Master Ticket Container:** Create a single master ticket (`INC-YYYY-XXXXX`) containing:
  - Centroid location & affected polygon boundary.
  - Aggregated victim demographics.
  - Unified timeline of community updates, voice notes, and media galleries.
  - Associated relief requests and linked safe centers.
- [ ] **FR-TCK-04: Manual Officer Merge:** Allow trusted users to manually link or merge duplicate incidents.

---

### 2.5 Community Verification & Anti-Abuse (Waze-Style)
- [ ] **FR-VER-01: Geofenced Proximity Enforcement:**
  - Eligible voters must be within **500m – 1km** of the incident location (`ST_DWithin`).
  - Users $> 5\text{km}$ away are strictly blocked from voting to prevent remote spam or panic spreading.
- [ ] **FR-VER-02: Weighted Reputation Voting:**
  - Basic Citizen: $+1.0$ (Confirm) / $-1.5$ (Deny)
  - Registered User: $+2.0$ (Confirm) / $-2.0$ (Deny)
  - Trusted Officer: $+10.0$ (Instant Verification)
- [ ] **FR-VER-03: Time-Decay Scoring:** Apply continuous confidence score decay based on hazard half-life:
  $$C(t) = \left( \sum w_i \cdot V_i \right) \times e^{-\lambda (t - t_0)}$$
  - Flash Floods: Rapid decay ($\lambda = 0.35$, half-life $\approx 2$ hours).
  - Landslides / Road Cuts: Slow decay ($\lambda = 0.001$, half-life $\approx 29$ days).
- [ ] **FR-VER-04: Status Transitions:**
  - Score $\ge 5.0 \implies$ `VERIFIED` (Orange pin, dispatched to EOC).
  - Score $1.0\text{--}4.9 \implies$ `UNVERIFIED` (Red pin, awaiting confirmations).
  - Score $< 0 \implies$ `DISMISSED` (Removed from live map).
- [ ] **FR-VER-05: Anti-Abuse Safeguards:**
  - Enforce device-based rate limits (max 3 reports/hour per device).
  - Detect impossible GPS teleportation / mock location tampering.
  - Restrict one vote per user/device per incident.

---

### 2.6 Relief Request & Food Queue Management
- [ ] **FR-REL-01: 3-Meal Daily Food Queue:** Organize food requests by meal window:
  - Breakfast (06:00 – 09:00)
  - Lunch (11:00 – 14:00)
  - Dinner (17:00 – 20:00)
- [ ] **FR-REL-02: Parcel Quantity & Progress Tracking:**
  - Requesters publish exact parcel quantities needed (e.g., 200 lunch packs).
  - Visual progress bar displays: `Required`, `Pledged`, and `Remaining Unmet`.
- [ ] **FR-REL-03: Partial Donation Pledges:** Donors can pledge partial amounts (e.g., 50 packs). The remaining balance (150) stays open for other donors.
- [ ] **FR-REL-04: Medical & Material Requests:** Dedicated request pipelines for:
  - First-aid kits, paracetamol, antibiotics, dressings.
  - Clean drinking water (bottles / bowsers).
  - Blankets, dry rations, baby formula, sanitary items.
- [ ] **FR-REL-05: Lifecycle Statuses:**  
  `REQUESTED` $\rightarrow$ `PARTIALLY_PLEDGED` $\rightarrow$ `FULLY_PLEDGED` $\rightarrow$ `IN_TRANSIT` $\rightarrow$ `DELIVERED` $\rightarrow$ `CLOSED`.

---

### 2.7 Safe Places & Evacuation Centers
- [ ] **FR-SAF-01: Center Directory & Mapping:** Map designated welfare centers, temple halls, schools, and community shelters as green markers (`🟢`).
- [ ] **FR-SAF-02: Facility Auditing:** Display availability status for:
  - Drinking water, electricity/generator, sanitation/toilets, kitchen, medical post, wheelchair accessibility.
- [ ] **FR-SAF-03: Live Occupancy & Capacity Tracking:** Track real-time capacity and current occupancy (e.g., Capacity: 300, Current: 182, Available: 118).
- [ ] **FR-SAF-04: Evacuee Demographics:** Track vulnerable populations housed inside each safe center to calculate automated resource requirements.

---

### 2.8 Location-Aware Emergency Directory
- [ ] **FR-DIR-01: Proximity Administrative Contacts:** Auto-display direct phone contacts for officials governing the user's current GPS location:
  - Grama Niladhari (GN)
  - Divisional Secretary (DS)
  - Local Police Station Officer-in-Charge (OIC)
  - Public Health Inspector (PHI) / Midwife
  - Disaster Relief Services Officer (DRSO)
- [ ] **FR-DIR-02: 1-Tap National Emergency Hotlines (Always Accessible):**
  - **117:** Disaster Management Centre (DMC) Call Centre
  - **119:** Police Emergency Operations
  - **1990:** Suwa Seriya Free Pre-Hospital Ambulance
  - **110:** Fire & Rescue Service
  - **105:** Sri Lanka Navy Flood & Maritime Search and Rescue
  - **116:** Sri Lanka Air Force Helicopter Rescue
  - **113:** Sri Lanka Army Disaster Response
  - **011-258-8946:** NBRO Landslide Early Warning Centre
  - **011-259-0145:** Irrigation Department Flood Monitoring

---

### 2.9 Road Damage & Infrastructure Module
- [ ] **FR-ROA-01: Road Issue Categorization:** Explicit tracking for road broken, bridge collapsed, road submerged, fallen tree, and rockfall.
- [ ] **FR-ROA-02: Segment Highlighting & Direction:** Show affected road segments and directional blockage indicators on the map.
- [ ] **FR-ROA-03: Route Avoidance Warnings:** Alert users when approaching within 2 km of an active verified road hazard.

---

### 2.10 Ticket Closure & Archival Policy
- [ ] **FR-CLS-01: Community Closure Voting:** When a user flags that flood water has receded or a road is cleared, prompt nearby users within 1 km to confirm.
- [ ] **FR-CLS-02: Trusted Officer Closure Override:** Trusted users (GN, DS, Police) have authority to immediately close a ticket.
- [ ] **FR-CLS-03: Hazard Expiration Rules:**
  - Floods: No auto-expiry; must be confirmed closed after water recedes.
  - Landslides: Automatic transition to `ARCHIVED` after 60 days.
  - Road Destruction: Automatic transition to `ARCHIVED` after 90 days.
  - Temporary Obstructions (fallen trees): Auto-expire after 72 hours.
- [ ] **FR-CLS-04: Non-Destructive Archival:** Incidents are never hard-deleted; moved to `ARCHIVED` for historical disaster analytics and flood modeling.

---

### 2.11 AI & Natural Language Processing (Staged)
- [ ] **FR-AI-01: Text Hazard Classification (Phase 1):** Automatically classify freeform text into hazard categories and urgency scores.
- [ ] **FR-AI-02: Vulnerability Entity Extraction (Phase 1):** Parse victim counts (pregnant, injured, elderly, children) directly from text reports.
- [ ] **FR-AI-03: Multilingual Voice-to-Text (Phase 2):** Transcribe 15-second Sinhala, Tamil, and English voice notes using OpenAI Whisper.
- [ ] **FR-AI-04: Semantic Incident Deduplication (Phase 2):** Compute embedding similarities to link separate text reports describing the same physical event.
- [ ] **FR-AI-05: Executive Incident Summarizer (Phase 2):** Generate 3-line situational summaries for EOC officers consolidating multiple updates.
- [ ] **FR-AI-06: Resource Demand Forecasting (Phase 3):** Predict food and water requirements based on flood depth, population density, and weather forecasts.

---

## 3. Non-Functional Requirements (NFR)

### 3.1 Offline-First & Network Resilience
- [ ] **NFR-NET-01: Full Offline Capability:** Read cached map boundaries, create incident drafts, view emergency contacts, and record voice notes completely offline.
- [ ] **NFR-NET-02: Transactional Outbox Pattern:** Queue offline actions in local SQLite/Drift database with `LOCAL_PENDING` status.
- [ ] **NFR-NET-03: Delta-Sync Protocol:** Fetch server updates using cursor-based timestamps (`GET /sync/pull?since=TIMESTAMP&district=X`) to minimize mobile data consumption.
- [ ] **NFR-NET-04: Exponential Backoff:** Retry failed uploads automatically with exponential backoff and jitter upon network recovery.

---

### 3.2 Performance & Scalability
- [ ] **NFR-PRF-01: Low Latency Ingestion:** Process and persist Tier 1 (Text + GPS) payloads in $< 500\text{ms}$.
- [ ] **NFR-PRF-02: High-Density Map Rendering:** Efficiently render 10,000+ incident markers using clustering algorithms without dropping below 55 FPS.
- [ ] **NFR-PRF-03: Disaster Surge Capacity:** Backend must horizontally scale to handle 500,000 active concurrent users during national monsoon emergencies.

---

### 3.3 Battery & Low-End Device Optimization
- [ ] **NFR-BAT-01: Budget Hardware Compatibility:** Support entry-level Android devices (2 GB RAM, Android 10+).
- [ ] **NFR-BAT-02: Adaptive GPS Polling:**
  - Citizen Passive Mode: GPS chip powered off; rely on cell-tower / significant motion ($>250\text{m}$).
  - Active Dispatch Mode: Balanced GPS updates every 15–30 seconds.
  - SOS Beacon Mode: High-accuracy GPS for 15 seconds to lock coordinates, then immediately powered down.
- [ ] **NFR-BAT-03: Dark Mode:** High-contrast dark theme by default to conserve OLED/AMOLED battery during prolonged power outages.

---

### 3.4 Internationalization & Accessibility
- [ ] **NFR-I18N-01: Trilingual UI:** Complete support for Sinhala (සිංහල), Tamil (தமிழ்), and English.
- [ ] **NFR-ACC-01: High-Stress Accessibility:** Minimum touch target size of 48×48 dp, high-contrast iconography, and colorblind-safe marker palettes.

---

## 4. Technical Architecture Stack

```text
├── Mobile Client:      Flutter 3.x (Dart) + Drift (SQLite) + Google Maps SDK
├── Web Dashboard:      React 18 (TypeScript + Vite) + TanStack Query + Tailwind CSS
├── Ingestion Gateway:  FastAPI (Python) or NestJS (TypeScript) + Socket.io WebSockets
├── Geospatial DB:      PostgreSQL 16 + PostGIS 3.4
├── Cache & Realtime:   Redis 7 (Pub/Sub, Geo-Sorted Sets, Rate Limiting)
├── Object Storage:     MinIO / AWS S3 (Resumable chunked uploads via Tus.io)
├── AI / ML Engine:     Python (Whisper STT, Sentence-Transformers, HuggingFace)
├── Push Notifications: Firebase Cloud Messaging (FCM High-Priority) + Dialog/SLT SMS Gateway
└── Infrastructure:     Docker Compose / Kubernetes
```

---

## 5. Implementation Status Checklist

### Phase 1: Foundation & Data Architecture
- [x] Monorepo directory structure (`apps/mobile`, `apps/web-dashboard`, `apps/server`, `packages/shared-types`, `infrastructure/`)
- [x] Shared TypeScript definitions (enums, interfaces, constants)
- [x] Docker environment (PostgreSQL 16 + PostGIS 3.4, Redis 7, MinIO)
- [x] Database schema (`init-db.sql`) with PostGIS spatial indexes and triggers
- [x] PostGIS spatial functions (`resolve_admin_location`, `cluster_incidents`, `find_nearby_incidents`)

### Phase 2: Backend API & Services
- [x] Auth Module (Anonymous device authentication, JWT, role guards)
- [x] TypeORM Entities (Users, Incidents, Tickets, Verifications, Victims, Relief, Safe Places, Contacts)
- [x] GIS Module (PostGIS spatial boundaries, proximity queries, clustering)
- [x] Users Module (Profile management, trusted officer verification flow)
- [x] Incidents Module (CRUD, nearby lookup, cluster queries, auto-location resolution)
- [x] Verification Module (Proximity check, confidence score with time-decay)
- [x] Contacts Module (Location-aware emergency contacts, national directory)
- [x] Sync Module (Cursor-based delta-sync engine)
- [x] Tickets Module (Master ticket lifecycle, closure voting, activity log)
- [x] WebSocket Gateway (Real-time updates partitioned by district rooms)

### Phase 3: Web EOC Dashboard (React + TypeScript)
- [x] Setup & Configurations (Vite, TypeScript, Tailwind CSS)
- [x] Real-time Services (Axios interceptors, WebSockets, TanStack Query hooks)
- [x] Zustand State Stores (Auth, Map, Notifications)
- [x] Google Maps Dashboard with color-coded disaster markers and category filtering
- [x] Incident List, Detail Views, and Victim Breakdown cards
- [x] Emergency Contacts Management & National Numbers directory

### Phase 4: Mobile Application (Flutter + Drift)
- [x] Setup & Dependencies (`pubspec.yaml`, linting, Material 3 Disaster Theme)
- [x] Core Services (GPS location service, API client, connection evaluator)
- [x] Drift (SQLite) Local Database & DAOs (`incidents_dao`, `sync_outbox_dao`)
- [x] BLoC Architecture (`AuthBloc`, `MapBloc`, `IncidentBloc`, `ContactsBloc`)
- [x] Google Maps Screen with custom incident markers and bottom sheets
- [x] Multi-Step Incident Reporting Flow (Category $\rightarrow$ Description $\rightarrow$ Photo $\rightarrow$ Victims $\rightarrow$ Submit)
- [x] Location-aware Emergency Contacts Screen with 1-tap dialer (`tel:`)
- [x] Priority Media Loading with shimmer placeholders
- [x] Background Sync Engine with Outbox Pattern

### Phase 5: AI Services & Deployment (Upcoming)
- [ ] Integrate Whisper Speech-to-Text for Sinhala/Tamil voice notes
- [ ] Train/Fine-tune lightweight text classifier for disaster severity
- [ ] Connect local SMS Gateway (Dialog Ideamart / SLT-Mobitel) for internet blackouts
- [ ] Conduct field testing under simulated 2G conditions
