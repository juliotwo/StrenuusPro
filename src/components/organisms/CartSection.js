'use client';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from '@/navigation';
import { formatNumber, getTotalProduct } from '@/utils/amounts';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { CartContext } from '@/context/cart';
import { FaTrash } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { ApiTransaction } from '@/api/api';
import { optionsStates, pageName } from '@/data';
import { ProgressSpinner } from 'primereact/progressspinner';

const LABEL_BUTTON = ['pay-order', 'continue'];
const MIN_NAME_LENGTH = 5;

const RowText = ({ leftText, rightText }) => (
  <div className='w-full flex justify-between items-center mt-10'>
    <p className='text-gray-400'>{leftText}</p>
    <p>{rightText} MXN</p>
  </div>
);

const CartSection = () => {
  const router = useRouter();
  const t = useTranslations('Cart');

  const [step, setStep] = useState(0);
  const {
    products,
    getTotalCart,
    sumProductItemCart,
    substProductItemCart,
    getQuantityProductCart,
    cleanCartItems,
    handleAddOrRemoveProduct,
  } = useContext(CartContext);

  const [valueCard, setValueCard] = useState('');
  const [valueCardError, setValueCardError] = useState('');
  const [valueCardDate, setValueCardDate] = useState('');
  const [valueCardDateError, setValueCardDateError] = useState('');
  const [valueCardCvv, setValueCardCvv] = useState('');
  const [valueCardCvvError, setValueCardCvvError] = useState('');
  const [nameCard, setNameCard] = useState('');
  const [firstSurname, setFirstSurname] = useState('');
  const [secondSurname, setSecondSurname] = useState('');
  const [nameCardError, setNameCardError] = useState('');
  const [firstSurnameError, setFirstSurnameError] = useState('');
  const [secondSurnameError, setSecondSurnameError] = useState('');

  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [population, setPopulation] = useState('');
  const [stateName, setStateName] = useState('');
  const [city, setCity] = useState('');
  const [selectedOption, setSelectedOption] = useState({
    value: '',
    label: '',
  }); // Estado para almacenar la opción seleccionada
  const [transactioId, setTransactionId] = useState(''); // Estado para almacen
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [errorResponse, setErrorResponse] = useState('');

  const formCardDisabled =
    valueCard === '' ||
    valueCardError ||
    firstSurname === '' ||
    firstSurnameError ||
    secondSurname === '' ||
    secondSurnameError ||
    valueCardDate === '' ||
    valueCardDateError ||
    valueCardCvv === '' ||
    valueCardCvvError ||
    nameCard === '' ||
    nameCardError;

  const formContactDisabled =
    street === '' ||
    streetNumber === '' ||
    postalCode === '' ||
    population === '' ||
    city === '' ||
    // selectedOption.value === '' ||
    telephone === '' ||
    email === '' ||
    stateName === '';

  const isDisabledButton =
    step === 0 && (formCardDisabled || formContactDisabled);

  const createRandomNumberTransaction = () => {
    return Math.floor(Math.random() * 1000000000);
  };

  const extractMessage = (str) => {
    console.log(str);
    if (!str) {
      return t('error-not-found');
    }
    const match = str.match(/message:\s*(.+)/);
    if (match) {
      return match[1];
    } else {
      return t('error-not-found');
    }
  };

  useEffect(() => {
    if (valueCard) {
      if (valueCard.trim().length < 16) {
        setValueCardError(t('validation-min-card-number'));
        return;
      }

      // Validate zeros
      if (!/^(?!0+$)\d+$/.test(valueCard)) {
        setValueCardError(t('validation-card-number-no-valid'));
        return;
      }

      setValueCardError('');
    }

    if (valueCardDate) {
      if (valueCardDate.trim().length < 4) {
        setValueCardDateError(t('validation-min-date-card'));
        return;
      }

      // Validate zeros
      if (
        +valueCardDate.substring(0, 2) > 12 ||
        +valueCardDate.substring(0, 2) < 1 ||
        +valueCardDate.slice(-2) > 28
      ) {
        setValueCardDateError(t('validation-date-card'));
        return;
      }

      setValueCardDateError('');
    }

    if (valueCardCvv) {
      if (valueCardCvv.trim().length < 3) {
        setValueCardCvvError(t('validation-min-cvv-card'));
        return;
      }

      // Validate zeros
      if (!/^(?!0+$)\d+$/.test(valueCardCvv)) {
        setValueCardCvvError(t('validation-cvv-card'));
        return;
      }

      setValueCardCvvError('');
    }

    setNameCardError(
      nameCard && nameCard.trim().length < MIN_NAME_LENGTH
        ? t('validation-min-card-name')
        : ''
    );

    setFirstSurnameError(
      firstSurname && firstSurname.trim().length < MIN_NAME_LENGTH
        ? t('validation-min-card-name')
        : ''
    );

    setSecondSurnameError(
      secondSurname && secondSurname.trim().length < MIN_NAME_LENGTH
        ? t('validation-min-card-name')
        : ''
    );
  }, [
    valueCard,
    valueCardDate,
    valueCardCvv,
    nameCard,
    firstSurname,
    secondSurname,
  ]);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const [loading, setLoading] = useState(false);
  const sendEmail = async () => {
    const messageCostumer = `Muchas gracias por tu compra, a la brevedad nuestro equipo estará trabajando en tu servicio contratado, gracias por su atención. OrderID: ${transactioId}`;
    const messageTeam = `Buenas tardes equipo, cliente ${pageName} correo ${email}  nombre ${nameCard} acaba de contratar el sigiente servicio con costo ${getTotalCart()} favor de atenderlo, su número de atención es ${transactioId}.`;
    const data = {
      body: ``,
    };
    await ApiTransaction.sendEmail(data);
  };

  const handlePay = async () => {
    setLoading(true);
    setStep(4);
    const merchantTransaction = 'Strenuss' + createRandomNumberTransaction();
    let data = {
      merchant_transaction_id: merchantTransaction,
      card: {
        number: valueCard,
        holder_name: nameCard + ' ' + firstSurname + ' ' + secondSurname,
        expiration_year: valueCardDate.slice(-2),
        expiration_month: valueCardDate.substring(0, 2),
        cvv: valueCardCvv,
      },
      customer: {
        merchant_customer_id: '331415',
        first_name: nameCard,
        second_name: '',
        first_surname: firstSurname,
        second_surname: secondSurname,
        email: email,
        phone_number: telephone,
        home_address: {
          street: street,
          external_number: streetNumber,
          postal_code: postalCode,
          colony: population,
          city: city,
          state_code: selectedOption.value,
          state_name: selectedOption.label,
          country_code: 'MX',
          country_name: 'Mexico',
        },
        billing_address: {
          street: street,
          external_number: streetNumber,
          postal_code: postalCode,
          colony: population,
          city: city,
          state_code: '',
          state_name: selectedOption.label,
          country_code: '',
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
    const dataRes = await ApiTransaction.makeTransaction(data);
    setLoading(false);

    if (dataRes?.content?.status === 'success') {
      setTransactionId(dataRes.content?.merchant_transaction_id);
      setStep(1);
      sendEmail();
    } else {
      setStep(0);
      let message = extractMessage(dataRes?.content?.message?.detail);
      setErrorResponse(message);
    }
  };

  const continueShopping = () => {
    cleanCartItems();
    router.push('/');
  };

  const validateActionButton = () => {
    if (step === 0) {
      handlePay();
      return;
    }
  };
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = optionsStates.find(
      (option) => option.value === selectedValue
    );
    setSelectedOption(selectedOption); // Actualiza el estado con la opción seleccionada
  };
  return (
    <section className='container mx-auto px-4 my-20 grid grid-cols-2 gap-40 justify-between min-h-screen'>
      <div>
        <div className='flex flex-col gap-5'>
          <h1 className='text-xl font-bold'>
            {step === 0 && t('your-products')}
          </h1>
          {step === 1 && (
            <div
              title={t('purchased-success')}
              className='w-full h-130 bg-white shadow-md rounded-lg overflow-hidden px-8 py-8'
            >
              <p className='mb-10 text-xl font-bold'>OrderId: {transactioId}</p>
              <p className='mb-2 text-xl font-bold'>{t('your-products')}</p>
              <ul>
                {products.map((item, index) => (
                  <li className='flex items-center py-2' key={index}>
                    <span className='text-gray-700 mr-2'>{item.name}</span>

                    <div className='flex-1 h-0.5 bg-gray-200'></div>

                    <span className='text-gray-700 mr-2'>{item.price}</span>
                  </li>
                ))}
              </ul>
              <div className='flex items-center py-2'>
                <span className='text-gray-700 mr-2'>Total</span>
                <div className='flex-1 h-0.5 bg-gray-200'></div>

                <p>{formatNumber(getTotalCart())}</p>
              </div>
              <Button
                className='mt-10 '
                label={'Continue'}
                onClick={continueShopping}
              />
            </div>
          )}
          {loading && (
            <ProgressSpinner
              style={{ width: '50px', height: '50px' }}
              strokeWidth='8'
              animationDuration='.5s'
              className='mx-auto'
            />
          )}

          {/* Product List */}
          {step === 0 && (
            <>
              {products.length === 0 ? (
                <p>{t('no-items-cart')}</p>
              ) : (
                <>
                  {products.map((item) => (
                    <div
                      className='flex w-full items-center gap-5 p-4 bg-white shadow-md shadow-indigo-200 rounded-none'
                      key={item.id}
                    >
                      <Image
                        src={item.image}
                        alt='Product image'
                        width={130}
                        height={130}
                        className='rounded-t-none object-cover h-22 w-22 border rounded-none'
                      />

                      <div className='flex flex-1 flex-col text-xs'>
                        <h1 className='text-xl'>{item.name}</h1>

                        <div className='flex items-center gap-1'>
                          <p className='font-bold text-lg mt-2 '>
                            {getTotalProduct(item)} MXN
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center gap-2'>
                        <button
                          className='w-6 h-6 border rounded-md flex justify-center items-center'
                          onClick={() => substProductItemCart(item.id)}
                        >
                          -
                        </button>

                        <h2>{getQuantityProductCart(item.id)}</h2>

                        <button
                          className='w-6 h-6 border rounded-md flex justify-center items-center'
                          onClick={() => sumProductItemCart(item.id)}
                        >
                          +
                        </button>

                        <button
                          className='bg-red-500 text-white w-6 h-6 text-xs border rounded-md flex justify-center items-center'
                          onClick={() => handleAddOrRemoveProduct(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Pay Form */}
      {step === 0 && products.length > 0 && (
        <div>
          <div className='flex flex-col gap-3'>
            {step !== 1 && (
              <RowText
                leftText='Total'
                rightText={formatNumber(getTotalCart())}
              />
            )}

            <h1 className='text-xl font-bold'>{t('fill-form')}</h1>

            <h1 className='text-m font-bold'>{t('require-fields')} *</h1>

            <Input
              value={valueCard}
              onChange={(e) => {
                if (
                  new RegExp('^[0-9]+$').test(e.target.value) ||
                  e.target.value === ''
                ) {
                  setValueCard(e.target.value);
                }
              }}
              type='text'
              placeholder={t('card-number')}
              error={valueCardError}
              maxLength={16}
            />

            <Input
              value={nameCard}
              onChange={(e) => {
                if (
                  /^[a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*$/.test(e.target.value) ||
                  e.target.value === ''
                ) {
                  setNameCard(e.target.value);
                }
              }}
              type='text'
              placeholder={t('card-owner')}
              error={nameCardError}
            />
            <Input
              value={firstSurname}
              onChange={(e) => {
                if (
                  /^[a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*$/.test(e.target.value) ||
                  e.target.value === ''
                ) {
                  setFirstSurname(e.target.value);
                }
              }}
              type='text'
              placeholder={t('first-surname')}
              error={firstSurnameError}
            />
            <Input
              value={secondSurname}
              onChange={(e) => {
                if (
                  /^[a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*$/.test(e.target.value) ||
                  e.target.value === ''
                ) {
                  setSecondSurname(e.target.value);
                }
              }}
              type='text'
              placeholder={t('second-surname')}
              error={secondSurnameError}
            />

            <Input
              value={valueCardDate}
              onChange={(e) => {
                if (
                  new RegExp('^[0-9]+$').test(e.target.value) ||
                  e.target.value === ''
                ) {
                  setValueCardDate(e.target.value);
                }
              }}
              onFocus={(e) => setValueCardDate(e.target.value.replace('/', ''))}
              onBlur={(e) =>
                setValueCardDate(
                  e.target.value
                    ? e.target.value.substring(0, 2) +
                        '/' +
                        e.target.value.substring(2)
                    : ''
                )
              }
              type='text'
              placeholder={t('card-date')}
              error={valueCardDateError}
              required
              maxLength={4}
            />

            <Input
              value={valueCardCvv}
              onChange={(e) => {
                if (
                  new RegExp('^[0-9]+$').test(e.target.value) ||
                  e.target.value === ''
                ) {
                  setValueCardCvv(e.target.value);
                }
              }}
              type='text'
              placeholder={t('card-cvv')}
              error={valueCardCvvError}
              required
              maxLength={3}
            />

            <h1 className='text-xl font-bold'>{t('address')}</h1>
            <Input
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
              }}
              type='text'
              placeholder={t('street')}
              required
            />

            <Input
              value={streetNumber}
              onChange={(e) => {
                if (
                  new RegExp('^[0-9]+$').test(e.target.value) ||
                  e.target.value === ''
                ) {
                  setStreetNumber(e.target.value);
                }
              }}
              type='text'
              placeholder={t('street-number')}
              required
            />

            <Input
              value={postalCode}
              onChange={(e) => {
                if (
                  new RegExp('^[0-9]+$').test(e.target.value) ||
                  e.target.value === ''
                ) {
                  setPostalCode(e.target.value);
                }
              }}
              type='text'
              placeholder={t('postal-code')}
              required
            />

            <Input
              value={population}
              onChange={(e) => {
                setPopulation(e.target.value);
              }}
              type='text'
              placeholder={t('population')}
              required
            />

            <Input
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              type='text'
              placeholder={t('city')}
              required
            />

            <Input
              value={stateName}
              onChange={(e) => {
                setStateName(e.target.value);
              }}
              type='text'
              placeholder={t('state')}
              required
            />
            {/* <Select
              options={optionsStates}
              value={selectedOption.value}
              onChange={handleSelectChange}
              placeholder={t('state')}
            /> */}
            <h1 className='text-xl font-bold'>{t('user-data')}</h1>
            <Input
              value={telephone}
              onChange={(e) => {
                if (
                  new RegExp('^[0-9]+$').test(e.target.value) ||
                  e.target.value === ''
                ) {
                  setTelephone(e.target.value);
                }
              }}
              type='text'
              placeholder={t('telephone')}
              required
            />

            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type='text'
              placeholder={t('email')}
              required
              error={errorResponse}
            />

            <div className='flex flex-col gap-2'>
              {(products.length > 0 || step === 1) && (
                <div>
                  <Button
                    label={t(LABEL_BUTTON[step])}
                    onClick={validateActionButton}
                    disabled={isDisabledButton || loading}
                  />
                </div>
              )}
            </div>
            <Image
              alt='Visa mastercard'
              width={90}
              height={90}
              src={'/images/visaMaster.png'}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CartSection;
