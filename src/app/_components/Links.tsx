"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Links = () => {
  const { push } = useRouter();
  return (
    <ul className="flex justify-center items-center gap-7">
      <li
        onClick={() => push("/home/main")}
        className="text-base cursor-pointer font-semibold hover:text-secondary hover:scale-105 transition-all duration-150 ease-in"
      >
        Home
      </li>
      <li
        onClick={() => push("/home/main/favorites")}
        className="text-base cursor-pointer font-semibold hover:text-secondary hover:scale-105 transition-all duration-150 ease-in"
      >
        Favorites
      </li>
      <li
        onClick={() => push("/home/main/favorites")}
        className="text-base cursor-pointer font-semibold hover:text-secondary hover:scale-105 transition-all duration-150 ease-in"
      >
        Reference
      </li>
    </ul>
  );
};

export default Links;
