import { useParams } from 'react-router-dom';

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

function useUrlUserId(): number {
  const { userId: _userId } = useParams();

  if (!_userId) {
    throw Error('В URL нет ID пользователя')
  }

  const userId = Number(_userId);
  return userId
}

function useUrlTextId(): number {
  const { textId: _textId } = useParams();

  if (!_textId) {
    throw Error('В URL нет ID текста')
  }

  const textId = Number(_textId);
  return textId
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getQueryKey(root: string, query: object): string[] {
  const keys: string[] = [root];
  Object.values(query).forEach(value => {
    keys.push(String(value));
  });
  return keys
}

export const SharedLib = {
  getComfortableDate,
  getImageUrlFromFile,
  capitalizeFirstLetter,
  useUrlUserId,
  useUrlTextId,
  getRandomNumber,
  getQueryKey,
}

export { SharedHooks } from './hooks'
export * from './reactQuery'