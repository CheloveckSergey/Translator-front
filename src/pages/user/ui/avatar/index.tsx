import { FC } from "react";
import './styles.scss';
import { useAppSelector } from "../../../../app/store";
import { AvatarUser } from "../../../../entities/user";
import { FriendsFeaturesLib, FriendsFeaturesUi } from "../../../../features/friendship";
import { UserUi, UserUiTypes } from "../../../../entities/user/ui";

interface AProps {
  user: AvatarUser | undefined,
  isLoading: boolean,
  isError: boolean,
  updateState: () => void,
}
export const Avatar: FC<AProps> = ({ user, isLoading, isError, updateState }) => {

  const { user: meUser } = useAppSelector(state => state.user);

  // const deleteFeature = FriendsFeaturesLib.useDeleteFriend(user!.id, meUser!.id, deleteFriend);
  // const acceptFeature = FriendsFeaturesLib.useAcceptRequest(user!.id, meUser!.id, acceptRequest);
  // const cancelFeature = FriendsFeaturesLib.useCancelRequest(user!.id, meUser!.id, cancelRequest);
  // const sendFeature = FriendsFeaturesLib.useSendRequest(user!.id, meUser!.id, sendRequest);

  function acceptRequest() {
    user?.setIsFriend(true);
    updateState();
  }

  function cancelRequest() {
    user?.setRequestStatus(undefined);
    updateState();
  }
  function sendRequest() {
    user?.setRequestStatus('sentTo');
    updateState();
  }

  function deleteFriend() {
    user?.setIsFriend(false);
    user?.setRequestStatus(undefined);
    updateState();
  }

  const actions: UserUiTypes.AvatarTypes.FeatureBlock[] = [];
  
  // if (meUser && user) {
  //   let action: UserUiTypes.AvatarTypes.FeatureBlock;

  //   if (user.isFriend) {
  //     action = {
  //       type: 'action',
  //       body: 'Delete friend',
  //       description: 'The friend of yours',
  //       mutate: () => deleteFeature.mutate(),
  //       isLoading: deleteFeature.isPending,
  //       isError: deleteFeature.isError,
  //     }
  //   } else if (user.requestStatus === 'sentFrom') {
  //     action = {
  //       type: 'action',
  //       body: 'Accept request',
  //       description: 'Sent you request',
  //       mutate: () => acceptFeature.mutate(),
  //       isLoading: acceptFeature.isPending,
  //       isError: acceptFeature.isError,
  //     }
  //   } else if (user.requestStatus === 'sentFromRejected') {
  //     action = {
  //       type: 'action',
  //       body: 'Accept request',
  //       description: 'You rejected request',
  //       mutate: () => acceptFeature.mutate(),
  //       isLoading: acceptFeature.isPending,
  //       isError: acceptFeature.isError,
  //     }
  //   } else if (user.requestStatus === 'sentTo') {
  //     action = {
  //       type: 'action',
  //       body: 'Cancel request',
  //       description: 'You sent request',
  //       mutate: () => cancelFeature.mutate(),
  //       isLoading: cancelFeature.isPending,
  //       isError: cancelFeature.isError,
  //     }
  //   } else if (user.requestStatus === 'sentToRejected') {
  //     action = {
  //       type: 'description',
  //       description: "You've been rejected",
  //     }
  //   } else {
  //     action = {
  //       type: 'action',
  //       body: 'Send request',
  //       mutate: () => sendFeature.mutate(),
  //       isLoading: sendFeature.isPending,
  //       isError: sendFeature.isError,
  //     }
  //   }

  //   actions.push(action);
  // }

  return (
    <UserUi.UserAvatar
      user={user}
      isLoading={isLoading}
      isError={isError}
      featureBlocks={actions}
      className="user-avatar"
    />
  )
}