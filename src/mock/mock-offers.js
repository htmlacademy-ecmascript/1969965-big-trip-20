const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        title: 'Order Uber',
        price: 20,
        id: 1
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        title: 'Add luggage',
        price: 50,
        id: 2
      },
      {
        title: 'Switch to comfort',
        price: 80,
        id: 3
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        title: 'Rent a car',
        price: 200,
        id: 4
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        title: 'Add breakfast',
        price: 50,
        id: 5
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        title: 'Book tickets',
        price: 40,
        id: 6
      },
      {
        title: 'Lunch in city',
        price: 30,
        id: 7
      }
    ]
  }
];

const getMockOffers = () => mockOffers;

export { getMockOffers };
