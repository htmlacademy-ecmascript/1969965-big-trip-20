import AbstractView from '../framework/view/abstract-view';
import { SortTypes } from '../constants';
import { turnFirstCharToUppercase } from '../utils/common';

function createSortingContainerTemplate() {
  const sortingItems = Object.values(SortTypes);

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortingItems.map((sortingType) => `<div class="trip-sort__item  trip-sort__item--${sortingType}">
    <input id="sort-${sortingType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortingType}" ${sortingType === 'day' ? 'checked' : ''} ${sortingType === 'event' || sortingType === 'offers' ? 'disabled' : ''} data-sort-type=${sortingType}>
    <label class="trip-sort__btn" for="sort-${sortingType}">${turnFirstCharToUppercase(sortingType)}</label>
  </div>`).join('')}
</form>`;
}

export default class SortingContainerView extends AbstractView {
  get template() {
    return createSortingContainerTemplate();
  }
}
