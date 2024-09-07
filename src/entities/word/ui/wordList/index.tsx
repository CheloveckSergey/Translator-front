import { FC } from "react";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import './styles.scss';
import { SharedLib } from "../../../../shared/lib";
import { WholeWord } from "../../model/wholeWord";

interface WListProps {
  word: WholeWord,
  actions: React.ReactNode[],
}
export const WordLine: FC<WListProps> = ({ word, actions }) => {

  return (
    <div className="word-line">
      <p className="word field">{word.value}</p>
      <p className="translation field">{word.translation}</p>
      <p className="status field">{word.status}</p>
      <p className="create-date field">{SharedLib.getComfortableDate(word.createDate)}</p>
      <p className="quantity-date field">{SharedLib.getComfortableDate(word.updateDate)}</p>
      <div className="actions field">{actions}</div>
    </div>
  )
}

interface WLProps {
  words: WholeWord[],
  isLoading: boolean,
  isError: boolean,
  mapWord: (word: WholeWord, index: number) => React.ReactNode,
  className?: string,
}
export const WordList: FC<WLProps> = ({ words, isLoading, isError, mapWord, className }) => {

  return (
    <div className={["word-list", className].join(' ')}>
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
      >
        <div className="word-list-header">
          <h4 className="word">Word</h4>
          <h4 className="translation">Translation</h4>
          <h4 className="status">Status</h4>
          <h4 className="create-date">Create date</h4>
          <h4 className="quantity-date">Last iteration</h4>
          <div className="actions"></div>
        </div>
        {words.map(mapWord)}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}