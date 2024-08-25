import { WordSpanClass } from "./wordSpan";

export type WordStatus = 'process' | 'studied' | 'never';

export type StringSpan = WordSpanClass | Connection; 

export interface Connection {
  value: string,
} 

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

export type TranslatorResponse = { 
  detectedLanguage: {
    language: string,
    score: number,
  },
  translations: {
    text: string,
    to: string,
  }[]
}[]

export interface TranslationWordDto {
  value: string,
  status: WordStatus | 'never',
  translation: string,
  createDate: Date,
  updateDate: Date,
  quantity: number,
}