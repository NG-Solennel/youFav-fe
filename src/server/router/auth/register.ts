import { registerSchema } from "@/app/validations/registerSchema";
import { publicProcedure } from "@/server/trpc";
import fetcher from "@/utils/fetcher";

export const register = publicProcedure
  .input(registerSchema)
  .mutation(async ({ input: { email, password, firstName, lastName } }) => {
    const res = await fetcher({
      envName: "API_URL",
      method: "POST",
      body: {
        login: email,
        password,
        lastName,
        firstName,
      },
      route: "register",
    });
    return res;
  });
