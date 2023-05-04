import { createElement } from '../render.js';

function createEventFormTemplate() {
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  </form>
</li>`;
}

export default class EventFormView {
  getTemplate() {
    return createEventFormTemplate();
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

