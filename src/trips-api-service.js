import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class TripsApiService extends ApiService {
  get trips() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then (ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  async updateTrip(trip) {
    const adaptedTrip = this.#adaptToServer(trip);
    const response = await this._load({
      url: `points/${trip.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptedTrip),
      headers: new Headers({'Content-Type':'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addTrip(trip) {
    const adaptedTrip = this.#adaptToServer(trip);
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(adaptedTrip),
      headers: new Headers({'Content-Type' : 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteTrip(trip) {
    const response = await this._load({
      url: `points/${trip.id}`,
      method: Method.DELETE
    });

    return response;
  }

  #adaptToServer(trip) {
    const adaptedTrip = {...trip,
      'base_price' : Number(trip.price),
      'date_from' : trip.timeStart instanceof Date ? trip.timeStart.toISOString() : trip.timeStart,
      'date_to': trip.timeEnd instanceof Date ? trip.timeEnd.toISOString() : trip.timeEnd,
      'is_favorite': trip.isFavorite,
    };

    delete adaptedTrip.price;
    delete adaptedTrip.timeStart;
    delete adaptedTrip.timeEnd;
    delete adaptedTrip.isFavorite;

    return adaptedTrip;
  }
}
