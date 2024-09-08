"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import MenuIcon from "./MenuIcon";
import Image from "next/image";
import { menuNavItems } from "./navigators";
import Link from "next/link";
import { LogInIcon } from "lucide-react";

const MenuList = () => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer direction="left" open={open}>
      <MenuIcon open={open} onChange={() => setOpen(!open)} />
      <DrawerContent
        className="w-64 h-full p-5 flex flex-col gap-7 bg-gray-800 border-none no-header text-white"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(false);
        }}
      >
        <DrawerTitle>BETA WORLD</DrawerTitle>

        <span className="flex flex-col gap-3 items-center">
          <Image
            src="/user-grey.png"
            alt="User Profile"
            width={90}
            height={90}
            className="rounded-full"
          />
          <h2 className="text-xl font-bold text-center">User name</h2>
        </span>
        <ul className="flex flex-col gap-5">
          {menuNavItems.map((item) => (
            <li key={item.label}>
              <Link href={item.path} className="text-lg hover:underline flex gap-4 items-center">
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href='/login' className='text-lg hover:underline flex gap-4 items-center bg-white text-black rounded-xl p-4'>
          <LogInIcon /> Login
        </Link>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuList;
