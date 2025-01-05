function getComfortableDate(date: Date): string {

  function getStringValue(value: number): string {
    const stringValue: string = value > 9 ? ''+value : '0' + value;
    return stringValue;
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();

  const stringDay: string = getStringValue(day);
  const stringMonth: string = getStringValue(month);
  const stringYear: string = String(year);

  const stringHour: string = getStringValue(hour);
  const stringMinute: string = getStringValue(minute);

  const comfortableDate = stringYear + '.' + stringMonth + '.' + stringDay + ' ' + stringHour + ':' + stringMinute;
  return comfortableDate;
}

function getImageUrlFromFile(file: File | undefined) {
  if (file) {
    return URL.createObjectURL(file);
  } else {
    return process.env.REACT_APP_DEFAULT_IMAGE;
  }
}

function capitalizeFirstLetter(input: string): string {
  if (!input) {
    return input;
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export const SharedLib = {
  getComfortableDate,
  getImageUrlFromFile,
  capitalizeFirstLetter,
}

export { SharedHooks } from './hooks'