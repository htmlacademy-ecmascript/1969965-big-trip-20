import { getRandomArrayElement } from '../utils.js';
import { TRIP_TYPES, DESTINATIONS } from '../constants.js';

const mockTrips = [
  {
    destination: getRandomArrayElement(DESTINATIONS),
    type: getRandomArrayElement(TRIP_TYPES),
    price: '100',
    date: new Date(2023, 7, 1),
    timeStart: new Date(2023, 7, 1, 10, 30, 0),
    timeEnd: new Date(2023, 7, 1, 11, 30, 0),
    isFavourite: true,
    offers: 3
  },
  {
    destination: getRandomArrayElement(DESTINATIONS),
    type: getRandomArrayElement(TRIP_TYPES),
    price: '200',
    date: new Date(2023, 7, 5),
    timeStart: new Date(2023, 7, 5, 20, 30, 0),
    timeEnd: new Date(2023, 7, 5, 20, 55, 0),
    isFavourite: true,
    offers: 2
  },
  {
    destination: getRandomArrayElement(DESTINATIONS),
    type: getRandomArrayElement(TRIP_TYPES),
    price: '150',
    date: new Date(2023, 7, 9),
    timeStart: new Date(2023, 7, 9, 9, 20, 0),
    timeEnd: new Date(2023, 7, 9, 10, 10, 0),
    isFavourite: true,
    offers: 5
  },
  {
    destination: getRandomArrayElement(DESTINATIONS),
    type: getRandomArrayElement(TRIP_TYPES),
    price: '120',
    date: new Date(2023, 6, 15),
    timeStart: new Date(2023, 6, 15, 14, 0, 0),
    timeEnd: new Date(2023, 6, 15, 16, 15, 0),
    isFavourite: true,
    offers: 1
  }
];

function getRandomTrip() {
  return getRandomArrayElement(mockTrips);
}

export { getRandomTrip };

