import type { Country } from '@/types';

export async function getData() {
  const response = await fetch(
    'https://restcountries.com/v3.1/all?fields=name,flags,cca3,borders,capital,currencies,population,region,subregion,tld'
  );
  const data = await response.json();

  return data;
}

export function getFilteredData(
  data: Country[],
  searchParams: { search?: string; region?: string }
) {
  const filteredData = data.filter((country) => {
    const searchTerm = searchParams.search?.toLowerCase().trim() || '';
    const matchesSearch = searchTerm
      ? country.name.common.toLowerCase().includes(searchTerm) ||
        country.cca3.toLowerCase().includes(searchTerm)
      : true;

    const matchesRegion = searchParams.region
      ? country.region === searchParams.region.trim()
      : true;

    return matchesSearch && matchesRegion;
  });

  return filteredData;
}
