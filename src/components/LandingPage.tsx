import { Hero } from "./Hero";
import { LeadForm } from "./LeadForm";
import { Experience } from "./Experience";
import { Gallery } from "./Gallery";
import { Reviews } from "./Reviews";
import { Doctor } from "./Doctor";
import { Process } from "./Process";
import { Tiers } from "./Tiers";
import { Faq } from "./Faq";
import { Reservations } from "./Reservations";
import { Footer } from "./Footer";
import { StickyBar } from "./StickyBar";
import { FAQS } from "./faq-data";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dentist",
      name: "Alluna Dental Cosmetic and Implant Center",
      url: "https://allunadental.com/",
      telephone: "+18189803333",
      email: "alluna@allunadental.com",
      image: "/media/hero-poster-teal.jpg",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4233 Coldwater Canyon Ave",
        addressLocality: "Studio City",
        addressRegion: "CA",
        postalCode: "91604",
        addressCountry: "US",
      },
      founder: { "@type": "Person", name: "Dr. David Cohen", jobTitle: "DDS" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "153",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export function LandingPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <LeadForm />
      <Experience />
      <Gallery />
      <Reviews />
      <Doctor />
      <Process />
      <Tiers />
      <Faq />
      <Reservations />
      <Footer />
      <StickyBar />
    </main>
  );
}
