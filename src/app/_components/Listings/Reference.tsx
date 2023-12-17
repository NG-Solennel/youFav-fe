"use client";
import { trpc } from "@/app/_trpc/client";
import useUserStore from "@/store/user";
import React from "react";
import { FavType } from "./Favorites";
import { FilmType } from "./Movies";
import Badge from "../Badge";
import Card from "../Card";
import { Button } from "../Button";
import { Spinner } from "phosphor-react";
import PopupProvider from "@/Context/PopupContext";
import ReferPopup from "../ReferPopup";
const Reference = () => {
  const { user } = useUserStore();
  const { data, isLoading, refetch } = trpc.films.getFavorites.useQuery({
    token: user?.token as string,
  });
  const watchedFavs = data
    ?.filter((fav: FavType) => fav.isWatched)
    .map((fav: FavType) => {
      const film: FilmType = {
        imdbID: fav.imdbID,
        Poster: fav.poster,
        Title: fav.title,
        Year: fav.year,
      };
      return (
        <Card
          rowOne={
            fav.isWatched ? (
              <Badge className="bg-ordinary" label="watched" />
            ) : (
              <Badge className="bg-secondary" label="New" />
            )
          }
          rowTwo={
            <PopupProvider>
              <ReferPopup film={film} />
            </PopupProvider>
          }
          film={film}
          key={fav.id}
        />
      );
    });
  return (
    <section className="w-full">
      <h1 className="font-semibold text-2xl my-5 mx-16">Reference</h1>
      {isLoading ? (
        <div className="w-[800px] flex justify-center items-center mt-20">
          <Spinner className={`inline h-10 w-10 animate-spin fill-white`} />
        </div>
      ) : (
        <div className="grid grid-cols-4 justify-items-center w-full">
          <>{watchedFavs}</>
        </div>
      )}
    </section>
  );
};

export default Reference;
