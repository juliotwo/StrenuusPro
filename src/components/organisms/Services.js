"use client";
import { formatNumber } from "@/utils/amounts";
import Button from "../atoms/Button";
import { useContext } from "react";
import { CartContext } from "@/context/cart";
import { productsData } from "@/data";
import Link from "next/link";
import Image from "next/image";

const servicesData = [
  {
    title: "Choose the date",
    image: "/images/step-1.jpg",
    description:
      "Discover the art of photography with our comprehensive courses. Whether you're a beginner or looking to enhance your skills, our experienced instructors will guide you through the technical aspects, composition techniques, and creative approaches to photography. Immerse yourself in a dynamic learning environment and unlock your full potential as a photographer. Join our courses and embark on a journey of visual storytelling.",
    button: "Step 1",
  },
  {
    title: "Personalize your event",
    image: "/images/step-2.jpg",
    description:
      "Immerse yourself in the vibrant world of photography through our exciting events and contests. Join us for captivating photography expeditions, workshops, and exhibitions that showcase the beauty of different genres, from landscapes to portraits. Engage with fellow photography enthusiasts, learn from industry experts, and participate in our prestigious photography contests to showcase your talent and win exciting prizes. Ignite your creative passion and be part of our inspiring community.",
    button: "Step 2",
  },
  {
    title: "Enjoy your event",
    image: "/images/step-3.jpg",
    description:
      "Immerse yourself in the vibrant world of photography through our exciting events and contests. Join us for captivating photography expeditions, workshops, and exhibitions that showcase the beauty of different genres, from landscapes to portraits. Engage with fellow photography enthusiasts, learn from industry experts, and participate in our prestigious photography contests to showcase your talent and win exciting prizes. Ignite your creative passion and be part of our inspiring community.",
    button: "Step 3",
  },
];

const Services = () => {
  const { handleAddOrRemoveProduct, validateProductInCart } =
    useContext(CartContext);
  return (
    <>
      <section className="bg-black min-h-screen py-28">
        <div className="container mx-auto px-4 w-full h-full flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-5 mt-20">
            {servicesData.map((item, i) => (
              <div
                className="bg-center bg-cover"
                style={{ backgroundImage: `url(${item.image})` }}
                key={i}
              >
                <div className="flex flex-col bg-black text-white bg-opacity-40 h-full w-full p-10">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium">
                    {item.title}
                  </h1>

                  <div className="flex-1 mt-10 flex items-end">
                    <Link href="/#shop">
                      <Button label={item.button} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop */}
      <section
        id="shop"
        className="flex flex-col container mx-auto px-4 min-h-screen justify-center py-28"
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium uppercase">
          What kind of event are you looking for?
        </h1>

        <div className="w-full grid grid-cols-4 gap-5 mt-20">
          {productsData.map((item, i) => {
            const isAdded = validateProductInCart(item.id);

            return (
              <div
                className="bg-white flex flex-col rounded-none shadow-lg"
                key={i}
              >
                <Image
                  src={item.image}
                  alt="course image"
                  width={400}
                  height={400}
                  className="w-full h-60 object-cover rounded-t-none"
                />
                <div className="flex flex-col w-full p-5 gap-1 flex-1">
                  <h1 className="text-sm font-medium uppercase">{item.name}</h1>
                  <div className="flex-1">
                    <p className="text-[10px]">{item.description}</p>
                  </div>
                  <h2 className="font-bold text-sm my-2">
                    {formatNumber(item.price)} MXN
                  </h2>

                  <Button
                    className="mt-2"
                    label={isAdded ? "Remove" : "Buy"}
                    onClick={() => handleAddOrRemoveProduct(item.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Services;
