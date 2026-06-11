"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Mobile-only conversion bar — appears once the visitor scrolls past the hero. */
export function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 96 }}
          animate={{ y: 0 }}
          exit={{ y: 96 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
        >
          <div className="border-t border-line bg-ivory/95 px-4 pt-3 backdrop-blur-sm pb-safe">
            <div className="mx-auto flex max-w-md gap-3">
              <a
                href="tel:+18189803333"
                className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-espresso/30 text-[12px] font-semibold tracking-[0.15em] text-espresso uppercase"
              >
                Call Now
              </a>
              <a
                href="#consultation"
                className="flex min-h-12 flex-[1.4] items-center justify-center rounded-full bg-espresso text-center text-[12px] font-semibold tracking-[0.15em] text-ivory uppercase"
              >
                Free Consultation
              </a>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
