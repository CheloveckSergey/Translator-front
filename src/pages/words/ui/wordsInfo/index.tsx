import { FC } from "react";
import { useUrlUserId } from "../../lib";
import { WordLib } from "../../../../entities/word";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import { SharedBlocks } from "../../../../shared/sharedUi/blocks";
import './styles.scss';

const InfoSceleton: FC = () => {

  return (
    <div className="info-sceleton">
      {[1,2,3].map((_, index) => <div key={index} className="info-sceleton-line"></div>)}
    </div>
  )
}

export const WordsInfo: FC = () => {

  const userId = useUrlUserId();

  const {
    info,
    isFetching,
    isError,
  } = WordLib.useWordsInfo({ userId })

  return (
    <SharedUiHelpers.ErrorLoader
      isLoading={isFetching}
      isError={isError}
      loadingSceleton={<InfoSceleton />}
    >
      <div className="words-info">
        <SharedBlocks.InfoLine
          left="All words"
          right={String(info.generalWordsNumber)}
          className="info-line"
        />
        <SharedBlocks.InfoLine
          left="Words in process"
          right={String(info.process)}
          className="info-line"
        />
        <SharedBlocks.InfoLine
          left="Studied words"
          right={String(info.studied)}
          className="info-line"
        />
      </div>
    </SharedUiHelpers.ErrorLoader>
  )
}