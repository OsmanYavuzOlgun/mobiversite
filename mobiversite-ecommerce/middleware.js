import { NextResponse } from "next/server";

export function middleware(request) {
  const user = request.cookies.get("user");
  const protectedRoutes = ["/profile", "/wishlist"];

  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/wishlist/:path*"],
};
