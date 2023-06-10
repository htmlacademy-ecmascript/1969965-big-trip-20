import AbstractView from '../framework/view/abstract-view';

function createNewEventButtonTemplate() {
  return `
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
}

export default class newEventFormButtonView extends AbstractView {
  #handleClick;
  #destinations;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewEventButtonTemplate(this.#destinations);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
