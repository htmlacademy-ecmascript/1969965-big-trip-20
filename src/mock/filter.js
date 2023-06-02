import { filter } from '../utils/filter.js';

function generateFilter(trips) {
  return Object.entries(filter).map(
    ([filterType, filterTasks]) => ({
      type: filterType,
      count: filterTasks(trips).length,
    }),
  );
}

export { generateFilter };
