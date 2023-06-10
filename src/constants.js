const tripTypes = ['taxi', 'bus','train', 'ship', 'drive', 'flight','check-in', 'sightseeing', 'restaurant'];

const DateFormats = {
  DAY_MONTH : 'MMM D',
  HOUR_MINUTES: 'H:mm',
  YEAR_MONTH_DAY: 'YY-MM-DD',
  YEAR_MONTH_DAY_TIME: 'YYYY-MM-DDTHH:mm',
  DAY_MONTH_YEAR_TIME_SLASHED: 'DD/MM/YY HH:mm',
  MONTH_DAY: 'MMM D',
  DAY: 'D'
};

const TRIP_COUNT = 4;

const FavoriteBtnStateClasses = {
  ACTIVE: 'event__favorite-btn event__favorite-btn--active',
  INACTIVE: 'event__favorite-btn'
};

const RANDOM_NUM_RANGE = 300;

const BLANK_EVENT_FORM_DATA = {
  id: '',
  destination: '',
  type: 'taxi',
  price: '',
  timeStart: '',
  timeEnd: '',
  isFavorite: false,
  offers: []
};

function getBlankEventFormData() {
  return BLANK_EVENT_FORM_DATA;
}

const FilterTypes = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const UserAction = {
  UPDATE_TRIP: 'UPDATE_TRIP',
  ADD_TRIP: 'ADD_TRIP',
  DELETE_TRIP: 'DELETE_TRIP',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export { tripTypes, DateFormats, TRIP_COUNT, FavoriteBtnStateClasses, RANDOM_NUM_RANGE, getBlankEventFormData, FilterTypes, SortTypes, UpdateType, UserAction };
