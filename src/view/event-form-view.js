import AbstractView from '../framework/view/abstract-view';

function createEventFormTemplate() {
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  </form>
</li>`;
}

export default class EventFormView extends AbstractView {
  get template() {
    return createEventFormTemplate();
  }

  getChildElement(idx) {
    return this.element.children[idx];
  }
}

