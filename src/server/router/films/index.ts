import { router } from "@/server/trpc";
import { getFilms } from "./getFilms";
import { addToFavorites } from "./addToFavorites";
import { getFavorites } from "./getFavorites";

export const films = router({
  getFilms,
  addToFavorites,
  getFavorites,
});
