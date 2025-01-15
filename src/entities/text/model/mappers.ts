import { ShortTextPreview, ShortTextPreviewDto, TextList, TextPreview, TextPreviewDto, TextSpan, TextSpanDto, TransText, TransTextDto, Translation, TranslationDto } from ".";
import { StringSpan } from "../../word";
import { mapStringSpanDto, mapTransWordDto } from "../../word/model/mappers";

export function mapTextSpanDto(textSpanDto: TextSpanDto): TextSpan {
  const stringSpans: StringSpan[] = textSpanDto.stringSpans.map(mapStringSpanDto);

  const textSpan: TextSpan = new TextSpan(textSpanDto.id, textSpanDto.name, stringSpans, textSpanDto.translation);
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

export function mapTextPreviewDto(textPreviewDto: TextPreviewDto): TextPreview {
  const textPreview = new TextPreview(
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

export function mapTextListDto(textPreviewDtos: TextPreviewDto[]): TextList {
  const textList = new TextList(textPreviewDtos.map(mapTextPreviewDto));
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