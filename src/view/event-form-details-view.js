import { createElement } from '../render.js';

function createEventFormDetailsTemplate() {
  return `<section class="event__details">
  </section>`;
}

export default class EventFormDetailsView {
  getTemplate() {
    return createEventFormDetailsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  getChildElement(idx) {
    return this.element.children[idx];
  }

  removeElement() {
    this.element = null;
  }
}

