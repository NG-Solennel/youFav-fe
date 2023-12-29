"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Links = () => {
  const { push } = useRouter();
  const path = usePathname();

  return (
    <ul className="flex justify-center items-center gap-10">
      <li
        onClick={() => push("/home/main")}
        className={`${
          path.split("/")[path.split("/").length - 1] === "main"
            ? "text-secondary"
            : null
        } text-sm cursor-pointer hover:text-secondary hover:scale-105 transition-all duration-150 ease-in`}
      >
        Home
      </li>
      <li
        onClick={() => push("/home/main/favorites")}
        className={`${
          path.split("/").includes("favorites") ? "text-secondary" : null
        } text-sm cursor-pointer hover:text-secondary hover:scale-105 transition-all duration-150 ease-in`}
      >
        Favorites
      </li>
      <li
        onClick={() => push("/home/main/reference")}
        className={`${
          path.split("/").includes("reference") ? "text-secondary" : null
        } text-sm cursor-pointer hover:text-secondary hover:scale-105 transition-all duration-150 ease-in`}
      >
        Reference
      </li>
    </ul>
  );
};

export default Links;
