import { render, replace, remove } from '../framework/render.js';
import TripItemView from '../view/trip-item-view.js';
import EventFormView from '../view/event-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPresenter {
  #tripContainer;
  #tripComponent = null;
  #eventFormComponent = null;
  #trip;
  #offers;
  #destinations;
  #destinationsList;
  #handleDataChange;
  #handleModeChange;
  #mode = Mode.DEFAULT;

  constructor ({tripContainer, onDataChange, onModeChange}) {
    this.#tripContainer = tripContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init (trip, offers, destinations, destinationsList) {
    this.#trip = trip;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#destinationsList = destinationsList;
    const prevTripComponent = this.#tripComponent;
    const prevEventFormComponent = this.#eventFormComponent;

    this.#tripComponent = new TripItemView({trip: this.#trip, offers: this.#offers, destinations: this.#destinations, onEditClick: this.#handleEditClick, onFavoriteClick: this.#handleFavoriteClick});

    this.#eventFormComponent = new EventFormView({trip: this.#trip, offers: this.#offers, destinations: this.#destinations, destinationsList: this.#destinationsList, onRollUpBtnClick: this.#handleRollUpBtnClick, onFormSubmit: this.#handleFormSubmit});

    if (prevTripComponent === null || prevEventFormComponent === null) {
      render(this.#tripComponent, this.#tripContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripComponent, prevTripComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventFormComponent, prevEventFormComponent);
    }

    remove(prevTripComponent);
    remove(prevEventFormComponent);
  }

  destroy() {
    remove(this.#tripComponent);
    remove(this.#eventFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToTrip();
    }
  }

  #replaceTripToForm() {
    replace(this.#eventFormComponent, this.#tripComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToTrip() {
    replace(this.#tripComponent, this.#eventFormComponent);
    this.#mode = Mode.DEFAULT;
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

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#trip, isFavorite: !this.#trip.isFavorite}, this.#offers, this.#destinations, this.#destinationsList);
  };

  #handleFormSubmit = (trip) => {
    this.#handleDataChange(trip, this.#offers, this.#destinations, this.#destinationsList);
    this.#replaceFormToTrip();
  };
}
