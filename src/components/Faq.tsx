"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Em, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";
import { FAQS } from "./faq-data";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-display text-lg leading-snug font-light sm:text-xl">{q}</span>
        <span
          aria-hidden="true"
          className={`font-display text-2xl leading-none text-brass transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[15px] leading-relaxed text-cocoa">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-0 bg-ivory">
      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            numeral="VII"
            label="Questions, Answered"
            title={
              <>
                Everything you&rsquo;re <Em>wondering</Em>.
              </>
            }
          />
        </Reveal>
        <Reveal className="mx-auto mt-12 max-w-2xl">
          <div className="border-t border-line">
            {FAQS.map((item) => (
              <FaqItem key={item.q} {...item} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
