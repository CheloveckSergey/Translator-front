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


export interface TransWordDto {
  value: string,
  translation: string,
}


export interface TodayWordDto {
  value: string,
  translation: string,
}


export interface UserWordInfoDto {
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

export interface WordsInfoDto {
  generalWordsNumber: number,
  process: number,
  studied: number,
}