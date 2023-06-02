import FilterContainerView from '../view/filters-container-view.js';
import { render } from '../framework/render.js';
import { generateFilter } from '../mock/filter.js';

export default class FiltersPresenter {
  #filtersContainer;
  #tripsModel;
  #trips;
  #filtersContainerComponent;
  #filters;

  constructor({filtersContainer, tripsModel}) {
    this.#filtersContainer = filtersContainer;
    this.#tripsModel = tripsModel;
  }

  init() {
    this.#trips = [...this.#tripsModel.trips];
    this.#filters = generateFilter(this.#trips);

    this.#filtersContainerComponent = new FilterContainerView(this.#filters);
    render(this.#filtersContainerComponent, this.#filtersContainer);
  }
}
