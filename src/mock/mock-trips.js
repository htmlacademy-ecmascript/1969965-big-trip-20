import { getRandomArrayElement, getRandomNumber } from '../utils.js';

const mockTrips = [
  {
    id: 1,
    destination: getRandomNumber(6),
    type: 'taxi',
    price: 100,
    timeStart: '2019-07-10T22:55:56.845Z',
    timeEnd: '2019-07-11T11:22:13.375Z',
    isFavorite: true,
    offers: [3]
  },
  {
    id: 2,
    destination: getRandomNumber(6),
    type: 'flight',
    price: '200',
    timeStart: '2019-07-15T12:45:00.845Z',
    timeEnd: '2019-07-15T14:25:00.375Z',
    isFavorite: true,
    offers: [4, 6]
  },
  {
    id: 3,
    destination: getRandomNumber(6),
    type: 'check-in',
    price: '150',
    timeStart: '2019-07-23T15:45:00.845Z',
    timeEnd: '2019-07-23T17:25:00.375Z',
    isFavorite: false,
    offers: []
  },
  {
    id: 4,
    destination: getRandomNumber(6),
    type: 'sightseeing',
    price: '120',
    timeStart: '2019-08-27T10:40:00.845Z',
    timeEnd: '2019-08-27T11:05:00.375Z',
    isFavorite: true,
    offers: [13]
  }
];

function getRandomTrip() {
  return getRandomArrayElement(mockTrips);
}

export { getRandomTrip };

