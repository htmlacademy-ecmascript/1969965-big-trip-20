import AbstractView from '../framework/view/abstract-view.js';
import { SortTypes } from '../constants.js';
import { turnFirstCharToUppercase } from '../utils/common.js';

function createSortingContainerTemplate(currentSortType) {
  const sortingItems = Object.values(SortTypes);

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortingItems.map((sortingType) => `<div class="trip-sort__item  trip-sort__item--${sortingType}">
    <input id="sort-${sortingType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortingType}" ${currentSortType === sortingType ? 'checked' : ''} ${sortingType === SortTypes.EVENT || sortingType === SortTypes.OFFERS ? 'disabled' : ''} data-sort-type=${sortingType}>
    <label class="trip-sort__btn" for="sort-${sortingType}">${turnFirstCharToUppercase(sortingType)}</label>
  </div>`).join('')}
</form>`;
}

export default class SortingView extends AbstractView {
  #handleSortTypeChange;
  #currentSortType;

  constructor({onSortTypeChange, currentSortType}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortingContainerTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
