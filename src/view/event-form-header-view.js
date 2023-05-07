import { createElement } from '../render.js';
import { turnFirstCharToUppercase } from '../utils.js';
import { TRIP_TYPES, DATE_FORMATS } from '../constants.js';
import { formatDate } from '../utils.js';

function createEventTypeItemTemplate(types) {
  return `<div class="event__type-list">
            <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${types.map(({type}) =>
    `<div class="event__type-item">
                <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
                <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${turnFirstCharToUppercase(type)}</label>
              </div>`).join('')}
            </fieldset>
          </div>`;
}

function createDestinationsListTemplate(destinationsList) {
  return `<datalist id="destination-list-1">
  ${destinationsList.map((elem) => `<option value="${elem}"></option>`).join('')}
</datalist>`;
}

function createEventFormHeaderTemplate(eventTypes, destinationsList, trip, destinations) {
  const {destination, timeStart, timeEnd, type, price} = trip;
  const eventTypesTemplate = createEventTypeItemTemplate(eventTypes);
  const destinationsListTemplate = createDestinationsListTemplate(destinationsList);
  const currentDestination = destinations.filter((elem) => elem.id === destination);
  const {name} = currentDestination[0];

  return `<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
    ${eventTypesTemplate}
  </div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${turnFirstCharToUppercase(type)}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
    ${destinationsListTemplate}
  </div>

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(timeStart, DATE_FORMATS.DAY_MONTH_YEAR_TIME_SLASHED)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(timeEnd, DATE_FORMATS.DAY_MONTH_YEAR_TIME_SLASHED)}">
  </div>

  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
  </div>

  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Cancel</button>
</header>`;
}

export default class EventFormHeaderView {
  constructor({destinationsList, trip, destinations}) {
    this.destinationsList = destinationsList;
    this.trip = trip;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEventFormHeaderTemplate(TRIP_TYPES, this.destinationsList, this.trip, this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

