import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);
// const isPublicRoute = createRouteMatcher(["/", "/about", "/contact"]);

export default clerkMiddleware(async (auth, req) => {
     const authObject = await auth();

     const { userId, sessionClaims, redirectToSignIn } = authObject;

     if (isProtectedRoute(req) && !userId) {
          return redirectToSignIn();
     }

     const role = sessionClaims?.metadata?.role;

     if (isProtectedRoute(req) && role !== "admin") {
          return NextResponse.redirect(new URL("/forbidden", req.url));
     }

     return NextResponse.next();
});

export const config = {
     matcher: [
          "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
          "/(api|trpc)(.*)",
     ],
};
