import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { turnFirstCharToUppercase } from '../utils/common.js';
import { tripTypes, DateFormats } from '../constants.js';
import { formatDate } from '../utils/common.js';
import { getBlankEventFormData } from '../constants.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { getCurrentDestination, isItemChecked, getCurrentOffers, isDestinationCorrect } from '../utils/trip.js';

function createEventFormTemplate(eventTypes, destinationsList, trip, destinations, offers) {
  const {destination, timeStart, timeEnd, type, price, isNameExists, isPriceExists} = trip;

  const headerTemplate = createEventFormHeaderTemplate(eventTypes, destinationsList, destinations, destination, type, timeEnd, timeStart, price, isNameExists, isPriceExists);
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
                ${destination !== '' ? descriptionTemplate : ''}
              </section>
            </form>
         </li>`;
}

function createEventFormHeaderTemplate(eventTypes, destinationsList, destinations, destination, type, timeEnd, timeStart, price, isNameExists, isPriceExists) {
  const eventTypesTemplate = createEventTypeItemTemplate(eventTypes);
  const destinationsListTemplate = createDestinationsListTemplate(destinationsList);

  const currentDestination = getCurrentDestination(destination, destinations);
  const {name} = currentDestination;
  const isSubmitBtnDisabled = !isNameExists || !isPriceExists;

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1" required>
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
       <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" name="event-price" value="${price}" required>
     </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitBtnDisabled ? 'disabled' : ''}>Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>`;
}

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

function createEventFormOfferItemTemplate(offers, trip) {
  const currentOffers = getCurrentOffers(offers, trip);
  const chosenOffers = trip.offers;

  return `<div class="event__available-offers">
    ${currentOffers.offers.map(({title, price, id}) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${trip.type}" ${isItemChecked(id, chosenOffers)}>
  <label class="event__offer-label" for="event-offer-${id}">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`).join('')} </div>`;
}

function createEventFormDescriptionTemplate(destinations, destination) {
  const currentDestination = getCurrentDestination(destination, destinations);
  const {description} = currentDestination;
  const descriptionImagesTemplate = createEventFormDestinationPictureTemplate(destination, destinations);

  return `<section class="event__section  event__section--destination">
           <h3 class="event__section-title  event__section-title--destination">Destination</h3>
           <p class="event__destination-description">${description}</p>
            ${descriptionImagesTemplate}
          </section>`;
}

function createEventFormDestinationPictureTemplate(destination, destinations) {
  const currentDestination = getCurrentDestination(destination, destinations);
  const {images} = currentDestination;

  return `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${images.map(({src, description}) => `<img class="event__photo" src="${src}"
            alt="${description}"></img>`).join('')}</div>
          </div>`;
}

export default class EventFormView extends AbstractStatefulView {
  #destinationsList;
  #destinations;
  #offers;
  #handleFormSubmit;
  #handleFormClick;
  #handleDeleteClick;
  #datepickerStart;
  #datepickerEnd;

  constructor({destinationsList, trip = getBlankEventFormData(), destinations, offers, onFormSubmit, onRollUpBtnClick, onDeleteClick, onCancelClick}) {
    super();
    this.#destinationsList = destinationsList;
    this._setState(EventFormView.parseTripToState(trip));
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClick = onRollUpBtnClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleDeleteClick = onCancelClick;
    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  get template() {
    return createEventFormTemplate(tripTypes, this.#destinationsList, this._state, this.#destinations, this.#offers);
  }

  reset(trip) {
    this.updateElement(
      EventFormView.parseTripToState(trip),
    );
  }

  #startDateChangeHandler = ([userStartDate]) => {
    this.updateElement({
      timeStart: userStartDate
    });
  };

  #endDateChangeHandler = ([userEndDate]) => {
    this.updateElement({
      timeEnd: userEndDate
    });
  };

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpBtnHandler);
    this.element.querySelector('.event.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#eventTypeListHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerCheckHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceInputHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.#setDatepicker();
  }

  #rollUpBtnHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventFormView.parseStateToTrip(this._state), this.#offers, this.#destinations, this.#destinationsList);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EventFormView.parseStateToTrip(this._state));
  };

  #eventTypeListHandler = (evt) => {
    if (evt.target.matches('.event__type-input')){
      this.updateElement({
        type: evt.target.value,
      });
    }
  };

  #offerCheckHandler = (evt) => {
    const checkElements = this.element.querySelectorAll('.event__offer-checkbox');
    if (evt.target.matches('.event__offer-checkbox')) {
      const offers = [];
      checkElements.forEach((offer) => offer.checked ? offers.push(Number(offer.id.slice(12))) : '');
      this._setState({
        offers: offers,
      });
    }
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    const destination = evt.target.value;
    let destinationId = '';

    if (isDestinationCorrect(this.#destinations, destination)) {
      const destinationList = this.#destinations.filter((elem) => destination === elem.name)[0];
      destinationId = destinationList.id;
    }

    this.updateElement({
      destination: destinationId,
      isNameExists: destinationId !== ''
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      price: evt.target.value,
      isPriceExists: evt.target.value !== ''
    });
  };

  #setDatepicker() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        defaultDate: this._state.timeStart,
        onChange: this.#startDateChangeHandler,
        enableTime: true,
        dateFormat: 'd-m-Y H:i',
      },
    );

    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        defaultDate: this._state.timeEnd,
        onChange: this.#endDateChangeHandler,
        enableTime: true,
        dateFormat: 'd-m-Y H:i',
        minDate: this.element.querySelector('#event-start-time-1').value
      },
    );
  }

  static parseTripToState(trip) {
    return {...trip, isNameExists: trip.destination !== '', isPriceExists: trip.price !== ''};
  }

  static parseStateToTrip(state) {
    const trip = {...state};
    delete trip.isNameExists;
    delete trip.isPriceExists;
    return trip;
  }
}
