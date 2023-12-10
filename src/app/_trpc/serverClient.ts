import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server";

const HOST_URL = process.env.HOST_URL;

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${HOST_URL}/api/trpc`,
    }),
  ],
});
