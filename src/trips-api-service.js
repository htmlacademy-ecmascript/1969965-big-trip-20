import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT'
};

export default class TripsApiService extends ApiService {
  get trips() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async updateTrip(trip) {
    const response = await this._load({
      url: `points/${trip.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(trip)),
      headers: new Headers({'Content-Type':'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(trip) {
    const adaptedTrip = {...trip,
      'base_price' : trip.price,
      'date_from' : trip.timeStart.toISOString(),
      'date_to': trip.timeEnd.toISOString(),
    };

    delete adaptedTrip.price;
    delete adaptedTrip.timeStart;
    delete adaptedTrip.timeEnd;
  }
}
