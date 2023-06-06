import { FilterTypes } from '../constants.js';
import dayjs from 'dayjs';

const filter = {
  [FilterTypes.EVERYTHING]: (trips) => trips.filter((trip) => trip),
  [FilterTypes.FUTURE]: (trips) => trips.filter((trip) => dayjs(trip['timeStart']).valueOf() > dayjs(new Date()).valueOf()),
  [FilterTypes.PRESENT]: (trips) => trips.filter((trip) =>
    dayjs(trip['timeStart']).valueOf() <= dayjs(new Date()).valueOf() &&
    dayjs(trip['timeEnd']).valueOf() >= dayjs(new Date()).valueOf()),
  [FilterTypes.PAST]: (trips) => trips.filter((trip) => dayjs(trip['timeEnd']).valueOf() < dayjs(new Date()).valueOf()),
};

export { filter };
