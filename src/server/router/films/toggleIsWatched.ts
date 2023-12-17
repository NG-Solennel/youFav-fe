import { filmSchema } from "@/app/validations/filmSchema";
import { publicProcedure } from "@/server/trpc";
import fetcher from "@/utils/fetcher";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const toggleIsWatched = publicProcedure
  .input(
    z.object({
      id: z.string().min(1),
      token: z.string(),
      isWatched: z.string(),
    })
  )
  .mutation(async ({ input: { id, token, isWatched } }) => {
    try {
      const param = new URLSearchParams();
      param.append("isWatched", isWatched.toString());
      const res = await fetcher({
        envName: "API_URL",
        method: "POST",
        body: {
          id,
          isWatched,
        },
        route: `favorite/isWatched`,
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
  });
