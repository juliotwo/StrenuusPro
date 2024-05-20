"use client";
import { useState } from "react";
import { useRouter } from "@/navigation";

import { useTranslations } from "next-intl";
// import { ApiTransaction } from "@/api/api";
// import { optionsStates, pageName, phoneNumber } from "@/data";
// import { ProgressSpinner } from "primereact/progressspinner";
import { CartSection, Button, Payments } from "ui-pages-ecommerce";

const CartSectionComponent = () => {
  const [step, setStep] = useState("cart"); // cart | payment
  const router = useRouter();
  const t = useTranslations("Cart");

  return (
    <div className="w-full flex justify-center mt-10 mb-20">
      <div className="container px-4">
        <div className="flex flex-col gap-5">
          {step === "cart" && (
            <CartSection
              onClickBuyMore={() => router.push("/#shop")}
              onClickGoHome={() => router.push("/")}
              variant="grid"
              gridColumns={1}
            />
          )}

          {step === "payment" && (
            <Payments
              onClickBuyMore={() => router.push("/#shop")}
              onClickGoHome={() => router.push("/")}
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
