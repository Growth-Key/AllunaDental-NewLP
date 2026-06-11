import type { NextRequest } from "next/server";

/**
 * Lead capture stub for the Spa Experience angle test.
 * Validates and logs submissions; the real destination (CRM webhook / email)
 * gets wired before launch — search for TODO(launch).
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = String(data?.name ?? "").trim();
  const phone = String(data?.phone ?? "").trim();
  const email = String(data?.email ?? "").trim();
  const interest = String(data?.interest ?? "").trim();
  const consent = data?.consent === true;

  if (!name || phone.replace(/\D/g, "").length < 10) {
    return Response.json(
      { ok: false, error: "Please share your name and a phone number we can reach you at." },
      { status: 400 },
    );
  }
  if (!consent) {
    return Response.json(
      { ok: false, error: "Please confirm we may contact you about your session." },
      { status: 400 },
    );
  }

  const lead = {
    name,
    phone,
    email,
    interest,
    concern: String(data?.concern ?? ""),
    motivation: String(data?.motivation ?? ""),
    timeline: String(data?.timeline ?? ""),
    payment: String(data?.payment ?? ""),
    priority: ["high", "medium", "nurture"].includes(String(data?.priority))
      ? String(data?.priority)
      : "unscored",
    consent,
    page: "spa-experience-lp",
    variant: String(data?.variant ?? "teal"),
    receivedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? "",
  };

  // TODO(launch): forward to GoHighLevel webhook or email notification.
  console.log("[lead]", JSON.stringify(lead));

  return Response.json({ ok: true });
}
