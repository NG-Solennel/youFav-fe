import { filmSchema } from "@/app/validations/filmSchema";
import { publicProcedure } from "@/server/trpc";
import fetcher from "@/utils/fetcher";
import { TRPCError } from "@trpc/server";

export const addToFavorites = publicProcedure
  .input(filmSchema)
  .mutation(
    async ({ input: { imdbID, poster, title, type, userId, year, token } }) => {
      try {
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
      } catch (err: any) {
        throw new TRPCError({
          code:
            err["$metadata"]?.httpStatusCode === 400
              ? "BAD_REQUEST"
              : "INTERNAL_SERVER_ERROR",
          message: err?.toString(),
          cause: err,
        });
      }
    }
  );
