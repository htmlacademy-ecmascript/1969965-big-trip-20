import { UpdateType } from '../constants.js';
import Observable from '../framework/observable.js';
export default class TripsModel extends Observable {
  #tripsApiService;
  #trips = [];
  #offers = [];
  #destinations = [];
  #destinationsList = [];

  constructor({tripsApiService}) {
    super();
    this.#tripsApiService = tripsApiService;
  }

  async init() {
    try {
      const trips = await this.#tripsApiService.trips;
      const offers = await this.#tripsApiService.offers;
      const destinations = await this.#tripsApiService.destinations;
      this.#trips = trips.map(this.#adaptTripToClient);
      this.#offers = offers;
      this.#destinations = destinations.map(this.#adaptDestinationToClient);
      this.#destinationsList = this.#destinations.map(({name}) => name);
    } catch(err) {
      this.#destinations = [];
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  }

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

  async updateTrip(updateType, update) {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if(index === -1) {
      throw new Error('Can\'t update unexisting trip');
    }
    try {
      const response = await this.#tripsApiService.updateTrip(update);
      const updatedTrip = this.#adaptTripToClient(response);
      this.#trips = [...this.#trips.slice(0, index), updatedTrip, ...this.#trips.slice(index + 1)];
      this._notify(updateType, updatedTrip);
    } catch(err) {
      throw new Error('Can\'t update task');
    }
  }

  addTrip(updateType, update) {
    this.#trips = [
      update,
      ...this.#trips,
    ];

    this._notify(updateType, update);
  }

  deleteTrip(updateType, update) {
    const index = this.#trips.findIndex((trip) => trip.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting trip');
    }

    this.#trips = [
      ...this.#trips.slice(0, index),
      ...this.#trips.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptTripToClient(trip) {
    const adaptedTrip = {...trip,
      price: trip['base_price'],
      timeStart: trip['date_from'],
      timeEnd: trip['date_to'],
      isFavorite: trip['is_favorite']
    };

    delete adaptedTrip['base_price'];
    delete adaptedTrip['date_from'];
    delete adaptedTrip['date_to'];
    delete adaptedTrip['is_favorite'];

    return adaptedTrip;
  }

  #adaptDestinationToClient(destination) {
    const adaptedDestination = {...destination,
      images: destination['pictures']
    };

    delete adaptedDestination['pictures'];

    return adaptedDestination;
  }
}
