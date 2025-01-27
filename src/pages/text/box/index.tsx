import { FC } from "react";
import { useParams } from "react-router-dom";
import { Block, TextSpan, TextUi, TextsLib } from "../../../entities/text";
import { StringSpan, WordLib, WordSpan, WordUi } from "../../../entities/word";
import { WordFeaturesUi } from "../../../features/word";
import './styles.scss';
import { EditingTextBox } from "./editingText";

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
    <div className="block">
      <div className="left">
        <TextUi.TextSpanUi
          stringSpans={block.original}
          mapWords={(stringSpan: StringSpan, index: number) => (
            <StringSpanWidget 
              key={index}
              stringSpan={stringSpan}
              updateState={updateState}
            />
          )}
        />
      </div>
      <div className="right">
        {block.translation}
      </div>
    </div>
  )
}

interface RTBProps {
  text: TextSpan,
  updateState: () => void,
}
const ReadyTextBox: FC<RTBProps> = ({ text, updateState }) => {

  return (
    <div className="ready-text-box">
      {text.blocks.map((block, index) => (
        <BlockWidget 
          key={index}
          block={block}
          updateState={updateState}
        />
      ))}
    </div>
  )
}

export const TextsBox: FC = () => {

  const { textId } = useParams();

  const {
    textSpan,
    setTextSpan,
    isLoading,
    isError,
  } = TextsLib.useTextSpan(Number(textId));

  function updateState() {
    const newTextSpan = textSpan.getCopy();
    setTextSpan(newTextSpan);
  }

  if (textSpan instanceof TextSpan) {
    return <ReadyTextBox text={textSpan} updateState={updateState} />
  } else {
    return <EditingTextBox text={textSpan} updateState={updateState} />
  }
}