import FilterContainerView from '../view/filters-container-view.js';
// import FilterItemView from '../view/filter-item-view.js';
import { render } from '../render.js';

export default class FiltersPresenter {
  filtersContainerComponent = new FilterContainerView();
  constructor({filtersContainer}) {
    this.filtersContainer = filtersContainer;
  }

  init() {
    render(this.filtersContainerComponent, this.filtersContainer);
    // render(new FilterItemView(), this.filtersContainerComponent.getElement());
  }
}
