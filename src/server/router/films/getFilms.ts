import { registerSchema } from "@/app/validations/registerSchema";
import { publicProcedure } from "@/server/trpc";
import fetcher from "@/utils/fetcher";
import { z } from "zod";

export const getFilms = publicProcedure
  .input(
    z.object({
      term: z.string().default("Games"),
      type: z.enum(["movie", "series"]).optional(),
    })
  )
  .query(async ({ input: { type, term } }) => {
    const apiKey = process.env.MOVIE_API_KEY;
    const res = await fetcher({
      envName: "MOVIE_API_URL",
      method: "GET",
      route: `?apiKey=${apiKey}&s=${term}${type ? `&type=${type}` : null}`,
    });
    return res;
  });
