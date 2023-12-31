"use client";
import Image from "next/image";
import Login from "./_components/Form/Login";
import movieImg from "../../public/mv0.jpg";
import { SketchLogo } from "phosphor-react";

export default function Home() {
  return (
    <main className="w-full flex gap-5 justify-center items-center m-auto">
      <Login />
      <section className="w-1/2 h-screen shadow-sm relative">
        <Image src={movieImg} className="w-full h-screen" alt="movieImage" />
        <div className="bg-dark absolute top-0 left-0 w-full h-full bg-opacity-80"></div>
        <div className="flex justify-center items-center flex-col gap-6 absolute left-0 top-0 w-full h-full">
          <p className="text-5xl font-titan">
            🍿 Collect your g<span className="text-primary">e</span>
            <span className="text-secondary">m</span>
            <span className="text-ordinary">s</span>
          </p>
          <p className="font-light w-1/2 text-xs text-center">
            A place for you to keep all your movies and tv shows you consider to
            be true gems
          </p>
          <SketchLogo className="text-secondary w-20 h-20" />
        </div>
      </section>
    </main>
  );
}
