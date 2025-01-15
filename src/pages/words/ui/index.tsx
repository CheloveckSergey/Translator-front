import { FC } from "react";
import './styles.scss';
import { WordListWidget } from "./words";
import { SharedBlocks } from "../../../shared/sharedUi/blocks";

export const WordsPage: FC = () => {

  return (
    <SharedBlocks.RegularLayout
      center={(
        <>
          <h1>Words</h1>
          <p>Here you look at all your words.</p>
          <div className="just-cause">
            <WordListWidget />
          </div>
        </>
      )}
    />
  )
}