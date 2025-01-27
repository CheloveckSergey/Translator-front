import { StringSpan, TransStatusWord } from "../../../word";

export type Translation = TransText | TransStatusWord;

export interface TransText {
  type: 'text',
  value: string,
  translation: string,
  isCopied?: boolean,
}

export interface Block {
  id: number,
  original: StringSpan[],
  translation: string,
}