"use client";
import { productsDataEN, productsDataES } from "@/data";
import { useLocale } from "next-intl";
import { MainProvider } from "ui-pages-ecommerce";

const Provider = ({ children }) => {
  const locale = useLocale();

  return (
    <MainProvider
      products={locale === "es" ? productsDataES : productsDataEN}
      locale={locale}
      colorPrimary="#252525"
    >
      {children}
    </MainProvider>
  );
};

export default Provider;
