import { createElement } from '../render.js';

function createEventFormOffersTemplate() {
  return `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  </div>
</section>`;
}

export default class EventFormOffersView {
  getTemplate() {
    return createEventFormOffersTemplate();
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

