export const referencesData = [
  {
    name: "Carlos Rodríguez",
    company: "Luminova Corporation",
    description:
      "I recently organized a corporate event with StrenuusPro, and I was highly impressed with their professionalism and attention to detail. They took care of everything, from venue selection to logistics, and ensured a seamless and successful event. I highly recommend their services.",
  },
  {
    name: "Sofía López",
    company: "Aurora Enterprises",
    description:
      "StrenuusPro organized our company's product launch event, and it was a huge success. Their creative ideas, efficient planning, and flawless execution exceeded our expectations. Our brand received great visibility, and the event generated substantial buzz and positive feedback.",
  },
  {
    name: "Diego Hernández",
    company: "Serenity Solutions",
    description:
      "I attended a corporate retreat organized by StrenuusPro, and it was an incredible experience. The team-building activities, strategic discussions, and serene location created the perfect environment for personal and professional growth. It was a rejuvenating and inspiring retreat.",
  },
  {
    name: "Valentina Gómez",
    company: "Elevate Innovations",
    description:
      "StrenuusPro organized an award ceremony for our organization, and it was a memorable evening. The event was flawlessly executed, with elegant decorations, seamless transitions, and a captivating atmosphere. It truly celebrated the achievements of individuals and created a sense of pride.",
  },
  {
    name: "Gabriel Silva",
    company: "Pixel Perfect Technologies",
    description:
      "I recently attended a photography workshop organized by StrenuusPro, and it was a transformative experience. The instructor's expertise, hands-on practice, and valuable insights helped me refine my skills and broaden my creative horizons. It was a highly enriching and enjoyable workshop.",
  },
  {
    name: "Isabella Morales",
    company: "Vitality Inc.",
    description:
      "StrenuusPro organized a series of corporate training sessions for our team, and it was a game-changer. The sessions were engaging, informative, and tailored to our specific needs. Our team members gained valuable knowledge and skills that have positively impacted our work.",
  },
];

const References = () => {
  return (
    <section className="w-full relative min-h-screen flex flex-col py-28">
      <video
        src="/videos/reviews.mp4"
        autoPlay
        muted
        loop
        controls={false}
        className="w-full object-cover h-full brightness-75 absolute top-0 left-0 -z-10"
      />

      <div className="container px-4 mx-auto min-h-screen flex flex-col justify-center">
        {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase">
          Reviews
        </h1> */}

        <div className="grid grid-cols-3 gap-3 mt-20">
          {referencesData.map((item, i) => (
            <div
              className="p-8 bg-white flex justify-center flex-col rounded-none shadow-lg gap-4 bg-opacity-80"
              key={i}
            >
              <h3 className="font-bold flex items-center">
                {item.name}{" "}
                <span className="font-normal text-sm ml-2">
                  ({item.company})
                </span>
              </h3>

              <p className="font-light text-left lg:text-justify text-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default References;
