import { QueryTypes } from "./queryTypes";

export interface UsualQuery {
  limit?: number,
  offset?: number,
  order?: QueryTypes.Order,
}

export interface Copyable<T> {
  getCopy(): T,
}

export * as SharedTypes from './union'