import { registerSchema } from "@/app/validations/registerSchema";
import { publicProcedure } from "@/server/trpc";
import { ErrorMessages } from "@/utils/errorMessages";
import fetcher from "@/utils/fetcher";
import { z } from "zod";

export const getFavorites = publicProcedure
  .input(
    z.object({
      token: z.string().min(1),
    })
  )
  .query(async ({ input: { token } }) => {
    const apiKey = process.env.MOVIE_API_KEY;
    const res = await fetcher({
      envName: "API_URL",
      method: "GET",
      route: "favorite",
      token,
    });
    if (typeof res === "number") {
      return {
        error: {
          status: res,
          message: ErrorMessages[res as keyof typeof ErrorMessages],
        },
      };
    }
    return res;
  });
