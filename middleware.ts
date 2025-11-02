import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // A more modern library for JWT verification

// Install jose: npm install jose

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const tokenHeader = req.headers.get("Authorization");

  // Check if the route is an analytics API route
  if (pathname.startsWith("/api/analytics")) {
    if (!tokenHeader) {
      return NextResponse.json(
        { message: "Authorization token required" },
        { status: 401 }
      );
    }

    const token = tokenHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Invalid token format" },
        { status: 401 }
      );
    }

    try {
      // Verify the token
      const { payload } = await jwtVerify(token, JWT_SECRET);

      // Check for admin role
      if (payload.role !== "admin") {
        return NextResponse.json(
          { message: "Access forbidden: Admin role required" },
          { status: 403 }
        );
      }

      // Token is valid and user is admin, continue to the API route
      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification error:", error);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  // Allow other routes to pass through
  return NextResponse.next();
}

// Config to specify which paths the middleware should run on
export const config = {
  matcher: ["/api/analytics/:path*"],
};
