import { render } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import { RenderPosition } from '../framework/render.js';
export default class TripInfoPresenter {
  #infoContainer;
  #tripsModel;
  #trips;
  #destinations;

  constructor({infoContainer, tripsModel}) {
    this.#infoContainer = infoContainer;
    this.#tripsModel = tripsModel;
  }

  init() {
    this.#trips = [...this.#tripsModel.trips];
    this.#destinations = [...this.#tripsModel.destinations];

    render(new TripInfoView({trips: this.#trips, destinations: this.#destinations}), this.#infoContainer, RenderPosition.AFTERBEGIN);
  }
}
