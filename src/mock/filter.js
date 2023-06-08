import { filter } from '../utils/filter.js';

function generateFilter(trips) {
  return Object.entries(filter).map(
    ([filterType, filterTrips]) => ({
      type: filterType,
      count: filterTrips(trips).length,
    }),
  );
}

export { generateFilter };
