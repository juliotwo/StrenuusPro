'use client';
import { useContext, useState } from 'react';
import { useRouter } from '@/navigation';

import { useLocale, useTranslations } from 'next-intl';
import { ApiTransaction } from '@/api/api';

import { CartSection, Button, Payments, CartContext } from 'ui-old-version';
import { pageName } from '@/data';
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';

const validDiscountCode = ['CAPAPAY10', 'CAPAPAY20'];

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const CartSectionComponent = ({ withBack }) => {
  const { products, getTotalCart } = useContext(CartContext);
  const [step, setStep] = useState('cart'); // cart | payment
  const [isValidDiscount, setIsValidDiscount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // state terms and conditions
  const locale = useLocale();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();
  const t = useTranslations('Cart');

  const createRandomNumberTransaction = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  const extractMessage = (str) => {
    console.log(str);
    if (!str || str === '' || str === 'null' || str === undefined) {
      return t('error-not-found');
    }
    const match = str.match(/message:\s*(.+)/);
    if (match) {
      return match[1];
    } else {
      return str;
    }
  };

  const sendEmail = async (
    email = '',
    phone = '',
    interProducts = [],
    idTransaction = '',
    nameCard = ''
  ) => {
    const services = interProducts?.map((item) => {
      return {
        price: item.name,
        name: parseFloat(item.price),
      };
    });

    const data = {
      email_for_admin_data: {
        client: pageName,
        email: email,
        name: nameCard,
        amount: getTotalCart(),
        phone_number: '+52' + phone,
        services: services,
        order_number: idTransaction,
        sender: 'info@strenuus.pro',
      },
      email_for_client_data: {
        email: email,
      },
    };
    await ApiTransaction.sendEmail(data);
  };

  const total = isValidDiscount ? 10 : getTotalCart();
  const onPaymentResult = async (data) => {
    console.log('data', data);
    setIsLoading(true);

    const merchantTransaction =
      pageName + '-' + createRandomNumberTransaction();

    let body = {
      merchant_transaction_id: 'STRENUS-' + merchantTransaction,
      card: {
        number: data.cardNumber,
        holder_name: data.cardName,
        expiration_year: data.cardDate.slice(-2),
        expiration_month: data.cardDate.substring(0, 2),
        cvv: data.cardCvv,
      },
      customer: {
        merchant_customer_id: '331415',
        first_name: data.firstname,
        second_name: '',
        first_surname: data.lastname,
        second_surname: data.secondSurname,
        email: data.email,
        phone_number: '+52' + data.phone,
        home_address: {
          street: data.street,
          external_number: data.extNumber,
          postal_code: data.codePostal,
          colony: '',
          city: data.city,
          state_code: 'EM',
          state_name: 'Mexico',
          country_code: 'MX',
          country_name: 'Mexico',
        },
        billing_address: {
          street: data.street,
          external_number: data.extNumber,
          postal_code: data.codePostal,
          colony: '',
          city: data.city,
          state_code: 'EM',
          state_name: 'Mexico',
          country_code: 'MX',
          country_name: 'Mexico',
        },
        nationality: 'MX',
        gender: 'male',
      },
      amount: total,
      currency: locale === 'en' ? 'USD' : 'MXN',
      description: 'Pago de evento',
    };
    await sleep(2000);
    const dataRes = await ApiTransaction.makeTransaction(body);
    console.log('dataRes', dataRes);
    console.log('dataRes', dataRes);
    if (dataRes?.content?.status === 'success') {
      let idTransaction = dataRes?.content?.merchant_transaction_id;

      console.log('idTransaction', idTransaction);

      await sendEmail(
        data.email,
        data.phone,
        products,
        idTransaction,
        data.cardName
      );
      setIsLoading(false);
      return {
        success: true,
        data: {
          transactionId: idTransaction,
        },
      };
    } else {
      setIsLoading(false);
      let message = extractMessage(dataRes?.content?.message?.detail);
      return {
        success: false,
        message: message,
      };
    }
  };
  const onChangeDiscount = (value) => {
    setIsValidDiscount(validDiscountCode.includes(value));

    console.log('onChangeDiscount', value);
  };
  const onClickCart = () => {
    if (termsAccepted === false) {
      alert(t('terms-conditions-required'));
      return;
    }
    if (step === 'cart') {
      setStep('payment');
      return;
    }
    if (step === 'payment') {
      setStep('cart');
      return;
    }
  };
  return (
    <div className='w-full flex justify-center mt-10 mb-20'>
      <div className='container px-4'>
        {withBack && (
          <Button
            value='back'
            onClick={() => {
              if (step === 'payment') {
                setStep('cart');
                return;
              }
              router.push('/#shop');
            }}
            icon={<FaChevronLeft />}
            iconPosition='start'
            className='flex items-center mb-5 w-28 bg-primary text-white'
          >
            Back
          </Button>
        )}
        <div className='flex flex-col gap-5'>
          {step === 'cart' && (
            <>
              <CartSection
                currency={locale === 'en' ? 'USD' : 'MXN'}
                onClickBuyMore={() => router.push('/#shop')}
                onClickGoHome={() => router.push('/')}
                variant='table'
                gridColumns={2}
                buttonProps={{
                  onClick: onClickCart,
                  label: 'Go to pay',
                  className: termsAccepted
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-500 text-gray-300',
                }}
              />
              {/* Checkbox to accept terms and conditions */}
              <div className='flex items-center justify-end '>
                <input
                  type='checkbox'
                  id='terms'
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className='mr-2 cursor-pointer'
                />
                <Link
                  href={'/pdf/TYC-STRENNUS-MANUS-DICIEMBRE-2024.pdf'}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <label
                    htmlFor='termsContitions'
                    className='text-sm cursor-pointer underline'
                  >
                    {t('terms-conditions')}
                  </label>
                </Link>
              </div>
            </>
          )}

          {step === 'payment' && (
            <Payments
              currency={locale === 'en' ? 'USD' : 'MXN'}
              isValidDiscountCode={isValidDiscount}
              handleChangeDiscountCode={onChangeDiscount}
              onPaymentResult={onPaymentResult}
              onClickBuyMore={() => router.push('/#shop')}
              buttonGoHomeProps={{
                label: 'Go to home',
                onClick: () => router.push('/'),
              }}
              isLoading={isLoading}
              totalDiscount={isValidDiscount ? 10 : 0}
              buttonBackProps={{
                className: 'text-black',
                label: 'Back',
              }}
              voucherVariant='table'
              buttonNextProps={{
                className: 'bg-red-500 text-white',
                style: {
                  color: 'white',
                  // backgroundColor: colorRed,
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSectionComponent;
