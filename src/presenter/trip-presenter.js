import { render, replace } from '../framework/render.js';
import TripItemView from '../view/trip-item-view.js';
import EventFormView from '../view/event-form-view.js';

export default class TripPresenter {
  #tripContainer = null;
  #tripComponent;
  #eventFormComponent;
  #trip;
  #offers;
  #destinations;
  #destinationsList;

  contructor ({tripContainer}) {
    this.#tripContainer = tripContainer;
  }

  init (trip, offers, destinations, destinationsList) {
    this.#trip = trip;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#destinationsList = destinationsList;

    this.#tripComponent = new TripItemView({trip: this.#trip, offers: this.#offers, destinations: this.#destinations, onEditClick: this.#handleEditClick});

    this.#eventFormComponent = new EventFormView({trip: this.#trip, offers: this.#offers, destinations: this.#destinations, destinationsList: this.#destinationsList, onRollUpBtnClick: this.#handleRollUpBtnClick});

    render(this.#tripComponent, this.#tripContainer);
  }

  #replaceTripToForm() {
    replace(this.#eventFormComponent, this.#tripComponent);
  }

  #replaceFormToTrip() {
    replace(this.#tripComponent, this.#eventFormComponent);
  }

  #handleEditClick() {
    this.#replaceTripToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleRollUpBtnClick() {
    this.#replaceFormToTrip();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToTrip();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }
}
