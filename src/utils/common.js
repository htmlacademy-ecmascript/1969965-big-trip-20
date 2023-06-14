import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(num) {
  return Math.floor(Math.random() * num);
}

function formatDate(date, format) {
  if (date === '') {
    return '';
  }

  return dayjs(date).format(format);
}

function findDifference(timeStart, timeEnd) {
  return dayjs(timeStart).diff(timeEnd, 'minute');
}

function formatDifference(time) {
  if (time < 60) {
    return `${time}M`;
  }
  if (time >= 60 && time <= 1440) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}H ${minutes}M`;
  }
  if (time > 1440) {
    const days = Math.floor(time / 1440);
    const hours = Math.floor((time % 1440) / 60);
    const minutes = time % 60;
    return `${days}D ${hours}H ${minutes}M`;
  }
}

function turnFirstCharToUppercase(string) {
  const result = string.replace(string[0], string[0].toUpperCase());
  return result;
}

export { getRandomArrayElement, getRandomNumber, formatDate, findDifference, formatDifference, turnFirstCharToUppercase };
