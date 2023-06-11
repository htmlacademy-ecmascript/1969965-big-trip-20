import { sortTrips } from './sorting.js';
import { formatDate } from './common.js';
import { DateFormats } from '../constants.js';
import dayjs from 'dayjs';

function getOffersPrices(offers, offersIds) {
  const arr = [];
  offers.forEach((item) => {
    offersIds.forEach((elem) => {
      if (item.id === elem) {
        arr.push(item.price);
      }
    });
  });
  return arr;
}

function getTotalPrice(trips, offers) {
  const totalOffers = getTotalOffersPrice(trips, offers);
  const totalTrips = trips.reduce((acc, elem) => acc + Number(elem.price), 0);
  return totalOffers + totalTrips;
}

function getTotalOffersPrice(trips, offers) {
  const offersList = offers.map((offer) => offer.offers).flat();
  const offersIds = trips.map((trip) => trip.offers).flat();
  const prices = getOffersPrices(offersList, offersIds);
  const total = prices.reduce((acc, elem) => acc + elem, 0);
  return total;
}

function getDatesTrack(trips) {
  const sortedTrips = sortTrips(trips);
  const startDate = formatDate(sortedTrips[0].timeStart, DateFormats.MONTH_DAY);
  let endDate = null;
  if (dayjs(sortedTrips[0].timeStart).month() === dayjs(sortedTrips[sortedTrips.length - 1].timeEnd).month()){
    endDate = formatDate(sortedTrips[sortedTrips.length - 1].timeEnd, DateFormats.DAY);
  } else {
    endDate = formatDate(sortedTrips[sortedTrips.length - 1].timeEnd, DateFormats.MONTH_DAY);
  }

  return {startDate, endDate};
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

export { getOffersPrices, getTotalPrice, getTotalOffersPrice, getDatesTrack, getDestinationsTrack };

