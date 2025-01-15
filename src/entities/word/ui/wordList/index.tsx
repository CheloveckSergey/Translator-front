import { FC, useState } from "react";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import './styles.scss';
import { SharedLib } from "../../../../shared/lib";
import { UserWordInfo } from "../../model";
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { FaMehRollingEyes } from "react-icons/fa";
import { UseModalWindow } from "../../../../widgets/modalWindow";
import { SharedBlocks } from "../../../../shared/sharedUi/blocks";

interface IWProps {
  word: UserWordInfo,
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
  word: UserWordInfo,
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

const Sceleton: FC = () => {

  return (
    <div className="sceleton">
      <div className="sceleton-header"></div>
      <div className="sceleton-content"></div>
    </div>
  )
}

interface WLProps {
  words: UserWordInfo[],
  isLoading: boolean,
  isError: boolean,
  mapWord: (word: UserWordInfo, index: number) => React.ReactNode,
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

  return (
    <div className={["word-list", className].join(' ')}>
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
        isEmpty={!words.length}
        emptyHolder="There's no words here"
        loadingSceleton={<Sceleton />}
      >
        <div className="content">
          <div className="word-list-header">
            <span className="word field">Word</span>
            <span className="translation field">Translation</span>
            <span className="status field">Status</span>
            <span className="create-date field">Create date</span>
            <span className="quantity-date field">Last iteration</span>
            <div className="actions field"></div>
          </div>
          {words.map(mapWord)}
        </div>
        <SharedButtons.LoadMoreButton
          fetchNextPage={fetchNextPage as () => void}
          isFetchingNextPage={!!isFetchingNextPage}
          hasNextPage={!!hasNextPage}
          isError={isError}
        />
      </SharedUiHelpers.ErrorLoader>
    </div>
  )

  return (
    <div className={["word-list", className].join(' ')}>
      <div className="content">
        <SharedUiHelpers.ErrorLoader
          isLoading={isLoading}
          isError={isError}
          loadingSceleton
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