'use client';
import { CartContext } from 'ui-pages-ecommerce';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useContext } from 'react';

import Button from '@/components/atoms/Button';
import Footer from '@/components/molecules/Footer';
import Navbar from '@/components/molecules/Navbar';

import { productsDataEN, productsDataES } from '@/data';
import { FaChevronLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Product({ params }) {
  const { handleAddOrRemoveProduct, validateProductInCart } =
    useContext(CartContext);

  const locale = useLocale();

  const productsData = locale === 'en' ? productsDataEN : productsDataES;
  const product = productsData.find(
    (product) => product.id === Number(params.id)
  );
  const isAdded = validateProductInCart(Number(params.id));

  const router = useRouter();
  return (
    <main>
      <Navbar />

      {product && (
        <div className='flex flex-wrap container mx-auto mt-5 mb-10'>
          {/* <div className='w-96 h-130'> */}
          <Button
            value='back'
            onClick={() => {
              router.push('/#shop');
            }}
            iconLeft={<FaChevronLeft />}
            label={'Back'}
            iconPosition='start'
            className='flex items-center text-white bg-black mb-10 w-28'
          />

          <div className='w-full md:w-1/2 h-130 bg-white shadow-md rounded-lg overflow-hidden px-8 py-8'>
            <Image
              src={product.image}
              alt='course image'
              width={500}
              height={500}
              className='w-full h-60 object-cover rounded-lg'
            />
            <div>
              <h2 className='text-gray-700 text-2xl font-bold mb-4 mt-5'>
                {product.name}
              </h2>
              <p className='text-gray-700 mb-4 mt-5'>{product.description}</p>
              <p className='text-gray-700 text-lg font-semibold mt-10'>
                $ {product.price}
              </p>
            </div>
          </div>

          <div className='w-full md:w-1/2 md:pl-8'>
            {/* card */}
            <div className='bg-white shadow-md rounded-lg p-6'>
              <h2 className='text-gray-700 text-2xl font-bold mb-4'>
                Includes
              </h2>
              {
                <ul className='list-disc list-inside'>
                  {product.features.map((item, index) => (
                    <li key={index} className='flex items-center py-2'>
                      <span className='text-gray-700 mr-2'>{item}</span>

                      <div className='flex-1 h-0.5 bg-gray-200'></div>

                      <svg
                        className='w-5 h-5 text-green-500 fill-current'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                      >
                        <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z' />
                      </svg>
                    </li>
                  ))}
                </ul>
              }
              <Button
                className={`text-xs mt-10 ${isAdded ? 'bg-red-500' : ''}`}
                onClick={() => {
                  handleAddOrRemoveProduct(Number(params.id));
                }}
                label={isAdded ? 'Remove from cart' : 'Add to cart'}
              ></Button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
