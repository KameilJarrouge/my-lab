import React from "react";
import NoSearchResult from "../_assets/search_results.svg";

function NoResultComponent({ message }) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full">
      <NoSearchResult className="w-[3rem] h-fit fill-dark_text/70" />
      <span className="text-dark_text">{message}</span>
    </div>
  );
}

export default NoResultComponent;
