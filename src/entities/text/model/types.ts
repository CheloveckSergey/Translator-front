// import { WordSpan } from "../../word"

import { StringSpanDto } from "../../word";

export type TextPreview = {
  id: number,
  name: string,
  content: string,
}

export interface TextSpanDto {
  id: number,
  name: string,
  stringSpans: StringSpanDto[], 
  translation: string | undefined,
}



// export type Span = WordSpan | string;

// export type Text = {
//   id: number,
//   name: string,
//   spans: Span[]
// }