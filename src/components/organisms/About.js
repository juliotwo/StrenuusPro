import { useTranslations } from "next-intl";

const Know = () => {
  const t = useTranslations("About");

  return (
    <section
      id="know"
      className="relative w-full flex justify-center flex-col min-h-screen bg-hero-about bg-center bg-cover"
    >
      <div className="container px-4 mx-auto grid grid-cols-1 gap-5 justify-center h-full items-center">
        <div className="flex flex-col bg-white p-10">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase">
            {t("title")}
          </h1>
          <div className="text-sm mt-10">
            <p>{t("description")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Know;
