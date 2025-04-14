import { FC, useState } from "react";
import { Block, PremiereTextSpan, PremiereTextSpanDto, TextPagination, TextQuery, TextUi, mapPremiereTextSpan } from "../../../../../entities/text";
import { usePremiereText } from "../../../lib";
import { StringSpan, WordLib, WordSpan, WordUi } from "../../../../../entities/word";
import { WordFeaturesUi } from "../../../../../features/word";
import './styles.scss';

interface WSWProps {
  wordSpan: WordSpan,
  updateState: () => void,
}
const WordSpanWidget: FC<WSWProps> = ({ wordSpan, updateState }) => {

  const {
    isLoading,
    isError,
    refetch,
  } = WordLib.useWordTranslation(
    wordSpan.value, 
    setTranslation,
    {
      enabled: false,
    }
  );

  function setTranslation(value: string) {
    wordSpan.setTranslation(value);
    updateState();
  }

  function addToProcess() {
    wordSpan.addToProcess();
    updateState();
    console.log('sdsd');
    console.log(wordSpan.status);
  }
  
  function deleteToStudied() {
    wordSpan.deleteToStudied();
    updateState();
  }

  return (
    <WordUi.WordSpanUi 
      wordSpan={wordSpan}
      loadTranslationObject={{
        isLoading,
        isError,
        load: refetch
      }}
      actions={[
        ((wordSpan.status === 'never') || (wordSpan.status === 'studied')) ? (
          <WordFeaturesUi.AddToProcessButton
            key={0}
            value={wordSpan.value}
            addToProcess={addToProcess}
          />
        ) : (
          <WordFeaturesUi.DeleteToStudiedButton
            key={0}
            value={wordSpan.value}
            deleteToStudied={deleteToStudied}
          />
        )
      ]}
    />
  )
}

interface SSWProps {
  stringSpan: StringSpan,
  updateState: () => void,
}
const StringSpanWidget: FC<SSWProps> = ({ stringSpan, updateState }) => {

  if (stringSpan instanceof WordSpan) {
    return (
      <WordSpanWidget
        wordSpan={stringSpan}
        updateState={updateState}
      />
    )
  } else {
    return (
      <WordUi.ConnectionSpanUi 
        connection={stringSpan} 
      />
    )
  }
}

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