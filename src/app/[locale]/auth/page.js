'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Para consistencia con tu proyecto, usamos useTranslations para los textos.
import { useLocale, useTranslations } from 'next-intl';

// Array de usuarios como lo solicitaste.
const allowedUsers = [
  { user: 'julio', password: 'passwordJulio', products: '3,4' },
  { user: 'ana', password: 'passwordAna', products: '1,2' },
  { user: 'luis', password: 'passwordLuis', products: '5,6' },
  { user: 'maria', password: 'passwordMaria', products: '7,8' },
  { user: 'carlos', password: 'passwordCarlos', products: '3,7' },
  {
    user: 'sofia',
    password: 'passwordSofia',
    products: null,
    withAdditionals: true,
  },
  {
    user: 'pedro',
    password: 'passwordPedro',
    products: null,
    withAdditionals: true,
  },
];

const LoginPage = () => {
  // 1. Hooks para manejar el estado y la navegación
  const router = useRouter();
  const t = useTranslations('Login'); // Asume que tienes un namespace 'Login' en tus archivos de internacionalización
  const locale = useLocale(); // Esto te dará "es", "en", etc.

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 2. Lógica para manejar el envío del formulario
  const handleLogin = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Busca si el usuario existe en el array
    const foundUser = allowedUsers.find((u) => u.user === username);

    // Valida si el usuario fue encontrado y si la contraseña es correcta
    if (foundUser && foundUser.password === password) {
      // Credenciales correctas
      setError(''); // Limpia cualquier error previo
      console.log('Login exitoso, redirigiendo...');
      if (foundUser.withAdditionals) {
        // Si el usuario tiene adicionales, redirige a la página de carrito con adicionales
        router.push('my-cart?additionals=true');
      }
      if (foundUser.products) {
        // Si el usuario tiene productos específicos, redirige a la página de carrito con esos productos
        router.push(`my-cart?ids=${foundUser.products}`);
      }
      // Si no hay productos ni adicionales, redirige a la página de carrito vacía
      if (!foundUser.products && !foundUser.withAdditionals) {
        router.push('my-cart');
      }
    } else {
      // Credenciales incorrectas
      setError(t('incorrectCredentials'));
    }
  };

  return (
    <section className='bg-black min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-sm mx-auto bg-gray-900 rounded-lg shadow-xl p-8'>
        <form onSubmit={handleLogin}>
          <h1 className='text-white text-2xl font-bold mb-6 text-center'>
            {t('title')}
          </h1>

          {/* Campo de Usuario */}
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-gray-400 text-sm font-medium mb-2'
            >
              {t('usernameLabel')}
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder={t('usernamePlaceholder')}
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block text-gray-400 text-sm font-medium mb-2'
            >
              {t('password')}
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='••••••••'
              required
            />
          </div>

          {/* Mensaje de Error */}
          {error && (
            <p className='text-red-500 text-xs italic mb-4 text-center'>
              {error}
            </p>
          )}

          {/* Botón de Login */}
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300'
          >
            {t('login-btn')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
