import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Pagination({ count, perPage = 20, currentPage = 2, setCurrentPage }) {
  const handlePreviousPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (count === 0) return;
    if (currentPage !== Math.ceil(count / perPage))
      setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex w-fit items-center gap-4 ">
      <button
        data-tooltip-id="my-tooltip"
        data-tooltip-content="السابق"
        onClick={handlePreviousPage}
        className={`${currentPage === 1 && "cursor-not-allowed"}`}
      >
        <MdChevronRight
          className={`w-[2rem] h-fit ${
            currentPage === 1
              ? "text-dark_text/50"
              : " text-text hover:text-red-400 "
          } `}
        />
      </button>
      <span className="font-bold text-white">{currentPage}</span>
      <button
        data-tooltip-id="my-tooltip"
        data-tooltip-content="التالي"
        onClick={handleNextPage}
        className={`${
          (currentPage === Math.ceil(count / perPage) || count === 0) &&
          "cursor-not-allowed"
        }`}
      >
        <MdChevronLeft
          className={`w-[2rem] h-fit ${
            currentPage === Math.ceil(count / perPage) || count === 0
              ? "text-dark_text/50"
              : " text-text hover:text-blue-400 "
          } `}
        />
      </button>
    </div>
  );
}

export default Pagination;
