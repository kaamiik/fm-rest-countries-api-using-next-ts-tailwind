'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';

import Icon from '../Icon';

import { useTheme } from '@/components/ThemeProvider';

function BackButton() {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <button
      type="button"
      className="dark:bg-dark-blue md:text-400 shadow-focus-dark flex w-fit cursor-pointer items-center gap-2 rounded-sm bg-white px-6 py-2 transition-shadow duration-300 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 md:rounded-md md:px-10"
      onClick={() => router.back()}
    >
      <Icon
        src={theme === 'light' ? '/back-arrow.svg' : '/back-arrow-dark.svg'}
        width={20}
        height={20}
      />
      Back
    </button>
  );
}

export default BackButton;
