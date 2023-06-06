import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { turnFirstCharToUppercase } from '../utils/common.js';

function createFiltersContainerTemplate(filterItems) {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');
  return `<form class="trip-filters" action="#" method="get">
            ${filterItemsTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

function createFilterItemTemplate(filter) {
  const {type} = filter;

  return `
  <div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
    <label class="trip-filters__filter-label" for="filter-${type}">${turnFirstCharToUppercase(type)}</label>
  </div>`;
}

export default class FilterContainerView extends AbstractStatefulView {
  #filters;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersContainerTemplate(this.#filters);
  }
}
