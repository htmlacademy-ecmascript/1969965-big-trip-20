import AbstractView from '../framework/view/abstract-view';

function createEventFormDestinationTemplate(trip, destinations) {
  const {destination} = trip;
  const currentDestination = destinations.filter((elem) => elem.id === destination);
  const description = currentDestination[0].description;

  return `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
</section>`;
}

export default class EventFormDestinationView extends AbstractView{
  #trip;
  #destinations;

  constructor({trip, destinations}) {
    super();
    this.#trip = trip;
    this.#destinations = destinations;
  }

  get template() {
    return createEventFormDestinationTemplate(this.#trip, this.#destinations);
  }
}

