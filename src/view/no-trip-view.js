import AbstractView from '../framework/view/abstract-view';

const filterMessages = {
  'Everything': 'Click New Event to create your first point',
  'Past': 'There are no past events now',
  'Present': 'There are no present events now',
  'Future': 'There are no future events now',
};

function createNoTripTemplate(filterType) {
  return `
  <p class="trip-events__msg">${getFilterMessage(filterType)}</p>`;
}

function getFilterMessage(filterType) {
  return filterMessages[filterType];
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
