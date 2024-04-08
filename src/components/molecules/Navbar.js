import Link from "next/link";
import Button from "../atoms/Button";
import { navbarOptions, pageName } from "@/data";
import { twJoin } from "tailwind-merge";

const Navbar = ({ textBlack = true }) => {
  return (
    <nav className="w-full py-4 text-sm">
      <div
        className={twJoin(
          "container px-4 mx-auto flex justify-between items-center h-full",
          textBlack ? "text-black" : "text-white"
        )}
      >
        <Link href="/" className="text-xs sm:text-sm uppercase">
          {pageName}
        </Link>

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
          <Link href="/my-cart">
            <Button label="Cart" variant="primary" withShadow={false} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
