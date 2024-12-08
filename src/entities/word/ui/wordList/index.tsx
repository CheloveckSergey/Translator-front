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
        <p className="word field">
          <SharedButtons.TextButton 
            body={<FaMehRollingEyes size={25} />}
            color="dark"
            onClick={() => setShowInfo(true)}
            className="extra-info"
          />
          {word.value}
        </p>
        <p className="translation field">{word.translation}</p>
        <p className="status field">{word.status}</p>
        <p className="create-date field">{SharedLib.getComfortableDate(word.createDate)}</p>
        <p className="quantity-date field">{SharedLib.getComfortableDate(word.updateDate)}</p>
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
  className?: string,
  fetchNextPage?: () => void,
  hasNextPage?: boolean | undefined,
  isFetchingNextPage?: boolean,
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

  return (
    <div className={["word-list", className].join(' ')}>
      <div className="content">
        <SharedUiHelpers.ErrorLoader
          isLoading={isLoading}
          isError={isError}
        >
          <div className="word-list-header">
            <h4 className="word field">Word</h4>
            <h4 className="translation field">Translation</h4>
            <h4 className="status field">Status</h4>
            <h4 className="create-date field">Create date</h4>
            <h4 className="quantity-date field">Last iteration</h4>
            <div className="actions field"></div>
          </div>
          {words.map(mapWord)}
        </SharedUiHelpers.ErrorLoader>
      </div>
      {fetchNextPage && hasNextPage &&  <div className="more-button-wrapper">
        <SharedButtons.GreenButton
          body='Load more'
          isLoading={Boolean(isFetchingNextPage)}
          isError={false}
          className="load-more"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        />
      </div>}
    </div>
  )
}