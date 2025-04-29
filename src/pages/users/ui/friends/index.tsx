import { FC } from 'react';
import { Friend } from '../../../../entities/user';
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

  let description: string = '';
  const actions: React.ReactNode[] = [];

  if (!user.isFriend) {
    description = 'Пользователён удалён';
    actions.push(
      <FriendsFeaturesUi.CancelDeleteButton
        fromUserId={meUser!.id}
        toUserId={user.id}
        cancelDeleteFriend={cancelDeleteFriend}
      />
    );
  } else {
    actions.push(
      <FriendsFeaturesUi.DeleteFriendButton
        fromUserId={meUser!.id}
        toUserId={user.id}
        deleteFriend={deleteFriend}
      />
    )
  }

  return (
    <UserUi.UserCard<Friend>
      user={user}
      description={description}
      actions={actions}
    />
  )
}

export const FriendsListWidget: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    data,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateState,
  } = UserLib.useFriends({ limit: 5, order: 'DESC', userId: user!.id, wordsNumber: true });

  return (
    <UserUi.UserList<Friend>
      users={data}
      isFetching={isFetching}
      isError={isError}
      mapUser={(user: Friend, index: number) => <FriendCardWidget 
        key={index}
        user={user}
        updateState={updateState}
      />}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      className="user-list-widget"
    />
  )
}