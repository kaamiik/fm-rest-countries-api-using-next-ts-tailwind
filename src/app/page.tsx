import React from 'react';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import SearchForm from '@/components/SearchForm';
import CountryList from '@/components/CountryList';
import Spinner from '@/components/Spinner';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; region?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  return (
    <MaxWidthWrapper
      as="main"
      className="bg-light-gray dark:bg-darker-blue min-h-dvh px-4 pt-6 pb-16 md:py-12 xl:px-0"
    >
      <h1 className="sr-only">Rest Countries API</h1>
      <SearchForm />

      <React.Suspense fallback={<Spinner size={56} />}>
        <CountryList searchParams={resolvedSearchParams} />
      </React.Suspense>
    </MaxWidthWrapper>
  );
}
