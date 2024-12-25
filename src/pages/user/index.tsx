import { FC } from "react"
import './styles.scss';
import { User, UserLib } from "../../entities/user";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { Header } from "./header";
import { TextsWidget } from "./texts";
import { UserUi } from "../../entities/user/ui";
import { Avatar } from "./avatar";

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
        {/* <Header
          user={user}
          isLoading={isLoading}
          isError={isError}
          updateState={updateState}
        /> */}
        <TextsWidget />
      </div>
      <div className="right-content">

      </div>
    </div>
  )
}