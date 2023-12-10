import React from "react";
import Input from "./Input";

const Search = () => {
  return (
    <div className="absolute w-2/3 px-8 h-full pb-5 flex justify-end items-center">
      <Input
        type="text"
        className="bg-[#1F2021] font-semibold w-80 py-1 h-12 shadow-sm shadow-[#1e1e1e] rounded-sm focus:border-none"
        placeholder="Search here ..."
      />
    </div>
  );
};

export default Search;
