import AbstractView from '../framework/view/abstract-view';

function createEventFormDestinationPictureTemplate(trip, destinations) {
  const {destination} = trip;
  const currentDestination = destinations.filter((elem) => elem.id === destination);
  const images = currentDestination[0].images;

  return `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${images.map(({src, description}) => `<img class="event__photo" src="${src}"
            alt="${description}"></img>`).join('')}</div>
          </div>`;
}

export default class EventFormDestinationPictureView extends AbstractView {
  #trip;
  #destinations;

  constructor({trip, destinations}) {
    super();
    this.#trip = trip;
    this.#destinations = destinations;
  }

  get template() {
    return createEventFormDestinationPictureTemplate(this.#trip, this.#destinations);
  }
}

