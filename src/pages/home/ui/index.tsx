import { FC } from "react";
import { WordsListWidget } from "./wordsList";
import { LastTextsListWidget } from "./textsList";
import './styles.scss'
import { FriendsLastTexts } from "./friendsLastTexts";
import { UserUi } from "../../../entities/user/ui";
import { UserLib } from "../../../entities/user";
import { useAppSelector } from "../../../app/store";
import { AvatarWidget } from "./avatar";

export const HomePage: FC = () => {

  const { user: meUser } = useAppSelector(state => state.user);

  const { user, isLoading, isError, updateState } = UserLib.useUser(meUser!.id, { wordsNumber: true });

  return (
    <div className="home-page">
      <div className="left-content">
        <AvatarWidget 
          user={user}
          isLoading={isLoading}
          isError={isError}
          updateState={updateState}
        />
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