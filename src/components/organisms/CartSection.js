"use client";
import { useContext, useState } from "react";
import { useRouter } from "@/navigation";

import { ApiTransaction } from "@/api/api";
import { email, pageName, phoneNumber } from "@/data";

import {
  CartSection,
  Button,
  Payments,
  CartContext,
  UserContext,
} from "ui-pages-ecommerce";

const CartSectionComponent = () => {
  const [step, setStep] = useState("cart"); // cart | payment
  const router = useRouter();

  const { firstname, lastname, email: emailUser } = useContext(UserContext);
  const { getTotalCart } = useContext(CartContext);

  const [transactionId, setTransactionId] = useState("");

  const createRandomNumberTransaction = () => {
    return +new Date();
  };

  const extractMessage = (str) => {
    console.log(str);
    if (!str) {
      return t("error-not-found");
    }
    const match = str.match(/message:\s*(.+)/);
    if (match) {
      return match[1];
    } else {
      return t("error-not-found");
    }
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {
    try {
      const services = products?.map((item) => item.name)?.join(", ");
      const data = {
        email_for_admin_data: {
          client: pageName,
          email,
          name: `${firstname} ${lastname}`,
          amount: getTotalCart(),
          phone_number: phoneNumber,
          service: services,
          order_number: transactionId,
        },
        email_for_client_data: {
          email: emailUser,
        },
      };
      await ApiTransaction.sendEmail(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePay = async (formData) => {
    try {
      setLoading(true);
      const merchantTransaction = "Strenuss" + createRandomNumberTransaction();
      const data = {
        merchant_transaction_id: merchantTransaction,
        card: {
          number: formData.cardNumber,
          holder_name:
            formData.cardName +
            " " +
            formData.lastname +
            " " +
            formData.secondSurname,
          expiration_year: formData.cardDate.slice(-2),
          expiration_month: formData.cardDate.substring(0, 2),
          cvv: formData.cardCvv,
        },
        customer: {
          merchant_customer_id: "331415",
          first_name: formData.cardName,
          second_name: "",
          first_surname: formData.lastname,
          second_surname: formData.secondSurname,
          email: formData.email,
          phone_number: formData.phone,
          home_address: {
            street: formData.street,
            external_number: formData.extNumber,
            postal_code: formData.codePostal,
            colony: undefined,
            city: formData.city,
            state_code: undefined,
            state_name: formData.state,
            country_code: undefined,
            country_name: formData.country,
          },
          billing_address: {
            street: formData.street,
            external_number: formData.extNumber,
            postal_code: formData.codePostal,
            colony: undefined,
            city: formData.city,
            state_code: undefined,
            state_name: formData.state,
            country_code: undefined,
            country_name: formData.country,
          },
          nationality: undefined,
          gender: undefined,
        },
        amount: 10,
        currency: "MXN",
        description: "Pago de evento",
      };

      await sleep(2000);

      /* THIS IS FOR EMULATE A ERROR */
      throw Error("XD");

      /* CODE REAL */
      // const dataRes = await ApiTransaction.makeTransaction(data);
      // console.log(dataRes);

      // setLoading(false);
      // if (dataRes?.content?.status === "success") {
      //   const transId = dataRes.content?.merchant_transaction_id;

      //   setTransactionId(transId);
      //   await sendEmail();

      //
      //   return {
      //     data: {
      //    transactionId: transId,
      //    },
      //     success: true,
      //   };
      // }

      /* SIMULATE SUCCESS */
      // setLoading(false);
      // return {
      //   data: {
      //     transactionId: "0001231302",
      //   },
      //   success: true,
      // };
    } catch (error) {
      setLoading(false);
      console.error(error);
      /* CODE REAL */
      // return {
      //   message: error.content.message.description,
      //   success: false,
      // };

      /* SIMULATE ERROR */
      return {
        message: "Este es el error simulado asi es",
        success: false,
      };
    }
  };

  return (
    <div className="w-full flex justify-center mt-10 mb-20">
      <div className="container px-4">
        <div className="flex flex-col gap-5">
          {step === "cart" && (
            <CartSection
              onClickBuyMore={() => router.push("/#shop")}
              onClickGoHome={() => router.push("/")}
              variant="table"
              gridColumns={2}
            />
          )}

          {step === "payment" && (
            <Payments
              isLoading={loading}
              onPaymentResult={handlePay}
              onClickBuyMore={() => router.push("/#shop")}
              onClickGoHome={() => router.push("/")}
              handleChangeDiscountCode={(_text) => {}}
              isValidDiscountCode={false}
              totalDiscount={0}
            />
          )}

          <div>
            <Button
              type="primary"
              onClick={() => setStep(step === "cart" ? "payment" : "cart")}
            >
              {step === "cart" ? "Go to Pay Form" : "Back to Cart Section"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSectionComponent;
