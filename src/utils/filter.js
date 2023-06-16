import dayjs from 'dayjs';
import { FilterType } from '../constants.js';

const filter = {
  [FilterType.EVERYTHING]: (trips) => trips.filter((trip) => trip),
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => dayjs(trip['timeStart']).valueOf() > dayjs(new Date()).valueOf()),
  [FilterType.PRESENT]: (trips) => trips.filter((trip) =>
    dayjs(trip['timeStart']).valueOf() <= dayjs(new Date()).valueOf() &&
    dayjs(trip['timeEnd']).valueOf() >= dayjs(new Date()).valueOf()),
  [FilterType.PAST]: (trips) => trips.filter((trip) => dayjs(trip['timeEnd']).valueOf() < dayjs(new Date()).valueOf()),
};

export { filter };
