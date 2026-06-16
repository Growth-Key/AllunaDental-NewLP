import { Container, Em, SectionHeading, Stars } from "./ui";
import { Reveal } from "./Reveal";
import { ReviewsCarousel } from "./ReviewsCarousel";

export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-0 bg-ivory">
      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            numeral="III"
            label="In Their Own Words"
            title={
              <>
                The visit, <Em>reviewed</Em>.
              </>
            }
            sub={
              <span className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
                <Stars />
                <span className="font-medium text-espresso">5.0 across 170+ Google reviews</span>
                <span className="text-taupe">· Verified patients</span>
              </span>
            }
          />
        </Reveal>
        <Reveal className="mt-12">
          <ReviewsCarousel />
        </Reveal>
      </Container>
    </section>
  );
}
