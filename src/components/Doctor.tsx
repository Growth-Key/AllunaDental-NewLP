import Image from "next/image";
import { Container, Em } from "./ui";
import { Reveal } from "./Reveal";

const CREDENTIALS = [
  "UCLA",
  "USC Herman Ostrow",
  "DDS · License #109532",
  "2M+ followers",
];

export function Doctor() {
  return (
    <section id="doctor" className="scroll-mt-0 bg-cream">
      <Container className="py-20 sm:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 mx-auto w-full max-w-sm lg:order-1 lg:max-w-none">
            <div className="overflow-hidden rounded-3xl bg-sand">
              <Image
                src="/media/dr-cohen.webp"
                alt="Dr. David Cohen, DDS — Alluna Dental"
                width={972}
                height={1356}
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="font-display text-sm tracking-[0.35em] text-brass uppercase">
                <span className="mr-3">IV</span>The Doctor
              </p>
              <h2 className="font-display mt-4 text-4xl leading-[1.08] font-light text-balance sm:text-5xl">
                Meet <Em>Dr. David Cohen</Em> — the new face of cosmetic dentistry.
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-cocoa sm:text-base">
                Dr. Cohen designs smiles tailored to your face — never from a template. Trained at
                UCLA and USC&rsquo;s Herman Ostrow School of Dentistry, he pairs digital smile
                design with master-ceramist craftsmanship for results that look effortlessly real,
                never fake.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-cocoa sm:text-base">
                More than 2M people follow his practical dental education across YouTube, TikTok,
                and Instagram. Patients describe visits as welcoming, collaborative, and
                surprisingly enjoyable — comfort and education are built into every appointment.
              </p>
              <blockquote className="mt-7 border-l-2 border-brass pl-5">
                <p className="font-display text-lg leading-snug font-light italic sm:text-xl">
                  &ldquo;Getting veneers is like custom-tailoring your smile. The smile you walk
                  out with is exactly what you envisioned.&rdquo;
                </p>
                <cite className="mt-2 block text-xs tracking-[0.2em] text-taupe uppercase not-italic">
                  Dr. David Cohen
                </cite>
              </blockquote>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {CREDENTIALS.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-ivory px-4 py-2 text-xs font-medium tracking-wide text-cocoa"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
