import { Link } from "@/navigation";
import Button from "../atoms/Button";
import { useTranslations } from "next-intl";

const Video = () => {
  const t = useTranslations("Video");

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <video
        src="/videos/walking.mp4"
        autoPlay
        muted
        loop
        controls={false}
        className="w-full object-cover h-screen brightness-75 absolute top-0 left-0"
      />

      <div className="flex flex-col gap-5 container mx-auto absolute items-center">
        <h1 className="text-3xl text-white">{t("description")}</h1>
        <div className="w-full">
          <Link href="/contact">
            <Button label={t("send-us-message")} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Video;
