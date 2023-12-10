import { loginSchema } from "@/app/validations/loginSchema";
import { publicProcedure } from "@/server/trpc";
import fetcher from "@/utils/fetcher";

export const login = publicProcedure
  .input(loginSchema)
  .mutation(async ({ input: { email, password } }) => {
    const res = await fetcher({
      envName: "API_URL",
      method: "POST",
      body: {
        login: email,
        password,
      },
      route: "login",
    });
    return res;
  });
