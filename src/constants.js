const TRIP_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'Sightseeing', 'Restaurant'];

const DESTINATIONS = ['Munich', 'Rome', 'Rhodes', 'Krakow', 'Ulcinj', 'Helsinki'];

const DATE_FORMATS = {
  DAY_MONTH : 'MMM D',
  HOUR_MINUTES: 'H:mm',
  YEAR_MONTH_DAY: 'YY-MM-DD',
  YEAR_MONTH_DAY_TIME: 'YYYY-MM-DDTHH:mm'
};

const TRIP_COUNT = 4;

const FAVOURITE_BTN_STATE_CLASS = '--active';

export { TRIP_TYPES, DESTINATIONS, DATE_FORMATS, TRIP_COUNT, FAVOURITE_BTN_STATE_CLASS };
