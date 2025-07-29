import type { Country } from '@/types';

export const getData = async (): Promise<Country[]> => {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,cca3,borders,capital,currencies,population,region,subregion,tld',
      {
        next: { revalidate: 86400 }, // 24 hours in seconds
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch countries data:', error);
    throw error;
  }
};

export const getFilteredData = (
  data: Country[],
  searchParams: { search?: string; region?: string }
): Country[] => {
  return data.filter((country) => {
    const searchTerm = searchParams.search?.toLowerCase().trim() || '';
    const matchesSearch = searchTerm
      ? country.name.common.toLowerCase().includes(searchTerm) ||
        country.name.official.toLowerCase().includes(searchTerm) ||
        country.cca3.toLowerCase().includes(searchTerm)
      : true;

    const matchesRegion = searchParams.region
      ? country.region === searchParams.region.trim()
      : true;

    return matchesSearch && matchesRegion;
  });
};
