import { StringSpan, TransStatusWord } from "../../../word";

export type Translation = TransText | TransStatusWord;

export interface TransText {
  type: 'text',
  value: string,
  translation: string,
  isCopied?: boolean,
}

export interface GeneralTextSpan {
  id: number,
  blocks: any[],
}

export interface TextPagination {
  page: number,
  pageTotal: number,
  nextPage: () => void,
  prevPage: () => void,
  setPage: (page: number) => void,
}

// export interface Block {
//   id: number,
//   original: StringSpan[],
//   translation: string,
// }