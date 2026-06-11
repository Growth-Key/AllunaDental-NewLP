import { Container, Em, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    number: "01",
    title: "Design",
    body: "Your free smile design session: a relaxed conversation, a digital scan, and a 3D preview of your future smile — with a written plan and exact pricing.",
  },
  {
    number: "02",
    title: "Test-drive",
    body: "Wear hand-shaped temporaries and live with your new smile first. Shape, length, shade — refined until it's exactly you.",
  },
  {
    number: "03",
    title: "The reveal",
    body: "Your final veneers, hand-finished by a master ceramist and placed in one calm visit. The smile you walk out with is exactly the one you chose.",
  },
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-0 bg-ivory">
      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            numeral="V"
            label="The Smile Test-Drive"
            title={
              <>
                See it. <Em>Wear it.</Em>
                <br />
                Then make it permanent.
              </>
            }
            sub="Nothing is bonded until you've already seen — and worn — your new smile. The 'what if I don't love it' question is answered before it's ever asked."
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={Math.min(i * 0.08, 0.24)}>
              <div className="border-t border-line pt-6">
                <p className="font-display text-sm tracking-[0.3em] text-brass">{step.number}</p>
                <h3 className="font-display mt-3 text-2xl font-light">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cocoa">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-12 text-center text-sm text-taupe">
            Porcelain: about a month, 3–4 visits &nbsp;·&nbsp; No-prep: 2 visits, no numbing
            needed
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
