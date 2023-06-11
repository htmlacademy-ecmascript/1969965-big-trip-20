import { getRandomArrayElement, getRandomNumber } from '../utils/common.js';

const mockTrips = [
  {
    id: 1,
    destination: getRandomNumber(6),
    type: 'taxi',
    price: 100,
    timeStart: '2019-07-08T22:55:56.845Z',
    timeEnd: '2019-07-13T11:22:13.375Z',
    isFavorite: true,
    offers: [3]
  },
  {
    id: 2,
    destination: getRandomNumber(6),
    type: 'flight',
    price: 200,
    timeStart: '2019-07-15T12:45:00.845Z',
    timeEnd: '2019-07-15T14:25:00.375Z',
    isFavorite: true,
    offers: [4, 6]
  },
  {
    id: 3,
    destination: getRandomNumber(6),
    type: 'check-in',
    price: 150,
    timeStart: '2019-07-23T15:45:00.845Z',
    timeEnd: '2019-07-24T17:25:00.375Z',
    isFavorite: false,
    offers: []
  },
  {
    id: 4,
    destination: getRandomNumber(6),
    type: 'sightseeing',
    price: 120,
    timeStart: '2019-08-27T10:40:00.845Z',
    timeEnd: '2019-08-29T11:05:00.375Z',
    isFavorite: true,
    offers: [13]
  },
  {
    id: 5,
    destination: getRandomNumber(6),
    type: 'bus',
    price: 100,
    timeStart: '2019-07-09T22:55:56.845Z',
    timeEnd: '2019-07-15T11:22:13.375Z',
    isFavorite: true,
    offers: [15]
  },
  {
    id: 6,
    destination: getRandomNumber(6),
    type: 'flight',
    price: 200,
    timeStart: '2019-07-12T22:55:56.845Z',
    timeEnd: '2019-07-17T11:22:13.375Z',
    isFavorite: true,
    offers: [5]
  },
  {
    id: 7,
    destination: getRandomNumber(6),
    type: 'taxi',
    price: 50,
    timeStart: '2019-07-13T22:55:56.845Z',
    timeEnd: '2019-07-15T11:22:13.375Z',
    isFavorite: true,
    offers: [3]
  },
  {
    id: 8,
    destination: getRandomNumber(6),
    type: 'check-in',
    price: 80,
    timeStart: '2019-07-14T22:55:56.845Z',
    timeEnd: '2019-07-16T11:22:13.375Z',
    isFavorite: true,
    offers: [9, 10]
  },
  {
    id: 9,
    destination: getRandomNumber(6),
    type: 'sightseeing',
    price: 110,
    timeStart: '2019-07-06T22:55:56.845Z',
    timeEnd: '2019-07-08T11:22:13.375Z',
    isFavorite: true,
    offers: [13]
  },
  {
    id: 10,
    destination: getRandomNumber(6),
    type: 'bus',
    price: 115,
    timeStart: '2019-07-17T22:55:56.845Z',
    timeEnd: '2019-07-18T11:22:13.375Z',
    isFavorite: true,
    offers: [16]
  },
  {
    id: 11,
    destination: getRandomNumber(6),
    type: 'check-in',
    price: 130,
    timeStart: '2019-07-21T22:55:56.845Z',
    timeEnd: '2019-07-22T11:22:13.375Z',
    isFavorite: true,
    offers: [11]
  },
  {
    id: 12,
    destination: getRandomNumber(6),
    type: 'taxi',
    price: 95,
    timeStart: '2019-07-24T22:55:56.845Z',
    timeEnd: '2019-07-25T11:22:13.375Z',
    isFavorite: true,
    offers: [1, 2]
  },
  {
    id: 13,
    destination: getRandomNumber(6),
    type: 'bus',
    price: 116,
    timeStart: '2019-07-13T22:55:56.845Z',
    timeEnd: '2019-07-16T11:22:13.375Z',
    isFavorite: true,
    offers: [15, 17]
  },
  {
    id: 14,
    destination: getRandomNumber(6),
    type: 'sightseeing',
    price: 210,
    timeStart: '2019-07-19T22:55:56.845Z',
    timeEnd: '2019-07-21T11:22:13.375Z',
    isFavorite: true,
    offers: [13, 14]
  },
  {
    id: 15,
    destination: getRandomNumber(6),
    type: 'flight',
    price: 205,
    timeStart: '2019-07-18T22:55:56.845Z',
    timeEnd: '2019-07-19T11:22:13.375Z',
    isFavorite: true,
    offers: [6]
  },
  {
    id: 16,
    destination: getRandomNumber(6),
    type: 'taxi',
    price: 400,
    timeStart: '2019-07-12T22:55:56.845Z',
    timeEnd: '2019-07-17T11:22:13.375Z',
    isFavorite: true,
    offers: [1]
  },
];

function getRandomTrip() {
  return getRandomArrayElement(mockTrips);
}

export { getRandomTrip };

