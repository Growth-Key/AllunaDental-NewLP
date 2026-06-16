import type { Metadata } from "next";
import { Container, Em, Stars } from "@/components/ui";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Reserved — Alluna Dental",
  description: "Your free smile design session is reserved. Our concierge team will reach out within one business day.",
};

const NEXT_STEPS = [
  {
    number: "01",
    title: "The call",
    body: "Our concierge team reaches out within one business day to find the time that fits your week.",
  },
  {
    number: "02",
    title: "The session",
    body: "A relaxed conversation, a digital scan, and a 3D preview of your future smile — with your plan in writing. Completely free.",
  },
  {
    number: "03",
    title: "The test-drive",
    body: "See it, then wear it. Nothing is ever final until your smile is exactly the one you envisioned.",
  },
];

export default async function Welcome({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name } = await searchParams;
  const first = (name ?? "").trim().split(" ")[0].slice(0, 24);

  return (
    <main className="flex min-h-svh flex-col bg-ivory">
      <section className="bg-cream">
        <Container className="flex flex-col items-center py-24 text-center sm:py-32">
          <p className="font-display text-xs tracking-[0.35em] text-brass uppercase">
            Reserved · See you soon
          </p>
          <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.08] font-light text-balance sm:text-6xl">
            {first ? `${first}, we` : "We"} can&rsquo;t wait to <Em>welcome</Em> you to Alluna.
          </h1>
          <p className="font-display mt-6 text-xl font-light italic text-cocoa sm:text-2xl">
            Consider this the spa day your smile has been waiting for.
          </p>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cocoa">
            Our concierge team will reach out within one business day to confirm your free
            smile design session. Prefer right now?{" "}
            <a
              href="tel:+18189803333"
              className="font-semibold whitespace-nowrap text-espresso underline underline-offset-4"
            >
              (818) 980-3333
            </a>
          </p>
        </Container>
      </section>

      <section className="bg-ivory">
        <Container className="py-16 sm:py-20">
          <p className="font-display text-center text-sm tracking-[0.35em] text-brass uppercase">
            What happens next
          </p>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
            {NEXT_STEPS.map((step) => (
              <div key={step.number} className="border-t border-line pt-5">
                <p className="font-display text-sm tracking-[0.3em] text-brass">{step.number}</p>
                <h2 className="font-display mt-2 text-xl font-light">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-cocoa">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="font-display text-3xl leading-tight font-light text-balance sm:text-4xl">
              You&rsquo;re in <Em>good company</Em>.
            </h2>
            <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm">
              <Stars />
              <span className="font-medium text-espresso">5.0 across 170+ Google reviews</span>
            </p>
          </div>
          <div className="mt-10">
            <ReviewsCarousel />
          </div>
        </Container>
      </section>

      <section className="bg-ivory">
        <Container className="flex flex-col items-center gap-2 py-14 text-center">
          <p className="text-sm text-cocoa">
            4233 Coldwater Canyon Ave, Studio City, CA 91604 · By appointment
          </p>
          <a
            href="/teal"
            className="text-xs tracking-[0.25em] text-taupe uppercase underline-offset-4 transition-colors hover:text-espresso hover:underline"
          >
            ← Back to Alluna
          </a>
        </Container>
      </section>

      <div className="mt-auto">
        <Footer padForStickyBar={false} />
      </div>
    </main>
  );
}
