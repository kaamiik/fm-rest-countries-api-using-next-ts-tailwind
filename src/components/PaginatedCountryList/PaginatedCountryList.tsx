'use client';
import * as React from 'react';
import type { Country } from '@/types';
import CountryCard from '@/components/CountryCard';

const COUNTRIES_PER_PAGE = 20;

function PaginatedCountryList({
  countries,
  searchParams,
}: {
  countries: Country[];
  searchParams: { search?: string; region?: string };
}) {
  const [displayCount, setDisplayCount] = React.useState(COUNTRIES_PER_PAGE);

  React.useEffect(() => {
    setDisplayCount(COUNTRIES_PER_PAGE);
  }, [searchParams.search, searchParams.region]);

  const displayedCountries = countries.slice(0, displayCount);
  const hasMore = displayCount < countries.length;

  const loadMore = () => {
    setDisplayCount((prev) =>
      Math.min(prev + COUNTRIES_PER_PAGE, countries.length)
    );
  };

  if (countries.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p className="text-800 text-very-dark-blue-l flex items-center justify-center gap-2 text-lg dark:text-white">
          <span className="text-800">🔍</span>
          No countries found matching{' '}
          {searchParams.search?.trim() || 'your criteria'}
          {searchParams.region && ` in ${searchParams.region.trim()}`}
          <span className="text-2xl">🌍</span>
        </p>
        <p className="mt-2 text-gray-500 dark:text-gray-300">
          {`Try different search terms ${searchParams.region ? 'or regions' : ''}`}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <ul className="grid grid-cols-(--my-countries-grid) gap-10 md:mt-12 lg:gap-[4.6875rem]">
        {displayedCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </ul>

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={loadMore}
            className="dark:bg-dark-blue inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold shadow-md transition-all duration-200 hover:bg-blue-50 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:hover:bg-blue-900/20"
          >
            Load More Countries
            <span className="text-sm text-gray-600 dark:text-gray-300">
              ({countries.length - displayCount} remaining)
            </span>
          </button>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        Showing {displayedCountries.length} of {countries.length} countries
      </div>
    </div>
  );
}

export default PaginatedCountryList;
