import { NextResponse } from 'next/server';

export function middleware(req) {
  // Extrae el hostname (dominio y subdominio) de la solicitud
  const hostname = req.headers.get('host');

  // Si no hay hostname, no hacemos nada
  if (!hostname) {
    return new Response(null, { status: 400, statusText: 'No hostname' });
  }

  // Define la URL actual
  const currentUrl = new URL(req.url);
  const { pathname } = currentUrl;

  // Verifica si el subdominio es "access"
  if (hostname.startsWith('access.')) {
    // Reescribe la URL a una ruta específica, por ejemplo /access
    // Esto es interno, el usuario seguirá viendo access.dominio.com en su navegador
    console.log(`Rewriting to /access${pathname}`);
    return NextResponse.rewrite(new URL(`/access${pathname}`, req.url));
  }

  // Si no es el subdominio "access", continúa con la solicitud normal
  return NextResponse.next();
}

export const config = {
  // El matcher asegura que el middleware se ejecute en todas las rutas
  // excepto en las de Next.js (_next), archivos estáticos y la favicon.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
