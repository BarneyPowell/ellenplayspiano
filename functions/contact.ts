interface Env {
  RESEND_API_KEY: string;
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

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Only accept POST
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let data: ContactFormData;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Honeypot — bots fill this, humans don't see it
  if (data.website) {
    // Silently succeed so bots don't know they were caught
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Basic validation
  if (!data.name?.trim() || !data.email?.trim()) {
    return new Response(JSON.stringify({ error: "Name and email are required" }), {
      status: 422,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Format the who/experience labels nicely
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

  const emailBody = `
New enquiry from ellenplayspiano.com

Name:        ${data.name}
Email:       ${data.email}
Lessons for: ${whoLabel[data.who] ?? data.who ?? "Not specified"}
Experience:  ${experienceLabel[data.experience] ?? data.experience ?? "Not specified"}

Message:
${data.message ?? "(no message)"}
`.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Ellen Plays Piano <hello@ellenplayspiano.com>",
      to: ["hello@ellenplayspiano.com"],
      reply_to: data.email,
      subject: `New lesson enquiry from ${data.name}`,
      text: emailBody,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
