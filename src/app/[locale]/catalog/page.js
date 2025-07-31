'use client';

import Services from '@/components/organisms/Services';

import Additionals from '@/components/organisms/Aditionals';
import Link from 'next/link';
import Navbar from '@/components/molecules/Navbar';
import Footer from '@/components/molecules/Footer';

export default function Catalog() {
  return (
    <main>
      <Navbar withCart={true} />
      <div className='flex justify-center items-center my-10'>
        <h1 className='text-xl sm:text-2xl lg:text-3xl font-medium'>
          Catalog of events
        </h1>
      </div>
      {/* Add your catalog content here */}
      <Services />
      <Additionals />
      {/* advance to payment */}
      <div className='flex justify-center mt-10 mb-20'>
        <Link href='/my-cart'>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded
            hover:bg-blue-600 transition-colors'
          >
            Proceed to Payment
          </button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
