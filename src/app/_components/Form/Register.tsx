"use client";
import React, { FC, useEffect, useState } from "react";
import Input from "../Input";
import { Button } from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/app/_trpc/client";
import { User, Lock, FilmSlate, Envelope } from "phosphor-react";
import { registerSchema } from "@/app/validations/registerSchema";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import useUserStore, { UserType } from "@/store/user";
import Logo from "../Logo";

const Register: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });
  const { push } = useRouter();
  const { setUser } = useUserStore();
  const [err, setErr] = useState<string>("");
  const { mutate, isLoading } = trpc.auth.register.useMutation({
    onSuccess: (data: UserType | number) => {
      if (typeof data !== "number") {
        setUser(data);
        reset();
        push("/home/main");
      }
      if (data === 400) {
        setErr("User already exists");
      }
    },
    onError: (err: any) => {},
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const submitData = data as {
      email: string;
      password: string;
      lastName: string;
      firstName: string;
    };
    mutate(submitData);
  };
  return (
    <section className="w-1/2 flex flex-col justify-center item-center my-10">
      <div className="w-full h-4/5 flex flex-col justify-center gap-5 items-center">
        <Logo size="large" />
        <h1 className="font-chakra text-secondary text-3xl text-center font-semibold">
          Register
        </h1>
        <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            <div className="relative">
              <Input
                register={register("firstName")}
                id="firstName"
                placeholder="First name"
                className="pl-12 pt-2 rounded-3xl border-2 border-light"
                autoComplete="off"
              />
              <User className="w-6 h-6 text-white text-opacity-50 absolute top-2 left-4" />
            </div>

            {errors?.firstName && (
              <span className="text-error text-xs">
                {errors?.firstName?.message as string}
              </span>
            )}
          </div>
          <div className="my-3">
            <div className="relative">
              <Input
                register={register("lastName")}
                id="lastName"
                placeholder="Last name"
                className="pl-12 pt-2 rounded-3xl border-2 border-light"
                autoComplete="off"
              />
              <User className="w-6 h-6 text-white text-opacity-50 absolute top-2 left-4" />
            </div>

            {errors?.lastName && (
              <span className="text-error text-xs">
                {errors?.lastName?.message as string}
              </span>
            )}
          </div>
          <div className="my-3">
            <div className="relative">
              <Input
                register={register("email")}
                id="email"
                placeholder="Email"
                className="pl-12 pt-2 rounded-3xl border-2 border-light"
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

          <div className="my-3">
            <div className="relative">
              <Input
                register={register("password")}
                id="password"
                placeholder="Password"
                className="pl-12 pt-2 rounded-3xl border-2 border-light"
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
              <span>Register</span>
            )}
          </Button>
          {err.length > 0 && <span className="text-error text-xs">{err}</span>}
        </form>
        <p className="text-white">
          Already have an account{" "}
          <span
            onClick={() => push("/")}
            className="text-primary cursor-pointer"
          >
            login
          </span>
        </p>
      </div>
    </section>
  );
};

export default Register;
