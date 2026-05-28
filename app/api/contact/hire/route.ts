import { NextRequest, NextResponse } from "next/server";
import { guardPublicForm } from "@/lib/security-server";
import { isEmailJsConfigured } from "@/lib/emailjs-client";
import {
  normalizeHireInput,
  validateHireInquiry,
} from "@/lib/security-shared";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    if (!isEmailJsConfigured()) {
      return NextResponse.json(
        { error: "Email service is not configured on this site." },
        { status: 503 }
      );
    }

    const body = (await request.json()) as Record<string, unknown>;

    const guard = await guardPublicForm(request, body, "hire");
    if (!guard.ok) {
      return NextResponse.json({ error: guard.message }, { status: guard.status });
    }

    const input = normalizeHireInput(body);
    const errors = validateHireInquiry(input);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Validated. Send via EmailJS on the client.",
    });
  } catch {
    return NextResponse.json({ error: "Submission could not be processed." }, { status: 500 });
  }
}
