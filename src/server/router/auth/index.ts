import { router } from "@/server/trpc";
import { login } from "./login";
import { register } from "./register";

export const auth = router({
  login,
  register,
});
