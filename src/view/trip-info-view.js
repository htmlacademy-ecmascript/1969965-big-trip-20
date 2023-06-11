import AbstractView from '../framework/view/abstract-view';
import { getTotalPrice, getDatesTrack, getDestinationsTrack } from '../utils/trip-info.js';
// function getOffersPrices(offers, offersIds) {
//   const arr = [];
//   offers.forEach((item) => {
//     offersIds.forEach((elem) => {
//       if (item.id === elem) {
//         arr.push(item.price);
//       }
//     });
//   });
//   return arr;
// }

// function getTotalPrice(trips, offers) {
//   const totalOffers = getTotalOffersPrice(trips, offers);
//   const totalTrips = trips.reduce((acc, elem) => acc + Number(elem.price), 0);
//   return totalOffers + totalTrips;
// }

// function getTotalOffersPrice(trips, offers) {
//   console.log(offers);
//   const offersList = offers.map((offer) => offer.offers).flat();
//   const offersIds = trips.map((trip) => trip.offers).flat();
//   const prices = getOffersPrices(offersList, offersIds);
//   const total = prices.reduce((acc, elem) => acc + elem, 0);
//   return total;
// }

// function getDatesTrack(trips) {
//   const sortedTrips = sortTrips(trips);
//   const startDate = formatDate(sortedTrips[0].timeStart, DateFormats.MONTH_DAY);
//   let endDate = null;
//   if (dayjs(sortedTrips[0].timeStart).month() === dayjs(sortedTrips[sortedTrips.length - 1].timeEnd).month()){
//     endDate = formatDate(sortedTrips[sortedTrips.length - 1].timeEnd, DateFormats.DAY);
//   } else {
//     endDate = formatDate(sortedTrips[sortedTrips.length - 1].timeEnd, DateFormats.MONTH_DAY);
//   }

//   return {startDate, endDate};
// }

// function getDestinationsTrack(trips, destinations) {
//   const sortedTrips = sortTrips(trips);
//   const tripsDestinationsIds = sortedTrips.map(({destination}) => destination);
//   const tripsDestinationsNames = [];
//   tripsDestinationsIds.forEach((elem) => {
//     destinations.forEach((item) => elem === item.id ? tripsDestinationsNames.push(item.name) : '');
//   });
//   return tripsDestinationsNames;
// }

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

function createTripInfoTemplate(trips, offers, destinations) {
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

