import { auth } from "./router/auth";
import { films } from "./router/films";
import { router } from "./trpc";

export const appRouter = router({
  auth,
  films,
});

export type AppRouter = typeof appRouter;
