import { render } from '../render.js';
import TripInfoView from '../view/trip-info-view.js';
import { RenderPosition } from '../render.js';

export default class TripInfoPresenter {
  constructor({infoContainer, tripsModel}) {
    this.infoContainer = infoContainer;
    this.tripsModel = tripsModel;
  }

  init() {
    this.trips = [...this.tripsModel.getTrips()];
    this.destinations = [...this.tripsModel.getDestinations()];

    render(new TripInfoView({trips: this.trips, destinations: this.destinations}), this.infoContainer, RenderPosition.AFTERBEGIN);
  }
}
