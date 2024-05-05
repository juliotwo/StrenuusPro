"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "@/navigation";
import { formatNumber, getTotalProduct } from "@/utils/amounts";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { CartContext } from "@/context/cart";
import { FaTrash } from "react-icons/fa";
import { useTranslations } from "next-intl";

const LABEL_BUTTON = ["pay-order", "continue"];

const RowText = ({ leftText, rightText }) => (
  <div className="w-full flex justify-between items-center mt-10">
    <p className="text-gray-400">{leftText}</p>
    <p>{rightText} MXN</p>
  </div>
);

const CartSection = () => {
  const router = useRouter();
  const t = useTranslations("Cart");

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

  const [valueCard, setValueCard] = useState("");
  const [valueCardError, setValueCardError] = useState("");
  const [valueCardDate, setValueCardDate] = useState("");
  const [valueCardDateError, setValueCardDateError] = useState("");
  const [valueCardCvv, setValueCardCvv] = useState("");
  const [valueCardCvvError, setValueCardCvvError] = useState("");
  const [nameCard, setNameCard] = useState("");
  const [nameCardError, setNameCardError] = useState("");

  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [population, setPopulation] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const formCardDisabled =
    valueCard === "" ||
    valueCardError ||
    valueCardDate === "" ||
    valueCardDateError ||
    valueCardCvv === "" ||
    valueCardCvvError ||
    nameCard === "" ||
    nameCardError;

  const formContactDisabled =
    street === "" ||
    streetNumber === "" ||
    postalCode === "" ||
    population === "" ||
    city === "" ||
    country === "";

  const isDisabledButton =
    step === 0 && (formCardDisabled || formContactDisabled);

  useEffect(() => {
    if (valueCard) {
      if (valueCard.trim().length < 16) {
        setValueCardError(t("validation-min-card-number"));
        return;
      }

      // Validate zeros
      if (!/^(?!0+$)\d+$/.test(valueCard)) {
        setValueCardError(t("validation-card-number-no-valid"));
        return;
      }

      setValueCardError("");
    }

    if (valueCardDate) {
      if (valueCardDate.trim().length < 4) {
        setValueCardDateError(t("validation-min-date-card"));
        return;
      }

      // Validate zeros
      if (
        +valueCardDate.substring(0, 2) > 12 ||
        +valueCardDate.substring(0, 2) < 1 ||
        +valueCardDate.slice(-2) > 28
      ) {
        setValueCardDateError(t("validation-date-card"));
        return;
      }

      setValueCardDateError("");
    }

    if (valueCardCvv) {
      if (valueCardCvv.trim().length < 3) {
        setValueCardCvvError(t("validation-min-cvv-card"));
        return;
      }

      // Validate zeros
      if (!/^(?!0+$)\d+$/.test(valueCardCvv)) {
        setValueCardCvvError(t("validation-cvv-card"));
        return;
      }

      setValueCardCvvError("");
    }

    setNameCardError(
      nameCard && nameCard.trim().length < 10
        ? t("validation-min-card-name")
        : ""
    );
  }, [valueCard, valueCardDate, valueCardCvv, nameCard]);

  const handlePay = () => {
    cleanCartItems();
    setStep(1);
  };

  const validateActionButton = () => {
    if (step === 0) {
      handlePay();
      return;
    }
    if (step === 1) {
      router.push("/");
    }
  };

  return (
    <section className="container mx-auto px-4 my-20 grid grid-cols-2 gap-40 justify-between min-h-screen">
      <div>
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-bold">
            {step === 0 && t("your-products")}
            {step === 1 && t("purchased-success")}
          </h1>

          {/* Product List */}
          {step === 0 && (
            <>
              {products.length === 0 ? (
                <p>{t("no-items-cart")}</p>
              ) : (
                <>
                  {products.map((item) => (
                    <div
                      className="flex w-full items-center gap-5 p-4 bg-white shadow-md shadow-indigo-200 rounded-none"
                      key={item.id}
                    >
                      <Image
                        src={item.image}
                        alt="Product image"
                        width={300}
                        height={300}
                        className="rounded-t-none object-cover h-20 w-20 border rounded-none"
                      />

                      <div className="flex flex-1 flex-col text-xs">
                        <h1>{item.name}</h1>
                        <div className="flex items-center gap-1">
                          <p className="font-bold">
                            {getTotalProduct(item)} MXN
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          className="w-6 h-6 border rounded-md flex justify-center items-center"
                          onClick={() => substProductItemCart(item.id)}
                        >
                          -
                        </button>

                        <h2>{getQuantityProductCart(item.id)}</h2>

                        <button
                          className="w-6 h-6 border rounded-md flex justify-center items-center"
                          onClick={() => sumProductItemCart(item.id)}
                        >
                          +
                        </button>

                        <button
                          className="bg-red-500 text-white w-6 h-6 text-xs border rounded-md flex justify-center items-center"
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
          <div className="flex flex-col gap-3">
            {step !== 1 && (
              <RowText
                leftText="Total"
                rightText={formatNumber(getTotalCart())}
              />
            )}

            <h1 className="text-xl font-bold">{t("fill-form")}</h1>

            <Image
              alt="Visa mastercard"
              width={90}
              height={90}
              src={"/images/visaMaster.png"}
            />

            <Input
              value={valueCard}
              onChange={(e) => {
                if (
                  new RegExp("^[0-9]+$").test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setValueCard(e.target.value);
                }
              }}
              type="text"
              placeholder={t("card-number")}
              error={valueCardError}
              maxLength={16}
            />

            <Input
              value={nameCard}
              onChange={(e) => {
                if (
                  /^[a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*$/.test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setNameCard(e.target.value);
                }
              }}
              type="text"
              placeholder={t("card-owner")}
              error={nameCardError}
            />

            <Input
              value={valueCardDate}
              onChange={(e) => {
                if (
                  new RegExp("^[0-9]+$").test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setValueCardDate(e.target.value);
                }
              }}
              onFocus={(e) => setValueCardDate(e.target.value.replace("/", ""))}
              onBlur={(e) =>
                setValueCardDate(
                  e.target.value
                    ? e.target.value.substring(0, 2) +
                        "/" +
                        e.target.value.substring(2)
                    : ""
                )
              }
              type="text"
              placeholder={t("card-date")}
              error={valueCardDateError}
              required
              maxLength={4}
            />

            <Input
              value={valueCardCvv}
              onChange={(e) => {
                if (
                  new RegExp("^[0-9]+$").test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setValueCardCvv(e.target.value);
                }
              }}
              type="text"
              placeholder={t("card-cvv")}
              error={valueCardCvvError}
              required
              maxLength={3}
            />

            <h1 className="text-xl font-bold">{t("address")}</h1>
            <Input
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
              }}
              type="text"
              placeholder={t("street")}
              required
            />

            <Input
              value={streetNumber}
              onChange={(e) => {
                if (
                  new RegExp("^[0-9]+$").test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setStreetNumber(e.target.value);
                }
              }}
              type="text"
              placeholder={t("street-number")}
              required
            />

            <Input
              value={postalCode}
              onChange={(e) => {
                if (
                  new RegExp("^[0-9]+$").test(e.target.value) ||
                  e.target.value === ""
                ) {
                  setPostalCode(e.target.value);
                }
              }}
              type="text"
              placeholder={t("postal-code")}
              required
            />

            <Input
              value={population}
              onChange={(e) => {
                setPopulation(e.target.value);
              }}
              type="text"
              placeholder={t("population")}
              required
            />

            <Input
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              type="text"
              placeholder={t("city")}
              required
            />
            <Input
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              type="text"
              placeholder={t("country")}
              required
            />

            <div className="flex flex-col gap-2">
              {(products.length > 0 || step === 1) && (
                <div>
                  <Button
                    label={t(LABEL_BUTTON[step])}
                    onClick={validateActionButton}
                    disabled={isDisabledButton}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartSection;
