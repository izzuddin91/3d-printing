import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const adminSessionCookie = "admin_session";

export function middleware(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(adminSessionCookie)?.value);
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname.startsWith("/admin/login");

  if (isAdminRoute && !isLoginRoute && !hasSession) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute && hasSession) {
    const requestsUrl = new URL("/admin/requests", request.url);
    return NextResponse.redirect(requestsUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

