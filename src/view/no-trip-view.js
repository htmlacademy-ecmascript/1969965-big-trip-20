import AbstractView from '../framework/view/abstract-view';

const FilterMessages = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

function createNoTripTemplate(filterType) {
  return `
  <p class="trip-events__msg">${getFilterMessage(filterType)}</p>`;
}

function getFilterMessage(filterType) {
  return FilterMessages[filterType];
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
