import * as React from 'react';
import { getData, getFilteredData } from '@/lib/utils';

import type { Country } from '@/types';

import CountryCard from '@/components/CountryCard';

async function CountryList({
  searchParams,
}: {
  searchParams: { search?: string; region?: string };
}) {
  const data: Country[] = await getData();
  const filteredData = getFilteredData(data, searchParams);

  return filteredData.length === 0 ? (
    <div className="mt-8 text-center">
      <p className="text-800 text-very-dark-blue-l flex items-center justify-center gap-2 text-lg dark:text-white">
        <span className="text-800">🔍</span>
        No countries found matching
        {searchParams.search?.trim() || 'your criteria'}
        {searchParams.region && ` in ${searchParams.region.trim()}`}
        <span className="text-2xl">🌍</span>
      </p>
      <p className="mt-2 text-gray-500 dark:text-gray-300">
        {`Try different search terms ${searchParams.region ? 'or regions' : ''}`}
      </p>
    </div>
  ) : (
    <ul className="mt-8 grid grid-cols-(--my-countries-grid) gap-10 md:mt-12 lg:gap-[4.6875rem]">
      {filteredData.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
