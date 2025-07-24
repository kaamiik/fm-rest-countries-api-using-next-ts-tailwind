import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { Country } from '@/types';

import InfoList from '../InfoList';

function CountryCard({ country }: { country: Country }) {
  return (
    <li className="dark:bg-dark-blue shadow-focus relative mx-auto rounded-md bg-white">
      <Image
        className="h-[160px] w-[264px] rounded-t-md object-cover"
        src={country.flags.svg}
        alt={country.flags.alt}
        width={264}
        height={160}
      />
      <div className="ps-6 pt-6 pb-12">
        <h2 className="text-500 font-extrabold">
          <Link
            className="after:absolute after:inset-0"
            href={`/${country.cca3.toLowerCase()}`}
          >
            {country.name.official}
          </Link>
        </h2>
        <InfoList
          className="mt-5"
          gap="gap-0"
          items={[
            {
              label: 'Population',
              value: country.population.toLocaleString(),
            },
            {
              label: 'Region',
              value: country.region,
            },
            {
              label: 'Capital',
              value: country.capital,
            },
          ]}
        />
      </div>
    </li>
  );
}

export default CountryCard;
