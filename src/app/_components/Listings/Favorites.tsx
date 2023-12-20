"use client";
import { trpc } from "@/app/_trpc/client";
import useUserStore from "@/store/user";
import { Minus, Spinner } from "phosphor-react";
import React from "react";
import Card from "../Card";
import { FilmType } from "./Movies";
import { Button } from "../Button";
import Badge from "../Badge";

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
  const { data, isLoading, refetch } = trpc.films.getFavorites.useQuery({
    token: user?.token as string,
  });
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

  const favs = data?.map((fav: FavType, idx: number) => {
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
          <div className="flex justify-start items-center gap-5 max-w-[240px]">
            <Button
              onClick={() => {
                toggle({
                  id: fav.id.toString(),
                  token: user?.token as string,
                  isWatched: !fav.isWatched ? "true" : "false",
                });
                setActive(idx);
              }}
              className={`${
                toggleLoading && active === idx ? "bg-opacity-10" : null
              } px-2 py-1 text-sm max-w-[150px] font-medium flex justify-center items-center`}
            >
              {toggleLoading && active === idx ? (
                <Spinner className={`inline h-6 w-6 animate-spin fill-white`} />
              ) : (
                <span>{fav.isWatched ? "Mark as new" : "Mark as watched"}</span>
              )}
            </Button>
            <Button
              onClick={() => {
                mutate({ id: fav.id.toString(), token: user?.token as string });
                setActive(idx);
              }}
              disabled={removeLoading}
              className={`${
                removeLoading && active === idx ? "bg-opacity-10" : null
              } font-bold bg-error w-9 hover:bg-opacity-70 hover:bg-error text-white rounded-md h-6 flex justify-center items-center px-2`}
            >
              <Minus className="w-3 h-6" />
            </Button>
          </div>
        }
        key={fav.id}
        film={film}
      />
    );
  });
  return (
    <section className="w-full">
      <h1 className="font-semibold text-2xl my-5 mx-16">Favorites</h1>
      {isLoading ? (
        <div className="w-[800px] flex justify-center items-center mt-20">
          <Spinner className={`inline h-10 w-10 animate-spin fill-white`} />
        </div>
      ) : (
        <div className="grid grid-cols-4 justify-items-center w-full">
          <>{favs}</>
        </div>
      )}
    </section>
  );
};

export default Favorites;
