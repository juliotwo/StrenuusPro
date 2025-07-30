import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './navigation';

export function middleware(request) {
  const hostname = request.headers.get('host');

  // --- 1. Lógica del Subdominio (se ejecuta primero) ---
  // Revisa si el host es "access.dominio.com"
  if (hostname && hostname.startsWith('access.')) {
    // Reescribe la URL para que apunte a la carpeta /access internamente
    const url = request.nextUrl.clone();
    url.pathname = `/access${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // --- 2. Lógica de i18n (se ejecuta si NO es el subdominio) ---
  // Creamos y ejecutamos tu middleware original de next-intl
  const handleI18nRouting = createMiddleware({
    locales,
    localePrefix,
    defaultLocale: 'en',
  });

  return handleI18nRouting(request);
}

export const config = {
  // El nuevo matcher es clave. Se ejecuta en todas las rutas EXCEPTO
  // las que son para archivos de sistema, imágenes, o APIs.
  // Esto permite que la lógica de subdominio e i18n siempre se puedan activar.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
