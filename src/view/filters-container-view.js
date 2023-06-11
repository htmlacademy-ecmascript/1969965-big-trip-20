import AbstractView from '../framework/view/abstract-view.js';
import { turnFirstCharToUppercase } from '../utils/common.js';

function createFiltersContainerTemplate(filterItems, currentFilterType, trips) {
  const filters = Object.values(filterItems);
  const filterItemsTemplate = filters.map((filter) => createFilterItemTemplate(filter, currentFilterType, trips)).join('');
  return `<form class="trip-filters" action="#" method="get">
            ${filterItemsTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

function createFilterItemTemplate(filter, currentFilterType) {
  return `
  <div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${turnFirstCharToUppercase(filter)}</label>
  </div>`;
}

export default class FilterContainerView extends AbstractView {
  #filters;
  #currentFilter;
  #handleFilterTypeChange;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersContainerTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
