import Observable from '../framework/observable.js';
import { FilterType } from '../constants.js';

export default class FilterModel extends Observable {
  #currentFilter = FilterType.EVERYTHING;

  get filters() {
    return Object.values(FilterType);
  }

  get currentFilter() {
    return this.#currentFilter;
  }

  setFilter(updateType, filter) {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  }
}
