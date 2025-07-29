import * as React from 'react';
import { getData, getFilteredData } from '@/lib/utils';
import type { Country } from '@/types';
import PaginatedCountryList from '../PaginatedCountryList';

async function CountryList({
  searchParams,
}: {
  searchParams: { search?: string; region?: string };
}) {
  const data: Country[] = await getData();
  const filteredData = getFilteredData(data, searchParams);

  return (
    <PaginatedCountryList
      countries={filteredData}
      searchParams={searchParams}
    />
  );
}

export default CountryList;
