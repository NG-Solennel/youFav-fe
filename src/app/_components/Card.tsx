import React, { FC } from "react";
import mvImg from "../../../public/mv5.avif";
import Image from "next/image";
import { FilmType } from "./Listings/Movies";
import { Button } from "./Button";
import { Plus } from "phosphor-react";
import na from "../../../public/na.jpg";
import { useRouter } from "next/navigation";

interface CardProps {
  film: FilmType;
  rowOne?: React.ReactNode;
  rowTwo?: React.ReactNode;
}

const Card: FC<CardProps> = ({ film, rowOne, rowTwo }) => {
  const { push } = useRouter();
  return (
    <div
      onClick={() => push(`/home/main/${film.imdbID}`)}
      className="w-60 flex flex-col gap-2 items-center justify-center m-2 cursor-pointer"
    >
      <Image
        src={film.Poster.startsWith("https://") ? film.Poster : na}
        alt="mvImage"
        className="w-full border-4 border-[#424242] border-opacity-100 min-h-[220px]"
        width={240}
        height={300}
      />
      <h3 className="mr-auto">{film.Title}</h3>
      <div className="flex justify-between items-center w-full gap-5">
        {rowOne}
        <p className="ml-auto">{film.Year}</p>
      </div>
      <div className="flex justify-start items-center w-full gap-5">
        {rowTwo}
      </div>
    </div>
  );
};

export default Card;
