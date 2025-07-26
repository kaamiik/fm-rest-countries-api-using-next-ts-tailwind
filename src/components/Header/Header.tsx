import React from 'react';
import Link from 'next/link';

import MaxWidthWrapper from '../MaxWidthWrapper';
import DarkLightToggle from '../DarkLightToggle';

function Header() {
  return (
    <header className="dark:bg-dark-blue bg-white px-4 py-8 shadow-sm">
      <MaxWidthWrapper className="flex flex-wrap items-center justify-between">
        <Link
          className="md:text-700 font-extrabold transition-all duration-100 focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          href="/"
        >
          Where in the world?
        </Link>
        <DarkLightToggle />
      </MaxWidthWrapper>
    </header>
  );
}

export default Header;
