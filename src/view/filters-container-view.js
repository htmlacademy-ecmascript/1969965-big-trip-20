import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { turnFirstCharToUppercase } from '../utils/common.js';

function createFiltersContainerTemplate(filterItems) {
  const filters = Object.values(filterItems);
  const filterItemsTemplate = filters.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');
  return `<form class="trip-filters" action="#" method="get">
            ${filterItemsTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

function createFilterItemTemplate(filter) {

  return `
  <div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === 'everything' ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${turnFirstCharToUppercase(filter)}</label>
  </div>`;
}

export default class FilterContainerView extends AbstractStatefulView {
  #filters;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersContainerTemplate(this.#filters);
  }
}
