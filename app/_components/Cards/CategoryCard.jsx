import React from "react";
import AuthButton from "../Buttons/AuthButton";
import Link from "next/link";

function CategoryCard({ category }) {
  return (
    <div className="bg-dark_primary hover:text-light_text group border border-transparent hover:border-text/30 shadow shadow-black h-fit w-[calc(50%-0.5rem)] px-2 py-[0.375rem] rounded flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* info */}
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content={category.name}
          className="w-[30ch] truncate text-start group-hover:font-semibold"
        >
          {category.name}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        {/* actions and links */}
        <Link href={`/categories/${category.id}/update`}>
          <AuthButton title="تعديل" />
        </Link>
      </div>
    </div>
  );
}

export default CategoryCard;
