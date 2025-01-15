import { FC } from "react";
import './styles.scss';
import { useAppSelector } from "../../../../app/store";
import { User } from "../../../../entities/user";
import { FriendsFeaturesUi } from "../../../../features/friendship";
import { UserUi } from "../../../../entities/user/ui";

interface AProps {
  user: User | undefined,
  isLoading: boolean,
  isError: boolean,
  updateState: () => void,
}
export const Avatar: FC<AProps> = ({ user, isLoading, isError, updateState }) => {

  const { user: meUser } = useAppSelector(state => state.user);

  function acceptRequest() {
    user?.setIsFriend(true);
    updateState();
  }

  function cancelRequest() {
    user?.setIsSentRequest(undefined);
    updateState();
  }
  function sendRequest() {
    user?.setIsSentRequest('sentTo');
    updateState();
  }

  function deleteFriend() {
    user?.setIsFriend(false);
    user?.setIsSentRequest(undefined);
    updateState();
  }

  const actions: React.ReactNode[] = [];
  
  if (meUser && user) {
    let block: React.ReactNode | undefined;

    if (user.isFriend) {
      block = (
        <>
          <FriendsFeaturesUi.DeleteFriendButton
            fromUserId={user.id}
            toUserId={meUser.id}
            deleteFriend={deleteFriend}
            className="friendship-button"
          />
          <span className="description">The friend of yours</span>
        </>
      )
    } else if (user.isSentRequest === 'sentFrom') {
      block = (
        <>
          <FriendsFeaturesUi.AcceptRequestButton 
            fromUserId={user.id}
            toUserId={meUser.id}
            acceptRequest={acceptRequest}
            className="friendship-button"
          />
          <span className="description">Sent you request</span>
        </>
      );
    } else if (user.isSentRequest === 'sentTo') {
      block = (
        <>
          <FriendsFeaturesUi.CancelRequestButton
            fromUserId={meUser.id}
            toUserId={user.id}
            cancelRequest={cancelRequest}
            className="friendship-button"
          />
          <span className="description">You sent request</span>
        </>
      )
    } else {
      block = (
        <FriendsFeaturesUi.SendRequestButton
          fromUserId={meUser.id}
          toUserId={user.id}
          sendRequest={sendRequest}
          className="friendship-button"
        />
      )
    }

    actions.push(block);
  }


  return (
    <UserUi.UserAvatar
      user={user}
      isLoading={isLoading}
      isError={isError}
      actions={actions}
      className="user-avatar"
    />
  )
}