import { RenderPosition, render, remove } from '../framework/render.js';
import TripListView from '../view/trip-list-view.js';
import TripPresenter from './trip-presenter.js';
import NewEventFormPresenter from './new-event-presenter.js';
import NoTripView from '../view/no-trip-view.js';
import SortingView from '../view/sorting-view.js';
import { sortTrips } from '../utils/sorting.js';
import { SortTypes, UpdateType, UserAction, FilterTypes } from '../constants.js';
import { filter } from '../utils/filter.js';
import LoadingView from '../view/loading-view.js';
export default class BoardPresenter {
  #tripListContainer;
  #tripsModel;
  #filterModel;

  #tripListComponent = new TripListView();
  #loadingComponent = new LoadingView();

  #sortingComponent;
  #noTripComponent;
  #tripPresenters = new Map();
  #newEventFormPresenter;
  #currentSortType = SortTypes.DAY;
  #filterType = FilterTypes.EVERYTHING;
  #isLoading = true;

  constructor({tripListContainer, tripsModel, filterModel, onNewEventDestroy}) {
    this.#tripListContainer = tripListContainer;
    this.#tripsModel = tripsModel;
    this.#filterModel = filterModel;
    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newEventFormPresenter = new NewEventFormPresenter({tripListContainer: this.#tripListComponent, onDataChange: this.#handleViewAction, onDestroy: onNewEventDestroy});
  }

  createTrip() {
    this.#currentSortType = SortTypes.DAY;

    this.#filterModel.setFilter(UpdateType.MAJOR, FilterTypes.EVERYTHING);

    this.#newEventFormPresenter.init(this.offers, this.destinations, this.destinationsList);
  }

  get trips() {
    this.#filterType = this.#filterModel.filter;
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

  #renderBoard() {
    render(this.#tripListComponent, this.#tripListContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.destinations. length === 0) {
      this.#filterType = FilterTypes.ERROR;
      this.#renderNoTrips();
      return;
    }

    const trips = this.trips;
    const tripsCount = trips.length;

    if (tripsCount < 1) {
      this.#renderNoTrips();
      return;
    }

    this.#renderSort();

    for (let i = 0; i < tripsCount; i++) {
      this.#renderTrip(this.trips[i], this.offers, this.destinations, this.destinationsList);
    }
  }

  #clearBoard({resetSortType = false} = {}){
    this.#newEventFormPresenter.destroy();
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPresenters.clear();

    remove(this.#sortingComponent);

    remove(this.#loadingComponent);

    if(this.#noTripComponent) {
      remove(this.#noTripComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTrip(trip, offers, destinations, destinationsList) {
    const tripPresenter = new TripPresenter({tripContainer: this.#tripListComponent.element, onDataChange: this.#handleViewAction, onModeChange: this.#handleModeChange});
    tripPresenter.init(trip, offers, destinations, destinationsList);
    this.#tripPresenters.set(trip.id, tripPresenter);
  }

  #handleModeChange = () => {
    this.#newEventFormPresenter.destroy();
    this.#tripPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#tripPresenters.get(update.id).setSaving();
        this.#tripsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this.#newEventFormPresenter.setSaving();
        this.#tripsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this.#tripPresenters.get(update.id).setDeleting();
        this.#tripsModel.deleteTrip(updateType, update);
        break;
    }
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
        break;
    }
  };
}

