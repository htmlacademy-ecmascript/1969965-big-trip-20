import { createElement } from '../render.js';

function createEventFormDestinationImagesTemplate() {
  return `<div class="event__photos-container">
  <div class="event__photos-tape">
  </div>
</div>`;
}

export default class EventFormDestinationImagesView {
  getTemplate() {
    return createEventFormDestinationImagesTemplate();
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

