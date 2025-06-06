import { StringSpanDto, TransStatusWordDto } from "../../word";
import { TextQuery } from "../api";

export interface BlockDto {
  id: number,
  original: StringSpanDto[],
  translation: string,
}

export interface EditingBlockDto {
  id: number,
  original: string,
  translation: string,
}

export interface GeneralTextSpanDto {
  premiere: boolean, //Надо ли?
  pagesTotal: number,
}

export interface PremiereTextSpanDto extends GeneralTextSpanDto {
  id: number,
  blocks: BlockDto[],
  premiere: true,
}

export interface EditingTextSpanDto extends GeneralTextSpanDto {
  id: number,
  blocks: EditingBlockDto[],
  premiere: false,
}

export type TextSpanDto = PremiereTextSpanDto | EditingTextSpanDto;

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
  isCopied: boolean,
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

export interface CreateTextDto {
  name: string,
  userId: number,
}

export interface CreateTextResponse {
  id: number,
  name: string,
}

interface GeneralBlock {
  type: 'new' | 'edit' | 'delete' | 'newBlockAbove' | 'newBlockBelow',
}

interface NewBlockAbove extends GeneralBlock {
  type: 'newBlockAbove',
  original: string,
  translation: string,
  blockId: number,
}

interface NewBlockBelow extends GeneralBlock {
  type: 'newBlockBelow',
  original: string,
  translation: string,
  blockId: number,
}

interface NewBlock extends GeneralBlock {
  type: 'new',
  original: string,
  translation: string,
}

interface EditBlock extends GeneralBlock {
  type: 'edit',
  blockId: number,
  original: string,
  translation: string,
}

interface DeleteBlock extends GeneralBlock {
  type: 'delete',
  blockId: number,
}

export type SaveBlock = NewBlock | EditBlock | DeleteBlock | NewBlockAbove | NewBlockBelow;

export interface SaveBlocksDto {
  textId: number,
  blocks: SaveBlock[],
  query: Omit<TextQuery, 'textId'>,
}

export interface FastDeleteBlockDto {
  blockId: number,
  query: TextQuery,
}

export interface TextMetaDto {
  id: number,
  name: string,
  premiere: boolean,
  author: {
    id: number,
    login: string,
  },
  createDate: string,
  updateDate: string,
}