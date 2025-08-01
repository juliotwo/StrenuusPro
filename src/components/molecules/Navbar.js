'use client';
import { useLocale, useTranslations } from 'next-intl';
import { twJoin } from 'tailwind-merge';
import { FaCartArrowDown, FaPhone } from 'react-icons/fa';
import { Link, usePathname, useRouter } from '@/navigation';
import Button from '../atoms/Button';
import { navbarOptions, pageName } from '@/data';
import { useContext } from 'react';
import { CartContext } from 'ui-old-version';

const Navbar = ({ textBlack = true, withCart = false }) => {
  const t = useTranslations('Navbar');
  const router = useRouter();
  const pathname = usePathname();
  const { products } = useContext(CartContext);
  const locale = useLocale();

  return (
    <nav className='w-full py-4 text-sm'>
      <div
        className={twJoin(
          'container px-4 mx-auto flex justify-between items-center h-full',
          textBlack ? 'text-black' : 'text-white'
        )}
      >
        <div className='flex gap-10 items-center'>
          <Button
            className='py-3'
            label={locale === 'en' ? 'ES' : 'EN'}
            onClick={() =>
              router.replace(pathname, {
                locale: locale === 'en' ? 'es' : 'en',
              })
            }
            variant='primary'
            withShadow={false}
            image={
              locale === 'en'
                ? '/images/mexico.png'
                : '/images/united-states.png'
            }
          />
          <Link href='/'>
            <img
              src='/images/StrenuusPro.png'
              alt='StreNuus Pro Logo'
              className='h-10'
            />
          </Link>
        </div>

        <div className='flex items-center gap-10'>
          <div className='bg-white py-3 text-xs px-10 flex text-primary gap-10'>
            {navbarOptions.map((item) => (
              <Link
                href={item.href}
                className='uppercase hover:text-primary'
                key={item.href}
              >
                {t(item.name)}
              </Link>
            ))}
          </div>
          <div className='flex gap-3 items-center'>
            {withCart && (
              <Link
                className='relative flex items-center gap-2'
                href='/my-cart'
              >
                <Button
                  className='py-3'
                  label={t('cart')}
                  variant='primary'
                  withShadow={false}
                  icon={<FaCartArrowDown />}
                />
                <div className='text-s absolute -top-2 -right-2 bg-red-500 text-white rounded-full  w-7 h-7 flex items-center justify-center'>
                  <span>{products.length}</span>
                </div>
              </Link>
            )}
            {!withCart && (
              <Link href='/contact'>
                <Button
                  className='py-3'
                  label={t('contact')}
                  variant='primary'
                  withShadow={false}
                  icon={<FaPhone />}
                />
              </Link>
            )}
            {/* ingresar */}
            {/* <Link href='/auth'>
              <Button
                className='py-3'
                label={t('login')}
                variant='primary'
                withShadow={false}
              />
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
