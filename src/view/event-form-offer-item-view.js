import { createElement } from '../render.js';

function createEventFormOfferItemTemplate(offers, trip) {
  const currentOffers = offers.filter((elem) => elem.type === trip.type);

  return `<div class="event__available-offers">
    ${currentOffers[0].offers.map(({title, price, id}) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" checked>
  <label class="event__offer-label" for="event-offer-${id}-1">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
</div>`).join('')} </div>`;
}

export default class EventFormOfferItemView {
  constructor({offers, trip, destinations}) {
    this.offers = offers;
    this.trip = trip;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEventFormOfferItemTemplate(this.offers, this.trip, this.destinations);
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

