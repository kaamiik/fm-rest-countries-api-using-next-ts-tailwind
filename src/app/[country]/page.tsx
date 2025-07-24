import React from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import Link from 'next/link';

import BackButton from '@/components/BackButton';
import Icon from '@/components/Icon';
import InfoList from '@/components/InfoList';
import { getData } from '@/lib/utils';
import type { Country, Currency } from '@/types';

async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const data = await getData();

  const countryData: Country = data.find((c: Country) => {
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
        <p className="text-700 mt-16 text-center font-bold">
          Country not found
        </p>
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
        <Icon
          src={countryData.flags.svg}
          width={560}
          height={400}
          className="h-auto max-w-full rounded-sm shadow-md"
        />
        <div className="flex flex-col gap-4 md:gap-6">
          <h1 className="text-600 font-extrabold">{countryData.name.common}</h1>
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
                  value: countryData.capital,
                },
              ]}
            />
            <InfoList
              items={[
                {
                  label: 'Top Level Domain',
                  value: countryData.tld.join(', '),
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
                        className="dark:bg-dark-blue shadow-border-light inline-block rounded-sm bg-white px-4 py-2"
                        href={`/${border.toLowerCase()}`}
                      >
                        {borderCountry?.name.common}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li>No border countries</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default CountryPage;
