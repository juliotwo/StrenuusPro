"use client";
import { useLocale } from "next-intl";
import { twJoin } from "tailwind-merge";
import { FaCartArrowDown, FaPhone } from "react-icons/fa";
import { Link, usePathname, useRouter } from "@/navigation";
import Button from "../atoms/Button";
import { navbarOptions, pageName } from "@/data";

const Navbar = ({ textBlack = true }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav className="w-full py-4 text-sm">
      <div
        className={twJoin(
          "container px-4 mx-auto flex justify-between items-center h-full",
          textBlack ? "text-black" : "text-white"
        )}
      >
        <div className="flex gap-10 items-center">
          <Button
            className="py-3"
            label={locale.toUpperCase()}
            onClick={() =>
              router.replace(pathname, {
                locale: locale === "es" ? "en" : "es",
              })
            }
            variant="primary"
            withShadow={false}
          />

          <Link href="/" className="text-xs sm:text-sm uppercase">
            {pageName}
          </Link>
        </div>

        <div className="flex items-center gap-10">
          <div className="bg-white py-3 text-xs px-10 flex text-primary gap-10">
            {navbarOptions.map((item) => (
              <Link
                href={item.href}
                className="uppercase hover:text-primary"
                key={item.href}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <Link href="/my-cart">
              <Button
                className="py-3"
                label="Cart"
                variant="primary"
                withShadow={false}
                icon={<FaCartArrowDown />}
              />
            </Link>
            <Link href="/contact">
              <Button
                className="py-3"
                label="Contact"
                variant="primary"
                withShadow={false}
                icon={<FaPhone />}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
