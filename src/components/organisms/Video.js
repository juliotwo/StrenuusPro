import Link from "next/link";
import Button from "../atoms/Button";

const Video = () => {
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
        <h1 className="text-3xl text-white">
          Unleash the power of unforgettable events and elevate your business
          with StrenuusPro. Let us be your partner in crafting extraordinary
          moments that define your brand&apos;s story. Together, let&apos;s
          create events that leave a lasting impression!
        </h1>
        <div className="w-full">
          <Link href="/contact">
            <Button label="Send us a message" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Video;
