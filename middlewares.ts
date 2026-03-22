// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',') || [];
  
  // Aqui assumimos que o email do usuário vem do cookie ou token JWT
  const userEmail = req.cookies.get('user_email')?.value;

  // Bloqueia acesso se não tiver email válido
  if (!userEmail || !allowedEmails.includes(userEmail)) {
    const url = req.nextUrl.clone();
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Rotas que devem ser protegidas
export const config = {
  matcher: ['/dashboard', '/admin'], 
};