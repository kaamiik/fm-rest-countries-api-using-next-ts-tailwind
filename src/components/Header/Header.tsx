import React from "react";
import Link from "next/link";

import DarkLightToggle from "../DarkLightToggle";

function Header({ initialTheme }: { initialTheme: string }) {
  return (
    <header className="px-4 py-8 bg-white dark:bg-dark-blue shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        <Link className="font-extrabold md:text-700" href="/">
          Where in the world?
        </Link>
        <DarkLightToggle initialTheme={initialTheme} />
      </div>
    </header>
  );
}

export default Header;
