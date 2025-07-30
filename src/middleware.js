// src/middleware.js

import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

// Asume que tu configuración de i18n está en 'src/i18n.js'
// ¡Asegúrate de que la ruta de importación sea correcta!
import { locales, defaultLocale } from './i18n';

export default function middleware(req) {
  const hostname = req.headers.get('host');

  // --- 1. Lógica del Subdominio (TIENE PRIORIDAD) ---
  // Si el subdominio es "access", reescribe la ruta a la carpeta /access y termina.
  // Esto evita que el middleware de i18n se ejecute para este subdominio.
  if (hostname && hostname.startsWith('access.')) {
    const url = req.nextUrl.clone();
    // Prepend /access a la ruta original. Ej: /profile -> /access/profile
    url.pathname = `/access${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // --- 2. Lógica de Internacionalización (i18n) ---
  // Si no es el subdominio "access", ejecuta el middleware de idiomas con normalidad.
  const handleI18nRouting = createIntlMiddleware({
    locales: locales,
    defaultLocale: defaultLocale,
  });

  return handleI18nRouting(req);
}

export const config = {
  // El matcher debe ejecutarse en todas las rutas para poder revisar
  // tanto el subdominio como el idioma.
  // Excluimos rutas que no necesitan procesamiento.
  matcher: ['/((?!api|_next/static|_next/image|fonts|favicon.ico).*)'],
};
