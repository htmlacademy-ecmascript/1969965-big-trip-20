import { render } from '../framework/render.js';
import { updateItem } from '../utils.js';
import TripListView from '../view/trip-list-view.js';
import TripPresenter from './trip-presenter.js';

export default class TripListPresenter {
  #tripListContainer;
  #tripsModel;
  #trips;
  #offers;
  #destinations;
  #destinationsList;
  #tripListComponent;
  #tripPresenters = new Map();

  constructor({tripListContainer, tripsModel}) {
    this.#tripListContainer = tripListContainer;
    this.#tripsModel = tripsModel;
  }

  init() {
    this.#tripListComponent = new TripListView();
    this.#trips = [...this.#tripsModel.trips];
    this.#offers = [...this.#tripsModel.offers];
    this.#destinations = [...this.#tripsModel.destinations];
    this.#destinationsList = [...this.#tripsModel.destinationsList];

    render(this.#tripListComponent, this.#tripListContainer);

    for (let i = 0; i < this.#trips.length; i++) {
      this.#renderTrip(this.#trips[i], this.#offers, this.#destinations, this.#destinationsList);
    }
  }

  #renderTrip(trip, offers, destinations, destinationsList) {
    const tripPresenter = new TripPresenter({tripContainer: this.#tripListComponent.element});
    tripPresenter.init(trip, offers, destinations, destinationsList);
    this.#tripPresenters.set(trip.id, tripPresenter);
  }

  #clearTripList() {
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPresenters.clear();
  }

  #handleTripChange = (updatedTrip) => {
    this.#trips = updateItem(this.#trips, updatedTrip);
    this.#tripPresenters.get(updatedTrip.id).init(updatedTrip);
  };
}

