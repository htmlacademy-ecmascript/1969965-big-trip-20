import { createElement } from '../render.js';

function createEventFormOfferItemTemplate() {
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
  <label class="event__offer-label" for="event-offer-luggage-1">
    <span class="event__offer-title">Add luggage</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">30</span>
  </label>
</div>`;
}

export default class EventFormOfferItemView {
  getTemplate() {
    return createEventFormOfferItemTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

