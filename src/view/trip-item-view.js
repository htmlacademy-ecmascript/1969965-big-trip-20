import AbstractView from '../framework/view/abstract-view.js';
import { formatDate, findDifference, formatDifference } from '../utils/common.js';
import { DateFormat, FavoriteButtonStateClass } from '../constants.js';
import { getCurrentDestination, getOffers } from '../utils/trip.js';

function createTripOffersTemplate(offers) {
  return `<ul class="event__selected-offers">
          ${offers.map(({title, price}) => `<li class="event__offer">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
             </li>`).join('')}
          </ul>`;
}

function createTripItemTemplate(trip, off, destinations) {
  const {type, price, offers, destination, timeStart, timeEnd, isFavorite} = trip;
  const currentDestination = getCurrentDestination(destination, destinations);
  const {name} = currentDestination;
  const tripOffers = off.filter((elem) => elem.type === trip.type)[0].offers;
  const offersTemplate = createTripOffersTemplate(getOffers(tripOffers, offers));

  const favoriteClassName = isFavorite
    ? FavoriteButtonStateClass.ACTIVE
    : FavoriteButtonStateClass.INACTIVE;

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${formatDate(timeStart, DateFormat.YEAR_MONTH_DAY)}">${formatDate(timeStart, DateFormat.DAY_MONTH)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${formatDate(timeStart, DateFormat.YEAR_MONTH_DAY_TIME)}">${formatDate(timeStart, DateFormat.HOUR_MINUTES)}</time>
        &mdash;
        <time class="event__end-time" datetime="${formatDate(timeStart, DateFormat.HOUR_MINUTES)}">${formatDate(timeEnd, DateFormat.HOUR_MINUTES)}</time>
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

export default class TripItemView extends AbstractView {
  #trip;
  #offers;
  #destinations;
  #handleEditClick;
  #handleFavoriteClick;

  constructor({trip, offers, destinations, onEditClick, onFavoriteClick}) {
    super();
    this.#trip = trip;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-icon').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripItemTemplate(this.#trip, this.#offers, this.#destinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
