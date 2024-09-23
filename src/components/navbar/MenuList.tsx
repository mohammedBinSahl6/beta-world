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
import { LogInIcon, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const MenuList = () => {
  const { status, data } = useSession();
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

        <Link href="/profile" className="flex flex-col gap-3 items-center">
          <Image
            src={data?.user?.image || "/user-grey.png"}
            alt="User Profile"
            width={90}
            height={90}
            className={cn("rounded-full", {
              "border-2 border-white": status === "authenticated",
            })}
          />
          <h2 className="text-xl font-bold text-center">
            {data?.user?.username || "Username"}
          </h2>
        </Link>
        <ul className="flex flex-col gap-5">
          {menuNavItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.path}
                className="text-lg hover:underline flex gap-4 items-center"
              >
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {status === "authenticated" ? (
          <Button
            variant={"secondary"}
            className="text-lg hover:underline flex gap-4 items-center bg-white text-black rounded-xl p-4"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut />
            Logout
          </Button>
        ) : (
          <Link
            href="/login"
            className="text-lg hover:underline flex gap-4 items-center bg-white text-black rounded-xl p-4"
          >
            <LogInIcon /> Login
          </Link>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MenuList;
