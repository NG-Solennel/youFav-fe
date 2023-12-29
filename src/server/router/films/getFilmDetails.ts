// apiKey=${apiKey}&i=${id}&Plot=full

import { registerSchema } from "@/app/validations/registerSchema";
import { publicProcedure } from "@/server/trpc";
import fetcher from "@/utils/fetcher";
import { z } from "zod";

export const getFilmDetails = publicProcedure
  .input(
    z.object({
      id: z.string().min(1, { message: "id is required" }),
    })
  )
  .query(async ({ input: { id } }) => {
    const apiKey = process.env.MOVIE_API_KEY;
    const res = await fetcher({
      envName: "MOVIE_API_URL",
      method: "GET",
      route: `?apiKey=${apiKey}&i=${id}&Plot=full`,
    });
    return res;
  });
