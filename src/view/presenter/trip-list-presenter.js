import { render } from '../../render.js';
import TripListView from '../trip-list-view.js';
import TripItemView from '../trip-item-view.js';
import EventFormView from '../event-form-view.js';
import EventFormHeaderView from '../event-form-header-view.js';
import EventFormDetailsView from '../event-form-details-view.js';
import EventFormOffersView from '../event-form-offers-view.js';
import EventFormOfferItemView from '../event-form-offer-item-view.js';
import EventFormDestinationView from '../event-form-destination-view.js';
import EventFormDestinationImagesView from '../event-form-destination-images-view.js';
import EventFormDestinationPictureView from '../event-form-destination-picture-view.js';
import { RenderPosition } from '../../render.js';

export default class TripListPresenter {
  tripListComponent = new TripListView();
  eventFormComponent = new EventFormView();
  eventFormDetailsComponent = new EventFormDetailsView();
  eventFormDestinationComponent = new EventFormDestinationView();
  eventFormOffersComponent = new EventFormOffersView();
  eventFormDestinationImagesComponent = new EventFormDestinationImagesView();

  constructor({tripListContainer}) {
    this.tripListContainer = tripListContainer;
  }

  init() {
    render(this.tripListComponent, this.tripListContainer);
    for (let i = 0; i < 3; i++) {
      render(new TripItemView(), this.tripListComponent.getElement());
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
