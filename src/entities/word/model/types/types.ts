import { WordSpan } from "./wordSpan";

export type WordStatus = 'process' | 'studied' | 'never';

export type WordStatusFilter = WordStatus | 'all';

export interface TransStatusWord {
  type: 'word',
  word: WordSpan,
}

export interface Word {
  value: string,
}