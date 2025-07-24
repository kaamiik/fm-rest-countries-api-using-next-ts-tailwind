'use client';
import * as React from 'react';
import { useTheme } from '@/components/ThemeProvider';

import Icon from '@/components/Icon';
import { SearchField, Input, Label } from 'react-aria-components';

function StyledSearchField({
  placeholder = 'Search for a country...',
  value,
  onChange,
}: {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const { theme } = useTheme();
  return (
    <SearchField
      value={value}
      onChange={onChange}
      className="text-200 md:text-300 relative w-full max-w-[30rem] font-normal"
    >
      <Label className="sr-only">Search Countries</Label>
      <div className="absolute top-1/2 left-8 -translate-y-1/2">
        <Icon
          src={theme === 'light' ? '/search.svg' : '/search-dark.svg'}
          width={20}
          height={20}
        />
      </div>
      <Input
        className="dark:bg-dark-blue placeholder:text-gray w-full cursor-pointer rounded-md bg-white py-4 ps-[4.625rem] text-black shadow-md data-focus-visible:outline-2 data-focus-visible:-outline-offset-2 data-focus-visible:outline-blue-500 dark:text-white dark:placeholder:text-white"
        placeholder={placeholder}
      />
    </SearchField>
  );
}

export default StyledSearchField;
