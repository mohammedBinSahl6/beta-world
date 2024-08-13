"use client";
import React from "react";
import Logo from "../logo/Logo";
import { headerNavList } from "./navigators";
import Link from "next/link";
import NavItem from "./NavItem";
import MenuIcon from "./MenuIcon";
import MenuList from "./MenuList";

const Navbar = () => {
  return (
    <nav className="w-full p-3 px-7 flex justify-between items-center bg-gray-800">
      <Logo />
      <ul className="items-center gap-5 hidden md:flex">
        {headerNavList.map((item) => (
          <NavItem key={item.label} label={item.label} path={item.path} />
        ))}
      </ul>
      <MenuList />
    </nav>
  );
};

export default Navbar;
