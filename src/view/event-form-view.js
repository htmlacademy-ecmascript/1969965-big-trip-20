import AbstractView from '../framework/view/abstract-view';
import { turnFirstCharToUppercase } from '../utils.js';
import { tripTypes, DateFormats } from '../constants.js';
import { formatDate } from '../utils.js';

function createEventTypeItemTemplate(types) {
  return `<div class="event__type-list">
            <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${types.map((type) =>
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

function createEventFormHeaderTemplate(eventTypes, destinationsList, destinations, destination, type, timeEnd, timeStart, price) {
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
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(timeStart, DateFormats.DAY_MONTH_YEAR_TIME_SLASHED)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate (timeEnd, DateFormats.DAY_MONTH_YEAR_TIME_SLASHED)}">
       </div>

       <div class="event__field-group  event__field-group--price">
       <label class="event__label" for="event-price-1">
         <span class="visually-hidden">Price</span>
         &euro;
       </label>
       <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
     </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>`;
}

function createEventFormOfferItemTemplate(offers, trip) {
  const currentOffers = offers.filter((elem) => elem.type === trip.type);

  return `<div class="event__available-offers">
    ${currentOffers[0].offers.map(({title, price, id}) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" checked>
  <label class="event__offer-label" for="event-offer-${id}-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`).join('')} </div>`;
}

function createEventFormDescriptionTemplate(destinations, destination) {
  const currentDestination = destinations.filter((elem) => elem.id === destination);
  const description = currentDestination[0].description;
  const descriptionImagesTemplate = createEventFormDestinationPictureTemplate(destination, destinations);

  return `<section class="event__section  event__section--destination">
           <h3 class="event__section-title  event__section-title--destination">Destination</h3>
           <p class="event__destination-description">${description}</p>
            ${descriptionImagesTemplate}
          </section>`;
}

function createEventFormDestinationPictureTemplate(destination, destinations) {
  const currentDestination = destinations.filter((elem) => elem.id === destination);
  const images = currentDestination[0].images;

  return `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${images.map(({src, description}) => `<img class="event__photo" src="${src}"
            alt="${description}"></img>`).join('')}</div>
          </div>`;
}

function createEventFormTemplate(eventTypes, destinationsList, trip, destinations, offers) {
  const {destination, timeStart, timeEnd, type, price} = trip;
  const headerTemplate = createEventFormHeaderTemplate(eventTypes, destinationsList, destinations, destination, type, timeEnd, timeStart, price);
  const offersTemplate = createEventFormOfferItemTemplate(offers, trip);
  const descriptionTemplate = createEventFormDescriptionTemplate(destinations, destination);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    ${headerTemplate}

    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        ${offersTemplate}
      </section>
        ${descriptionTemplate}
    </section>
  </form>
</li>`;
}

export default class EventFormView extends AbstractView {
  #destinationsList;
  #trip;
  #destinations;
  #offers;
  #handleFormSubmit;
  #handleFormClick;

  constructor({destinationsList, trip, destinations, offers, onFormSubmit, onRollUpBtnClick}) {
    super();
    this.#destinationsList = destinationsList;
    this.#trip = trip;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClick = onRollUpBtnClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpBtnHandler);
    this.element.querySelector('.event.event--edit').addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEventFormTemplate(tripTypes, this.#destinationsList, this.#trip, this.#destinations, this.#offers);
  }

  #rollUpBtnHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#trip, this.#offers, this.#destinations, this.#destinationsList);
  };
}
