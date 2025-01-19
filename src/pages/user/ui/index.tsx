import { FC } from "react"
import './styles.scss';
import { TextsWidget } from "./texts";
import { Avatar } from "./avatar";
import { UserLib } from "../../../entities/user";
import { WordsWidget } from "./words";
import { useUrlUserId } from "../lib";

export const UserPage: FC = () => {

  const userId = useUrlUserId();

  const { user, isLoading, isError, updateState } = UserLib.useUser(
    userId, 
    { 
      friendship: true,
      wordsNumber: true,
    }
  );

  return (
    <div className="user-page">
      <div className="left-content">
        <Avatar 
          user={user}
          isLoading={isLoading}
          isError={isError}
          updateState={updateState}
        />
      </div>
      <div className="main-content">
        <TextsWidget />
        <WordsWidget />
      </div>
      <div className="right-content">

      </div>
    </div>
  )
}