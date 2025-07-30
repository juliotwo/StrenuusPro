'use client';

import { useContext } from 'react';
import Footer from '@/components/molecules/Footer';
import Navbar from '@/components/molecules/Navbar';
import { productsDataEN, productsDataES } from '@/data';
import { useLocale } from 'next-intl';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Card } from 'primereact/card';
import { CartContext } from 'ui-old-version';

export default function Product({ params }) {
  const { handleAddOrRemoveProduct, validateProductInCart } =
    useContext(CartContext);

  const locale = useLocale();

  const productsData = locale === 'en' ? productsDataEN : productsDataES;
  const product = productsData.find(
    (product) => product.id === Number(params.id)
  );
  const isAdded = validateProductInCart(params.id);

  return (
    <main>
      <Navbar />
      {product && (
        <div className='flex flex-row gap-4'>
          <div className='w-1/2'>
            <Card title={''} className='mb-4'>
              <Image
                src={product.image}
                alt={product.name}
                imageClass='w-full'
              />
              <h2 className='text-2xl font-bold text-center py-8'>
                {product.name}
              </h2>
              <p className='mt-5'>{product.description}</p>
            </Card>
          </div>
          <div className='w-1/2'>
            <Card title='Details' className='mb-4'>
              <div className='flex flex-col gap-2'>
                <p className='text-center text-4xl font-bold mt-10'>
                  $ {product.price}
                </p>
                <h3 className='text-lg font-bold mt-5'>Includes</h3>
                <div className='flex flex-col gap-2'>
                  {product.features.map((feature, i) => (
                    <div key={i} className='flex items-center gap-2'>
                      <span className='pi pi-check'></span>
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <Button
                  severity={isAdded ? 'danger' : 'primary'}
                  label={isAdded ? 'Remove course' : 'Buy course'}
                  onClick={() => handleAddOrRemoveProduct(product.id)}
                  size='large'
                  className='mt-5'
                />
              </div>
            </Card>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
