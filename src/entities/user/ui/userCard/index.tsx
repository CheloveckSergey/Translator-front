import { FC } from "react";
import { User } from "../../model";
import './styles.scss';
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { OnlyUser } from "../../model/onlyUser";

interface UCProps<T extends OnlyUser> {
  user: T,
  actions: React.ReactNode | React.ReactNode[],
}
export function UserCard<T extends OnlyUser>({ user, actions } : UCProps<T>) {

  return (
    <div className="user-card">
      <div className="main-user-card">
        <h4 className="login">{user.login}</h4>
      </div>
      <div className="actions">
        {actions}
      </div>
    </div>
  )
}