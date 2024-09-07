import { StringSpan, WordSpanClass } from "../../word";
import { mapStringSpanDto, mapTransWordDto } from "../../word/model/mappers";
import { TextSpanDto, TransTextDto, TranslationDto } from "./dto";
import { TextSpanClass } from "./textSpan";
import { TransText, Translation } from "./types";

export function mapTextSpanDto(textSpanDto: TextSpanDto): TextSpanClass {
  const stringSpans: StringSpan[] = textSpanDto.stringSpans.map(mapStringSpanDto)

  const textSpan: TextSpanClass = new TextSpanClass(textSpanDto.id, textSpanDto.name, stringSpans, textSpanDto.translation);
  return textSpan;
}

function mapTextTransDto(textTransDto: TransTextDto): TransText {
  const textTranslation: TransText = {
    type: 'text',
    value: textTransDto.value,
    translation: textTransDto.translation,
  }
  return textTranslation;
}

export function mapTranslationDto(translationDto: TranslationDto): Translation {
  if (translationDto.type === 'word') {
    return mapTransWordDto(translationDto)
  } else {
    return mapTextTransDto(translationDto)
  }
}