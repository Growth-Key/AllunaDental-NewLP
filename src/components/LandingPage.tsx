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
import { SectionBlend } from "./ui";
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
      image: "/media/hero-poster.jpg",
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
        reviewCount: "170",
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
      <SectionBlend from="ivory" to="cream" />
      <LeadForm />
      <SectionBlend from="cream" to="ivory" />
      <Experience />
      <SectionBlend from="ivory" to="cream" />
      <Gallery />
      <SectionBlend from="cream" to="ivory" />
      <Reviews />
      <SectionBlend from="ivory" to="cream" />
      <Doctor />
      <SectionBlend from="cream" to="ivory" />
      <Process />
      <SectionBlend from="ivory" to="tiers" />
      <Tiers />
      <SectionBlend from="tiers" to="ivory" />
      <Faq />
      <SectionBlend from="ivory" to="cream" />
      <Reservations />
      <SectionBlend from="cream" to="ivory" />
      <Footer />
      <StickyBar />
    </main>
  );
}
