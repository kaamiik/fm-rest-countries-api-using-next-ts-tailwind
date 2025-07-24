'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import StyledSearchField from '@/components/StyledSearchField';
import RegionSelect from '@/components/RegionSelect';

function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearchChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    router.push(`?${params.toString()}`);
  }

  function handleRegionChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('region', value);
    } else {
      params.delete('region');
    }
    router.push(`?${params.toString()}`);
  }
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between"
    >
      <StyledSearchField onChange={handleSearchChange} />
      <RegionSelect onChange={handleRegionChange} />
    </form>
  );
}

export default SearchForm;
