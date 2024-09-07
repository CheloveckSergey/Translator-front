import { TransStatusWord } from "../../word";

export type TextPreview = {
  id: number,
  name: string,
  content: string,
}

export type Translation = TransText | TransStatusWord;

export interface TransText {
  type: 'text',
  value: string,
  translation: string,
}