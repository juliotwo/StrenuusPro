const aboutData = [
  {
    description:
      "At StrenuusPro, we are passionate about transforming your corporate events into extraordinary experiences. With our unwavering commitment to excellence, attention to detail, and creative vision, we take pride in delivering seamless and impactful event preparation services. From product launches to corporate retreats, our dedicated team works closely with you to understand your objectives and bring your vision to life. With a focus on innovation, professionalism, and customer satisfaction, we strive to exceed expectations at every step. Trust StrenuusPro to elevate your events, leaving a lasting impression on your attendees and unlocking the full potential of your business.",
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
