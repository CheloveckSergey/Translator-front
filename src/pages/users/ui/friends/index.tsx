import { FC } from "react";
import { FindFriend } from "../../../../entities/user/model/findFriend";
import { useAppSelector } from "../../../../app/store";
import { UserUi } from "../../../../entities/user/ui";
import { FriendsFeaturesUi } from "../../../../features/friendship";
import './styles.scss'
import { UserLib } from "../../../../entities/user";

interface UCWProps {
  user: FindFriend,
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

  return (
    <UserUi.UserCard<FindFriend>
      user={user}
      actions={[
        (user.isSentRequest ? (
          <FriendsFeaturesUi.CancelRequestBlock
            fromUserId={meUser!.id}
            toUserId={user.id}
            cancelRequest={cancelRequest}
          />
        ) : (
          <FriendsFeaturesUi.SendRequestBlock
            fromUserId={meUser!.id}
            toUserId={user.id}
            sendRequest={sendRequest}
          />
        ))
      ]}
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
    <UserUi.UserList<FindFriend>
      users={users}
      isLoading={isLoading}
      isError={isError}
      mapUser={(user: FindFriend, index: number) => <FindFriendCardWidget 
        key={index}
        user={user}
        updateState={updateState}
      />}
      className="user-list-widget"
    />
  )
}