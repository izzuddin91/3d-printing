import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { firebaseConfig } from "@/lib/firebase-credentials";

const cookieName = "admin_session";

type FirebaseLookupResponse = {
  users?: Array<{ email?: string }>;
};

async function verifyIdToken(idToken: string): Promise<string | null> {
  if (!idToken || !firebaseConfig.apiKey) {
    return null;
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    },
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as FirebaseLookupResponse;
  const email = payload.users?.[0]?.email ?? null;
  return email;
}

export async function POST(request: NextRequest) {
  let idToken = "";

  try {
    const body = (await request.json()) as { idToken?: string };
    idToken = String(body.idToken ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid payload" }, { status: 400 });
  }

  const email = await verifyIdToken(idToken);
  if (!email) {
    return NextResponse.json({ ok: false, message: "Invalid Firebase token" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

