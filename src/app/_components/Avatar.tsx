"use client";
import Image from "next/image";
import React from "react";
import avatarImg from "../../../public/avatar.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Button } from "./Button";
import useUserStore from "@/store/user";
import { useRouter } from "next/navigation";

const Avatar = () => {
  const { user, setUser } = useUserStore();
  const { push } = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-10 w-10 rounded-full shadow-md shadow-primary">
          <Image
            src={avatarImg}
            alt="profile-img"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-[280px] shadow-lg sm:w-[400px] bg-deep p-4 border-none">
        <section className="flex flex-col justify-between z-100 items-center w-[100%] gap-3">
          <div className="flex justify-end items-center w-[100%]">
            <Button
              onClick={() => {
                setUser(undefined);
                push("/");
              }}
              className="w-fit px-4 py-1"
            >
              Logout
            </Button>
          </div>
          <div className="flex justify-start w-full items-center gap-5">
            <div className="h-10 w-10 rounded-full shadow-md shadow-primary">
              <Image
                src={avatarImg}
                alt="profile-img"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              {user?.firstName}&nbsp;{user?.lastName}
              <p className="font-light">{user?.login}</p>
            </div>
          </div>
        </section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Avatar;
