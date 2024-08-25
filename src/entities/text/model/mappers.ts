import { StringSpan } from "../../word";
import { mapStringSpanDto } from "../../word/model/mappers";
import { TextSpanClass } from "./textSpan";
import { TextSpanDto } from "./types";

export function mapTextSpanDto(textSpanDto: TextSpanDto): TextSpanClass {
  const stringSpans: StringSpan[] = textSpanDto.stringSpans.map(mapStringSpanDto)

  const textSpan: TextSpanClass = new TextSpanClass(textSpanDto.id, textSpanDto.name, stringSpans, textSpanDto.translation);
  return textSpan;
}