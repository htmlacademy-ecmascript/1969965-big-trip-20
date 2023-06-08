import { getRandomTrip } from '../mock/mock-trips.js';
import { getMockOffers } from '../mock/mock-offers.js';
import { getMockDestinations } from '../mock/mock-destinations.js';
import { TRIP_COUNT } from '../constants.js';
import Observable from '../framework/observable.js';
export default class TripsModel extends Observable {

  #trips = Array.from({length: TRIP_COUNT}, getRandomTrip);
  #offers = getMockOffers();
  #destinations = getMockDestinations();
  #destinationsList = this.#destinations.map(({name}) => name);

  get trips() {
    return this.#trips;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get destinationsList() {
    return this.#destinationsList;
  }
}
