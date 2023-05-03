import { getRandomArrayElement, getRandomNumber } from '../utils.js';

const mockTrips = [
  {
    id: 1,
    destination: getRandomNumber(6),
    type: 'taxi',
    price: 100,
    timeStart: new Date(2023, 7, 1, 10, 30, 0),
    timeEnd: new Date(2023, 7, 1, 11, 30, 0),
    isFavourite: true,
    offers: [1]
  },
  {
    id: 2,
    destination: getRandomNumber(6),
    type: 'flight',
    price: '200',
    date: new Date(2023, 7, 5),
    timeStart: new Date(2023, 7, 5, 20, 30, 0),
    timeEnd: new Date(2023, 7, 5, 20, 55, 0),
    isFavourite: true,
    offers: [2, 3]
  },
  {
    id: 3,
    destination: getRandomNumber(6),
    type: 'check-in',
    price: '150',
    date: new Date(2023, 7, 9),
    timeStart: new Date(2023, 7, 9, 9, 20, 0),
    timeEnd: new Date(2023, 7, 9, 10, 10, 0),
    isFavourite: true,
    offers: []
  },
  {
    id: 4,
    destination: getRandomNumber(6),
    type: 'sightseeing',
    price: '120',
    date: new Date(2023, 6, 15),
    timeStart: new Date(2023, 6, 15, 14, 0, 0),
    timeEnd: new Date(2023, 6, 15, 16, 15, 0),
    isFavourite: true,
    offers: [7]
  }
];

export { mockTrips };

