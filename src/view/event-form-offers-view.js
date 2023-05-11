import AbstractView from '../framework/view/abstract-view';

function createEventFormOffersTemplate() {
  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          </section>`;
}

export default class EventFormOffersView extends AbstractView {
  get template() {
    return createEventFormOffersTemplate();
  }
}

