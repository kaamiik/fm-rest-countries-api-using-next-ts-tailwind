import type { Country } from '@/types';
import { unstable_cache } from 'next/cache';

export const getData = unstable_cache(
  async (): Promise<Country[]> => {
    try {
      const response = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,flags,cca3,borders,capital,currencies,population,region,subregion,tld',
        {
          // Add additional caching headers
          next: {
            revalidate: 86400, // Revalidate once per day (24 hours)
            tags: ['countries'], // Tag for potential cache invalidation
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch countries data:', error);
      throw error;
    }
  },
  ['countries-data'], // Cache key
  {
    revalidate: 86400, // Cache for 24 hours
    tags: ['countries'],
  }
);

export const getFilteredData = unstable_cache(
  async (
    data: Country[],
    searchParams: { search?: string; region?: string }
  ): Promise<Country[]> => {
    const filteredData = data.filter((country) => {
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

    return filteredData;
  },
  ['filtered-countries'], // Cache key prefix
  {
    revalidate: 86400, // Cache filtered results for 24 hours as well
    tags: ['countries', 'filtered-countries'],
  }
);
