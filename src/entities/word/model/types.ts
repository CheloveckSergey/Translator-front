import { WordSpanClass } from "./wordSpan";

export type WordStatus = 'process' | 'studied' | 'never';

export type StringSpan = WordSpanClass | Connection; 

export interface Connection {
  value: string,
}

export interface TransStatusWord {
  type: 'word',
  word: WordSpanClass,
}

// export type TranslatorResponse = { 
//   detectedLanguage: {
//     language: string,
//     score: number,
//   },
//   translations: {
//     text: string,
//     to: string,
//   }[]
// }[]