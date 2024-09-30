import { FC } from 'react';
import { Friend } from '../../../../entities/user/model/friend';
import './styles.scss'
import { useAppSelector } from '../../../../app/store';
import { UserUi } from '../../../../entities/user/ui';
import { FriendsFeaturesUi } from '../../../../features/friendship';
import { UserLib } from '../../../../entities/user';

interface FCWProps {
  user: Friend,
  updateState: () => void,
}
const FriendCardWidget: FC<FCWProps> = ({ user, updateState }) => {

  const { user: meUser } = useAppSelector(state => state.user);

  function deleteFriend() {
    user.setIsFriend(false);
    updateState()
  }

  function cancelDeleteFriend() {
    user.setIsFriend(true);
    updateState()
  }

  return (
    <UserUi.UserCard<Friend>
      user={user}
      actions={[
        (user.isFriend ? (
          <FriendsFeaturesUi.DeleteFriendBlock
            fromUserId={meUser!.id}
            toUserId={user.id}
            deleteFriend={deleteFriend}
          />
        ) : (
          <FriendsFeaturesUi.CancelDeleteBlock
            fromUserId={meUser!.id}
            toUserId={user.id}
            cancelDeleteFriend={cancelDeleteFriend}
          />
        ))
      ]}
    />
  )
}

export const FriendsListWidget: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    users,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateState,
  } = UserLib.useFriends({ limit: 5, order: 'DESC', userId: user!.id });

  return (
    <UserUi.UserList<Friend>
      users={users}
      isLoading={isLoading}
      isError={isError}
      mapUser={(user: Friend, index: number) => <FriendCardWidget 
        key={index}
        user={user}
        updateState={updateState}
      />}
      className="user-list-widget"
    />
  )
}