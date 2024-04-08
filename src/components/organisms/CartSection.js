"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatNumber, getTotalProduct } from "@/utils/amounts";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { CartContext } from "@/context/cart";
import { FaTrash } from "react-icons/fa";

const LABEL_BUTTON = ["Pay Order", "Continue"];

const RowText = ({ leftText, rightText }) => (
  <div className="w-full flex justify-between items-center mt-10">
    <p className="text-gray-400">{leftText}</p>
    <p>{rightText} MXN</p>
  </div>
);

const CartSection = () => {
  const router = useRouter();

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
  const [valueCardDate, setValueCardDate] = useState("");
  const [valueCardCvv, setValueCardCvv] = useState("");
  const [nameCard, setNameCard] = useState("");

  const isDisabledButton =
    step === 0 &&
    (valueCard === "" ||
      nameCard === "" ||
      valueCardDate === "" ||
      valueCardCvv === "");

  const handlePay = () => {
    console.log("Paid");
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
            {step === 0 && "Your products"}
            {step === 1 &&
              "Purchase successful, we will be shipping your product soon."}
          </h1>

          {/* Product List */}
          {step === 0 && (
            <>
              {products.length === 0 ? (
                <p>There are not products in the cart.</p>
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

          <div className="flex flex-col gap-2">
            {(products.length > 0 || step === 1) && (
              <div>
                <Button
                  label={LABEL_BUTTON[step]}
                  onClick={validateActionButton}
                  disabled={isDisabledButton}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pay Form */}
      {step === 0 && products.length > 0 && (
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">Fill the form</h1>

          <Image
            alt="Visa mastercard"
            width={90}
            height={90}
            src={"/images/visaMaster.png"}
          />

          <Input
            onChange={(e) => setValueCard(e.target.value)}
            type="text"
            placeholder="Card number"
          />

          <Input
            onChange={(e) => setNameCard(e.target.value)}
            type="text"
            placeholder="Name on card"
          />

          <Input
            onChange={(e) => setValueCardDate(e.target.value)}
            type="text"
            placeholder="Date of expiration"
          />

          <Input
            onChange={(e) => setValueCardCvv(e.target.value)}
            type="text"
            placeholder="Card's CVV"
          />

          {step !== 1 && (
            <RowText
              leftText="Total"
              rightText={formatNumber(getTotalCart())}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default CartSection;
