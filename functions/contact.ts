interface Env {
  RESEND_API_KEY: string;
  WEBSITE_EMAIL: string;
}

interface ContactFormData {
  name: string;
  email: string;
  who: string;
  experience: string;
  message: string;
  // honeypot
  website?: string;
}

const RESEND_URL = "https://api.resend.com/emails";

async function sendEmail(
  apiKey: string,
  payload: {
    from: string;
    to: string[];
    reply_to?: string;
    subject: string;
    text: string;
  }
): Promise<{ ok: boolean; status: number; body: string }> {
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const siteEmail = env.WEBSITE_EMAIL;

  let data: ContactFormData;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  // Honeypot — bots fill this, real users never see it
  if (data.website) {
    return json({ ok: true }, 200); // silent success
  }

  // Basic validation
  if (!data.name?.trim() || !data.email?.trim()) {
    return json({ error: "Name and email are required" }, 422);
  }

  const whoLabel: Record<string, string> = {
    child: "A child",
    adult: "Myself (adult)",
  };
  const experienceLabel: Record<string, string> = {
    beginner: "Complete beginner",
    some: "Some experience",
    returning: "Returning after a break",
    intermediate: "Intermediate / graded",
  };

  const whoText = whoLabel[data.who] ?? data.who ?? "Not specified";
  const experienceText = experienceLabel[data.experience] ?? data.experience ?? "Not specified";

  // ── 1. Notification to Ellen ──────────────────────────────────────────────
  const internalBody = `
New enquiry from ellenplayspiano.com

Name:        ${data.name}
Email:       ${data.email}
Lessons for: ${whoText}
Experience:  ${experienceText}

Message:
${data.message?.trim() ?? "(no message)"}
`.trim();

  const internalResult = await sendEmail(env.RESEND_API_KEY, {
    from: `Ellen Plays Piano <${siteEmail}>`,
    to: [siteEmail],
    reply_to: data.email,
    subject: `New lesson enquiry from ${data.name}`,
    text: internalBody,
  });

  if (!internalResult.ok) {
    console.error("Resend error (internal):", internalResult.status, internalResult.body);
    return json({ error: "Failed to send enquiry" }, 500);
  }

  // ── 2. Confirmation to the enquirer (only if #1 succeeded) ───────────────
  const isForChild = data.who === "child";

  const confirmationBody = `
Dear ${data.name},

Thank you so much for getting in touch — I'm delighted you're interested in piano lessons${isForChild ? " for your child" : ""}.

I've received your message and will reply personally within a day or two to arrange a time to chat. In the meantime, if you have any questions, you're always welcome to reply to this email.

I very much look forward to hearing from you.

Warmly,
Ellen

——
Ellen Plays Piano
${siteEmail}
ellenplayspiano.com
`.trim();

  const confirmResult = await sendEmail(env.RESEND_API_KEY, {
    from: `Ellen Dean <${siteEmail}>`,
    to: [data.email],
    reply_to: siteEmail,
    subject: "Thank you for your enquiry — Ellen Plays Piano",
    text: confirmationBody,
  });

  if (!confirmResult.ok) {
    // Not fatal — Ellen still got her notification. Log and carry on.
    console.warn("Resend warning (confirmation):", confirmResult.status, confirmResult.body);
  }

  return json({ ok: true }, 200);
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
