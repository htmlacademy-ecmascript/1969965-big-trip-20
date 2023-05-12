import { render, replace } from '../framework/render.js';
import TripListView from '../view/trip-list-view.js';
import TripItemView from '../view/trip-item-view.js';
import EventFormView from '../view/event-form-view.js';

export default class TripListPresenter {
  #tripListContainer;
  #tripsModel;
  #trips;
  #offers;
  #destinations;
  #destinationsList;
  #tripListComponent = new TripListView();

  constructor({tripListContainer, tripsModel}) {
    this.#tripListContainer = tripListContainer;
    this.#tripsModel = tripsModel;
  }

  init() {
    this.#trips = [...this.#tripsModel.trips];
    this.#offers = [...this.#tripsModel.offers];
    this.#destinations = [...this.#tripsModel.destinations];
    this.#destinationsList = [...this.#tripsModel.destinationsList];

    render(this.#tripListComponent, this.#tripListContainer);

    for (let i = 1; i < this.#trips.length; i++) {
      this.#renderTrips(this.#trips[i], this.#offers, this.#destinations, this.#destinationsList);
    }
  }

  #renderTrips(trip, offers, destinations, destinationsList) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToTrip();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripComponent = new TripItemView({trip, offers, destinations, onEditClick: () => {
      replaceTripToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }});
    const eventFormComponent = new EventFormView({trip, offers, destinations, destinationsList, onRollUpBtnClick: () => {
      replaceFormToTrip();
      document.removeEventListener('keydown', escKeyDownHandler);
    }});

    render(tripComponent, this.#tripListComponent.element);

    function replaceTripToForm() {
      replace(eventFormComponent, tripComponent);
    }

    function replaceFormToTrip() {
      replace(tripComponent, eventFormComponent);
    }
  }
}

