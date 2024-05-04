import { useTranslations } from "next-intl";

const missions = [
  {
    title: "mission-title",
    description: "mission-description",
  },
  {
    title: "vision-title",
    description: "vision-description",
  },
  {
    title: "values-title",
    description: "values-description",
  },
];

const Missions = () => {
  const t = useTranslations("Missions");

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
                {t(item.title)}
              </h3>

              <p className="font-light text-sm text-left lg:text-justify">
                {t(item.description)}
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
