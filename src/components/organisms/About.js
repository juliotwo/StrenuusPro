import Link from "next/link";
import Button from "../atoms/Button";

const aboutData = [
  {
    description:
      "We understand the importance of being a photographer. We believe that photography is a powerful form of artistic expression and a tool to capture meaningful moments in life. Photographers have the power to freeze time, tell stories, and convey emotions through their images. We take pride in nurturing and supporting those who choose to pursue this creative path. Our goal is to provide them with the tools, knowledge, and inspiration they need to elevate their craft and unleash their artistic vision. Join us on this journey as we celebrate the art of photography and the impact it can have on the world.",
  },
];

const Know = () => {
  return (
    <section
      id="know"
      className="relative w-full flex justify-center flex-col min-h-screen bg-hero-about bg-center bg-cover"
    >
      <div className="container px-4 mx-auto grid grid-cols-1 gap-5 justify-center h-full items-center">
        {aboutData.map((item, i) => (
          <div className="flex flex-col bg-white p-10" key={i}>
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase">
              Know about us
            </h1>
            <div className="text-sm mt-10">
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Know;
