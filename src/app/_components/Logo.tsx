"use client";
import React from "react";
import { FilmSlate } from "phosphor-react";

const Logo = ({ size }: { size: "large" | "small" | "medium" }) => {
  const style = {
    large: {
      text: "text-3xl mb-3",
      icon: "w-14 h-14 mr-5",
    },
    small: {
      text: "text-xl mb-1",
      icon: "w-10 h-10 mr-2",
    },
    medium: {
      text: "text-2xl mb-2",
      icon: "w-12 h-12 mr-3",
    },
  };

  return (
    <p
      className={`text-white font-titan flex justify-center items-center gap-2 ${style[size].text}`}
    >
      <FilmSlate className={`text-secondary ${style[size].icon}`} />
      <span>You</span>
      <span className="text-primary">F</span>
      <span className="text-secondary">a</span>
      <span className="text-ordinary">v</span>
    </p>
  );
};

export default Logo;
