import { z } from "zod";

export const filmSchema = z.object({
  imdbID: z.string().min(1),
  type: z.enum(["MOVIE", "SERIES"]),
  poster: z.string().min(1),
  title: z.string().min(1),
  year: z.string().min(1),
  userId: z.string().min(1),
  token: z.string().min(1),
});
