"use client";
import { trpc } from "@/app/_trpc/client";
import useUserStore from "@/store/user";
import React from "react";

const Favorites = () => {
  const { user } = useUserStore();
  const { data, isLoading } = trpc.films.getFavorites.useQuery({
    token: user?.token as string,
  });
  return <div>{isLoading ? "...Loading" : JSON.stringify(data)}</div>;
};

export default Favorites;
