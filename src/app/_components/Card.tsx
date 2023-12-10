import React, { FC } from "react";
import mvImg from "../../../public/mv5.avif";
import Image from "next/image";
import { FilmType } from "./Listings/Movies";
import { Button } from "./Button";
import { Plus } from "phosphor-react";

interface CardProps {
  film: FilmType;
  actionButton: React.ReactNode;
}

const Card: FC<CardProps> = ({ film, actionButton }) => {
  return (
    <div className="w-60 flex flex-col gap-2 items-center justify-center m-5">
      <Image
        src={film.Poster}
        alt="mvImage"
        className="w-full border-4 border-[#424242] border-opacity-100 min-h-[220px]"
        width={240}
        height={300}
      />
      <h3 className="mr-auto">{film.Title}</h3>
      <div className="flex justify-between items-center w-full gap-5">
        {actionButton}
        <p className="ml-auto">{film.Year}</p>
      </div>
    </div>
  );
};

export default Card;
