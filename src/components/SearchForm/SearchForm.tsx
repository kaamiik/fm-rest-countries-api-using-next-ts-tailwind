'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import StyledSearchField from '@/components/StyledSearchField';
import RegionSelect from '@/components/RegionSelect';

function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const currentRegion = searchParams.get('region') || '';
  // const [inputValue, setInputValue] = React.useState(currentSearch);

  const [optimisticSearch, setOptimisticSearch] =
    React.useOptimistic(currentSearch);
  const [optimisticRegion, setOptimisticRegion] =
    React.useOptimistic(currentRegion);

  function handleSearchChange(value: string) {
    // setInputValue(value);
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    React.startTransition(() => {
      setOptimisticSearch(value);
      router.replace(`?${params.toString()}`);
    });
  }

  function handleRegionChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('region', value);
    } else {
      params.delete('region');
    }

    React.startTransition(() => {
      setOptimisticRegion(value);
      router.replace(`?${params.toString()}`);
    });
  }
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between"
    >
      <StyledSearchField
        onChange={handleSearchChange}
        value={optimisticSearch}
      />
      <RegionSelect onChange={handleRegionChange} value={optimisticRegion} />
    </form>
  );
}

export default SearchForm;
