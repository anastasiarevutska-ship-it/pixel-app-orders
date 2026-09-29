/**
 * Mock pharmacy search data for the Retail Pharmacy Finder. Deterministic:
 * the same location + radius always yields the same results.
 */
export type Pharmacy = {
  id: string;
  name: string;
  address: string;
  cityStateZip: string;
  hours: string;
  /** Miles from the search location. */
  distance: number;
  /** Compass bearing from the search location (degrees), used to place map pins. */
  bearing: number;
};

export type SearchLocation = { kind: 'current' } | { kind: 'zip'; zip: string };

export const RADIUS_OPTIONS = [5, 10, 25, 50] as const;
export type Radius = (typeof RADIUS_OPTIONS)[number];
export const DEFAULT_RADIUS: Radius = 10;

type Area = { label: string; pharmacies: Pharmacy[] };

type Seed = [name: string, address: string, cityStateZip: string, hours: string, distance: number, bearing: number];

const area = (label: string, prefix: string, seeds: Seed[]): Area => ({
  label,
  pharmacies: seeds.map(([name, address, cityStateZip, hours, distance, bearing], i) => ({
    id: `${prefix}-${i + 1}`,
    name,
    address,
    cityStateZip,
    hours,
    distance,
    bearing,
  })),
});

/** "Use current location" resolves to the patient's area (downtown Columbus). */
const COLUMBUS = area('Columbus, OH 43215', 'cmh', [
  ['Short North Pharmacy', '812 N High St', 'Columbus, OH 43215', 'Open until 9:00pm', 0.6, 350],
  ['German Village Apothecary', '598 S Third St', 'Columbus, OH 43206', 'Open until 7:00pm', 1.3, 170],
  ['Riverside Community Pharmacy', '1455 Olentangy River Rd', 'Columbus, OH 43212', 'Open 24 hours', 2.4, 315],
  ['Olde Towne East Pharmacy', '1020 E Broad St', 'Columbus, OH 43205', 'Open until 8:00pm', 3.1, 95],
  ['Clintonville Family Pharmacy', '3351 N High St', 'Columbus, OH 43202', 'Open until 9:00pm', 4.6, 5],
  ['Bexley Main Street Pharmacy', '2346 E Main St', 'Bexley, OH 43209', 'Open until 6:00pm', 5.8, 110],
  ['Grandview Heights Pharmacy', '1485 W Fifth Ave', 'Grandview Heights, OH 43212', 'Open until 9:00pm', 7.2, 290],
  ['Whitehall Care Pharmacy', '4150 E Broad St', 'Whitehall, OH 43213', 'Open until 10:00pm', 9.4, 80],
  ['Upper Arlington Pharmacy', '2124 Tremont Center', 'Upper Arlington, OH 43221', 'Open until 8:00pm', 11.6, 300],
  ['Gahanna Station Pharmacy', '156 Mill St', 'Gahanna, OH 43230', 'Open until 9:00pm', 14.9, 55],
  ['Grove City Wellness Pharmacy', '3960 Broadway', 'Grove City, OH 43123', 'Open until 8:00pm', 17.8, 205],
  ['Hilliard Village Pharmacy', '5354 Norwich St', 'Hilliard, OH 43026', 'Open until 7:00pm', 21.3, 275],
  ['Westerville Uptown Pharmacy', '32 N State St', 'Westerville, OH 43081', 'Open 24 hours', 24.2, 25],
  ['Delaware Health Pharmacy', '41 N Sandusky St', 'Delaware, OH 43015', 'Open until 9:00pm', 33.5, 355],
  ['Lancaster Square Pharmacy', '145 W Main St', 'Lancaster, OH 43130', 'Open until 8:00pm', 41.7, 150],
  ['Newark Downtown Pharmacy', '28 N Park Pl', 'Newark, OH 43055', 'Open until 7:00pm', 47.9, 80],
]);

