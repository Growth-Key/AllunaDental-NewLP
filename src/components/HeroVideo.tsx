"use client";

import { useEffect, useState } from "react";

/**
 * Responsive hero background video. Real Alluna footage (Dr. Cohen, Studio City)
 * woven with AI spa-interior accents (Higgsfield teal plate — orchid vignette +
 * spa-styled chair): a muted patient-journey loop, graded to the teal-spa palette
 * to sit under the ivory hero gradient. Desktop gets the 16:9 cut (~31s), mobile
 * the 9:16 cut (~30s, AI shot center-cropped); only the matching file is ever
 * downloaded (chosen client-side via matchMedia). Built by hero-edit/ (EDLs +
 * render_hero.py). Poster covers the brief pre-hydration window so there is no flash.
 */
export function HeroVideo() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const pick = () => setSrc(mq.matches ? "/media/hero-desktop.mp4" : "/media/hero-mobile.mp4");
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  return (
    <video
      key={src ?? "poster"}
      className="absolute inset-0 h-full w-full object-cover"
      poster="/media/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      {...(src ? { src } : {})}
    />
  );
}
