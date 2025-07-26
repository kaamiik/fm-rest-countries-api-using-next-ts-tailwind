import React from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import Image from 'next/image';
import InfoList from '@/components/InfoList';
import { getData } from '@/lib/utils';
import type { Country, Currency } from '@/types';

async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  try {
    const { country } = await params;
    const data = await getData();

    const countryData: Country | undefined = data.find((c: Country) => {
      const searchName = country.toLowerCase();
      return c.cca3.toLowerCase() === searchName;
    });

    if (!countryData) {
      return (
        <MaxWidthWrapper
          as="main"
          className="bg-light-gray dark:bg-darker-blue min-h-dvh px-7 pt-10 pb-16 md:pt-20 xl:px-0"
        >
          <BackButton />
          <div className="mt-16 text-center">
            <p className="text-700 mb-4 font-bold">Country not found</p>
            <p className="text-400 text-gray-600 dark:text-gray-300">
              The country {country} could not be found.
            </p>
          </div>
        </MaxWidthWrapper>
      );
    }

    return (
      <MaxWidthWrapper
        as="main"
        className="bg-light-gray dark:bg-darker-blue min-h-dvh px-4 pt-10 pb-16 md:pt-20 xl:px-0"
      >
        <BackButton />
        <div className="mt-16 grid gap-11 md:mt-20 lg:grid-cols-2">
          <Image
            src={countryData.flags.svg}
            alt={countryData.flags.alt}
            width={560}
            height={400}
            className="h-auto max-w-full rounded-sm shadow-md"
          />
          <div className="flex flex-col gap-4 md:gap-6">
            <h1 className="text-600 font-extrabold">
              {countryData.name.common}
            </h1>
            <div className="flex flex-col gap-8 md:flex-row lg:justify-between">
              <InfoList
                items={[
                  {
                    label: 'Native Name',
                    value: countryData.name.nativeName
                      ? Object.values(countryData.name.nativeName)
                          .map((name) => name.common)
                          .join(', ')
                      : countryData.name.common,
                  },
                  {
                    label: 'Population',
                    value: countryData.population.toLocaleString(),
                  },
                  {
                    label: 'Region',
                    value: countryData.region,
                  },
                  {
                    label: 'Sub Region',
                    value: countryData.subregion,
                  },
                  {
                    label: 'Capital',
                    value: countryData.capital?.join(', ') || 'No capital',
                  },
                ]}
              />
              <InfoList
                items={[
                  {
                    label: 'Top Level Domain',
                    value: countryData.tld?.join(', ') || 'No TLD',
                  },
                  {
                    label: 'Currencies',
                    value: countryData.currencies
                      ? Object.values(
                          countryData.currencies as Record<string, Currency>
                        )
                          .map((currency) => currency.name)
                          .join(', ')
                      : 'No Currency',
                  },
                ]}
              />
            </div>
            {/* Border Countries */}
            <div className="mt-auto flex flex-col gap-4">
              <p className="text-400 font-semibold">Border Countries:</p>
              <ul className="flex flex-wrap items-center gap-[10px]">
                {countryData.borders && countryData.borders.length > 0 ? (
                  countryData.borders.map((border: string) => {
                    const borderCountry = data.find(
                      (c: Country) => c.cca3 === border
                    );
                    return (
                      <li key={border}>
                        <Link
                          className="dark:bg-dark-blue shadow-border-light inline-block rounded-sm bg-white px-4 py-2 transition-shadow duration-300 hover:bg-gray-50 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 dark:hover:bg-gray-700"
                          href={`/${border.toLowerCase()}`}
                        >
                          {borderCountry?.name.common || border}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li className="text-gray-600 dark:text-gray-300">
                    No border countries
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  } catch (error) {
    console.error('Error loading country page:', error);
    return (
      <MaxWidthWrapper
        as="main"
        className="bg-light-gray dark:bg-darker-blue min-h-dvh px-7 pt-10 pb-16 md:pt-20 xl:px-0"
      >
        <BackButton />
        <div className="mt-16 text-center">
          <p className="text-700 mb-4 font-bold">Something went wrong</p>
          <p className="text-400 text-gray-600 dark:text-gray-300">
            Failed to load country information. Please try again later.
          </p>
        </div>
      </MaxWidthWrapper>
    );
  }
}

export default CountryPage;
