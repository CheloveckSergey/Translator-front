import { FC, useState } from "react";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import './styles.scss';
import { SharedLib } from "../../../../shared/lib";
import { WholeWord } from "../../model/wholeWord";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { FaMehRollingEyes } from "react-icons/fa";
import { UseModalWindow } from "../../../../widgets/modalWindow";
import { SharedBlocks } from "../../../../shared/sharedUi/blocks";

interface IWProps {
  word: WholeWord,
}
const InfoWindow: FC<IWProps> = ({ word }) => {

  return (
    <div className="info-window">
      <SharedBlocks.InfoLine 
        left="Word"
        right={word.value}
        className="info-line"
      />
      <SharedBlocks.InfoLine 
        left="Translation"
        right={word.translation}
        className="info-line"
      />
      <SharedBlocks.InfoLine 
        left="Status"
        right={word.status}
        className="info-line"
      />
      <SharedBlocks.InfoLine 
        left="Create date"
        right={SharedLib.getComfortableDate(word.createDate)}
        className="info-line"
      />
      <SharedBlocks.InfoLine 
        left="Update date"
        right={SharedLib.getComfortableDate(word.updateDate)}
        className="info-line"
      />
    </div>
  )
}

interface WListProps {
  word: WholeWord,
  actions: React.ReactNode[],
}
export const WordLine: FC<WListProps> = ({ word, actions }) => {

  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <>
      <div className="word-line">
        <span className="word field">
          <SharedButtons.TextButton 
            body={<FaMehRollingEyes size={25} />}
            color="dark"
            onClick={() => setShowInfo(true)}
            className="extra-info"
          />
          {word.value}
        </span>
        <span className="translation field">{word.translation}</span>
        <span className="status field">{word.status}</span>
        <span className="create-date field">{SharedLib.getComfortableDate(word.createDate)}</span>
        <span className="quantity-date field">{SharedLib.getComfortableDate(word.updateDate)}</span>
        <div className="actions field">{actions}</div>
      </div>
      <UseModalWindow 
        condition={showInfo}
        onClose={() => setShowInfo(false)}
      >
        <InfoWindow word={word} />
      </UseModalWindow>
    </>
  )
}

interface WLProps {
  words: WholeWord[],
  isLoading: boolean,
  isError: boolean,
  mapWord: (word: WholeWord, index: number) => React.ReactNode,
  fetchNextPage?: () => void,
  hasNextPage?: boolean | undefined,
  isFetchingNextPage?: boolean,
  className?: string,
}
export const WordList: FC<WLProps> = ({ 
  words, 
  isLoading, 
  isError, 
  mapWord, 
  className, 
  fetchNextPage, 
  hasNextPage,
  isFetchingNextPage
}) => {

  if (isLoading) {
    return (
      <div className="sceleton">
        <div className="sceleton-header"></div>
        <div className="sceleton-content"></div>
      </div>
    )
  }

  return (
    <div className={["word-list", className].join(' ')}>
      <div className="content">
        <SharedUiHelpers.ErrorLoader
          isLoading={isLoading}
          isError={isError}
        >
          <div className="word-list-header">
            <span className="word field">Word</span>
            <span className="translation field">Translation</span>
            <span className="status field">Status</span>
            <span className="create-date field">Create date</span>
            <span className="quantity-date field">Last iteration</span>
            <div className="actions field"></div>
          </div>
          {words.map(mapWord)}
        </SharedUiHelpers.ErrorLoader>
      </div>
      <SharedButtons.LoadMoreButton
        fetchNextPage={fetchNextPage as () => void}
        isFetchingNextPage={!!isFetchingNextPage}
        hasNextPage={!!hasNextPage}
        isError={isError}
      />
    </div>
  )
}