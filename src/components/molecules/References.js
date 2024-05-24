import { useTranslations } from 'next-intl';

export const referencesData = [
  {
    name: 'Carlos Rodríguez',
    company: 'Luminova Corporation',
    description: 'description-1',
  },
  {
    name: 'Sofía López',
    company: 'Aurora Enterprises',
    description: 'description-2',
  },
  {
    name: 'Diego Hernández',
    company: 'Serenity Solutions',
    description: 'description-3',
  },
  {
    name: 'Valentina Gómez',
    company: 'Elevate Innovations',
    description: 'description-4',
  },
  {
    name: 'Gabriel Silva',
    company: 'Pixel Perfect Technologies',
    description: 'description-5',
  },
  {
    name: 'Isabella Morales',
    company: 'Vitality Inc.',
    description: 'description-6',
  },
];

const References = () => {
  const t = useTranslations('References');

  return (
    <section className='w-full relative min-h-screen flex flex-col py-28'>
      <video
        src='/videos/reviews.mp4'
        autoPlay
        muted
        loop
        controls={false}
        className='w-full object-cover h-full brightness-75 absolute top-0 left-0 -z-10'
      />

      <div className='container px-4 mx-auto min-h-screen flex flex-col justify-center'>
        {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase">
          Reviews
        </h1> */}

        <div className='grid grid-cols-3 gap-3 mt-20'>
          {referencesData.map((item, i) => (
            <div
              className='p-8 bg-white flex justify-center flex-col rounded-none shadow-lg gap-4 bg-opacity-80'
              key={i}
            >
              <h3 className='font-bold flex items-center'>
                {item.name}{' '}
                <span className='font-normal text-sm ml-2'>
                  ({item.company})
                </span>
              </h3>

              <p className='font-light italic text-left lg:text-justify text-xs'>
                &quot;{t(item.description)}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default References;
