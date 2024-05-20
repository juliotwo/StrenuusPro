"use client";
import { createContext } from "react";

import { productsDataEN, productsDataES } from "@/data";
import { useLocale } from "next-intl";
import { MainProvider } from "ui-pages-ecommerce";

export const CartContext = createContext();

const Provider = ({ children }) => {
  const locale = useLocale();

  return (
    <MainProvider
      products={locale === "es" ? productsDataES : productsDataEN}
      locale={locale}
    >
      {children}
    </MainProvider>
  );
};

export default Provider;
