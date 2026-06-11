import { Container, CtaLink, Em, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

export function Reservations() {
  return (
    <section id="reservations" className="scroll-mt-0 bg-cream">
      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            numeral="VIII"
            label="Reservations"
            title={
              <>
                The studio is <Em>waiting</Em>.
              </>
            }
            sub="Minutes from the Westside and the Valley — Hollywood-level results without the Beverly Hills attitude."
          />
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col gap-6 rounded-3xl border border-line bg-ivory p-7 sm:p-9">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.25em] text-taupe uppercase">
                  The Studio
                </p>
                <a
                  href="https://maps.app.goo.gl/Giyrc9VU1oux4mBJ7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display mt-2 block text-xl leading-snug font-light underline-offset-4 hover:underline"
                >
                  4233 Coldwater Canyon Ave.
                  <br />
                  Studio City, CA 91604
                </a>
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-[0.25em] text-taupe uppercase">
                  Concierge
                </p>
                <a
                  href="tel:+18189803333"
                  className="font-display mt-2 block text-xl font-light underline-offset-4 hover:underline"
                >
                  (818) 980-3333
                </a>
                <a
                  href="mailto:alluna@allunadental.com"
                  className="mt-1 block text-sm text-cocoa underline-offset-4 hover:underline"
                >
                  alluna@allunadental.com
                </a>
              </div>
              <p className="mt-auto border-t border-line pt-5 text-sm leading-relaxed text-taupe">
                By appointment. New patients begin with a free smile design session — our
                concierge team confirms within one business day.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col items-center justify-center gap-6 rounded-3xl bg-espresso p-7 text-center sm:p-9">
              <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
                Limited spots each week
              </p>
              <p className="font-display text-3xl leading-tight font-light text-balance text-ivory">
                Your free smile design session is one step away.
              </p>
              <CtaLink
                href="#consultation"
                className="!bg-ivory !text-espresso hover:!bg-sand"
              >
                Reserve Your Session
              </CtaLink>
              <p className="text-xs text-ivory/60">
                Free consultation · No commitment · Payment plans available
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
