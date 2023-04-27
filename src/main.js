import TripInfoView from './view/trip-info-view.js';
import { render } from './render.js';
import { RenderPosition } from './render.js';
import FiltersPresenter from './view/presenter/filters-presenter.js';
import SortingPanelPresenter from './view/presenter/sorting-panel-presenter.js';
import TripListPresenter from './view/presenter/trip-list-presenter.js';

const infoHeaderElement = document.querySelector('.trip-main');
const filtersContainerElement = document.querySelector('.trip-controls__filters');
const mainSectionElement = document.querySelector('.trip-events');

const filtersPresenter = new FiltersPresenter({filtersContainer: filtersContainerElement});
const sortingPresenter = new SortingPanelPresenter({sortingContainer: mainSectionElement});
const tripListPresenter = new TripListPresenter({tripListContainer: mainSectionElement});

render(new TripInfoView(), infoHeaderElement, RenderPosition.AFTERBEGIN);

filtersPresenter.init();
sortingPresenter.init();
tripListPresenter.init();

