const tripTypes = ['taxi', 'bus','train', 'ship', 'drive', 'flight','check-in', 'sightseeing', 'restaurant'];

const DateFormat = {
  DAY_MONTH : 'MMM D',
  HOUR_MINUTES: 'H:mm',
  YEAR_MONTH_DAY: 'YY-MM-DD',
  YEAR_MONTH_DAY_TIME: 'YYYY-MM-DDTHH:mm',
  DAY_MONTH_YEAR_TIME_SLASHED: 'DD/MM/YY HH:mm',
  MONTH_DAY: 'MMM D',
  DAY: 'D'
};

const FavoriteButtonStateClass = {
  ACTIVE: 'event__favorite-btn event__favorite-btn--active',
  INACTIVE: 'event__favorite-btn'
};

const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
};

const SortType = {
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
  INIT: 'INIT',
  ERROR: 'ERROR'
};

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

export { tripTypes, DateFormat, FavoriteButtonStateClass, BLANK_EVENT_FORM_DATA, FilterType, SortType, UpdateType, UserAction };
