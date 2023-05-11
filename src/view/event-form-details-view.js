import AbstractView from '../framework/view/abstract-view';

function createEventFormDetailsTemplate() {
  return `<section class="event__details">
  </section>`;
}

export default class EventFormDetailsView extends AbstractView {
  get template() {
    return createEventFormDetailsTemplate();
  }
}

