import { router } from "@/server/trpc";
import { getFilms } from "./getFilms";
import { addToFavorites } from "./addToFavorites";
import { getFavorites } from "./getFavorites";
import { removeFavorite } from "./removeFavorite";
import { toggleIsWatched } from "./toggleIsWatched";
import { referViaEmail } from "./refer";
import { getFilmDetails } from "./getFilmDetails";

export const films = router({
  getFilms,
  addToFavorites,
  getFavorites,
  removeFavorite,
  toggleIsWatched,
  referViaEmail,
  getFilmDetails,
});
