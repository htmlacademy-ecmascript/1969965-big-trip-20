import { getRandomNumber } from '../utils.js';

const mockDestinations = [
  {
    destination: 'Munich',
    description:  'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    images: [
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`
    ]
  },
  {
    destination: 'Rome',
    description:  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    images: [
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
    ]
  },
  {
    destination: 'Rhodes',
    description:  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    images: [
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`
    ]
  },
  {
    destination: 'Krakow',
    description:  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
    images: []
  },
  {
    destination: 'Ulcinj',
    description:  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    images: [
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`
    ]
  },
  {
    destination: 'Helsinki',
    description:  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    images: [
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
      `https://loremflickr.com/248/152?random=${getRandomNumber()}`
    ]
  }
];

export { mockDestinations };

