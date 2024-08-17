import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("access_token");

  if (!pathname.includes("/login") && !token?.value) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (pathname.includes("/login") && token?.value) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
