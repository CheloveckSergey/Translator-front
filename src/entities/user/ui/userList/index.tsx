import { FC } from "react";
import { SharedUiHelpers } from "../../../../shared/sharedUi/helpers";
import { OnlyUser } from "../../model/types/onlyUser";
import './styles.scss';
import { UserCardSceleton } from "../userCard";

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
  isLoading: boolean,
  isError: boolean,
  mapUser: (user: T, index: number) => React.ReactNode | React.ReactNode[],
  className?: string,
  emptyHolder?: React.ReactNode,
}
export function UserList<T extends OnlyUser>({ 
  users, 
  isLoading, 
  isError, 
  mapUser, 
  className, 
  emptyHolder = 'Nothing here'
} : ULProps<T>) {

  return (
    <div className={["user-list", className].join(' ')}>
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
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