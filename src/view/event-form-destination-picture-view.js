import { createElement } from '../render.js';

function createEventFormDestinationPictureTemplate(trip, destinations) {
  const {destination} = trip;
  const currentDestination = destinations.filter((elem) => elem.id === destination);
  const images = currentDestination[0].images;

  return `${images.map(({src, description}) => `<img class="event__photo" src="${src}"
  alt="${description}"></img>`).join('')}`;
}

export default class EventFormDestinationPictureView {
  constructor({trip, destinations}) {
    this.trip = trip;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEventFormDestinationPictureTemplate(this.trip, this.destinations);
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

