import { getRandomNumber } from '../utils.js';

const mockDestinations = [
  {
    id: 0,
    name: 'Munich',
    description:  'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    images: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.'
      }
    ]
  },
  {
    id: 1,
    name: 'Rome',
    description:  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    images: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.'
      }
    ]
  },
  {
    id: 2,
    name: 'Rhodes',
    description:  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    images: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.'
      }
    ]
  },
  {
    id: 3,
    name: 'Krakow',
    description:  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
    images: []
  },
  {
    id: 4,
    name: 'Ulcinj',
    description:  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    images: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.'
      }
    ]
  },
  {
    id: 5,
    name: 'Helsinki',
    description:  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    images: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.'
      }
    ]
  }
];

const getMockDestinations = () => mockDestinations;

export { getMockDestinations };

