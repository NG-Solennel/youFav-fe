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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import CardSkeleton from "../CardSkeleton";

const Reference = () => {
  const { user } = useUserStore();
  const { data, isLoading, refetch } = trpc.films.getFavorites.useQuery({
    token: user?.token as string,
  });
  const watchedFavs = data
    ?.filter((fav: FavType) => fav.isWatched)
    .map((fav: FavType, index: number) => {
      const film: FilmType = {
        imdbID: fav.imdbID,
        Poster: fav.poster,
        Title: fav.title,
        Year: fav.year,
      };
      return (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
          <Card
            rowOne={
              fav.isWatched ? (
                <Badge className="bg-ordinary" label="Watched" />
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
        </CarouselItem>
      );
    });
  return (
    <section className="w-full">
      <h1 className="font-semibold text-2xl my-5 mx-28">Reference</h1>
      {isLoading ? (
        <CardSkeleton number={4} />
      ) : (
        <div className="w-full px-20">
          <Carousel
            opts={{
              align: "start",
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="w-full">{watchedFavs}</CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </section>
  );
};

export default Reference;
