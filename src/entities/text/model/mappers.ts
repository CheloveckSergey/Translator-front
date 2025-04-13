import { Block, BlockDto, EditingBlock, EditingTextSpanDto, PremiereTextSpan, PremiereTextSpanDto, ShortTextPreview, ShortTextPreviewDto, TextList, TextMeta, TextMetaDto, TextPreview, TextPreviewDto, TextSpanDto, TextsInfo, TextsInfoDto, TransText, TransTextDto, Translation, TranslationDto } from ".";
import { StringSpan } from "../../word";
import { mapStringSpanDto, mapTransWordDto } from "../../word/model/mappers";
import { EditingTextSpan } from "./types/editingTextSpan";

export function mapTextSpanDto(dto: TextSpanDto): PremiereTextSpan | EditingTextSpan {
  if (dto.premiere) {
    return mapPremiereTextSpan(dto)
  } else {
    return mapEditingTextSpan(dto)
  }
}

export function mapPremiereTextSpan(dto: PremiereTextSpanDto): PremiereTextSpan {
  const blocks: Block[] = dto.blocks.map(mapBlock)
  const text = new PremiereTextSpan(dto.id, blocks);
  return text
}

function mapBlock(dto: BlockDto): Block {
  const block: Block = {
    id: dto.id,
    original: dto.original.map(mapStringSpanDto),
    translation: dto.translation,
  }
  return block
}

// function mapEditingTextSpan(dto: EditingTextSpanDto): EditingTextSpan {
//   const blocks: EditingBlock = new EditingBlock
// }

export function mapEditingTextSpan(dto: EditingTextSpanDto): EditingTextSpan {
  const blocks = dto.blocks.map(blockDto => {
    const block = new EditingBlock(blockDto.id, blockDto.original, blockDto.translation);
    return block
  })

  const textSpan = new EditingTextSpan(dto.id, blocks);
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

export function mapTextMeta(dto: TextMetaDto): TextMeta {
  const meta = new TextMeta(
    dto.id,
    dto.name,
    dto.author,
    dto.premiere,
    new Date(dto.createDate),
    new Date(dto.updateDate),
  );
  return meta
}