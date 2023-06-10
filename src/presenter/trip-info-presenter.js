import { render } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import { RenderPosition } from '../framework/render.js';
export default class TripInfoPresenter {
  #infoContainer;
  #tripsModel;

  constructor({infoContainer, tripsModel}) {
    this.#infoContainer = infoContainer;
    this.#tripsModel = tripsModel;
  }

  get trips() {
    const trips = this.#tripsModel.trips;
    return trips;
  }

  get destinations() {
    const destinations = this.#tripsModel.destinations;
    return destinations;
  }

  init() {
    this.#renderTripInfo();
  }

  #renderTripInfo() {

    if (this.trips.length < 1) {
      return;
    }

    render(new TripInfoView({trips: this.trips, destinations: this.destinations}), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }
}
