import { RenderPosition, render, remove } from '../framework/render.js';
// import { updateItem } from '../utils/trip.js';
import TripListView from '../view/trip-list-view.js';
import TripPresenter from './trip-presenter.js';
import NoTripView from '../view/no-trip-view.js';
import SortingView from '../view/sorting-view.js';
import { sortTrips } from '../utils/sorting.js';
import { SortTypes, UpdateType, UserAction } from '../constants.js';
// import { SortTypes } from '../constants.js';

export default class BoardPresenter {
  #tripListContainer;
  #tripsModel;
  // #trips;
  // #offers;
  // #destinations;
  // #destinationsList;
  #tripListComponent;
  #sortingComponent;
  #noTripComponent = new NoTripView({filterType: 'EVERYTHING'});
  #tripPresenters = new Map();
  #currentSortType = SortTypes.DAY;

  constructor({tripListContainer, tripsModel}) {
    this.#tripListContainer = tripListContainer;
    this.#tripsModel = tripsModel;
    this.#tripsModel.addObserver(this.#handleModelEvent);
  }

  get trips() {
    sortTrips(this.#tripsModel.trips, this.#currentSortType);
    return this.#tripsModel.trips;
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
    this.#tripListComponent = new TripListView();
    // this.#trips = [...this.#tripsModel.trips];
    // this.#offers = [...this.#tripsModel.offers];
    // this.#destinations = [...this.#tripsModel.destinations];
    // this.#destinationsList = [...this.#tripsModel.destinationsList];

    // this.#sortTrips();
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#tripListComponent, this.#tripListContainer);
    const tripsCount = this.trips.length;

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
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPresenters.clear();

    remove(this.#sortingComponent);
    remove(this.#noTripComponent);

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }

  #renderNoTrips() {
    render(this.#noTripComponent, this.#tripListContainer);
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

  // #sortTrips(sortType) {
  //   sortTrips(this.#trips, sortType);
  //   this.#currentSortType = sortType;
  // }

  // #clearTripList() {
  //   this.#tripPresenters.forEach((presenter) => presenter.destroy());
  //   this.#tripPresenters.clear();
  // }

  // #renderList() {
  //   for (let i = 0; i < this.trips.length; i++) {
  //     this.#renderTrip(this.trips[i], this.offers, this.destinations, this.destinationsList);
  //   }
  // }

  #renderTrip(trip, offers, destinations, destinationsList) {
    const tripPresenter = new TripPresenter({tripContainer: this.#tripListComponent.element, onDataChange: this.#handleViewAction, onModeChange: this.#handleModeChange});
    tripPresenter.init(trip, offers, destinations, destinationsList);
    this.#tripPresenters.set(trip.id, tripPresenter);
  }

  #handleModeChange = () => {
    this.#tripPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#tripsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this.#tripsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this.#tripsModel.deleteTrip(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  /*
  #handleTripChange = (updatedTrip, offers, destinations, destinationsList) => {
    // this.#trips = updateItem(this.#trips, updatedTrip);
    this.#tripPresenters.get(updatedTrip.id).init(updatedTrip, offers, destinations, destinationsList);
    // this.#sortTrips();
    // this.#clearTripList();
    // this.#renderList();
  };
  */
}

