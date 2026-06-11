import Image from "next/image";
import { Container } from "./ui";

export function Footer({ padForStickyBar = true }: { padForStickyBar?: boolean }) {
  return (
    <footer className="bg-ivory">
      <Container
        className={`flex flex-col items-center gap-5 py-12 text-center ${padForStickyBar ? "pb-28 lg:pb-12" : ""}`}
      >
        <Image
          src="/media/alluna-logo.webp"
          alt="Alluna Dental"
          width={450}
          height={146}
          className="h-8 w-auto opacity-80"
        />
        <p className="text-xs leading-relaxed text-taupe">
          Alluna Dental Cosmetic and Implant Center · Dr. David Cohen, DDS — License #109532
          <br />
          4233 Coldwater Canyon Ave, Studio City, CA 91604 ·{" "}
          <a href="tel:+18189803333" className="underline-offset-4 hover:underline">
            (818) 980-3333
          </a>{" "}
          ·{" "}
          <a href="mailto:alluna@allunadental.com" className="underline-offset-4 hover:underline">
            alluna@allunadental.com
          </a>
        </p>
        <p className="text-xs text-taupe/70">
          ©&nbsp;2026 Alluna Dental ·{" "}
          <a
            href="https://www.instagram.com/allunadental/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            @allunadental
          </a>{" "}
          ·{" "}
          <a
            href="https://allunadental.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            allunadental.com
          </a>
        </p>
      </Container>
    </footer>
  );
}
