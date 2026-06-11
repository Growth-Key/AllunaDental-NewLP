import { Container, CtaLink, Em, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

const TIERS = [
  {
    name: "No-Prep Veneers",
    tagline: "The modern path",
    stat: "2 visits",
    statNote: "no drilling · no numbing needed",
    points: [
      "Designed digitally, 3D-printed precisely",
      "Packages tailored from a focused smile zone to a full set",
      "The fastest route to your transformation",
      "Limited spots at current availability",
    ],
    featured: true,
  },
  {
    name: "Porcelain Veneers",
    tagline: "The master-ceramist standard",
    stat: "10–20 years",
    statNote: "hand-crafted to last",
    points: [
      "Crafted by a master ceramist",
      "Harmonized to your facial features",
      "About one month, 3–4 visits",
      "The gold standard for complex cases",
    ],
    featured: false,
  },
];

export function Tiers() {
  return (
    <section id="tiers" className="scroll-mt-0 bg-sand/60">
      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            numeral="VI"
            label="Two Paths"
            title={
              <>
                One smile. <Em>Two ways there.</Em>
              </>
            }
            sub="Every path begins with the same free smile design session — and ends with a smile that's unmistakably yours."
          />
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div
                className={`flex h-full flex-col rounded-3xl border p-7 sm:p-9 ${
                  tier.featured
                    ? "border-brass/40 bg-ivory shadow-[0_24px_60px_-30px_rgba(21,94,98,0.35)]"
                    : "border-line bg-ivory/70"
                }`}
              >
                <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
                  {tier.tagline}
                </p>
                <h3 className="font-display mt-3 text-3xl font-light">{tier.name}</h3>
                <p className="mt-5">
                  <span className="font-display text-4xl font-light">{tier.stat}</span>
                </p>
                <p className="mt-1 text-sm text-taupe">{tier.statNote}</p>
                <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                  {tier.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] leading-snug text-cocoa">
                      <span aria-hidden="true" className="text-brass">
                        —
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-line bg-ivory px-7 py-8 text-center sm:px-10">
            <p className="text-[15px] leading-relaxed text-cocoa">
              Every smile is custom — your exact plan and pricing come in writing at your free
              session. <span className="font-semibold text-espresso">Flexible payment plans</span>{" "}
              are available, including 0% APR options through Cherry. Whitening is included with
              veneer cases.
            </p>
            <CtaLink href="#consultation">Begin With a Free Session</CtaLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
