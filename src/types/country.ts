export type Currency = {
  name: string;
  symbol?: string;
};

export type Country = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [languageCode: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca3: string;
  currencies: {
    [currencyCode: string]: Currency;
  };
  capital: string[];
  region: string;
  subregion: string;
  borders: string[];
  population: number;
};
