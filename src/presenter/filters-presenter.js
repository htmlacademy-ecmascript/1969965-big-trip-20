import FiltersView from '../view/filters-view.js';
import { render, replace, remove } from '../framework/render.js';
import { UpdateType } from '../constants.js';

export default class FiltersPresenter {
  #filtersContainer;
  #tripsModel;
  #filterModel;
  #filtersContainerComponent = null;

  constructor({filtersContainer, tripsModel, filterModel}) {
    this.#filtersContainer = filtersContainer;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get trips() {
    return this.#tripsModel.trips;
  }

  get filters() {
    return this.#filterModel.filters;
  }

  get destinations() {
    return this.#tripsModel.destinations;
  }

  get offers() {
    return this.#tripsModel.offers;
  }

  init() {
    if (this.destinations.length === 0 && this.trips.length === 0 && this.offers.length === 0) {
      return;
    }

    const filters = this.filters;
    const prevFilterComponent = this.#filtersContainerComponent;
    this.#filtersContainerComponent = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      this.#renderFilters();
      return;
    }
    replace(this.#filtersContainerComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #renderFilters() {
    render(this.#filtersContainerComponent, this.#filtersContainer);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
