import Link from "next/link";
import React from "react";

function NavMenu({
  data = {
    title: "title",
    icon,
    subtitles: [{ subtitle: "subtitle", url: "url" }],
  },
}) {
  return (
    <div className="max-w-[30ch] w-fit min-w-[15ch] grow h-full group bg-light_primary flex items-center relative ">
      <span className="w-full bg-transparent select-none group-hover:bg-dark_primary/30 h-full flex items-center justify-center gap-2">
        {data.icon}
        {data.title}
      </span>

      <div
        className={`w-full absolute top-[2rem] left-0 bg-light_primary  z-10
        max-h-0 invisible group-hover:max-h-fit group-hover:visible 
        p-2 flex flex-col gap-2 shadow shadow-black`}
      >
        {data.subtitles.map((subtitle, index) => (
          <Link
            key={index}
            className="w-full hover:bg-light_text/10 hover:text-light_text  px-2 py-1"
            href={subtitle.url}
          >
            {subtitle.subtitle}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavMenu;
