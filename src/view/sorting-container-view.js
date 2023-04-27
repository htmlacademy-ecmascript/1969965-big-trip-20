import { createElement } from '../render.js';

function createSortingContainerTemplate() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
</form>`;
}

export default class SortingPanelView {
  getTemplate() {
    return createSortingContainerTemplate();
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
