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