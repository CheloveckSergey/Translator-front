import { FC } from "react";
import { User } from "../../../entities/user";
import { useAppSelector } from "../../../app/store";
import { SharedUiHelpers } from "../../../shared/sharedUi/helpers";
import { FriendsFeaturesUi } from "../../../features/friendship";
import './styles.scss';

interface FRBProps {
  user: User,
  meUserId: number,
  updateState: () => void,
}
const FriendRequestBlock: FC<FRBProps> = ({ user, meUserId, updateState }) => {

  function acceptRequest() {
    user.setIsFriend(true);
    updateState();
  }

  function cancelRequest() {
    user.setIsSentRequest(undefined);
    updateState();
  }

  function sendRequest() {
    user.setIsSentRequest('sentTo');
    updateState();
  }

  function deleteFriend() {
    user.setIsFriend(false);
    user.setIsSentRequest(undefined);
    updateState();
  }

  if (user.isFriend) {
    return (
      <div className="request-block">
        <p>Friend of yours</p>
        <FriendsFeaturesUi.DeleteFriendBlock
          fromUserId={user.id}
          toUserId={meUserId}
          deleteFriend={deleteFriend}
        />
      </div>
    )
  }
  
  if (user.isSentRequest === 'sentFrom') {
    return (
      <div className="request-block">
        <p>Sent you request</p>
        <FriendsFeaturesUi.AcceptRequestBlock
          fromUserId={user.id}
          toUserId={meUserId}
          acceptRequest={acceptRequest}
        />
      </div>
    )
  }
  
  if (user.isSentRequest === 'sentTo') {
    return (
      <div className="request-block">
        <p>You've sent request</p>
        <FriendsFeaturesUi.CancelRequestBlock
          fromUserId={meUserId}
          toUserId={user.id}
          cancelRequest={cancelRequest}
        />
      </div>
    )
  }

  return (
    <FriendsFeaturesUi.SendRequestBlock
      fromUserId={meUserId}
      toUserId={user.id}
      sendRequest={sendRequest}
    />
  )
}

interface HProps {
  user: User | undefined,
  isLoading: boolean,
  isError: boolean,
  updateState: () => void,
}
export const Header: FC<HProps> = ({ user, isLoading, isError, updateState }) => {

  const { user: meUser } = useAppSelector(state => state.user);

  return (
    <div className="user-header">
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
        iconSize={50}
        isEmpty={!user}
        emptyHolder='No User'
      >
        {user && <>
          <span className="login">{user.login}</span>
          {meUser && (
            <FriendRequestBlock 
              user={user}
              meUserId={meUser.id}
              updateState={updateState}
            />
          )}
        </>}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}