import { FC } from "react";
import { WordsListWidget } from "./wordsList";
import { LastTextsListWidget } from "./textsList";
import './styles.scss'
import { FriendsLastTexts } from "./friendsLastTexts";

export const HomePage: FC = () => {

  return (
    <div className="home-page">
      <div className="left-content">

      </div>
      <div className="main-content">
        <h1>Home</h1>
        <p>Here you can fast reach your last texts and added words</p>
        <LastTextsListWidget />
        <WordsListWidget />
      </div>
      <div className="right-content">
        <FriendsLastTexts />
      </div>
    </div>
  )
}