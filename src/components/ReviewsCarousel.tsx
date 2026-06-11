"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { REVIEWS } from "./reviews-data";
import { Stars } from "./ui";

const PAGE_SIZE = 3;
const AUTO_ADVANCE_MS = 6500;

/** Official multicolor Google "G" — third-party trademark, rendered in its own colors. */
function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label="Google review">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/** Chunk into pages of 3, wrapping the last page so every page shows a full row. */
function buildPages() {
  const pages: (typeof REVIEWS)[] = [];
  for (let i = 0; i < REVIEWS.length; i += PAGE_SIZE) {
    const slice = REVIEWS.slice(i, i + PAGE_SIZE);
    while (slice.length < PAGE_SIZE && REVIEWS.length >= PAGE_SIZE) {
      slice.push(REVIEWS[(i + slice.length) % REVIEWS.length]);
    }
    pages.push(slice);
  }
  return pages;
}

export function ReviewsCarousel() {
  const pages = buildPages();
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || pages.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setDir(1);
      setPage((p) => (p + 1) % pages.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, pages.length]);

  function go(delta: number) {
    setDir(delta);
    setPage((p) => (p + delta + pages.length) % pages.length);
  }

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Patient reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[24rem] sm:min-h-[15rem] lg:min-h-[13rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 36 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -36 * dir }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {pages[page].map((review, i) => (
              <figure
                key={`${review.name}-${i}`}
                className="flex h-full flex-col border-t border-line pt-5"
              >
                <div className="flex items-center justify-between">
                  <Stars className="text-sm" />
                  <GoogleIcon className="h-5 w-5" />
                </div>
                <blockquote className="font-display mt-3 text-xl leading-snug font-light text-balance sm:text-2xl">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-taupe">
                  <span className="font-semibold tracking-wide text-espresso">{review.name}</span>
                  {" · "}
                  {review.detail}
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {pages.length > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous reviews"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-cocoa transition-colors hover:border-espresso hover:text-espresso"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-2.5">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to reviews page ${i + 1}`}
                aria-current={i === page}
                onClick={() => {
                  setDir(i > page ? 1 : -1);
                  setPage(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page ? "w-7 bg-brass" : "w-2 bg-espresso/20 hover:bg-espresso/40"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next reviews"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-cocoa transition-colors hover:border-espresso hover:text-espresso"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
