import { address, email, footerOptions, pageName, phoneNumber } from "@/data";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full border-t border-black py-10 text-[10px] sm:text-sm">
            <div className="flex flex-col container px-4 mx-auto gap-5">
                <div className="flex justify-between items-center">
                    <Image
                        alt='Visa mastercard'
                        width={90}
                        height={90}
                        src={'/images/visaMaster.png'}
                    />

                    <p>{pageName} - Copyright © 2024 - All Rights Reserved</p>
                </div>

                <div className="flex items-center justify-between w-full">
                    <div className="flex gap-5 items-center">
                        <p>{email}</p>
                        <p>{phoneNumber}</p>
                    </div>

                    <div className="flex gap-5 items-center justify-end">
                        {footerOptions.map((item, i) => (
                            <Link href={item.href} className="font-medium hover:underline" key={i}>{item.name}</Link>
                        ))}
                    </div>
                </div>

                <p>{address}</p>
            </div>
        </footer>
    );
}

export default Footer;