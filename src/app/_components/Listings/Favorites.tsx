"use client";
import { trpc } from "@/app/_trpc/client";
import useUserStore from "@/store/user";
import { Minus, Spinner } from "phosphor-react";
import React from "react";
import Card from "../Card";
import { FilmType } from "./Movies";
import { Button } from "../Button";
import Badge from "../Badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import CardSkeleton from "../CardSkeleton";
import Error from "../Error";
export interface FavType {
  title: string;
  year: string;
  poster: string;
  imdbID: string;
  type: string;
  id: number;
  isWatched: boolean;
}

const Favorites = () => {
  const { user } = useUserStore();
  const [isError, setIsError] = React.useState<boolean>(false);
  const { data, isLoading, refetch } = trpc.films.getFavorites.useQuery(
    {
      token: user?.token as string,
    },
    {
      enabled: Boolean(user?.token),
      onSuccess: (data) => {
        if (Object.keys(data)[0] === "error") {
          setIsError(true);
        } else {
          setIsError(false);
        }
      },
    }
  );
  const [active, setActive] = React.useState(0);
  const { mutate, isLoading: removeLoading } =
    trpc.films.removeFavorite.useMutation({
      onSuccess: () => {
        refetch();
      },
    });
  const { mutate: toggle, isLoading: toggleLoading } =
    trpc.films.toggleIsWatched.useMutation({
      onSuccess: () => {
        refetch();
      },
    });
  console.log(data);
  const favs =
    Array.isArray(data) &&
    data?.map((fav: FavType, idx: number) => {
      const film: FilmType = {
        imdbID: fav.imdbID,
        Poster: fav.poster,
        Title: fav.title,
        Year: fav.year,
      };
      return (
        <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/4">
          <Card
            rowOne={
              fav.isWatched ? (
                <Badge className="bg-ordinary" label="Watched" />
              ) : (
                <Badge className="bg-secondary" label="New" />
              )
            }
            rowTwo={
              <div className="flex justify-start items-center gap-5 max-w-[240px]">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle({
                      id: fav.id.toString(),
                      token: user?.token as string,
                      isWatched: !fav.isWatched ? "true" : "false",
                    });
                    setActive(idx);
                  }}
                  className={`${
                    toggleLoading && active === idx ? "bg-opacity-10" : null
                  } px-[7px] py-1 text-xs min-w-[100px] max-w-[150px] font-medium flex justify-center items-center`}
                >
                  {toggleLoading && active === idx ? (
                    <Spinner
                      className={`inline h-3 w-3 animate-spin fill-white`}
                    />
                  ) : (
                    <span>
                      {fav.isWatched ? "Mark as new" : "Mark as watched"}
                    </span>
                  )}
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    mutate({
                      id: fav.id.toString(),
                      token: user?.token as string,
                    });
                    setActive(idx);
                  }}
                  disabled={removeLoading}
                  className={`${
                    removeLoading && active === idx ? "bg-opacity-10" : null
                  } font-bold bg-error w-6  hover:bg-opacity-70 hover:bg-error text-white rounded-full h-6 flex justify-center items-center px-2`}
                >
                  <Minus className="w-4 h-6" />
                </Button>
              </div>
            }
            key={fav.id}
            film={film}
          />
        </CarouselItem>
      );
    });
  return (
    <section className="w-full">
      {isLoading ? (
        <>
          <h1 className="font-semibold text-2xl my-5 mx-28">Favorites</h1>
          <CardSkeleton number={4} />
        </>
      ) : isError ? (
        <Error message={data?.error?.message} status={data?.error?.status} />
      ) : (
        <>
          <h1 className="font-semibold text-2xl my-5 mx-28">Favorites</h1>
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
              <CarouselContent className="w-full">{favs}</CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </>
      )}
    </section>
  );
};

export default Favorites;
