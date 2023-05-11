import { render } from '../framework/render.js';
import SortingContainerView from '../view/sorting-container-view.js';

export default class SortingPanelPresenter {
  sortingContainerComponent = new SortingContainerView();
  constructor({sortingContainer}) {
    this.sortingContainer = sortingContainer;
  }

  init() {
    render(this.sortingContainerComponent, this.sortingContainer);
  }
}
