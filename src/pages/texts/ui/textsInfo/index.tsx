import { FC } from "react";
import { TextsLib } from "../../../../entities/text";
import { useUrlUserId } from "../../lib";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import './styles.scss';
import { SharedBlocks } from "../../../../shared/sharedUi/blocks";

const InfoSceleton: FC = () => {

  return (
    <div className="info-sceleton">
      {[1,2,3].map((_, index) => <div key={index} className="info-sceleton-line"></div>)}
    </div>
  )
}

export const TextsInfo: FC = () => {

  const userId = useUrlUserId();

  const {
    info,
    isFetching,
    isError,
  } = TextsLib.useTextsInfo({ userId })

  return (
    <SharedUiHelpers.ErrorLoader
      isLoading={isFetching}
      isError={isError}
      loadingSceleton={<InfoSceleton />}
    >
      <div className="texts-info">
        <SharedBlocks.InfoLine
          left="All texts"
          right={String(info.generalTextsNumber)}
          className="info-line"
        />
        <SharedBlocks.InfoLine
          left="Own texts"
          right={String(info.ownTextsNumber)}
          className="info-line"
        />
        <SharedBlocks.InfoLine
          left="Copied texts"
          right={String(info.copiedTextsNumber)}
          className="info-line"
        />
      </div>
    </SharedUiHelpers.ErrorLoader>
  )
}