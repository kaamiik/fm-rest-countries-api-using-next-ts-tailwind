'use client';
import * as React from 'react';
import { useTheme } from '@/components/ThemeProvider';

import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import Icon from '@/components/Icon';

const REGIONS = ['', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

function RegionSelect({
  value = '',
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  const { theme } = useTheme();

  const handleSelectionChange = (key: React.Key | null) => {
    const region = key?.toString() || '';
    onChange(region);
  };

  return (
    <Select
      className="text-200 md:text-300 w-full max-w-[12.5rem]"
      selectedKey={value}
      onSelectionChange={handleSelectionChange}
    >
      <Button className="dark:bg-dark-blue dark:hover:bg-dark-blue-dark dark:focus:bg-dark-blue-dark flex w-full cursor-pointer items-center justify-between rounded-md bg-white py-4 ps-6 pe-5 shadow-md transition-all duration-200 hover:shadow-lg focus:shadow-lg data-[focus-visible]:outline-2 data-[focus-visible]:-outline-offset-1 data-[focus-visible]:outline-blue-500">
        <SelectValue>{value || 'Filter by Region'}</SelectValue>
        <Icon
          src={
            theme === 'light' ? '/select-arrow.svg' : '/select-arrow-dark.svg'
          }
          width={12}
          height={12}
        />
      </Button>
      <Popover className="dark:bg-dark-blue w-full max-w-[12.5rem] rounded-md bg-white shadow-lg">
        <ListBox className="text-200 md:text-300 flex flex-col gap-1 p-2">
          {REGIONS.filter((region) => region !== value).map((region) => (
            <ListBoxItem
              key={region}
              id={region}
              className="cursor-pointer px-6 py-2 transition-colors duration-100 hover:rounded-md hover:bg-gray-200 focus:rounded-md focus:bg-gray-200 data-[focus-visible]:outline-0 dark:hover:bg-blue-500/20 dark:focus:bg-blue-500/20 dark:focus-visible:ring-2 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-1"
            >
              {region === '' ? 'Filter by Region' : region}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}

export default RegionSelect;
