import { FC } from "react";
import { StringSpan, WordLib, WordSpan, WordUi } from "../../../../../entities/word";
import { WordFeaturesUi } from "../../../../../features/word";

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
export const StringSpanWidget: FC<SSWProps> = ({ stringSpan, updateState }) => {

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