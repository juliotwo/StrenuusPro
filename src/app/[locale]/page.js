// src/app/[locale]/page.js
// SIN "use client" aquí

import { headers } from 'next/headers';
import Home from './@www/page';
import LoginPage from './@access/page';

export default function RootPage() {
  const headersList = headers();
  const host = headersList.get('host');
  const isAccessSite = host && host.startsWith('access.');

  if (isAccessSite) {
    return <LoginPage />;
  }

  return <Home />;
}
