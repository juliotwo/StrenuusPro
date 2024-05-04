import Navbar from "@/components/molecules/Navbar";
import Footer from "@/components/molecules/Footer";
import { email, pageName } from "@/data";
import { useTranslations } from "next-intl";

export default function Policy() {
  const t = useTranslations("Policy");

  return (
    <main>
      <Navbar />

      <section className="container mx-auto px-4 my-20 md:my-24 flex flex-col gap-3">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5">
          {t("title")}
        </h1>

        <div className="flex flex-col gap-4 text-secondary">
          <p>{t("text-1", { pageName })}</p>

          <h6 className="text-black font-medium">{t("subtitle-1")}</h6>

          <div
            dangerouslySetInnerHTML={{ __html: t.raw("content-1") }}
            className="flex flex-col gap-4"
          />

          <h6 className="text-black font-medium">{t("subtitle-2")}</h6>

          <div
            dangerouslySetInnerHTML={{ __html: t.raw("content-2") }}
            className="flex flex-col gap-4"
          />

          <h6 className="text-black font-medium">{t("subtitle-3")}</h6>

          <div
            dangerouslySetInnerHTML={{ __html: t.raw("content-3") }}
            className="flex flex-col gap-4"
          />

          <h6 className="text-black font-medium">{t("subtitle-4")}</h6>

          <div
            dangerouslySetInnerHTML={{ __html: t.raw("content-4") }}
            className="flex flex-col gap-4"
          />

          <h6 className="text-black font-medium">{t("subtitle-5")}</h6>

          <div
            dangerouslySetInnerHTML={{ __html: t.raw("content-5") }}
            className="flex flex-col gap-4"
          />

          <h6 className="text-black font-medium">{t("subtitle-6")}</h6>

          <div
            dangerouslySetInnerHTML={{ __html: t.raw("content-6") }}
            className="flex flex-col gap-4"
          />

          <h6 className="text-black font-medium">{t("subtitle-7")}</h6>

          <p>{t("text-71", { email })}</p>
          <p>{t("text-72", { pageName })}</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
