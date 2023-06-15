import TripInfoView from '../view/trip-info-view.js';
import { render, replace, remove, RenderPosition } from '../framework/render.js';

export default class TripInfoPresenter {
  #infoContainer;
  #tripsModel;
  #tripInfoComponent = null;

  constructor({infoContainer, tripsModel}) {
    this.#infoContainer = infoContainer;
    this.#tripsModel = tripsModel;
    this.#tripsModel.addObserver(this.#handleModelEvent);
  }

  get trips() {
    return this.#tripsModel.trips;
  }

  get offers() {
    return this.#tripsModel.offers;
  }

  get destinations() {
    return this.#tripsModel.destinations;
  }

  init() {
    if (this.destinations.length === 0) {
      return;
    }

    const prevInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView({
      trips: this.trips,
      destinations: this.destinations,
      offers: this.offers
    });

    if (prevInfoComponent === null) {
      this.#renderTripInfo();
      return;
    }

    replace(this.#tripInfoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  #renderTripInfo() {
    if (this.trips.length < 1) {
      return;
    }

    render(this.#tripInfoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
