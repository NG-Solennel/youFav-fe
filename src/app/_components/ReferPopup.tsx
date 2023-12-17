import React from "react";
import PopUp from "./Popup";
import { Envelope } from "phosphor-react";
import Input from "./Input";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./Button";
import { usePopup } from "../hooks/usePopup";
import { FilmType } from "./Listings/Movies";
import { trpc } from "../_trpc/client";
import useUserStore from "@/store/user";
import Spinner from "./Spinner";

const ReferPopup = ({ film }: { film: FilmType }) => {
  const { setIsOpen } = usePopup();
  const { user } = useUserStore();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, { message: "Field is required" }),
        email: z.string().min(1, { message: "Field is required" }),
        message: z.string().min(1, { message: "Field is required" }),
      })
    ),
  });
  function closeModal() {
    setIsOpen(false);
  }
  const { mutate, isLoading } = trpc.films.referViaEmail.useMutation({
    onSuccess: () => {
      closeModal();
    },
  });

  const onSubmit = (data: FieldValues) => {
    mutate({
      recipient: data.email,
      msgBody: `Hey ${data.name}, ${user?.firstName} ${user?.lastName} is recommending you a movie called ${film.Title} made in year ${film.Year},    
    The message sent by ${user?.firstName} is ${data?.message}`,
      token: user?.token as string,
    });
  };
  return (
    <PopUp buttonText="Refer via email" maxWidth="lg" isSmall={true}>
      <div className="flex flex-col pb-5">
        <div className="sticky top-0 z-20 flex items-center bg-dark py-3 text-xs dark:bg-hc-darkgray-50">
          <h2 className="text-base font-bold text-secondary dark:text-gray-200 xl:text-base">
            Refer via email
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-2 items-start"
        >
          <div className="w-full">
            <label
              className="text-xs font-bold textdark:text-gray-300"
              htmlFor="name"
            >
              Name:
            </label>
            <div className="my-4">
              <Input
                register={register("name")}
                id="name"
                placeholder="Name"
                className="rounded-xl"
                autoComplete="off"
              />

              {errors?.name && (
                <span className="text-error text-xs">
                  {errors?.name?.message as string}
                </span>
              )}
            </div>
          </div>
          <div className="w-full">
            <label className="text-xs font-bold text-white" htmlFor="email">
              Email:
            </label>
            <div className="my-4">
              <Input
                register={register("email")}
                id="email"
                placeholder="Email"
                className="rounded-xl"
                autoComplete="off"
              />

              {errors?.email && (
                <span className="text-error text-xs">
                  {errors?.email?.message as string}
                </span>
              )}
            </div>
          </div>
          <div className="w-full">
            <label className="text-xs font-bold text-white" htmlFor="email">
              Message:
            </label>
            <div className="my-4">
              <Input
                register={register("message")}
                id="message"
                placeholder="Message"
                className="rounded-xl"
                autoComplete="off"
              />

              {errors?.message && (
                <span className="text-error text-xs">
                  {errors?.message?.message as string}
                </span>
              )}
            </div>
          </div>

          <div className="ml-auto mt-3 flex gap-4">
            <Button
              className="button w-fit bg-secondary hover:bg-secondary bg-opacity-25 hover:bg-opacity-60 shadow-xl px-3"
              onClick={closeModal}
              variant="default"
            >
              Cancel
            </Button>
            <Button className="button w-fit px-3" type="submit">
              {isLoading ? (
                <Spinner className={`inline h-6 w-6 animate-spin fill-white`} />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
    </PopUp>
  );
};

export default ReferPopup;
