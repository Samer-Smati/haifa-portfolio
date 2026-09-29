import { contactSchema } from "@/lib/validations";
import { Resend } from "resend";
import { ZodError } from "zod";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Email service is not configured" },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);

    const contactEmail = process.env.CONTACT_EMAIL ?? "hayfa623@gmail.com";
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      replyTo: data.email,
      subject: `Portfolio contact from ${data.name}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      return Response.json(
        { error: error.message ?? "Failed to send email" },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { error: error.issues[0]?.message ?? "Invalid form data" },
        { status: 400 },
      );
    }

    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
