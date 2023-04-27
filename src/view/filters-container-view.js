import { createElement } from '../render.js';

function createFiltersContainerTemplate() {
  return `<form class="trip-filters" action="#" method="get">              
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}

export default class FilterContainerView {
  getTemplate() {
    return createFiltersContainerTemplate();
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
