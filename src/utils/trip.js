import dayjs from 'dayjs';

function getCurrentDestination (destination, destinations) {
  const currentDestinationList = destinations.filter((elem) => elem.id === destination);
  if (currentDestinationList.length === 0) {
    return {id: '', name: '', description: '', images: []};
  }
  return currentDestinationList[0];
}

function isItemChecked (id, offers) {
  let result;
  offers.forEach((offer) => {
    if (offer === id) {
      result = 'checked = \'checked\'';
    }
  });
  return result;
}

function getCurrentOffers (offers, trip) {
  return offers.filter((elem) => elem.type === trip.type)[0];
}

function getOffers(tripOffers, offers) {
  const chosenOffers = [];
  tripOffers.forEach((item) => {
    offers.forEach((elem) => {
      if (item.id === elem) {
        chosenOffers.push(item);
      }
    });
  });
  return chosenOffers;
}

function isDestinationCorrect (validDestinations, userDestination) {
  return validDestinations.some((dest) => userDestination === dest.name);
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

export { getCurrentDestination, isItemChecked, getCurrentOffers, getOffers, isDestinationCorrect, isDatesEqual };
