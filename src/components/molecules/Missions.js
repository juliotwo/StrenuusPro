const missions = [
  {
    title: "Mission",
    description:
      "Our mission at StrenuusPro is to provide exceptional event preparation services to businesses, delivering seamless and memorable experiences that exceed our clients' expectations. We aim to be a reliable partner in creating successful corporate events that inspire, engage, and leave a lasting impact on attendees.",
  },
  {
    title: "Vision",
    description:
      "Our vision is to be the leading provider of event preparation services for businesses, recognized for our creativity, attention to detail, and commitment to excellence. We strive to elevate the standards of corporate events, setting new benchmarks in innovation, professionalism, and customer satisfaction.",
  },
  {
    title: "Values",
    description:
      "Customer-centricity: We prioritize our clients' needs and objectives, tailoring our services to deliver customized solutions that align with their vision and goals. Integrity: We conduct our business with honesty, transparency, and ethical practices, building trust and long-lasting relationships with our clients and partners. Creativity: We foster a culture of innovation and out-of-the-box thinking, constantly seeking fresh ideas and unique approaches to create impactful and memorable events. Collaboration: We believe in the power of collaboration and teamwork, working closely with our clients and vendors to ensure seamless coordination and flawless execution. Excellence: We are committed to delivering high-quality services, paying attention to every detail and continuously striving for perfection in all aspects of event preparation. Continuous Improvement: We embrace a growth mindset, constantly learning and evolving to stay at the forefront of industry trends, technologies, and best practices.",
  },
];

const Missions = () => {
  return (
    <section className="py-28 min-h-screen bg-slate-500" id="more">
      <div className="container px-4 mx-auto grid grid-cols-1 gap-5">
        {missions.map((item, i) =>
          item !== null ? (
            <div
              className="flex flex-col gap-3 text-black bg-white rounded-none shadow-lg p-10"
              key={i}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
                {item.title}
              </h3>

              <p className="font-light text-sm text-left lg:text-justify">
                {item.description}
              </p>
            </div>
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </section>
  );
};

export default Missions;
