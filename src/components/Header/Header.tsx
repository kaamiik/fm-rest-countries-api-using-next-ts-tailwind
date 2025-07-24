import React from "react";
import Link from "next/link";

import MaxWidthWrapper from "../MaxWidthWrapper";
import DarkLightToggle from "../DarkLightToggle";

function Header() {
  return (
    <header className="px-4 py-8 bg-white dark:bg-dark-blue shadow-sm">
      <MaxWidthWrapper className="flex justify-between items-center flex-wrap">
        <Link className="font-extrabold md:text-700" href="/">
          Where in the world?
        </Link>
        <DarkLightToggle />
      </MaxWidthWrapper>
    </header>
  );
}

export default Header;