const WORTHINGTON = area('Worthington, OH 43085', 'wor', [
  ['Worthington Green Pharmacy', '675 High St', 'Worthington, OH 43085', 'Open until 8:00pm', 0.4, 20],
  ['Linworth Road Pharmacy', '2230 W Dublin-Granville Rd', 'Worthington, OH 43085', 'Open until 9:00pm', 1.9, 265],
  ['Antrim Park Pharmacy', '5700 Olentangy River Rd', 'Columbus, OH 43235', 'Open 24 hours', 2.7, 200],
  ['Sharon Woods Pharmacy', '6090 Cleveland Ave', 'Columbus, OH 43231', 'Open until 10:00pm', 5.2, 100],
  ['Polaris Parkway Pharmacy', '1230 Polaris Pkwy', 'Columbus, OH 43240', 'Open until 9:00pm', 7.8, 30],
  ['Clintonville Family Pharmacy', '3351 N High St', 'Columbus, OH 43202', 'Open until 9:00pm', 8.9, 180],
  ['Dublin Bridge Street Pharmacy', '6 S High St', 'Dublin, OH 43017', 'Open until 8:00pm', 12.4, 250],
  ['Westerville Uptown Pharmacy', '32 N State St', 'Westerville, OH 43081', 'Open 24 hours', 13.1, 75],
  ['Short North Pharmacy', '812 N High St', 'Columbus, OH 43215', 'Open until 9:00pm', 16.5, 185],
  ['Delaware Health Pharmacy', '41 N Sandusky St', 'Delaware, OH 43015', 'Open until 9:00pm', 22.8, 5],
  ['Marysville Uptown Pharmacy', '118 E Fifth St', 'Marysville, OH 43040', 'Open until 7:00pm', 37.6, 300],
]);

const DUBLIN = area('Dublin, OH 43017', 'dub', [
  ['Dublin Bridge Street Pharmacy', '6 S High St', 'Dublin, OH 43017', 'Open until 8:00pm', 0.5, 90],
  ['Muirfield Village Pharmacy', '7625 Fishel Dr', 'Dublin, OH 43016', 'Open until 9:00pm', 2.8, 330],
  ['Perimeter Loop Pharmacy', '6780 Perimeter Loop Rd', 'Dublin, OH 43017', 'Open 24 hours', 3.4, 200],
  ['Hilliard Village Pharmacy', '5354 Norwich St', 'Hilliard, OH 43026', 'Open until 7:00pm', 6.9, 215],
  ['Upper Arlington Pharmacy', '2124 Tremont Center', 'Upper Arlington, OH 43221', 'Open until 8:00pm', 9.1, 140],
  ['Worthington Green Pharmacy', '675 High St', 'Worthington, OH 43085', 'Open until 8:00pm', 11.8, 80],
  ['Plain City Pharmacy', '140 W Main St', 'Plain City, OH 43064', 'Open until 6:00pm', 13.7, 285],
  ['Riverside Community Pharmacy', '1455 Olentangy River Rd', 'Columbus, OH 43212', 'Open 24 hours', 15.2, 130],
  ['Marysville Uptown Pharmacy', '118 E Fifth St', 'Marysville, OH 43040', 'Open until 7:00pm', 23.9, 320],
  ['London Main Pharmacy', '55 S Main St', 'London, OH 43140', 'Open until 7:00pm', 29.4, 225],
]);

const AREAS_BY_ZIP: Record<string, Area> = {
  '43215': COLUMBUS,
  '43085': WORTHINGTON,
  '43017': DUBLIN,
};

/** Any other valid ZIP gets a deterministic, generated result set. */
function generatedArea(zip: string): Area {
  const n = Number(zip);
  const streets = ['Main St', 'Oak Ave', 'Park Blvd', 'Market St', 'Center Rd', 'Lake Dr', 'Elm St', 'Church St', 'Mill Rd'];
  const names = ['Community', 'Family', 'Town Center', 'Parkside', 'Main Street', 'Lakeview', 'Crossroads', 'Village', 'Northside'];
  const seeds: Seed[] = names.map((name, i) => [
    `${name} Pharmacy`,
    `${100 + ((n + i * 137) % 900)} ${streets[(n + i) % streets.length]}`,
    `ZIP ${zip}`,
    i % 4 === 2 ? 'Open 24 hours' : `Open until ${7 + (i % 3)}:00pm`,
    Math.round((0.7 + i * i * 0.55 + (n % 7) * 0.1) * 10) / 10,
    (n * 7 + i * 83) % 360,
  ]);
  return area(`ZIP ${zip}`, `z${zip}`, seeds);
}

function areaFor(location: SearchLocation): Area {
  if (location.kind === 'current') return COLUMBUS;
  return AREAS_BY_ZIP[location.zip] ?? generatedArea(location.zip);
}

export function locationLabel(location: SearchLocation): string {
  return location.kind === 'current' ? `Current location · ${COLUMBUS.label}` : areaFor(location).label;
}

/** Pharmacies within `radius` miles of the location, nearest first. */
export function searchPharmacies(location: SearchLocation, radius: Radius): Pharmacy[] {
  return areaFor(location)
    .pharmacies.filter((p) => p.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
}

export function findPharmacy(location: SearchLocation, id: string): Pharmacy | undefined {
  return areaFor(location).pharmacies.find((p) => p.id === id);
}

export const formatDistance = (miles: number) => `${miles.toFixed(1)} mi`;

export const isValidZip = (zip: string) => /^\d{5}$/.test(zip);
