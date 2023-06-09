import { remove, render, RenderPosition } from '../framework/render.js';
import EventFormView from '../view/event-form-view.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../constants.js';

export default class NewEventFormPresenter {
  #tripListContainer;
  #handleDataChange;
  #handleDestroy;
  #eventFormComponent = null;
  #offers;
  #destinations;
  #destinationsList;

  constructor({tripListContainer, onDataChange, onDestroy}) {
    this.#tripListContainer = tripListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(offers, destinations, destinationsList) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#destinationsList = destinationsList;

    if (this.#eventFormComponent !== null) {
      return;
    }

    this.#eventFormComponent = new EventFormView({offers: this.#offers, destinations: this.#destinations, destinationsList: this.#destinationsList, onFormSubmit: this.#handleFormSubmit, onCancelClick: this.#handleCancelClick});

    render(this.#eventFormComponent, this.#tripListContainer.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventFormComponent);
    this.#eventFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (trip) => {
    this.#handleDataChange(UserAction.ADD_TRIP, UpdateType.MINOR, {...trip, id: nanoid()});
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
