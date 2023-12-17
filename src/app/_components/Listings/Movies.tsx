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
  const movies = data?.Search?.slice(0, 8).map((film: FilmType) => (
    <Card
      film={film}
      key={film.imdbID}
      rowOne={
        <Button
          onClick={() => {
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
  ));
  return (
    <section>
      <h1 className="font-semibold text-2xl my-5 mx-16">Movies</h1>
      <div className="grid grid-cols-4 justify-items-center">
        {isLoading ? (
          <Spinner className={`inline h-6 w-6 animate-spin fill-white`} />
        ) : (
          <>{movies}</>
        )}
      </div>
    </section>
  );
};

export default Movies;
