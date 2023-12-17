import { filmSchema } from "@/app/validations/filmSchema";
import { publicProcedure } from "@/server/trpc";
import fetcher from "@/utils/fetcher";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const referViaEmail = publicProcedure
  .input(
    z.object({ recipient: z.string(), msgBody: z.string(), token: z.string() })
  )
  .mutation(async ({ input: { token, msgBody, recipient } }) => {
    try {
      const res = await fetcher({
        envName: "API_URL",
        method: "POST",
        body: {
          recipient,
          msgBody,
          subject: "YouFav Reference",
        },
        route: "mail",
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
