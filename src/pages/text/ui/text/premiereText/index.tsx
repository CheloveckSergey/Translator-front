import { FC, useState } from "react";
import { Block, PremiereTextSpan, PremiereTextSpanDto, TextPagination, TextQuery, TextUi, mapPremiereTextSpan } from "../../../../../entities/text";
import { usePremiereText } from "../../../lib";
import { StringSpan, WordLib, WordSpan, WordUi } from "../../../../../entities/word";
import { WordFeaturesUi } from "../../../../../features/word";
import './styles.scss';
import { StringSpanWidget } from "./stringSpan";

interface BWProps {
  block: Block,
  updateState: () => void,
}
const BlockWidget: FC<BWProps> = ({ block, updateState }) => {

  return (
    <TextUi.TextBoxUi.Block
      original={block.original.map((word, index) => (
        <StringSpanWidget 
          key={index}
          stringSpan={word}
          updateState={updateState}
        />
      ))}
      translation={block.translation}
      leftActions={[]}
      rightActions={[]}
    />
  )
} 

interface ETWProps {
  dto: PremiereTextSpanDto,
  pagination: TextPagination,
}
export const PremiereTextWidget: FC<ETWProps> = ({ dto, pagination }) => {

  const { text, updateState } = usePremiereText(dto, pagination.page);

  return (
    <TextUi.TextBoxUi.TextBox
      blocks={text.blocks.map((block, index) => (
        <BlockWidget
          key={index}
          block={block}
          updateState={updateState}
        />
      ))}
      pagination={pagination}
      className='premiere-text-box'
    />
  )
}