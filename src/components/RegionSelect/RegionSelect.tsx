'use client';
import * as React from 'react';
import { useTheme } from '@/components/ThemeProvider';

import {
  Label,
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
      <Label className="sr-only">Filter by region</Label>
      <Button className="dark:bg-dark-blue flex w-full cursor-pointer items-center justify-between rounded-md bg-white py-4 ps-6 pe-5 shadow-md data-focus-visible:outline-2 data-focus-visible:-outline-offset-1 data-focus-visible:outline-purple-500">
        <SelectValue>{value || 'Filter by Region'}</SelectValue>
        <Icon
          src={
            theme === 'light' ? '/select-arrow.svg' : '/select-arrow-dark.svg'
          }
          width={12}
          height={12}
        />
      </Button>
      <Popover className="dark:bg-dark-blue w-full max-w-[12.5rem] rounded-md bg-white shadow-md">
        <ListBox className="text-200 md:text-300 flex flex-col gap-2">
          {REGIONS.filter((region) => region !== value).map((region) => (
            <ListBoxItem
              key={region}
              id={region}
              className="cursor-pointer px-6 py-2 data-focus-visible:outline-0 data-focused:rounded-md data-focused:bg-gray-300 data-pressed:rounded-md data-pressed:bg-gray-300 dark:data-focused:rounded-md dark:data-focused:bg-purple-500 dark:data-pressed:rounded-md dark:data-pressed:bg-purple-500"
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
