"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const QUESTION_STEPS = [
  {
    key: "interest",
    question: "I'm interested in:",
    options: ["Veneers", "Smile Makeover", "Dental Implants", "Invisalign", "Not sure yet"],
    columns: 2 as const,
  },
  {
    key: "concern",
    question: "What bothers you most about your smile today?",
    options: [
      "Color or discoloration",
      "Shape, size, or wear",
      "Gaps or alignment",
      "Missing or damaged teeth",
      "A bit of everything",
    ],
    columns: 2 as const,
  },
  {
    key: "motivation",
    question: "What's inspiring the change?",
    options: [
      "A wedding or big event coming up",
      "My career and professional image",
      "I've never loved my smile",
      "My teeth are changing as I age",
      "Something else",
    ],
    columns: 1 as const,
  },
  {
    key: "timeline",
    question: "When would you like to begin?",
    options: [
      "As soon as possible",
      "In the next 1–3 months",
      "Later this year",
      "Just exploring for now",
    ],
    columns: 2 as const,
  },
  {
    key: "payment",
    question: "When it comes to the investment, what works best for you?",
    note: "Every smile is custom — you'll receive exact pricing in writing at your free session.",
    options: [
      "Pay in full",
      "Monthly payment plan",
      "I'm hoping to use insurance",
      "I need to understand costs first",
    ],
    columns: 1 as const,
  },
];

const TOTAL_STEPS = QUESTION_STEPS.length + 1;

const HOT_TIMELINES = ["As soon as possible", "In the next 1–3 months"];
const HOT_PAYMENTS = ["Pay in full", "Monthly payment plan"];

type Status = "idle" | "submitting" | "error";

/** Concierge callback ordering: commitment (timeline) × readiness (payment). */
function leadPriority(answers: Record<string, string>) {
  const hotTimeline = HOT_TIMELINES.includes(answers.timeline ?? "");
  const hotPayment = HOT_PAYMENTS.includes(answers.payment ?? "");
  if (hotTimeline && hotPayment) return "high";
  if (hotTimeline || hotPayment) return "medium";
  return "nurture";
}

function OptionGrid({
  options,
  selected,
  onChoose,
  columns = 1,
}: {
  options: readonly string[];
  selected: string;
  onChoose: (value: string) => void;
  columns?: 1 | 2;
}) {
  return (
    <div className={`grid grid-cols-1 gap-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {options.map((option, i) => (
        <button
          key={option}
          type="button"
          onClick={() => onChoose(option)}
          className={`min-h-13 rounded-2xl border px-5 py-3.5 text-left text-[15px] font-medium transition-colors duration-150 ${
            selected === option
              ? "border-espresso bg-espresso text-ivory"
              : "border-line bg-cream/60 text-espresso hover:border-espresso/40"
          } ${columns === 2 && options.length % 2 === 1 && i === options.length - 1 ? "sm:col-span-2" : ""}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function LeadForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function choose(key: string, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Please share your name and a phone number we can reach you at.");
      return;
    }
    if (!consent) {
      setError("Please confirm we may contact you about your session.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          priority: leadPriority(answers),
          name,
          phone,
          email,
          consent,
          variant: "teal",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      const first = name.trim().split(" ")[0];
      router.push(`/welcome?name=${encodeURIComponent(first)}`);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const questionStep = step <= QUESTION_STEPS.length ? QUESTION_STEPS[step - 1] : null;

  return (
    <section id="consultation" className="scroll-mt-6 bg-cream">
      <div className="mx-auto w-full max-w-2xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="rounded-3xl border border-line bg-ivory p-6 shadow-[0_24px_60px_-30px_rgba(17,56,60,0.25)] sm:p-10">
          <div>
                <div className="text-center">
                  <p className="font-display text-xs tracking-[0.35em] text-brass uppercase">
                    Begin your visit
                  </p>
                  <h3 className="font-display mt-3 text-3xl leading-tight font-light text-balance sm:text-4xl">
                    Reserve your <em className="italic">free</em> smile design session
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cocoa">
                    Limited spots each week. Our concierge team confirms within one business day.
                  </p>
                </div>

                <div className="mt-8">
                  <p className="mb-3 text-center text-[11px] font-semibold tracking-[0.25em] text-taupe uppercase">
                    Step {step} of {TOTAL_STEPS}
                  </p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      {questionStep ? (
                        <>
                          <p className="mb-2 text-center text-sm font-medium text-espresso">
                            {questionStep.question}
                          </p>
                          {questionStep.note ? (
                            <p className="mb-4 text-center text-[13px] leading-snug text-taupe">
                              {questionStep.note}
                            </p>
                          ) : (
                            <div className="mb-4" />
                          )}
                          <OptionGrid
                            options={questionStep.options}
                            selected={answers[questionStep.key] ?? ""}
                            onChoose={(value) => choose(questionStep.key, value)}
                            columns={questionStep.columns}
                          />
                        </>
                      ) : (
                        <form onSubmit={submit} className="flex flex-col gap-3.5">
                          <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="min-h-13 rounded-2xl border border-line bg-cream/60 px-5 py-3.5 text-[15px] text-espresso placeholder:text-taupe focus:border-brass focus:outline-none"
                          />
                          <input
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            inputMode="tel"
                            placeholder="Phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="min-h-13 rounded-2xl border border-line bg-cream/60 px-5 py-3.5 text-[15px] text-espresso placeholder:text-taupe focus:border-brass focus:outline-none"
                          />
                          <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            inputMode="email"
                            placeholder="Email (optional)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="min-h-13 rounded-2xl border border-line bg-cream/60 px-5 py-3.5 text-[15px] text-espresso placeholder:text-taupe focus:border-brass focus:outline-none"
                          />
                          <label className="flex cursor-pointer items-start gap-3 px-1 py-1 text-[13px] leading-snug text-cocoa">
                            <input
                              type="checkbox"
                              checked={consent}
                              onChange={(e) => setConsent(e.target.checked)}
                              className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-espresso"
                            />
                            <span>
                              I agree to receive calls and texts from Alluna Dental about my
                              consultation. Message and data rates may apply. Reply STOP to opt
                              out.
                            </span>
                          </label>

                          {error ? (
                            <p className="text-center text-sm text-brass-deep">{error}</p>
                          ) : null}

                          <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="mt-1 min-h-13 rounded-full bg-espresso px-8 py-4 text-[13px] font-semibold tracking-[0.18em] text-ivory uppercase transition-colors duration-200 hover:bg-brass-deep disabled:opacity-60"
                          >
                            {status === "submitting" ? "Reserving…" : "Reserve My Free Session"}
                          </button>
                        </form>
                      )}

                      {step > 1 ? (
                        <div className="mt-4 text-center">
                          <button
                            type="button"
                            onClick={() => setStep((s) => Math.max(s - 1, 1))}
                            className="text-xs tracking-[0.2em] text-taupe uppercase transition-colors hover:text-espresso"
                          >
                            ← Back
                          </button>
                        </div>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p className="mt-7 border-t border-line pt-5 text-center text-xs leading-relaxed text-taupe">
                  No pressure, ever · Flexible payment plans · By appointment in Studio City
                </p>
          </div>
        </div>
      </div>
    </section>
  );
}
