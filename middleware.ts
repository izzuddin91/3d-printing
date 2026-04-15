import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const adminSessionCookie = "admin_session";

export function middleware(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(adminSessionCookie)?.value);
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/requests") && !hasSession) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin/login") && hasSession) {
    const requestsUrl = new URL("/admin/requests", request.url);
    return NextResponse.redirect(requestsUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/login", "/admin/requests/:path*"],
};

