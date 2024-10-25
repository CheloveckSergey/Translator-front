import { FC } from "react";
import { User } from "../../../entities/user";
import { useAppSelector } from "../../../app/store";
import { SharedUiHelpers } from "../../../shared/sharedUi/helpers";
import { FriendsFeaturesUi } from "../../../features/friendship";
import './styles.scss';

interface HProps {
  user: User | undefined,
  isLoading: boolean,
  isError: boolean,
  updateState: () => void,
}
export const Header: FC<HProps> = ({ user, isLoading, isError, updateState }) => {

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
          <h4 className="login">{user.login}</h4>
          {user.isFriend ? (
            <div className="request-block">
              <p>Friend of yours</p>
              <FriendsFeaturesUi.DeleteFriendBlock
                fromUserId={user.id}
                toUserId={meUser!.id}
                deleteFriend={deleteFriend}
              />
            </div>
          ) : user.isSentRequest === 'sentFrom' ? (
            <div className="request-block">
              <p>Sent you request</p>
              <FriendsFeaturesUi.AcceptRequestBlock
                fromUserId={user.id}
                toUserId={meUser!.id}
                acceptRequest={acceptRequest}
              />
            </div>
          ) : user.isSentRequest === 'sentTo' ? (
            <div className="request-block">
              <p>You've sent request</p>
              <FriendsFeaturesUi.CancelRequestBlock
                fromUserId={meUser!.id}
                toUserId={user.id}
                cancelRequest={cancelRequest}
              />
            </div>
          ) : !user.isSentRequest && (
            <FriendsFeaturesUi.SendRequestBlock
              fromUserId={meUser!.id}
              toUserId={user.id}
              sendRequest={sendRequest}
            />
          )}
        </>}
      </SharedUiHelpers.ErrorLoader>
    </div>
  )
}