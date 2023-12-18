"use client";
import React, { FC, useEffect } from "react";
import Input from "../Input";
import { Button } from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/validations/loginSchema";
import { trpc } from "@/app/_trpc/client";
import { Lock, FilmSlate, Envelope } from "phosphor-react";
import { useRouter } from "next/navigation";
import useUserStore, { UserType } from "@/store/user";
import Spinner from "../Spinner";
import Logo from "../Logo";

const Login: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { push } = useRouter();
  const { setUser, user } = useUserStore();
  const [err, setErr] = React.useState<string | undefined>(undefined);
  const { mutate, isLoading } = trpc.auth.login.useMutation({
    onSuccess: (data: UserType | number) => {
      reset();
      if (typeof data !== "number") {
        setUser(data);
        push("/home/main");
      }
      if (data === 400) {
        setErr("Invalid email or password");
      }
    },
    onError: (err: any) => {
      alert(err?.message);
    },
  });
  useEffect(() => {
    if (user?.token) {
      push("/home/main");
    }
  }, [user]);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const submitData = data as { email: string; password: string };
    mutate(submitData);
  };
  return (
    <section className="w-1/2 flex flex-col justify-center item-center">
      <div className="w-full h-4/5 flex flex-col justify-center gap-5 items-center">
        <Logo size="large" />
        <h1 className="font-chakra text-secondary text-3xl text-center font-semibold">
          Sign In
        </h1>
        <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <div className="relative">
              <Input
                register={register("email")}
                id="email"
                placeholder="Email"
                className="pl-12 pt-2 rounded-3xl"
                autoComplete="off"
              />
              <Envelope className="w-6 h-6 text-white text-opacity-50 absolute top-2 left-4" />
            </div>

            {errors?.email && (
              <span className="text-error text-xs">
                {errors?.email?.message as string}
              </span>
            )}
          </div>

          <div className="my-4">
            <div className="relative">
              <Input
                register={register("password")}
                id="password"
                placeholder="Password"
                className="pl-12 pt-2 rounded-3xl"
                autoComplete="off"
              />
              <Lock className="w-6 h-6 text-white text-opacity-50 absolute top-2 left-4" />
            </div>
            {errors?.password && (
              <span className="text-error text-xs">
                {errors?.password?.message as string}
              </span>
            )}
          </div>

          <Button type="submit" className="mt-3 rounded-3xl">
            {isLoading ? (
              <Spinner className={`inline h-5 w-5 animate-spin fill-white`} />
            ) : (
              <span>Sign in</span>
            )}
          </Button>
          {err && <span className="ml-5 text-error text-xs">{err}</span>}
        </form>
        <p className="text-white">
          Don&apos;t have an account{" "}
          <span
            onClick={() => push("/register")}
            className="text-primary cursor-pointer"
          >
            register
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
