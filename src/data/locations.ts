import { Country, Region, City } from '@/types';

// Seed data for location picker - simplified for demo
export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
];

export const REGIONS: Record<string, Region[]> = {
  US: [
    { code: 'CA', name: 'California', countryCode: 'US' },
    { code: 'NY', name: 'New York', countryCode: 'US' },
    { code: 'TX', name: 'Texas', countryCode: 'US' },
    { code: 'FL', name: 'Florida', countryCode: 'US' },
  ],
  CA: [
    { code: 'ON', name: 'Ontario', countryCode: 'CA' },
    { code: 'BC', name: 'British Columbia', countryCode: 'CA' },
    { code: 'QC', name: 'Quebec', countryCode: 'CA' },
    { code: 'AB', name: 'Alberta', countryCode: 'CA' },
  ],
  GB: [
    { code: 'ENG', name: 'England', countryCode: 'GB' },
    { code: 'SCT', name: 'Scotland', countryCode: 'GB' },
    { code: 'WLS', name: 'Wales', countryCode: 'GB' },
  ],
  AU: [
    { code: 'NSW', name: 'New South Wales', countryCode: 'AU' },
    { code: 'VIC', name: 'Victoria', countryCode: 'AU' },
    { code: 'QLD', name: 'Queensland', countryCode: 'AU' },
  ],
};

export const CITIES: Record<string, City[]> = {
  CA: [
    { name: 'Los Angeles', regionCode: 'CA', countryCode: 'US' },
    { name: 'San Francisco', regionCode: 'CA', countryCode: 'US' },
    { name: 'San Diego', regionCode: 'CA', countryCode: 'US' },
  ],
  NY: [
    { name: 'New York City', regionCode: 'NY', countryCode: 'US' },
    { name: 'Buffalo', regionCode: 'NY', countryCode: 'US' },
    { name: 'Albany', regionCode: 'NY', countryCode: 'US' },
  ],
  ON: [
    { name: 'Toronto', regionCode: 'ON', countryCode: 'CA' },
    { name: 'Ottawa', regionCode: 'ON', countryCode: 'CA' },
    { name: 'London', regionCode: 'ON', countryCode: 'CA' },
    { name: 'Hamilton', regionCode: 'ON', countryCode: 'CA' },
  ],
  BC: [
    { name: 'Vancouver', regionCode: 'BC', countryCode: 'CA' },
    { name: 'Victoria', regionCode: 'BC', countryCode: 'CA' },
  ],
};

export function getRegionsByCountry(countryCode: string): Region[] {
  return REGIONS[countryCode] || [];
}

export function getCitiesByRegion(regionCode: string): City[] {
  return CITIES[regionCode] || [];
}

export function searchCities(query: string, countryCode?: string): City[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  
  const allCities = Object.values(CITIES).flat();
  const filtered = allCities.filter((city) =>
    city.name.toLowerCase().includes(lowerQuery) &&
    (!countryCode || city.countryCode === countryCode)
  );
  
  return filtered.slice(0, 10);
}
