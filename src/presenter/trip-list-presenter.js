import { render } from '../render.js';
import TripListView from '../view/trip-list-view.js';
import TripItemView from '../view/trip-item-view.js';
import EventFormView from '../view/event-form-view.js';
import EventFormHeaderView from '../view/event-form-header-view.js';
import EventFormDetailsView from '../view/event-form-details-view.js';
import EventFormOffersView from '../view/event-form-offers-view.js';
import EventFormOfferItemView from '../view/event-form-offer-item-view.js';
import EventFormDestinationView from '../view/event-form-destination-view.js';
import EventFormDestinationImagesView from '../view/event-form-destination-images-view.js';
import EventFormDestinationPictureView from '../view/event-form-destination-picture-view.js';
import { RenderPosition } from '../render.js';

export default class TripListPresenter {
  tripListComponent = new TripListView();
  eventFormComponent = new EventFormView();
  eventFormDetailsComponent = new EventFormDetailsView();
  eventFormDestinationComponent = new EventFormDestinationView();
  eventFormOffersComponent = new EventFormOffersView();
  eventFormDestinationImagesComponent = new EventFormDestinationImagesView();

  constructor({tripListContainer, tripsModel}) {
    this.tripListContainer = tripListContainer;
    this.tripsModel = tripsModel;
  }

  init() {
    this.trips = [...this.tripsModel.getTrips()];
    this.offers = [...this.tripsModel.getOffers()];
    this.destinations = [...this.tripsModel.getDestinations()];

    render(this.tripListComponent, this.tripListContainer);

    for (let i = 1; i < this.trips.length; i++) {
      render(new TripItemView({trip: this.trips[i], offers: this.offers, destinations: this.destinations}), this.tripListComponent.getElement());
    }

    render(this.eventFormComponent, this.tripListComponent.getElement(), RenderPosition.AFTERBEGIN);
    render(new EventFormHeaderView(), this.eventFormComponent.getChildElement(0));
    render(this.eventFormDetailsComponent, this.eventFormComponent.getChildElement(0));
    render(this.eventFormOffersComponent, this.eventFormDetailsComponent.getElement());
    render(this.eventFormDestinationComponent, this.eventFormDetailsComponent.getElement());
    render(new EventFormOfferItemView(), this.eventFormOffersComponent.getChildElement(1));
    render(this.eventFormDestinationImagesComponent, this.eventFormDestinationComponent.getElement());
    render(new EventFormDestinationPictureView(), this.eventFormDestinationImagesComponent.getElement());
  }
}
