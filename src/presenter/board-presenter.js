import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import TripPresenter from './trip-presenter.js';
import NewEventFormPresenter from './new-event-form-presenter.js';
import newEventFormButtonView from '../view/new-event-form-button-view.js';
import LoadingView from '../view/loading-view.js';
import TripListView from '../view/trip-list-view.js';
import NoTripView from '../view/no-trip-view.js';
import SortingView from '../view/sorting-view.js';
import { RenderPosition, render, remove } from '../framework/render.js';
import { sortTrips } from '../utils/sort-trips.js';
import { SortType, UpdateType, UserAction, FilterType } from '../constants.js';
import { filter } from '../utils/filter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #tripListContainer;
  #infoHeaderContainer;

  #tripsModel;
  #filterModel;

  #tripListComponent = new TripListView();
  #loadingComponent = new LoadingView();
  #newEventButtonComponent;
  #sortingComponent;
  #noTripComponent;

  #tripPresenters = new Map();
  #newEventFormPresenter;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({tripListContainer, tripsModel, filterModel, infoHeaderElement}) {
    this.#tripListContainer = tripListContainer;
    this.#infoHeaderContainer = infoHeaderElement;

    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;

    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newEventFormPresenter = new NewEventFormPresenter({
      tripListContainer: this.#tripListComponent,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleEventDestroy});
  }

  get trips() {
    this.#filterType = this.#filterModel.currentFilter;
    const trips = this.#tripsModel.trips;
    const filteredTrips = filter[this.#filterType](trips);

    sortTrips(filteredTrips, this.#currentSortType);
    return filteredTrips;
  }

  get offers() {
    return this.#tripsModel.offers;
  }

  get destinations() {
    return this.#tripsModel.destinations;
  }

  get destinationsList() {
    return this.#tripsModel.destinationsList;
  }

  init() {
    this.#renderBoard();
  }

  createTrip() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventFormPresenter.init(this.offers, this.destinations, this.destinationsList);
  }

  #renderNewEventButton() {
    this.#newEventButtonComponent = new newEventFormButtonView({onClick: this.#handleNewEventButtonClick});
    render(this.#newEventButtonComponent, this.#infoHeaderContainer, RenderPosition.BEFOREEND);
  }

  #renderBoard() {
    render(this.#tripListComponent, this.#tripListContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const trips = this.trips;
    const tripsCount = trips.length;

    if (tripsCount < 1) {
      this.#renderNoTrips();
      return;
    }

    this.#renderSort();

    for (const trip of trips) {
      this.#renderTrip(trip, this.offers, this.destinations, this.destinationsList);
    }
  }

  #renderNoTrips() {
    this.#noTripComponent = new NoTripView({filterType: this.#filterType});
    render(this.#noTripComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    this.#sortingComponent = new SortingView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortingComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTrip(trip, offers, destinations, destinationsList) {
    const tripPresenter = new TripPresenter({
      tripContainer: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange});

    tripPresenter.init(trip, offers, destinations, destinationsList);
    this.#tripPresenters.set(trip.id, tripPresenter);
  }

  #clearBoard({resetSortType = false} = {}){
    this.#newEventFormPresenter.destroy();
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPresenters.clear();

    remove(this.#sortingComponent);
    remove(this.#loadingComponent);

    if (this.#noTripComponent) {
      remove(this.#noTripComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleEventDestroy = () => {
    this.#newEventButtonComponent.element.disabled = false;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#newEventFormPresenter.destroy();
    this.#tripPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#tripPresenters.get(update.id).setSaving();
        try{
          await this.#tripsModel.updateTrip(updateType, update);
        } catch(err) {
          this.#tripPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_TRIP:
        this.#newEventFormPresenter.setSaving();
        try{
          await this.#tripsModel.addTrip(updateType, update);
        } catch(err) {
          this.#newEventFormPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TRIP:
        this.#tripPresenters.get(update.id).setDeleting();
        try {
          await this.#tripsModel.deleteTrip(updateType, update);
        } catch(err) {
          this.#tripPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPresenters.get(data.id).init(data, this.offers, this.destinations, this.destinationsList);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        this.#renderNewEventButton();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#filterType = 'ERROR';
        this.#renderNoTrips();
    }
  };

  #handleNewEventButtonClick = () => {
    this.createTrip();
    this.#newEventButtonComponent.element.disabled = true;
  };
}

