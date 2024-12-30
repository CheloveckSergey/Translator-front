export interface UsualQuery {
  limit?: number,
  offset?: number,
  order?: 'ASC' | 'DESC',
}

export interface Copyable<T> {
  getCopy(): T,
}