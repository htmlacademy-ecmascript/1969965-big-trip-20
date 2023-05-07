const TRIP_TYPES = [
  {type: 'taxi'},
  {type: 'bus'},
  {type: 'train'},
  {type: 'ship'},
  {type: 'drive'},
  {type : 'flight'},
  {type: 'check-in'},
  {type: 'sightseeing'},
  {type: 'restaurant'}
];

const DESTINATIONS = ['Munich', 'Rome', 'Rhodes', 'Krakow', 'Ulcinj', 'Helsinki'];

const DATE_FORMATS = {
  DAY_MONTH : 'MMM D',
  HOUR_MINUTES: 'H:mm',
  YEAR_MONTH_DAY: 'YY-MM-DD',
  YEAR_MONTH_DAY_TIME: 'YYYY-MM-DDTHH:mm'
};

const TRIP_COUNT = 4;

const FAVOURITE_BTN_STATE_CLASSES = {
  active: 'event__favorite-btn event__favorite-btn--active',
  inactive: 'event__favorite-btn'
};

const turnFirstCharToUppercase = (string) => {
  const result = string.replace(string[0], string[0].toUpperCase());
  return result;
};

export { TRIP_TYPES, DESTINATIONS, DATE_FORMATS, TRIP_COUNT, FAVOURITE_BTN_STATE_CLASSES, turnFirstCharToUppercase };
