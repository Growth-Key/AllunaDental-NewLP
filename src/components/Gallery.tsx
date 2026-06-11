"use client";

import Image from "next/image";
import { useState } from "react";
import { Container, Em, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

const CASES = [
  { id: "01", before: "/media/case1-before.jpg", after: "/media/case1-after.jpg" },
  { id: "02", before: "/media/case2-before.jpg", after: "/media/case2-after.jpg" },
  { id: "03", before: "/media/case3-before.jpg", after: "/media/case3-after.jpg" },
];

function CaseCard({ id, before, after }: (typeof CASES)[number]) {
  const [showAfter, setShowAfter] = useState(true);
  return (
    <div className="w-[82vw] max-w-sm shrink-0 snap-center sm:w-auto sm:max-w-none">
      <div className="relative aspect-[7/4] overflow-hidden rounded-2xl">
        <Image
          src={before}
          alt={`Patient case ${id} before veneers`}
          fill
          sizes="(min-width: 640px) 33vw, 82vw"
          className={`object-cover transition-opacity duration-300 ${showAfter ? "opacity-0" : "opacity-100"}`}
        />
        <Image
          src={after}
          alt={`Patient case ${id} after veneers by Alluna Dental`}
          fill
          sizes="(min-width: 640px) 33vw, 82vw"
          className={`object-cover transition-opacity duration-300 ${showAfter ? "opacity-100" : "opacity-0"}`}
        />
        <span className="font-display absolute top-3 right-4 text-xs tracking-[0.25em] text-ivory/90 uppercase [text-shadow:0_1px_8px_rgba(17,56,60,0.45)]">
          № {id}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1 rounded-full border border-line bg-cream/70 p-1">
        {(["Before", "After"] as const).map((label) => {
          const active = label === "After" ? showAfter : !showAfter;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setShowAfter(label === "After")}
              className={`min-h-10 flex-1 rounded-full px-4 text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-150 ${
                active ? "bg-espresso text-ivory" : "text-taupe hover:text-espresso"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-0 bg-cream">
      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            numeral="II"
            label="The Smile Gallery"
            title={
              <>
                Smiles by <Em>Alluna</Em>.
              </>
            }
            sub="Real Alluna patients. Custom veneers, designed by Dr. Cohen and finished by a master ceramist."
          />
        </Reveal>
        <Reveal className="mt-12">
          <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {CASES.map((c) => (
              <CaseCard key={c.id} {...c} />
            ))}
          </div>
        </Reveal>
        <p className="mt-8 text-center text-xs tracking-wide text-taupe">
          Individual results vary. Shown with patient permission.
        </p>
      </Container>
    </section>
  );
}
