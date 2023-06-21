import AbstractView from '../framework/view/abstract-view.js';
import { getTotalPrice, getDatesTrack, getDestinationsTrack } from '../utils/trip-info.js';

const MAX_TRIPS_COUNT = 3;

function createDestinationsTrackTemplate(trips, destinations) {
  const destinationsTrack = getDestinationsTrack(trips, destinations);

  if (destinationsTrack.length <= MAX_TRIPS_COUNT) {
    const array = destinationsTrack.slice(0, destinationsTrack.length - 1);
    return `<h1 class="trip-info__title">
    ${array.map((elem) => `${elem} &mdash; `).join('')}${destinationsTrack[destinationsTrack.length - 1]}</h1>`;
  }

  if (destinationsTrack.length > MAX_TRIPS_COUNT) {
    const array2 = destinationsTrack.slice(0, 1);

    return `<h1 class="trip-info__title">
    ${array2.map((elem) => `${elem} &mdash; `).join('')} &#8230; &mdash; ${destinationsTrack[destinationsTrack.length - 1]}</h1>`;
  }
}

function createTripInfoTemplate(trips, offers, destinations) {
  if(trips.length === 0) {
    return;
  }
  const total = getTotalPrice(trips, offers);
  const destinationsTrack = createDestinationsTrackTemplate(trips, destinations);
  const {startDate, endDate} = getDatesTrack(trips);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    ${destinationsTrack}
      <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
  </p>
</section>`;
}

export default class TripInfoView extends AbstractView {
  #trips;
  #destinations;
  #offers;

  constructor({trips, offers, destinations}) {
    super();
    this.#trips = trips;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#trips, this.#offers, this.#destinations);
  }
}

