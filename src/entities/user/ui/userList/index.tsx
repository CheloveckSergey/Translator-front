import { FC } from "react";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import { OnlyUser } from "../../model/types/onlyUser";
import './styles.scss';
import { useNavigate } from "react-router-dom";
import { GeneralFriendRequest } from "../../model";

const UserCardSceleton: FC = () => {

  return (
    <div className="user-card-sceleton" />
  )
}

interface UCProps<T extends GeneralFriendRequest> {
  user: T,
  actions: React.ReactNode | React.ReactNode[],
  description?: string | undefined,
}
export function UserCard<T extends GeneralFriendRequest>({ user, actions, description } : UCProps<T>) {

  const navigate = useNavigate();

  return (
    <div className="user-card">
      <div className="main-user-card">
        <img 
          src={user.avatar} 
          alt="OMG" 
        />
        <div className="login-words">
          <h4 
            className="login ref"
            onClick={() => navigate('/users/' + user.id)}
          >
            {user.login}
          </h4>
          <span className="words-number extra">{user.wordsNumber} words</span>
        </div>
      </div>
      <div className="actions">
        {description && <span>{description}</span>}
        {actions}
      </div>
    </div>
  )
}

const UserListSceleton: FC = () => {

  return (
    <>
      {[1,2,3].map((_, index) => (
        <UserCardSceleton key={index} />
      ))}
    </>
  )
}

interface ULProps<T extends OnlyUser> {
  users: T[],
  isFetching: boolean,
  isError: boolean,
  mapUser: (user: T, index: number) => React.ReactNode | React.ReactNode[],
  className?: string,
  emptyHolder?: React.ReactNode,
}
export function UserList<T extends OnlyUser>({ 
  users, 
  isFetching, 
  isError, 
  mapUser, 
  className, 
  emptyHolder = 'Nothing here'
} : ULProps<T>) {

  return (
    <div className={["user-list", className].join(' ')}>
      <SharedUiHelpers.ErrorLoader
        isLoading={isFetching}
        isError={isError}
        loadingSceleton={<UserListSceleton />}
        emptyHolder={emptyHolder}
        isEmpty={!Boolean(users.length)}
        emptyClassname="user-list-empty"
        iconSize={40}
      >
        {users.map(mapUser)}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}