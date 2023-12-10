"use client";
import Image from "next/image";
import { trpc } from "../_trpc/client";
import Register from "../_components/Form/Register";
import movieImg from "../../../public/mv0.jpg";
import { SketchLogo } from "phosphor-react";

export default function Home() {
  return (
    <main className="w-full flex gap-5 justify-center items-center m-auto">
      <Register />
      <section className="w-1/2 h-screen shadow-sm relative">
        <Image src={movieImg} className="w-full h-screen" alt="movieImage" />
        <div className="bg-dark absolute top-0 left-0 w-full h-full bg-opacity-80"></div>
        <div className="flex justify-center items-center flex-col gap-6 absolute left-0 top-0 w-full h-full">
          <p className="text-5xl font-titan">
            📽 Keep your favori<span className="text-primary">t</span>
            <span className="text-secondary">e</span>
            <span className="text-ordinary">s</span>
          </p>
          <p className="font-light w-1/2 text-xs text-center">
            Store all your favorite movies and reference them to friends and
            family
          </p>
          <span className="text-5xl">👩‍❤️‍💋‍👨</span>
        </div>
      </section>
    </main>
  );
}
