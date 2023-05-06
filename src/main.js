import TripInfoView from './view/trip-info-view.js';
import { render } from './render.js';
import { RenderPosition } from './render.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import SortingPanelPresenter from './presenter/sorting-panel-presenter.js';
import TripListPresenter from './presenter/trip-list-presenter.js';
import TripsModel from './modell/trips-model.js';

const infoHeaderElement = document.querySelector('.trip-main');
const filtersContainerElement = document.querySelector('.trip-controls__filters');
const mainSectionElement = document.querySelector('.trip-events');

const tripsModel = new TripsModel();

const filtersPresenter = new FiltersPresenter({filtersContainer: filtersContainerElement});
const sortingPresenter = new SortingPanelPresenter({sortingContainer: mainSectionElement});
const tripListPresenter = new TripListPresenter({
  tripListContainer: mainSectionElement,
  tripsModel});

render(new TripInfoView(), infoHeaderElement, RenderPosition.AFTERBEGIN);

filtersPresenter.init();
sortingPresenter.init();
tripListPresenter.init();

