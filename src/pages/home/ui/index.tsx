import { FC } from "react";
import { WordsListWidget } from "./wordsList";
import { LastTextsListWidget } from "./textsList";
import './styles.scss'
import { FriendsLastTexts } from "./friendsLastTexts";
import { UserLib } from "../../../entities/user";
import { useAppSelector } from "../../../app/store";
import { AvatarWidget } from "./avatar";
import { SharedBlocks } from "../../../shared/sharedUi/blocks";

export const HomePage: FC = () => {

  const { user: meUser } = useAppSelector(state => state.user);

  const { user, isLoading, isError, updateState } = UserLib.useUser(meUser!.id, { wordsNumber: true });

  return (
    <SharedBlocks.RegularLayout
      left={(
        <AvatarWidget 
          user={user}
          isLoading={isLoading}
          isError={isError}
          updateState={updateState}
        />
      )}
      center={(
        <>
          <h1>Home</h1>
          <p className="description">
            Here you can fast reach your last texts and added words
          </p>
          <LastTextsListWidget />
          <WordsListWidget />
        </>
      )}
      centerClassName="home-page-center"
      right={(
        <FriendsLastTexts />
      )}
      className="home-page"
    />
  )
}