import { QueryTypes } from "./queryTypes";

export interface UsualQuery {
  limit?: number,
  offset?: number,
  order?: QueryTypes.Order,
}

export interface Copyable<T> {
  getCopy(): T,
}

export interface WarningOperation {
  operation: () => void,
}

export type ShowWarningIf = (conditionText: {
  condition: boolean;
  text: string;
} | {
  condition: boolean;
  text: string;
}[], operation: () => void) => void

export interface MyErrorObject {
  message: string,
}

export * as SharedTypes from './union'