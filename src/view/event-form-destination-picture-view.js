import { createElement } from '../render.js';

function createEventFormDestinationPictureTemplate() {
  return `<img class="event__photo" src="img/photos/1.jpg" 
  alt="Event photo">`;
}

export default class EventFormDestinationPictureView {
  getTemplate() {
    return createEventFormDestinationPictureTemplate();
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

