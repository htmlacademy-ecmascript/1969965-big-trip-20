import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../constants.js';

const FilterMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
  ['ERROR']: 'Ooops! Something went wrong, try again later...'
};

function createNoTripTemplate(filterType) {
  const filterMessage = FilterMessage[filterType];
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
