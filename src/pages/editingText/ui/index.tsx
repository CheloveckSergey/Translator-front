import { FC } from "react";
import './styles.scss';
import { TextsBox } from "./box";
import { SharedBlocks } from "../../../shared/sharedUi/blocks";

export const EditingTextPage: FC = () => {

  return (
    <SharedBlocks.RegularLayout
      center={<>
        <h1>Text</h1>
        <p>Here you can read and study a text</p>
        <TextsBox />
      </>}
      className="text-page"
    />
  )
}