"use client";
import useSearchStore from "@/store/search";
import Input from "./Input";
import { MagnifyingGlass } from "phosphor-react";

const Search = () => {
  const { search, setSearch } = useSearchStore();
  return (
    <div className="px-8 h-full py-2 flex justify-end items-center relative">
      <Input
        type="text"
        className="bg-[#1F2021] w-48 py-1 text-xs px-10 shadow-sm shadow-[#1e1e1e] rounded-sm focus:border focus:border-white focus:border-opacity-50"
        placeholder="Search here ..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <MagnifyingGlass className="w-4 h-4 text-white text-opacity-50 absolute top-4 left-10" />
    </div>
  );
};

export default Search;
