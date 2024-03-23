"use client";
import React from "react";
import Logo from "./Logo";
import Avatar from "./Avatar";
import Search from "./Search";
import Links from "./Links";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const isMain = pathname.split("/")[pathname.split("/").length - 1] === "main";
  return (
    <header className="relative">
      <nav className="bg-deep w-full h-12 rounded-md flex gap-5 justify-between items-center px-5">
        <Logo size="small" />
        <Links />
        {isMain ? (
          <Search />
        ) : (
          <div className="w-48 px-[32px] ">
            <div className="px-[40px]"></div>
          </div>
        )}
        <Avatar />
      </nav>
    </header>
  );
};

export default Navbar;
