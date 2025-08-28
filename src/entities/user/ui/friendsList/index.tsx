import { FC } from "react";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import { User } from "../../model";
import './styles.scss';
import { AxiosError } from "axios";
import { MyErrorObject } from "../../../../shared/types";

interface FCProps {
  user: User,
}
export const FriendCard: FC<FCProps> = ({ user }) => {

  return (
    <div className="friend-card">
      <img src={user.avatar} alt="IMG" />
      <h3>{user.login}</h3>
    </div>
  )
}

interface FLProps {
  users: User[],
  mapUsers: (user: User, index: number) => React.ReactNode,
  isLoading: boolean,
  isError: boolean,
  error?: AxiosError<MyErrorObject> | null,
  className?: string,
}
export const FriendsList: FC<FLProps> = ({ users, mapUsers, isLoading, isError, error, className }) => {

  return (
    <div className={["friends-list", className].join(' ')}>
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
        errorHolder={error?.response?.data.message}
      >
        {users.map(mapUsers)}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}