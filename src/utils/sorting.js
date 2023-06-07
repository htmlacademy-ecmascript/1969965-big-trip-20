import dayjs from 'dayjs';
import { findDifference } from './common.js';

function sortTrips(trips, sortType) {
  const sortedTrips = trips.sort((trip1, trip2) => {
    switch(sortType) {
      case 'day':
        return dayjs(trip1['timeStart'].valueOf()) - dayjs(trip2['timeStart'].valueOf());
      case 'time':
        return findDifference(trip1['timeStart'], trip1['timeEnd']) - findDifference(trip2['timeStart'], trip2['timeEnd']);
      case 'price':
        return trip2['price'] - trip1['price'];
    }
  });
  return sortedTrips;
}

export { sortTrips};
