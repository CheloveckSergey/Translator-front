import { StringSpan, WordSpanClass } from "../../word";
import { mapStringSpanDto, mapTransWordDto } from "../../word/model/mappers";
import { ShortTextPreviewDto, TextPreviewDto, TextSpanDto, TransTextDto, TranslationDto } from "./dto";
import { ShortTextPreview } from "./shortTextPreview";
import { TextListClass } from "./textList";
import { TextPreviewClass } from "./textPreview";
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

export function mapTextPreview(textPreviewDto: TextPreviewDto): TextPreviewClass {
  const textPreview = new TextPreviewClass(
    textPreviewDto.id, 
    textPreviewDto.name, 
    textPreviewDto.content, 
    textPreviewDto.author.id, 
    textPreviewDto.author.login, 
    textPreviewDto.isCopied,
    new Date(textPreviewDto.createDate),
  );
  return textPreview;
}

export function mapTextListDto(textPreviewDtos: TextPreviewDto[]): TextListClass {
  const textList = new TextListClass(textPreviewDtos.map(mapTextPreview));
  return textList;
}

export function mapShortTextPreview(textDto: ShortTextPreviewDto): ShortTextPreview {
  const textPreview = new ShortTextPreview(
    textDto.id,
    textDto.name,
    textDto.author,
    new Date(textDto.createDate),
  );
  return textPreview;
}