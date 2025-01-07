import { FC } from "react";
import { User } from "../../model";
import './styles.scss';
import { SharedButtons } from "../../../../shared/sharedUi/buttons";
import { OnlyUser } from "../../model/types/onlyUser";
import { useNavigate } from "react-router-dom";

export const UserCardSceleton: FC = () => {

  return (
    <div className="user-card-sceleton" />
  )
}

interface UCProps<T extends OnlyUser> {
  user: T,
  actions: React.ReactNode | React.ReactNode[],
  description?: string | undefined,
}
export function UserCard<T extends OnlyUser>({ user, actions, description } : UCProps<T>) {

  const navigate = useNavigate();

  return (
    <div className="user-card">
      <div className="main-user-card">
        <h4 
          className="login"
          onClick={() => navigate('/users/' + user.id)}
        >
          {user.login}
        </h4>
      </div>
      <div className="actions">
        {description && <span>{description}</span>}
        {actions}
      </div>
    </div>
  )
}