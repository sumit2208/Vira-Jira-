// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default clerkMiddleware((req: NextRequest) => {
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/(dashboard|projectt|issuepage|profile)(.*)',
  ],
};
