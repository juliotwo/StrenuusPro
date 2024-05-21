'use client';
import { useContext, useState } from 'react';
import { useRouter } from '@/navigation';

import { useTranslations } from 'next-intl';
import { ApiTransaction } from '@/api/api';
// import { optionsStates, pageName, phoneNumber } from "@/data";
// import { ProgressSpinner } from "primereact/progressspinner";
import { CartSection, Button, Payments, CartContext } from 'ui-pages-ecommerce';
import { pageName } from '@/data';

const validDiscountCode = ['DISCOUNT10', 'DISCOUNT20'];

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const CartSectionComponent = () => {
  const { products, getTotalCart } = useContext(CartContext);
  const [step, setStep] = useState('cart'); // cart | payment
  const [isValidDiscount, setIsValidDiscount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      return t('error-not-found');
    }
  };

  const sendEmail = async (
    email = '',
    phone = '',
    interProducts = [],
    idTransaction = ''
  ) => {
    const services = interProducts?.map((item) => item.name)?.join(', ');
    const data = {
      email_for_admin_data: {
        client: pageName,
        email: email,
        name: nameCard,
        amount: getTotalCart(),
        phone_number: '+52' + phone,
        service: services,
        order_number: idTransaction,
      },
      email_for_client_data: {
        email: email,
      },
    };
    await ApiTransaction.sendEmail(data);
  };

  const onPaymentResult = async (data) => {
    console.log('data', data);
    setIsLoading(true);
    await sleep(2000);
    setIsLoading(false);

    const merchantTransaction =
      pageName + '-' + createRandomNumberTransaction();

    const total = getTotalCart();
    let body = {
      merchant_transaction_id: merchantTransaction,
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
      amount: 10,
      currency: 'MXN',
      description: 'Pago de evento',
    };
    await sleep(2000);
    const dataRes = await ApiTransaction.makeTransaction(body);
    setIsLoading(false);

    console.log('dataRes', dataRes);
    if (dataRes?.content?.status === 'success') {
      let idTransaction = dataRes?.content?.merchant_transaction_id;

      sendEmail(data.email, data.phone, products, idTransaction);
      return {
        success: true,
        data: idTransaction,
      };
    } else {
      let message = extractMessage(dataRes?.content?.message?.detail);
      return {
        success: false,
        data: message,
      };
    }
  };
  const onChangeDiscount = (value) => {
    console.log('onChangeDiscount', value);
  };
  return (
    <div className='w-full flex justify-center mt-10 mb-20'>
      <div className='container px-4'>
        <div className='flex flex-col gap-5'>
          {step === 'cart' && (
            <CartSection
              onClickBuyMore={() => router.push('/#shop')}
              onClickGoHome={() => router.push('/')}
              variant='table'
              gridColumns={2}
            />
          )}

          {step === 'payment' && (
            <Payments
              isValidDiscountCode={isValidDiscount}
              handleChangeDiscountCode={onChangeDiscount}
              onPaymentResult={onPaymentResult}
              onClickBuyMore={() => router.push('/#shop')}
              onClickGoHome={() => router.push('/')}
              isLoading={isLoading}
            />
          )}

          <div>
            <Button
              disabled={products.length === 0}
              type='primary'
              onClick={() => setStep(step === 'cart' ? 'payment' : 'cart')}
            >
              {step === 'cart' ? 'Go to Pay' : 'Back to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSectionComponent;
