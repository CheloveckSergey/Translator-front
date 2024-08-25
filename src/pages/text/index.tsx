import { FC, useEffect } from "react";
import './styles.scss';
import { TextUi, TextsLib } from "../../entities/text";
import { useParams } from "react-router-dom";
import { TextSpan } from "../../entities/text/ui/textSpan";
import { StringSpan, WordSpanClass } from "../../entities/word";
import { WordUi } from "../../entities/word/ui";
import { WordLib } from "../../entities/word/lib";
import { WordFeaturesLib } from "../../features/word/lib";
import { WordFeaturesUi } from "../../features/word/ui";

interface WSWProps {
  wordSpan: WordSpanClass,
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

  if (stringSpan instanceof WordSpanClass) {
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

const TextsBox: FC = () => {

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

  return (
    <div className="texts-box">
      <div className="left">
        <TextUi.TextSpan 
          textSpan={textSpan}
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
        {textSpan.translation ? (
          <p>{textSpan.translation}</p>
        ) : (
          <p>Нет перевода</p>
        )}
      </div>
    </div>
  )
}

export const TextPage: FC = () => {

  return (
    <div className="text-page">
      <div className="main-content">
        <h1>Text</h1>
        <p>Here you can read and study a text</p>
        <TextsBox />
      </div>
    </div>
  )
}