import { createElement } from '../render.js';
import { formatDate, findDifference, formatDifference } from '../utils.js';
import { DATE_FORMATS, FAVOURITE_BTN_STATE_CLASS } from '../constants.js';

function createTripOffersTemplate(offers) {
  return `<ul class="event__selected-offers">
          ${offers.map(({title, price}) => `<li class="event__offer">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
             </li>`)}
          </ul>`;
}

function createTripItemTemplate(trip, off, destinations) {
  const {type, price, offers, destination, timeStart, timeEnd, isFavorite} = trip;

  const tripOffers = off.filter((elem) => elem.type === trip.type)[0].offers;

  const chosenOffers = tripOffers.filter((item) => {
    for (const elem of offers) {
      return item.id === elem;
    }
  });

  const currentDestination = destinations.filter((elem) => elem.id === destination);
  const cityName = currentDestination[0].name;
  const offersTemplate = createTripOffersTemplate(chosenOffers);

  console.log(isFavorite);
  
  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${formatDate(timeStart, DATE_FORMATS.YEAR_MONTH_DAY)}">${formatDate(timeStart, DATE_FORMATS.DAY_MONTH)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${cityName}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${formatDate(timeStart, DATE_FORMATS.YEAR_MONTH_DAY_TIME)}">${formatDate(timeStart, DATE_FORMATS.HOUR_MINUTES)}</time>
        &mdash;
        <time class="event__end-time" datetime="${formatDate(timeStart, DATE_FORMATS.HOUR_MINUTES)}">${formatDate(timeEnd, DATE_FORMATS.HOUR_MINUTES)}</time>
      </p>
      <p class="event__duration">${formatDifference(findDifference(timeEnd, timeStart))}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
      ${offersTemplate}
    <button class="${favoriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export default class TripItemView {
  constructor({trip, offers, destinations}) {
    this.trip = trip;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createTripItemTemplate(this.trip, this.offers, this.destinations);
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
