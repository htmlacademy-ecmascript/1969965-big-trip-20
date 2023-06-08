import FilterContainerView from '../view/filters-container-view.js';
import { render } from '../framework/render.js';
import { FilterTypes } from '../constants.js';
export default class FiltersPresenter {
  #filtersContainer;
  #tripsModel;
  #filterModel;
  #filtersContainerComponent;

  constructor({filtersContainer, tripsModel, filterModel}) {
    this.#filtersContainer = filtersContainer;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
  }

  get trips() {
    return this.#tripsModel.trips;
  }

  get filters() {
    return this.#filterModel.filters;
  }

  init() {
    this.#filtersContainerComponent = new FilterContainerView({filters: this.filters, currentFilterType: FilterTypes.EVERYTHING, onFilterTypeChange: () => {}});
    this.#renderFilters();
  }

  #renderFilters() {
    render(this.#filtersContainerComponent, this.#filtersContainer);
  }
}
