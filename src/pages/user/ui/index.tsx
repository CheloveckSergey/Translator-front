import { FC } from "react"
import './styles.scss';
import { useParams } from "react-router-dom";
import { Header } from "./header";
import { TextsWidget } from "./texts";
import { Avatar } from "./avatar";
import { useAppSelector } from "../../../app/store";
import { UserLib } from "../../../entities/user";
import { WordsWidget } from "./words";

export const UserPage: FC = () => {

  const { user: meUser } = useAppSelector(state => state.user);

  const { userId } = useParams();

  const { user, isLoading, isError, updateState } = UserLib.useUser(Number(userId), { meUserId: meUser?.id });

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