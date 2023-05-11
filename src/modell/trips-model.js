import { getRandomTrip } from '../mock/mock-trips.js';
import { getMockOffers } from '../mock/mock-offers.js';
import { getMockDestinations } from '../mock/mock-destinations.js';
import { TRIP_COUNT } from '../constants.js';

export default class TripsModel {
  trips = Array.from({length: TRIP_COUNT}, getRandomTrip);
  offers = getMockOffers();
  destinations = getMockDestinations();
  destinationsList = this.destinations.map(({name}) => name);

  getTrips() {
    return this.trips;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }

  getDestinationsList() {
    return this.destinationsList;
  }
}
