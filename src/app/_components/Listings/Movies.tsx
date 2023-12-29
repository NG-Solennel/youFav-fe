"use client";
import React, { useEffect } from "react";
import Card from "../Card";
import useUserStore from "@/store/user";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import Spinner from "../Spinner";
import { Button } from "../Button";
import { Plus } from "phosphor-react";
import useSearchStore from "@/store/search";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import CardSkeleton from "../CardSkeleton";
export interface FilmType {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

const Movies = () => {
  const { user } = useUserStore();
  const { push } = useRouter();
  const { search } = useSearchStore();
  const { data, isLoading } = trpc.films.getFilms.useQuery({
    type: "movie",
    term: search.length > 3 ? search : undefined,
  });
  const { mutate, isLoading: addLoading } =
    trpc.films.addToFavorites.useMutation();

  useEffect(() => {
    if (!user) {
      push("/");
    }
  }, [user]);
  const movies = data?.Search?.map((film: FilmType, index: number) => (
    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
      <Card
        film={film}
        key={film.imdbID}
        rowOne={
          <Button
            onClick={(e) => {
              e.stopPropagation();
              mutate({
                imdbID: film.imdbID,
                poster: film.Poster,
                title: film.Title,
                year: film.Year,
                type: "MOVIE",
                token: user?.token as string,
                userId: user?.id?.toString() as string,
              });
            }}
            disabled={addLoading}
            className="p-1 rounded-full w-7 h-7 bg-secondary hover:bg-opacity-70 hover:bg-secondary text-sm relative"
          >
            <Plus className={`w-5 h-5 ${addLoading ? "opacity-50" : null}`} />
          </Button>
        }
      />
    </CarouselItem>
  ));
  return (
    <section className="w-full">
      <h1 className="font-semibold text-2xl my-5 mx-28">Movies</h1>
      <div className="w-full px-20">
        {isLoading ? (
          <CardSkeleton number={4} />
        ) : (
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
            <CarouselContent className="w-full">{movies}</CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default Movies;
