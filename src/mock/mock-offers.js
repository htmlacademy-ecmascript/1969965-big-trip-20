const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        title: 'Order Uber',
        price: 20,
        id: 1
      },
      {
        title: 'Order Yandex',
        price: 20,
        id: 2
      },
      {
        title: 'Order Papa',
        price: 0,
        id: 3
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        title: 'Add luggage',
        price: 50,
        id: 4
      },
      {
        title: 'Switch to comfort',
        price: 80,
        id: 5
      },
      {
        title: 'Switch to extra-comfort',
        price: 100,
        id: 6
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        title: 'Rent a car',
        price: 200,
        id: 7
      },
      {
        title: 'Steal a car',
        price: 500,
        id: 8
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        title: 'Add breakfast',
        price: 50,
        id: 9
      },
      {
        title: 'Add lunch',
        price: 50,
        id: 10
      },
      {
        title: 'Add supper',
        price: 50,
        id: 11
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        title: 'Book tickets',
        price: 40,
        id: 12
      },
      {
        title: 'Excursion',
        price: 60,
        id: 13
      },
      {
        title: 'Lunch in city',
        price: 30,
        id: 14
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        title: 'Smaltalk with driver',
        price: 10,
        id: 15
      },
      {
        title: 'Seat near the window',
        price: 15,
        id: 16
      },
      {
        title: 'Sanitar station',
        price: 30,
        id: 17
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        title: 'Hot Soviet Tea',
        price: 15,
        id: 18
      },
      {
        title: 'Change linen',
        price: 30,
        id: 19
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        title: 'Three meals a day',
        price: 40,
        id: 20
      },
      {
        title: 'Pool',
        price: 30,
        id: 21
      },
      {
        title: 'Steer the ship with captain',
        price: 100,
        id: 22
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        title: 'A dish from the chef',
        price: 30,
        id: 23
      },
      {
        title: 'Rug',
        price: 5,
        id: 24
      },
    ]
  }
];

function getMockOffers() {
  return mockOffers;
}

export { getMockOffers };
