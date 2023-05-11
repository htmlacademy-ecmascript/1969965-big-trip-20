// import { render } from '../render.js';
import { render } from '../framework/render.js';
import TripListView from '../view/trip-list-view.js';
import TripItemView from '../view/trip-item-view.js';
import EventFormView from '../view/event-form-view.js';
import EventFormHeaderView from '../view/event-form-header-view.js';
import EventFormDetailsView from '../view/event-form-details-view.js';
import EventFormOffersView from '../view/event-form-offers-view.js';
import EventFormOfferItemView from '../view/event-form-offer-item-view.js';
import EventFormDestinationView from '../view/event-form-destination-view.js';
import EventFormDestinationPictureView from '../view/event-form-destination-picture-view.js';
import { RenderPosition } from '../framework/render.js';

export default class TripListPresenter {
  #tripListContainer;
  #tripsModel;
  #trips;
  #offers;
  #destinations;
  #destinationsList;
  #eventFormDestinationComponent;

  #tripListComponent = new TripListView();
  #eventFormComponent = new EventFormView();
  #eventFormDetailsComponent = new EventFormDetailsView();
  #eventFormOffersComponent = new EventFormOffersView();

  constructor({tripListContainer, tripsModel}) {
    this.#tripListContainer = tripListContainer;
    this.#tripsModel = tripsModel;
  }

  init() {
    this.#trips = [...this.#tripsModel.trips];
    this.#offers = [...this.#tripsModel.offers];
    this.#destinations = [...this.#tripsModel.destinations];
    this.#destinationsList = [...this.#tripsModel.destinationsList];
    this.#eventFormDestinationComponent = new EventFormDestinationView({trip: this.#trips[0], destinations: this.#destinations});

    render(this.#tripListComponent, this.#tripListContainer);

    for (let i = 1; i < this.#trips.length; i++) {
      render(new TripItemView({trip: this.#trips[i], offers: this.#offers, destinations: this.#destinations}), this.#tripListComponent.element);
    }

    render(this.#eventFormComponent, this.#tripListComponent.element, RenderPosition.AFTERBEGIN);

    render(new EventFormHeaderView({destinationsList: this.#destinationsList, trip: this.#trips[0], destinations: this.#destinations}), this.#eventFormComponent.getChildElement(0));
    render(this.#eventFormDetailsComponent, this.#eventFormComponent.getChildElement(0));
    render(this.#eventFormOffersComponent, this.#eventFormDetailsComponent.element);
    render(this.#eventFormDestinationComponent, this.#eventFormDetailsComponent.element);
    render(new EventFormOfferItemView({offers: this.#offers, trip: this.#trips[0], destinations: this.#destinations}), this.#eventFormOffersComponent.element);
    render(new EventFormDestinationPictureView({trip: this.#trips[0], destinations: this.#destinations}), this.#eventFormDestinationComponent.element);
  }
}
