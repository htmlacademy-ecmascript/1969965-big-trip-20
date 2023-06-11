import AbstractView from '../framework/view/abstract-view';
import { FilterTypes } from '../constants.js';

const FilterMessages = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.PAST]: 'There are no past events now',
  [FilterTypes.PRESENT]: 'There are no present events now',
  [FilterTypes.FUTURE]: 'There are no future events now',
  // ['ERROR']: 'Ooops! Something went wrong, try again later...'
};

function createNoTripTemplate(filterType) {
  const filterMessage = FilterMessages[filterType];
  return `
  <p class="trip-events__msg">${filterMessage}</p>`;
}

export default class NoTripView extends AbstractView {
  #filterType;

  constructor ({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoTripTemplate(this.#filterType);
  }
}
