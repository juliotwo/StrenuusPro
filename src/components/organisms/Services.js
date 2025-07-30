'use client';
import { formatNumber } from '@/utils/amounts';
import Button from '../atoms/Button';
import { useContext } from 'react';
import { productsDataEN, productsDataES } from '@/data';
import { Link } from '@/navigation';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { CartContext } from 'ui-old-version';

const servicesData = [
  {
    title: 'card-1-title',
    image: '/images/step-1.jpg',
    button: 'card-1-btn',
  },
  {
    title: 'card-2-title',
    image: '/images/step-2.jpg',
    button: 'card-2-btn',
  },
  {
    title: 'card-3-title',
    image: '/images/step-3.jpg',
    button: 'card-3-btn',
  },
];

const Services = () => {
  const navigation = useRouter();

  const locale = useLocale();
  const t = useTranslations('Services');

  const { handleAddOrRemoveProduct, validateProductInCart } =
    useContext(CartContext);

  return (
    <>
      <section className='bg-black min-h-screen py-28 flex items-center justify-center'>
        <div className='container mx-auto px-4 w-full h-full flex flex-col justify-center'>
          <div className='grid grid-cols-3 gap-5 h-full'>
            {servicesData.map((item, i) => (
              <div
                className='bg-center bg-cover h-80'
                style={{ backgroundImage: `url(${item.image})` }}
                key={i}
              >
                <div className='flex flex-col bg-black text-white bg-opacity-40 h-full w-full p-10'>
                  <h1 className='text-xl sm:text-2xl lg:text-3xl font-medium'>
                    {t(item.title)}
                  </h1>
                  {/* 
                  <div className='flex-1 mt-10 flex items-end'>
                    <Link href='/#shop'>
                      <Button label={t(item.button)} />
                    </Link>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop */}
      <section
        id='shop'
        className='flex flex-col container mx-auto px-4 min-h-screen justify-center py-28'
      >
        <h1 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase'>
          {t('title-cart')}
        </h1>

        <div className='w-full grid grid-cols-4 gap-5 mt-20'>
          {(locale === 'es' ? productsDataES : productsDataEN).map(
            (item, i) => {
              const isAdded = validateProductInCart(item.id);

              return (
                <div
                  className='bg-white flex flex-col rounded-none shadow-lg'
                  key={i}
                >
                  <Image
                    onClick={() => {
                      navigation.push(`/${locale}/product/${item.id}`);
                    }}
                    src={item.image}
                    alt='course image'
                    width={400}
                    height={400}
                    className='w-full h-60 object-cover rounded-t-none hover:cursor-pointer hover:opacity-90'
                  />
                  <div className='flex flex-col w-full p-5 gap-1 flex-1'>
                    <h1 className='text-sm font-medium uppercase'>
                      {item.name}
                    </h1>
                    <div className='flex-1'>
                      <p className='text-[10px]'>{item.description}</p>
                    </div>
                    <h2 className='font-bold text-sm my-2'>
                      {formatNumber(item.price)}{' '}
                      {locale === 'en' ? 'USD' : 'MXN'}
                    </h2>

                    <Button
                      className={`mt-2 ${isAdded ? 'bg-red-500' : ''}`}
                      label={isAdded ? t('remove') : t('buy')}
                      onClick={() => handleAddOrRemoveProduct(item.id)}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>
    </>
  );
};

export default Services;
