import { Container, Em, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

const AMENITIES = [
  {
    numeral: "i",
    title: "A movie with every visit",
    body: "Pick something to watch, settle in with noise-canceling headphones, and let the appointment pass like a private screening.",
  },
  {
    numeral: "ii",
    title: "Wrapped in comfort",
    body: "Soft blankets, a plush chair, and a team that checks in before you ever have to ask.",
  },
  {
    numeral: "iii",
    title: "Calm, on request",
    body: "Laughing gas is always available — and with our no-prep veneers, most visits need no numbing at all.",
  },
  {
    numeral: "iv",
    title: "Your smile, previewed first",
    body: "See your new smile in a digital 3D preview — then test-drive temporaries — before anything is final.",
  },
  {
    numeral: "v",
    title: "Payment plans, arranged quietly",
    body: "Flexible monthly plans through Cherry and in-house options, set up in writing before treatment ever begins.",
  },
  {
    numeral: "vi",
    title: "Booking without phone tag",
    body: "Request your session online any time. Our concierge team confirms within one business day.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-6 bg-ivory">
      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            numeral="I"
            label="The Alluna Experience"
            title={
              <>
                Spa-level <Em>comfort</Em>.<br />
                Master-level dentistry.
              </>
            }
            sub="Every detail of the studio is designed around one idea: a dental visit you don't have to brace for."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((item, i) => (
            <Reveal key={item.numeral} delay={Math.min(i * 0.06, 0.3)}>
              <div className="border-t border-line pt-6">
                <p className="font-display text-sm tracking-[0.3em] text-brass">{item.numeral}</p>
                <h3 className="font-display mt-3 text-2xl font-light">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cocoa">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
