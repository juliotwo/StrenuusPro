// Next
import Navbar from "@/components/molecules/Navbar";
import Footer from "@/components/molecules/Footer";
import { useTranslations } from "next-intl";

const PageNotFound = () => {
  const t = useTranslations("NotFoundPage");

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar textBlack />

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h1>{t("text")}</h1>
      </div>
      <Footer />
    </main>
  );
};

export default PageNotFound;
