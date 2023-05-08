import { createElement } from '../render.js';
import dayjs from 'dayjs';

function getTotalPrice(trips) {
  const total = trips.reduce((acc, elem) => acc + Number(elem.price), 0);
  return total;
}

function sortTrips(trips) {
  const sortedTrips = trips.sort((trip1, trip2) =>
    dayjs(trip1['timeStart'].valueOf()) - dayjs(trip2['timeStart'].valueOf()));
  return sortedTrips;
}

function getDestinationsTrack(trips, destinations) {
  const sortedTrips = sortTrips(trips);
  const tripsDestinationsIds = sortedTrips.map(({destination}) => destination);
  const tripsDestinationsNames = [];
  tripsDestinationsIds.forEach((elem) => {
    destinations.forEach((item) => elem === item.id ? tripsDestinationsNames.push(item.name) : '');
  });
  return tripsDestinationsNames;
}

function createDestinationsTrackTemplate(trips, destinations) {
  const destinationsTrack = getDestinationsTrack(trips, destinations);

  if (destinationsTrack.length <= 3) {
    const array = destinationsTrack.slice(0, destinationsTrack.length - 1);
    return `<h1 class="trip-info__title"> 
    ${array.map((elem) => `${elem} &mdash; `).join('')}${destinationsTrack[destinationsTrack.length - 1]}</h1>`;
  }

  if (destinationsTrack.length > 3) {
    const array2 = destinationsTrack.slice(0, 1);

    return `<h1 class="trip-info__title"> 
    ${array2.map((elem) => `${elem} &mdash; `).join('')} &#8230; &mdash; ${destinationsTrack[destinationsTrack.length - 1]}</h1>`;
  }
}

function createTripInfoTemplate(trips, destinations) {
  const total = getTotalPrice(trips);
  const destinationsTrack = createDestinationsTrackTemplate(trips, destinations);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    ${destinationsTrack}  
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
  </p>
</section>`;
}

export default class TripInfoView {
  constructor({trips, destinations}) {
    this.trips = trips;
    this.destinations = destinations;
  }

  getTemplate() {
    return createTripInfoTemplate(this.trips, this.destinations);
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

