import Link from "next/link";
import React from "react";

interface Props {
  label: string;
  path: string;
}

const NavItem = ({ label, path }: Props) => {
  return (
    <li className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2">
      <Link
        href={path}
        className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500"
      >
        {label}
      </Link>
      <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
      <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
    </li>
  );
};

export default NavItem;
