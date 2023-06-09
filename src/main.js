import FiltersPresenter from './presenter/filters-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import TripsModel from './modell/trips-model.js';
import FilterModel from './modell/filter-model.js';
import newEventFormButtonView from './view/new-event-form-button-view.js';
import { render, RenderPosition } from './framework/render.js';

const infoHeaderElement = document.querySelector('.trip-main');
const filtersContainerElement = document.querySelector('.trip-controls__filters');
const mainSectionElement = document.querySelector('.trip-events');

const tripsModel = new TripsModel();
const filterModel = new FilterModel();

const newEventFormButtonComponent = new newEventFormButtonView({onClick: handleNewEventButtonClick});

const filtersPresenter = new FiltersPresenter({filtersContainer: filtersContainerElement, tripsModel, filterModel});

const boardPresenter = new BoardPresenter({
  tripListContainer: mainSectionElement,
  tripsModel, filterModel, onNewEventDestroy: handleNewEventFormClose});

const tripInfoPresenter = new TripInfoPresenter({infoContainer: infoHeaderElement, tripsModel});


function handleNewEventFormClose() {
  newEventFormButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  boardPresenter.createTrip();
  newEventFormButtonComponent.element.disabled = true;
}

render(newEventFormButtonComponent, infoHeaderElement, RenderPosition.BEFOREEND);
tripInfoPresenter.init();
filtersPresenter.init();
boardPresenter.init();

