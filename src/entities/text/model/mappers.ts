import { Block, EditingBlock, ShortTextPreview, ShortTextPreviewDto, TextList, TextPreview, TextPreviewDto, TextSpan, TextSpanDto, TextsInfo, TextsInfoDto, TransText, TransTextDto, Translation, TranslationDto } from ".";
import { StringSpan } from "../../word";
import { mapStringSpanDto, mapTransWordDto } from "../../word/model/mappers";
import { EditingTextSpan } from "./types/editingTextSpan";

export function mapTextSpanDto(dto: TextSpanDto): TextSpan {
  const blocks = dto.blocks.map(blockDto => {
    const stringSpans = blockDto.original.map(mapStringSpanDto);
    const block: Block = {
      id: blockDto.id,
      original: stringSpans,
      translation: blockDto.translation,
    }
    return block
  })

  const textSpan: TextSpan = new TextSpan(dto.id, dto.name, blocks, dto.premiere);
  return textSpan;
}

export function mapEditingTextSpan(dto: TextSpanDto): EditingTextSpan {
  const blocks = dto.blocks.map(blockDto => {
    const stringSpans = blockDto.original.map(mapStringSpanDto);

    const original: string = stringSpans.reduce((prev, cur) => {
      return prev + cur.value
    }, '');
    const block = new EditingBlock(blockDto.id, original, blockDto.translation);
    return block
  })

  const textSpan = new EditingTextSpan(dto.id, dto.name, blocks);
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

export function mapTextsInfo(info: TextsInfoDto): TextsInfo {
  const textsInfo = new TextsInfo(info.generalTextsNumber, info.ownTextsNumber, info.copiedTextsNumber);
  return textsInfo
}