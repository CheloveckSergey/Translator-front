import { FC } from "react";
import { User, UserLib, UserUi } from "../../../../entities/user";
import { useAppSelector } from "../../../../app/store";
import './styles.scss';

interface FCWProps {
  user: User,
}
export const FriendCardWidget: FC<FCWProps> = ({ user }) => {

  return (
    <UserUi.FriendCard
      user={user}
    />
  )
}

interface FLWProps {

}
export const FriendListWidget: FC<FLWProps> = () => {

  const { user: meUser } = useAppSelector(state => state.user);

  const { data, isLoading, isError, error } = UserLib.useFriends({
    userId: meUser!.id,
    limit: 6,
  })

  return (
    <div className="friend-list-widget">
      <h2>Friends</h2>
      <UserUi.FriendsList
        users={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        mapUsers={(user: User, index: number) => <FriendCardWidget key={index} user={user} />}
        className="friends-list"
      />
    </div>
  )
}