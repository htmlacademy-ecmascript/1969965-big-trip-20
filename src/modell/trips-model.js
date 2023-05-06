import { getRandomTrip } from '../mock/mock-trips.js';
import { getMockOffers } from '../mock/mock-offers.js';
import { getMockDestinations } from '../mock/mock-destinations.js';

const TRIP_COUNT = 3;

export default class TripsModel {
  trips = Array.from({length: TRIP_COUNT}, getRandomTrip);
  offers = getMockOffers();
  destinations = getMockDestinations();

  getTrips() {
    return this.trips;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
