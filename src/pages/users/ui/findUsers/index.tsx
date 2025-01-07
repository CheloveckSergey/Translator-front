import { FC } from "react";
import { PotentialFriend } from "../../../../entities/user";
import { useAppSelector } from "../../../../app/store";
import { UserUi } from "../../../../entities/user/ui";
import { FriendsFeaturesUi } from "../../../../features/friendship";
import './styles.scss'
import { UserLib } from "../../../../entities/user";

interface UCWProps {
  user: PotentialFriend,
  updateState: () => void,
}
const FindFriendCardWidget: FC<UCWProps> = ({ user, updateState }) => {

  const { user: meUser } = useAppSelector(state => state.user);

  function sendRequest() {
    user.setIsSentRequest(true);
    updateState();
  }

  function cancelRequest() {
    user.setIsSentRequest(false);
    updateState();
  }

  let description: string = '';
  const actions: React.ReactNode[] = [];

  if (user.isSentRequest) {
    description = 'Вы отправили заявку';
    actions.push(
      <FriendsFeaturesUi.CancelRequestButton
        fromUserId={meUser!.id}
        toUserId={user.id}
        cancelRequest={cancelRequest}
      />
    );
  } else {
    actions.push(
      <FriendsFeaturesUi.SendRequestButton
        fromUserId={meUser!.id}
        toUserId={user.id}
        sendRequest={sendRequest}
      />
    )
  }

  return (
    <UserUi.UserCard<PotentialFriend>
      user={user}
      description={description}
      actions={actions}
    />
  )
}

export const FindFriendsListWidget: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    users,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateState
  } = UserLib.useFindFriends({ limit: 5, order: 'DESC', userId: user!.id });

  return (
    <UserUi.UserList<PotentialFriend>
      users={users}
      isLoading={isLoading}
      isError={isError}
      mapUser={(user: PotentialFriend, index: number) => <FindFriendCardWidget 
        key={index}
        user={user}
        updateState={updateState}
      />}
      className="user-list-widget"
    />
  )
}
