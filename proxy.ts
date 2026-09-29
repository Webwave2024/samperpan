import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ["en", "fr", "es", "hi", "ar", "de", "it", "ja", "zh", "pt"];
const defaultLocale = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\..*).*)',
  ],
};
