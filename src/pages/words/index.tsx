import { FC } from "react";
import { WordUi } from "../../entities/word/ui";
import { WordLib } from "../../entities/word/lib";
import { TodayWordClass } from "../../entities/word/model/todayWord";
import './styles.scss';
import { WordFeaturesUi } from "../../features/word/ui";

interface WLWProps {
  word: TodayWordClass,
  updateState: () => void,
}
const WordLineWidget: FC<WLWProps> = ({ word, updateState }) => {

  function deleteToStudied() {
    word.deleteToStudied();
    updateState();
  }

  function addToProcess() {
    word.addToProcess();
    updateState();
  }

  return (
    <WordUi.WordLine 
      word={word}
      actions={[
        (word.status === 'process' ? (
          <WordFeaturesUi.DeleteToStudiedButton 
            value={word.value}
            deleteToStudied={deleteToStudied}
            size={30}
          />
        ) : (
          <WordFeaturesUi.AddToProcessButton
            value={word.value}
            addToProcess={addToProcess}
            size={30}
          />
        )),
      ]}
    />
  )
}

export const WordsPage: FC = () => {

  const { words, updateWords, isLoading, isError } = WordLib.useWords();

  return (
    <div className="words-page">
      <div className="main-content">
        <h1>Words</h1>
        <p>Here you look at all your words.</p>
        <div className="just-cause">
          <WordUi.WordList 
            words={words}
            isLoading={isLoading}
            isError={isError}
            mapWord={(word: TodayWordClass, index: number) => <WordLineWidget 
              key={index}
              word={word}
              updateState={updateWords}
            />}
          />
        </div>
      </div>
    </div>
  )
}