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

  const [optimisticSearch, setOptimisticSearch] =
    React.useOptimistic(currentSearch);
  const [optimisticRegion, setOptimisticRegion] =
    React.useOptimistic(currentRegion);

  function handleSearchChange(value: string) {
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

  function clearAllFilters() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.delete('region');

    React.startTransition(() => {
      setOptimisticSearch('');
      setOptimisticRegion('');
      router.replace(`?${params.toString()}`);
    });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <StyledSearchField
          onChange={handleSearchChange}
          value={optimisticSearch}
        />
        <RegionSelect onChange={handleRegionChange} value={optimisticRegion} />
      </div>
      <div className="mt-4">
        {(optimisticSearch || optimisticRegion) && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-200 md:text-300 dark:bg-dark-blue flex items-center gap-2 rounded-md bg-white px-4 py-2 text-gray-600 shadow-md transition-all duration-200 hover:bg-gray-50 hover:text-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Clear Filters
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchForm;
