import Image from "next/image";
import { Stars } from "./ui";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Real Alluna footage (Dr. Cohen, Studio City) — responsive desktop/mobile patient-journey loop */}
      <HeroVideo />
      {/* Legibility scrim. The footage loops through bright/busy/dark frames, so the dark
          headline needs a content-agnostic light backing: a vertical wash (lifted in the
          middle where the headline sits) plus a soft radial light-pool centered on the text. */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/75 via-ivory/45 to-ivory" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 85% at 50% 45%, color-mix(in srgb, var(--color-ivory) 80%, transparent) 0%, color-mix(in srgb, var(--color-ivory) 40%, transparent) 40%, transparent 70%)",
        }}
      />

      <header className="relative z-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
          <Image
            src="/media/alluna-logo.webp"
            alt="Alluna Dental"
            width={450}
            height={146}
            priority
            className="h-9 w-auto sm:h-11"
          />
          <a
            href="tel:+18189803333"
            className="hidden text-sm font-medium tracking-wide text-espresso/80 transition-colors hover:text-espresso sm:block"
          >
            (818) 980-3333
          </a>
          <a
            href="tel:+18189803333"
            className="rounded-full border border-espresso/25 px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase sm:hidden"
          >
            Call
          </a>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-16 text-center">
        <p className="mb-6 text-[11px] font-semibold tracking-[0.4em] text-cocoa uppercase sm:text-xs">
          Studio City · Los Angeles
        </p>
        <h1 className="font-display text-[2.4rem] leading-[1.06] font-light text-balance sm:text-7xl lg:text-8xl">
          Los Angeles&rsquo;
          <br />
          <em className="italic">Spa-Inspired</em>
          <br />
          Cosmetic Dentistry
        </h1>
        <p className="mt-7 max-w-md text-base leading-relaxed text-cocoa sm:max-w-lg sm:text-lg">
          Veneers, smile makeovers, and implant artistry — in a studio designed to feel nothing
          like a dental office.
        </p>
        <div className="mt-6 flex flex-col items-center gap-1.5">
          <p className="flex items-center gap-2.5 text-sm text-espresso">
            <Stars />
            <span className="font-medium">5.0 · 170+ reviews on Google</span>
          </p>
          <p className="text-[13px] text-taupe">Trusted by hundreds of Studio City patients</p>
        </div>
        <div className="mt-10 flex flex-col items-center gap-5">
          <a
            href="#consultation"
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-espresso px-10 py-4 text-[13px] font-semibold tracking-[0.18em] text-ivory uppercase transition-colors duration-200 hover:bg-brass-deep"
          >
            Reserve Your Free Session
          </a>
          <a
            href="#experience"
            className="text-xs tracking-[0.3em] text-cocoa uppercase transition-colors hover:text-espresso"
          >
            The Experience ↓
          </a>
        </div>
      </div>
    </section>
  );
}
