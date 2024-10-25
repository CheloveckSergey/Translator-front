import { FC } from "react"
import './styles.scss';
import { User, UserLib } from "../../entities/user";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { Header } from "./header";
import { TextsWidget } from "./texts";

export const UserPage: FC = () => {

  const { user: meUser } = useAppSelector(state => state.user);

  const { userId } = useParams();

  const { user, isLoading, isError, updateState } = UserLib.useUser(Number(userId), meUser!.id);

  return (
    <div className="user-page">
      <div className="main-content">
        <Header
          user={user}
          isLoading={isLoading}
          isError={isError}
          updateState={updateState}
        />
        <TextsWidget />
      </div>
    </div>
  )
}