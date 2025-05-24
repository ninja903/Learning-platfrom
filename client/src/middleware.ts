import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();

 // console.log("Session Claims:", sessionClaims);

  const rawRole = (sessionClaims?.publicMetadata as { userType?: string })?.userType;

  //console.log("Extracted userType:", rawRole);

  const userRole = rawRole === "teacher" || rawRole === "student" ? rawRole : "student";

  if (isStudentRoute(req)) {
    if (userRole !== "student") {
      return NextResponse.redirect(new URL("/teacher/courses", req.url));
    }
  }

  if (isTeacherRoute(req)) {
    if (userRole !== "teacher") {
      return NextResponse.redirect(new URL("/user/courses", req.url));
    }
  }

  return NextResponse.next(); // ensure middleware continues if no redirect
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
