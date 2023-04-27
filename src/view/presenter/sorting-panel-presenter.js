import { render } from '../../render.js';
import SortingContainerView from '../sorting-container-view.js';
import SortingItemView from '../sorting-item-view.js';

export default class SortingPanelPresenter {
  sortingContainerComponent = new SortingContainerView();
  constructor({sortingContainer}) {
    this.sortingContainer = sortingContainer;
  }

  init() {
    render(this.sortingContainerComponent, this.sortingContainer);
    render(new SortingItemView(), this.sortingContainerComponent.getElement());
  }
}
