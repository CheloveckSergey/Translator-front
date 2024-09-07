import { WordStatus } from "./types";

export type StringSpanDto = WordSpanDto | ConnectionDto;

export interface WordSpanDto {
  type: 'word',
  value: string,
  status: WordStatus,
}

export interface ConnectionDto {
  type: 'connection',
  value: string,
} 

export interface TranslationWordDto {
  value: string,
  translation: string,
}

export interface TodayWordDto {
  value: string,
  translation: string,
}

export interface WholeWordDto {
  value: string,
  status: WordStatus,
  translation: string,
  createDate: string,
  updateDate: string,
  quantity: number,
}

export interface TransStatusWordDto {
  type: 'word',
  value: string,
  translation: string,
  status: WordStatus | 'never',
}