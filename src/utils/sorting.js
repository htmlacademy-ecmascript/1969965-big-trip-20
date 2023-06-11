import dayjs from 'dayjs';
import { findDifference } from './common.js';
import { SortTypes } from '../constants.js';

function sortTrips(trips, sortType) {
  const sortedTrips = trips.sort((trip1, trip2) => {
    switch(sortType) {
      case SortTypes.TIME:
        return findDifference(trip1['timeStart'], trip1['timeEnd']) - findDifference(trip2['timeStart'], trip2['timeEnd']);
      case SortTypes.PRICE:
        return trip2['price'] - trip1['price'];
      default:
        return dayjs(trip1['timeStart'].valueOf()) - dayjs(trip2['timeStart'].valueOf());
    }
  });
  return sortedTrips;
}

export { sortTrips };
