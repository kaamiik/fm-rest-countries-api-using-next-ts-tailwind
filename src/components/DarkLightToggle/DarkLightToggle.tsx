"use client";
import * as React from "react";
import Image from "next/image";
import Cookie from "js-cookie";

function DarkLightToggle({ initialTheme }: { initialTheme: string }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    root.setAttribute("data-theme", nextTheme);
  }
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 cursor-pointer text-200 font-semibold md:text-400"
    >
      <Image
        className="md:w-[20px] md:h-[20px]"
        aria-hidden="true"
        src={theme === "light" ? "/moon-outline.svg" : "/moon-sharp.svg"}
        alt=""
        width={16}
        height={16}
      />
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}

export default DarkLightToggle;
