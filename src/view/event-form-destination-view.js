import { createElement } from '../render.js';

function createEventFormDestinationTemplate(trip, destinations) {
  const {destination} = trip;
  const currentDestination = destinations.filter((elem) => elem.id === destination);
  const description = currentDestination[0].description;

  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
</section>`;
}

export default class EventFormDestinationView {
  constructor({trip, destinations}) {
    this.trip = trip;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEventFormDestinationTemplate(this.trip, this.destinations);
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

