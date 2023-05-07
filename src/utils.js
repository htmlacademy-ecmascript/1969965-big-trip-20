import dayjs from 'dayjs';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomNumber = (num) => Math.floor(Math.random() * num);

function formatDate(date, format) {
  return dayjs(date).format(format);
}

const findDifference = (timeStart, timeEnd) => dayjs(timeStart).diff(timeEnd, 'minute');

const formatDifference = (time) => {
  if (time < 60) {
    return `${time}M`;
  }
  if (time >= 60) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}H ${minutes}M`;
  }
};

const turnFirstCharToUppercase = (string) => {
  const result = string.replace(string[0], string[0].toUpperCase());
  return result;
};

export { getRandomArrayElement, getRandomNumber, formatDate, findDifference, formatDifference, turnFirstCharToUppercase };
