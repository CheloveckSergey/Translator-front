import { StringSpanDto, TransStatusWordDto } from "../../word";

export interface TextSpanDto {
  id: number,
  name: string,
  stringSpans: StringSpanDto[], 
  translation: string | undefined,
}

export type TranslationDto = TransTextDto | TransStatusWordDto;

export interface TransTextDto {
  type: 'text',
  value: string,
  translation: string,
}

export interface TextPreviewDto {
  id: number,
  name: string,
  content: string,
  author: {
    id: number,
    login: string,
  },
  createDate: string,
  updateDate: string,
  isCopied?: boolean,
}

export interface ShortTextPreviewDto {
  id: number,
  name: string,
  author: {
    id: number,
    login: string,
  },
  createDate: string,
}

export interface TextsInfoDto {
  generalTextsNumber: number,
  ownTextsNumber: number,
  copiedTextsNumber: number,
}

export interface TextSchema {
  id: number,
  name: string,
  content: string,
  createDate: Date,
  updateDate: Date,
  author: {
    id: number,
    login: string,
  }
  isCopied: boolean,
}