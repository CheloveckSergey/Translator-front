import { FC } from "react"
import { SharedButtons } from "../../../shared/sharedUi/buttons"
import { FriendsFeaturesLib } from "../lib"
import './styles.scss'

interface SRBProps {
  fromUserId: number,
  toUserId: number,
  sendRequest: () => void,
}
const SendRequestBlock: FC<SRBProps> = ({ fromUserId, toUserId, sendRequest }) => {

  const { mutateAsync, isLoading, isError } = FriendsFeaturesLib.useSendRequest(fromUserId, toUserId, sendRequest)

  return (
    <div className="friend-feature-block">
      <SharedButtons.GreenButton
        body='Send request'
        onClick={() => mutateAsync()}
        isLoading={isLoading}
        isError={isError}
        className="friend-feature-button"
      />
    </div>
  )
}

interface CRBProps {
  fromUserId: number,
  toUserId: number,
  cancelRequest: () => void,
}
const CancelRequestBlock: FC<CRBProps> = ({ fromUserId, toUserId, cancelRequest }) => {

  const { mutateAsync, isLoading, isError } = FriendsFeaturesLib.useCancelRequest(fromUserId, toUserId, cancelRequest)

  return (
    <div className="friend-feature-block">
      <SharedButtons.SquareButton
        body='Cancel'
        onClick={() => mutateAsync()}
        isLoading={isLoading}
        isError={isError}
        className="friend-feature-button"
        color="grey"
      />
    </div>
  )
}

interface ARBProps {
  fromUserId: number,
  toUserId: number,
  acceptRequest: () => void,
}
const AcceptRequestBlock: FC<ARBProps> = ({ fromUserId, toUserId, acceptRequest }) => {

  const { mutateAsync, isLoading, isError } = FriendsFeaturesLib.useAcceptRequest(fromUserId, toUserId, acceptRequest);

  return (
    <div className="friend-feature-block">
      <SharedButtons.GreenButton
        body='Accept'
        onClick={() => mutateAsync()}
        isLoading={isLoading}
        isError={isError}
        className="friend-feature-button"
      />
    </div>
  )
}

interface DFBProps {
  fromUserId: number,
  toUserId: number,
  deleteFriend: () => void,
}
const DeleteFriendBlock: FC<DFBProps> = ({ fromUserId, toUserId, deleteFriend }) => {

  const { mutateAsync, isLoading, isError } = FriendsFeaturesLib.useDeleteFriend(fromUserId, toUserId, deleteFriend);

  return (
    <div className="friend-feature-block">
      <SharedButtons.GreenButton
        body='Delete'
        onClick={() => mutateAsync()}
        isLoading={isLoading}
        isError={isError}
        className="friend-feature-button"
      />
    </div>
  )
}

interface CDBProps {
  fromUserId: number,
  toUserId: number,
  cancelDeleteFriend: () => void,
}
const CancelDeleteBlock: FC<CDBProps> = ({ fromUserId, toUserId, cancelDeleteFriend }) => {

  const { mutateAsync, isLoading, isError } = FriendsFeaturesLib.useCancelDeleteFriend(fromUserId, toUserId, cancelDeleteFriend);

  return (
    <div className="friend-feature-block">
      <p>Friend's been deleted</p>
      <SharedButtons.SquareButton
        body='Cancel'
        onClick={() => mutateAsync()}
        isLoading={isLoading}
        isError={isError}
        className="friend-feature-button"
        color="grey"
      />
    </div>
  )
}

interface RRBProps {
  fromUserId: number,
  toUserId: number,
  rejectRequest: () => void,
}
const RejectRequestButton: FC<RRBProps> = ({ fromUserId, toUserId, rejectRequest }) => {

  const { mutateAsync, isLoading, isError } = FriendsFeaturesLib.useRejectRequest(fromUserId, toUserId, rejectRequest);

  return (
    <SharedButtons.SquareButton
      body='Reject'
      onClick={() => mutateAsync()}
      isLoading={isLoading}
      isError={isError}
      className="friend-feature-button"
      color="grey"
    />
  )
}

export const FriendsFeaturesUi = {
  SendRequestBlock,
  CancelRequestBlock,
  AcceptRequestBlock,
  DeleteFriendBlock,
  CancelDeleteBlock,
  RejectRequestButton,
}