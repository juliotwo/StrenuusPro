import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

import Navbar from "../molecules/Navbar";
import Button from "../atoms/Button";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <section id="hero" className="relative w-full flex flex-col h-screen">
      {/* <video
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        controls={false}
        className="w-full object-cover min-h-screen brightness-75 absolute top-0 left-0 -z-10"
      /> */}

      <div className="w-full h-screen px-4 mx-auto flex bg-hero bg-cover flex-col">
        <Navbar textBlack={false} />

        <div className="container flex px-10 items-center h-full">
          <div className="flex flex-col text-black bg-white shadow-lg rounded-none p-10 lg:w-3/6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-medium">
              {t("title")},
              <br />
              {t("title-2")}
            </h1>

            <div className="mt-5 text-sm">
              <p>{t("description")}</p>
            </div>

            <Link className="mt-10" href="/#shop">
              <Button label={t("make-event")} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
