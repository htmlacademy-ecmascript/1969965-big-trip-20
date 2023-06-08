import FilterContainerView from '../view/filters-container-view.js';
import { render } from '../framework/render.js';
import { generateFilter } from '../mock/filter.js';
export default class FiltersPresenter {
  #filtersContainer;
  #tripsModel;
  #filterModel;
  // #trips;
  #filtersContainerComponent;
  // #filters;

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

  get filter() {
    return generateFilter(this.#filterModel.filter);
  }

  init() {
    // this.#trips = [...this.#tripsModel.trips];
    // this.#filters = generateFilter(this.#trips);

    this.#filtersContainerComponent = new FilterContainerView({filters: this.filters});
    render(this.#filtersContainerComponent, this.#filtersContainer);
  }
}
