import { FC } from "react"
import './styles.scss';
import { TextsWidget } from "./texts";
import { Avatar } from "./avatar";
import { AvatarUser, UserLib, mapAvatarUserDto } from "../../../entities/user";
import { WordsWidget } from "./words";
import { useUrlUserId } from "../lib";
import { FriendListWidget } from "./friendsList";

export const UserPage: FC = () => {

  const userId = useUrlUserId();

  const { user, isLoading, isError, updateState } = UserLib.useUser1(
    {
      userId,
      fields: ['id', 'login', 'avatar', 'isFriend', 'isSentRequest', 'wordsNumber', 'textsNumber'],
    },
    mapAvatarUserDto
  );
  // const { user, isLoading, isError, updateState } = UserLib.useAvatarUser(
  //   userId, 
  //   { 
  //     friendship: true,
  //     wordsNumber: true,
  //   }
  // );

  return (
    <div className="user-page">
      <div className="left-content">
        <Avatar 
          user={user}
          isLoading={isLoading}
          isError={isError}
          updateState={updateState}
        />
        <FriendListWidget />
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