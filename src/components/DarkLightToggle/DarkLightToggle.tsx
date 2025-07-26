'use client';
import * as React from 'react';
import Cookie from 'js-cookie';

import { useTheme } from '../ThemeProvider';
import Icon from '../Icon';

function DarkLightToggle() {
  const { theme, setTheme } = useTheme();

  function handleClick() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);

    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    root.setAttribute('data-theme', nextTheme);
  }

  return (
    <button
      onClick={handleClick}
      className="text-200 md:text-400 flex cursor-pointer items-center gap-2 rounded-md p-2 font-semibold transition-all duration-200 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus-visible:ring-blue-400"
    >
      <Icon
        className="md:h-[20px] md:w-[20px]"
        src={theme === 'light' ? '/moon-outline.svg' : '/moon-sharp.svg'}
        width={16}
        height={16}
      />
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}

export default DarkLightToggle;
