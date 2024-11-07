import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/dashboard'];

export default function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("token")?.value;
    
    if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
        const response = NextResponse.redirect(new URL('/signin', request.url)); 
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
};
