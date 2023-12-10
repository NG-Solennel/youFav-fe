import { publicProcedure, router } from "@/server/trpc";

export const exampleRouter = router({
  sayHello: publicProcedure.query(async () => {
    return { message: "Hello Everybody" };
  }),
});
