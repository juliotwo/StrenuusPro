'use client';
import { formatNumber } from '@/utils/amounts';
import Button from '../atoms/Button';
import { useContext } from 'react';
import { lowCostAddonsDataEN, lowCostAddonsDataES } from '@/data';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { CartContext } from 'ui-pages-ecommerce';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Additionals = () => {
  const navigation = useRouter();
  const locale = useLocale();
  const t = useTranslations('Additionals');
  const { handleAddOrRemoveProduct, validateProductInCart } =
    useContext(CartContext);

  return (
    <section
      id='shop'
      className='flex flex-col container mx-auto px-4 justify-center py-28'
    >
      <h1 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase mb-10'>
        {t('title')}
      </h1>

      {/* 1. Contenedor padre con posicionamiento relativo */}
      <div className='relative w-full px-32'>
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          // 2. Le decimos a Swiper que use nuestros botones personalizados
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          className='w-full' // 3. Eliminamos el padding y margen excesivo de aquí
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
        >
          {(locale === 'es' ? lowCostAddonsDataES : lowCostAddonsDataEN).map(
            (item, i) => {
              const isAdded = validateProductInCart(item.id);
              return (
                <SwiperSlide key={i} className='h-auto'>
                  <div className='bg-white flex flex-col rounded-none shadow-lg h-full'>
                    {/* ... Contenido de la tarjeta sin cambios ... */}
                    <Image
                      src={item.image}
                      alt='course image'
                      width={400}
                      height={400}
                      className='w-full h-60 object-cover rounded-t-none'
                    />
                    <div className='flex flex-col w-full p-5 gap-1 flex-1'>
                      <h1 className='text-sm font-medium uppercase'>
                        {item.name}
                      </h1>
                      <div className='flex-1'>
                        <p className='text-[10px]'>{item.description}</p>
                      </div>
                      <h2 className='font-bold text-sm my-2'>
                        {formatNumber(item.price)} MXN
                      </h2>
                      <Button
                        className={`mt-2 ${isAdded ? 'bg-red-500' : ''}`}
                        label={isAdded ? t('remove') : t('buy')}
                        onClick={() => handleAddOrRemoveProduct(item.id)}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>

        {/* 4. Nuestros botones de navegación personalizados, fuera de Swiper */}
        <div className='swiper-button-prev-custom'></div>
        <div className='swiper-button-next-custom'></div>
      </div>
    </section>
  );
};

export default Additionals;
