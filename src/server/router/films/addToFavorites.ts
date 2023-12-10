import { filmSchema } from "@/app/validations/filmSchema";
import { publicProcedure } from "@/server/trpc";
import fetcher from "@/utils/fetcher";

export const addToFavorites = publicProcedure
  .input(filmSchema)
  .mutation(
    async ({ input: { imdbID, poster, title, type, userId, year, token } }) => {
      const res = await fetcher({
        envName: "API_URL",
        method: "POST",
        body: {
          imdbID,
          poster,
          title,
          type,
          userId,
          year,
        },
        route: "favorite",
        token,
      });
      return res;
    }
  );
