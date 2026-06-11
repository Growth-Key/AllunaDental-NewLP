@AGENTS.md

# Alluna Dental — "Spa Experience" Angle-Test Landing Page

Single-page, mobile-first landing page testing the **Spa Experience** marketing angle for
Alluna Dental (Dr. David Cohen, Studio City). Design reference: lush-dental.com/patient-info
(editorial luxury: serif + italic accents, roman-numeral sections, hotel-spa vocabulary).
This angle is NOT yet in the vault's Testing Roadmap — this LP is its first artifact.

**Client source of truth:** `~/Obsidian/Growth Key Vault/01 — Clients/Alluna Dental/`
(Brand DNA, Voice & Tone, Offers, compliance constraints). Read it before editing copy.

## Run / verify

```bash
npm run dev          # local dev (Turbopack)
npm run build        # production build + typecheck
npm start            # serve production build on :3000
node scripts/qc.mjs 390 844    # QC: overflow + per-section screenshots + form smoke test
node scripts/qc.mjs 1440 900   # same at desktop — output in /tmp/lpshots/<width>-teal/
```

## Single version (decided 2026-06-10)

**Canonical page: `/teal#consultation`.** The earlier warm/ivory variant is RETIRED —
`/` 307-redirects to `/teal` (next.config.ts), the warm hero media was deleted, and the
Alluna teal palette (#11383c ink, aqua surfaces, #1e7e82 accent) is now the DEFAULT
`@theme` in `globals.css` (no `.theme-teal` class, no variant props). Lead submissions
still carry `variant: "teal"` for reporting continuity. To resurrect the warm look:
git history has the token values, and the warm hero plate can be re-downloaded from
Higgsfield job 5c616013-0f28-4f6d-a9ae-41a275bd3dc1 (teal plate:
b545f1a9-27dc-4c37-9f42-bbe337bd0b39). Theming stays pure CSS — components use semantic
tokens (`ivory/espresso/brass/...`); don't hardcode colors in components.

## Decisions made with Shawn (2026-06-10)

- **Lead capture:** multi-step form (interest → contact + TCPA consent) + mobile sticky bar
  (Call / Free Consultation). Form posts to `/api/lead`.
- **Lead routing:** STUB — `src/app/api/lead/route.ts` validates + `console.log`s only.
  `TODO(launch)`: wire GoHighLevel webhook or email before traffic.
- **Visual direction:** warm spa editorial (ivory/cream/sand + espresso + brass; Fraunces
  serif + Inter), intentionally distinct from the teal main site for a clean angle test.
- **Scope:** cosmetic-led ($7,500 3D-printed offer in supporting role, porcelain as premium
  tier), spa experience woven through every section.

## Compliance rules baked into the copy (DO NOT regress)

From vault Brand DNA §10 / Voice & Tone:

- HARD BAN: pain, needle, injection, drilling (except "no drilling"-style contrast),
  sensitivity, surgery, "procedure" in scary contexts. Use process/visit/session.
- NO red anywhere (palette or imagery). No painful/clinical imagery.
- NO "Top-Rated", "best", "#1", "specialist" (CA Dental Board regulated claims) — this is
  why the hero does NOT mirror Lush's "Top-Rated" headline; we lead with factual
  "5.0 · 153+ reviews on Google" instead.
- NO discount language. Free consultation is the only incentive. "Limited spots" is OK.
- Claims must carry proof (5.0/153 reviews, DDS #109532, UCLA/USC, 2M+ followers).
- Testimonials in `Reviews.tsx` are VERBATIM from allunadental.com (chosen because they
  fit the spa angle and don't name former associate doctors). Do not paraphrase; swap only
  for real reviews.

## Asset provenance (`public/media/`)

- `hero-bg.mp4` + `hero-poster.jpg` — **TEMPORARY AI placeholder** (Higgsfield Seedance 2.0,
  job 5c616013-0f28-4f6d-a9ae-41a275bd3dc1, 10 s 1080p, re-encoded CRF 24, audio stripped).
  Swap for real Alluna interior footage before launch.
- `case{1,2,3}-{before,after}.jpg` — sliced (ffmpeg crop) from the real before/after strip
  on allunadental.com (`/images/smile-proof/section.webp`). Real patients.
- `dr-cohen.webp`, `alluna-logo.webp` — pulled from allunadental.com. The portrait has a
  baked-in pale-blue card + teal border from the old site; ask Dr. Cohen for the original
  photo eventually.

## Structure

`src/app/page.tsx` assembles: Hero → LeadForm (#consultation) → Experience → Gallery →
Reviews → Doctor → Process ("Smile Test-Drive") → Tiers → Faq → Reservations → Footer →
StickyBar. Section ids exist on all sections (anchors + scroll tracking). JSON-LD
(Dentist + FAQPage) is in `page.tsx`; FAQ copy lives in `src/components/faq-data.ts`
(shared with the client accordion — keep them as one source).

## Meta ads compliance (audited 2026-06-10)

The LP copy was scrubbed against Meta's Personal Health policy and Special Ad Categories:

- **Credit (the one real Special-Category risk):** financing language is deliberately
  centralized. Exactly ONE specific credit-terms mention exists ("0% APR options through
  Cherry" in the Tiers financing band); everywhere else says "flexible payment plans" /
  "payment plans available". Do NOT reintroduce "0% APR"/"financing" into the form, hero,
  sticky bar, or any above-the-fold copy — and NEVER into Meta ad creative, or the campaign
  risks Credit special-category classification.
- **Before/after gallery:** allowed on the LP with the "Individual results vary. Shown with
  patient permission." disclaimer. PROHIBITED in Meta ad creative (Personal Health policy
  bans before/after images in ads). If Meta ever flags the destination, removing the
  gallery section is the first lever.
- **No negative self-perception copy:** the spa angle avoids "your face changed/collapsed"
  style hooks entirely (those live in the OTHER Alluna angle and are ad-policy-risky).
  Keep it that way on this page and in this campaign's ad creative.
- **Scarcity:** "Limited spots each week" is approved brand language tied to a real
  constraint (vault). Keep truthful or remove.
- **Form qualifiers:** timeline/motivation/payment-preference questions are user-initiated
  form inputs (not targeting), fine under Meta policy, and double as the lead-quality
  filter. There is deliberately NO price gate (see Pricing below).
- **Campaign settings (not copy):** cosmetic-services ads → target 18+; don't pass
  health-condition signals via pixel custom events (Meta health data restrictions).

## Lead qualification (form)

6 steps (Shawn's picks, 2026-06-10): interest → smile concern → motivation → timeline →
payment preference → contact + TCPA consent. Steps are config-driven via `QUESTION_STEPS`
in `LeadForm.tsx`. `priority` = high (hot timeline AND hot payment: full/monthly), medium
(one), nurture (neither); concern + motivation are logged as concierge call-openers.

**No price gate, by decision.** The earlier "$7,500 minimum" anchor was WRONG — per
`Alluna_Veneers_Pricing_Matrix_1.xlsx` (recorded in the vault's Offers file), recurring
cases start at $4,500 (6-tooth Social Six No-Prep) and Alluna takes all case sizes. The
payment-preference question carries the financial signal instead; "hoping to use
insurance" flags the cosmetic-isn't-covered conversation.

## Pricing & naming on the page (Shawn, 2026-06-10)

- **No specific prices anywhere on the LP** — "exact pricing in writing at your free
  session" everywhere. Don't reintroduce dollar figures without asking.
- **"No-Prep Veneers"** is the patient-facing product name (market-recognized, per the
  pricing matrix); "3D-printed" appears only as the production method in supporting copy.

## Reviews & confirmation page (2026-06-10)

- **Reviews carousel** (`ReviewsCarousel.tsx`): animated, 3 per page (stacked on mobile),
  auto-advances every 6.5 s (paused on hover, disabled under prefers-reduced-motion),
  arrows + dots. Review content lives ONLY in `reviews-data.ts` — swap/extend there.
- **Review provenance:** Google currently SUPPRESSES the review module on Alluna's GBP
  (rating visible, content hidden — flagged in the vault's Asset Library Index). The five
  carousel quotes are verbatim from the testimonials Alluna publishes on allunadental.com;
  two truncated at sentence boundaries to omit pre-Cohen doctor names. When real Google
  review exports are available, replace the array.
- **/welcome confirmation page:** form submit navigates to
  `/welcome?name=<First>&v=<variant>` — personalized headline, "spa day your smile has
  been waiting for" line, what-happens-next steps, reviews carousel, themed per variant.
  USE `/welcome` AS THE META PIXEL LEAD-CONVERSION URL (clean thank-you event, no extra
  setup). Do not rename the practice to "Alluna Dental Spa" in copy — fictitious-name rules.

## Open before launch

1. Wire `/api/lead` to real destination (GHL webhook / email).
2. Swap hero video for real footage (or approve AI plate for the test).
3. `robots` is `noindex` and `metadataBase` points at allunadental.com — update both when
   the final domain (e.g. spa.allunadental.com) exists.
4. No privacy/HIPAA/accessibility pages exist on this LP — link to main-site pages or add.
5. Office hours intentionally NOT listed (practice currently operates limited days —
   vault). "By appointment" framing instead; revisit if hours expand.
6. Add call-tracking / pixel + UTM capture when campaign goes live.
