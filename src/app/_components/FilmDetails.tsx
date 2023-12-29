"use client";
import { useParams } from "next/navigation";
import React from "react";
import { trpc } from "../_trpc/client";
import Image from "next/image";
import na from "../../../public/na.jpg";
import { CalendarBlank } from "phosphor-react";
import BarLoader from "react-spinners/BarLoader";

interface FilmDetailType {
  Title: string;
  imdbRating: string;
  imdbVotes: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  BoxOffice: string;
  Language: string;
  Country: string;
  Plot: string;
  Actors: string;
  Writer: string;
  Director: string;
  Genre: string;
  Runtime: string;
  Released: string;
  Rated: string;
  Year: number;
  Awards: string;
}

const FilmDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = trpc.films.getFilmDetails.useQuery({
    id: id as string,
  });
  const details: FilmDetailType = data;

  return (
    <>
      {isLoading ? (
        <BarLoader
          color="#ffffff"
          loading={isLoading}
          cssOverride={{
            display: "block",
            margin: "200px auto",
            borderColor: "red",
            width: "15%",
          }}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <main className="flex justify-center items-center gap-4 p-10">
          <section className="w-3/4 flex flex-col justify-between items-start gap-7">
            <h1 className="text-4xl font-semibold">{details?.Title}</h1>
            <div className="text-light">
              <p>
                <span className="mr-5">
                  IMDB Rating🌟: {details?.imdbRating}
                </span>
                {details?.Ratings?.map((rating, idx) => {
                  if (rating.Source === "Rotten Tomatoes") {
                    return (
                      <span key={idx} className="mr-5">
                        {rating.Source} 🍅: {rating.Value}
                      </span>
                    );
                  }
                  return (
                    <span key={idx} className="mr-5">
                      {rating.Source}: {rating.Value}
                    </span>
                  );
                })}
              </p>
              <p className="flex justify-start items-center gap-5 mt-2">
                <span>IMDB Votes👍: {details?.imdbVotes}</span>
                <span>Runtime🎞️: {details?.Runtime}</span>
                <span>Box Office💰: {details?.BoxOffice}</span>
                <span className="flex justify-center gap-2">
                  Year
                  <CalendarBlank className="w-5 h-6 text-secondary" />
                  :&nbsp;
                  {details?.Year}
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-start gap-3">
              <div>{details?.Plot}</div>
              <div className="flex flex-col gap-2">
                <p className="flex justify-start gap-3 text-light">
                  <span className="font-semibold text-white">Directors:</span>{" "}
                  {details?.Director}
                </p>
                <p className="flex justify-start gap-3 text-light">
                  <span className="font-semibold text-white">Writers:</span>{" "}
                  {details?.Writer}
                </p>
                <p className="flex justify-start gap-3 text-light">
                  <span className="font-semibold text-white">Stars:</span>{" "}
                  {details?.Actors}
                </p>
                <p className="flex justify-start gap-3 text-light">
                  <span className="font-semibold text-white">Genre:</span>{" "}
                  {details?.Genre}
                </p>
                <p className="flex justify-start gap-3 text-light">
                  <span className="font-semibold text-white">Languages:</span>{" "}
                  {details?.Language}
                </p>
                <p className="flex justify-start gap-3 text-light">
                  <span className="font-semibold text-white">Awards:</span>{" "}
                  {details?.Awards}
                </p>
              </div>
            </div>
          </section>
          <section className="w-1/4">
            <Image
              src={
                details?.Poster.startsWith("https://") ? details?.Poster : na
              }
              alt="mvImage"
              className="w-full border-4 min-h-[220px]"
              width={260}
              height={320}
            />
          </section>
        </main>
      )}
    </>
  );
};

export default FilmDetails;
