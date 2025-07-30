import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import type { Country } from '@/types';

import InfoList from '../InfoList';

function CountryCard(
  { country }: { country: Country },
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <li className="dark:bg-dark-blue shadow-focus relative mx-auto max-w-[16.5rem] rounded-md bg-white transition-all duration-300 hover:scale-105 has-[:focus]:ring-2 has-[:focus]:ring-blue-500 has-[:focus]:ring-offset-2">
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
            ref={ref}
            className="tent-[''] after:absolute after:inset-0 focus:outline-0"
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

const ForwardedCountryCard = React.forwardRef(CountryCard);

ForwardedCountryCard.displayName = 'CountryCard';

export default ForwardedCountryCard;
