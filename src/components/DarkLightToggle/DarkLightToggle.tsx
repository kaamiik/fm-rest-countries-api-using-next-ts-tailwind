"use client";
import * as React from "react";
import Cookie from "js-cookie";

import { useTheme } from "../ThemeProvider";

import Icon from "../Icon";

function DarkLightToggle() {
  const { theme, setTheme } = useTheme();
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
      <Icon
        className="md:w-[20px] md:h-[20px]"
        src={theme === "light" ? "/moon-outline.svg" : "/moon-sharp.svg"}
        width={16}
        height={16}
      />
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}

export default DarkLightToggle;
