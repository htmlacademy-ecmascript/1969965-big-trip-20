import { render, replace, remove } from '../framework/render.js';
import TripItemView from '../view/trip-item-view.js';
import EventFormView from '../view/event-form-view.js';

export default class TripPresenter {
  #tripContainer;
  #tripComponent = null;
  #eventFormComponent = null;
  #trip;
  #offers;
  #destinations;
  #destinationsList;

  constructor ({tripContainer}) {
    this.#tripContainer = tripContainer;
  }

  init (trip, offers, destinations, destinationsList) {
    this.#trip = trip;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#destinationsList = destinationsList;
    const prevTripComponent = this.#tripComponent;
    const prevEventFormComponent = this.#eventFormComponent;

    this.#tripComponent = new TripItemView({trip: this.#trip, offers: this.#offers, destinations: this.#destinations, onEditClick: this.#handleEditClick});

    this.#eventFormComponent = new EventFormView({trip: this.#trip, offers: this.#offers, destinations: this.#destinations, destinationsList: this.#destinationsList, onRollUpBtnClick: this.#handleRollUpBtnClick});

    if (prevTripComponent === null || prevEventFormComponent === null) {
      render(this.#tripComponent, this.#tripContainer);
      return;
    }

    if (this.#tripContainer.contains(prevTripComponent.element)) {
      replace(this.#tripComponent, prevTripComponent);
    }

    if (this.#tripContainer.contains(prevEventFormComponent.element)) {
      replace(this.#eventFormComponent, prevEventFormComponent);
    }

    remove(prevTripComponent);
    remove(prevEventFormComponent);
  }

  destroy() {
    remove(this.#tripComponent);
    remove(this.#eventFormComponent);
  }

  #replaceTripToForm() {
    replace(this.#eventFormComponent, this.#tripComponent);
  }

  #replaceFormToTrip() {
    replace(this.#tripComponent, this.#eventFormComponent);
  }

  #handleEditClick = () => {
    this.#replaceTripToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleRollUpBtnClick = () => {
    this.#replaceFormToTrip();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToTrip();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
