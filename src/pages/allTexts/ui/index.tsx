import { FC } from "react";
import { SharedBlocks } from "../../../shared/sharedUi/blocks";
import { TextsListWidget } from "./texts";
import './styles.scss';

export const AllTextsPage: FC = () => {

  return (
    <SharedBlocks.RegularLayout
      center={<>
        <div className="texts-header">
          <h1>All Texts</h1>
          <p className="description">Here you can see all texts you can see</p>
        </div>
        <TextsListWidget />
      </>}
      className="all-texts-page"
    />
  )
}