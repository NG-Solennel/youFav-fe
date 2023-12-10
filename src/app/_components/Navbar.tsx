import React from "react";
import Logo from "./Logo";
import Avatar from "./Avatar";
import Search from "./Search";
import Links from "./Links";

const Navbar = () => {
  return (
    <header className="relative">
      <nav className="bg-deep w-full h-16 rounded-md flex justify-between items-center px-5">
        <Logo size="small" />
        <Links />
        <Avatar />
      </nav>
      <Search />
    </header>
  );
};

export default Navbar;
