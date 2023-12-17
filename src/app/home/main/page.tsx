import Movies from "@/app/_components/Listings/Movies";
import Series from "@/app/_components/Listings/Series";
import { NextPage } from "next";

const main: NextPage = () => {
  return (
    <div>
      <Movies />
      <Series />
    </div>
  );
};

export default main;
