'use client';
import { address, email, footerOptions, pageName, phoneNumber } from '@/data';
import Image from 'next/image';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className='w-full border-t border-black py-10 text-[10px] sm:text-sm'>
      <div className='flex flex-col container px-4 mx-auto gap-5'>
        <div className='flex justify-between items-center'>
          <Image
            alt='Visa mastercard'
            width={90}
            height={90}
            src={'/images/visaMaster.png'}
          />

          <p>
            {pageName} - Copyright © 2024 - {t('rights-reserved')}
          </p>
        </div>

        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-5 items-center'>
            <p>{email}</p>
            <p>{phoneNumber}</p>
          </div>

          <div className='flex gap-5 items-center justify-end'>
            {footerOptions.map((item, i) => (
              <Link
                href={item.href}
                className='font-medium hover:underline'
                key={i}
              >
                {t(item.name)}
              </Link>
            ))}
          </div>
        </div>

        <p>{address}</p>
        <div className='flex items-center justify-between w-full mt-4'>
          {/* <div className='flex gap-5 items-center'>
            <Image
              alt='Whatsapp'
              onClick={() => window.open(`https://wa.me/${phoneNumber}`)}
              width={40}
              height={40}
              className='cursor-pointer'
              src={'/images/whatsapp.png'}
            />
            <Image
              alt='Instagram'
              width={40}
              height={40}
              className='cursor-pointer'
              src={'/images/instagram.png'}
            />
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
