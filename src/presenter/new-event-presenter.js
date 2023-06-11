import { remove, render, RenderPosition } from '../framework/render.js';
import EventFormView from '../view/event-form-view.js';
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

    this.#eventFormComponent = new EventFormView({offers: this.#offers, destinations: this.#destinations, destinationsList: this.#destinationsList, onFormSubmit: this.#handleFormSubmit, onDeleteClick: this.#handleCancelClick});

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

  setSaving() {
    this.#eventFormComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#eventFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };
    this.#eventFormComponent.shake(resetFormState);
  }

  #handleFormSubmit = (trip) => {
    this.#handleDataChange(
      UserAction.ADD_TRIP,
      UpdateType.MINOR,
      trip);
    // this.destroy();
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
