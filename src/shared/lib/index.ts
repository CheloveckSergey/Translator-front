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

export const SharedLib = {
  getComfortableDate,
  getImageUrlFromFile,
}

export { SharedHooks } from './hooks'