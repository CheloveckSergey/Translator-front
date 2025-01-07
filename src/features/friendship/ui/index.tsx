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
      <SharedButtons.SquareActionButton
        body='Send request'
        onClick={() => mutateAsync()}
        isLoading={isLoading}
        isError={isError}
        color="green"
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
      <SharedButtons.SquareActionButton
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
      <SharedButtons.SquareActionButton
        body='Accept'
        onClick={() => mutateAsync()}
        isLoading={isLoading}
        isError={isError}
        color='green'
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
      <SharedButtons.SquareActionButton
        body='Delete'
        onClick={() => mutateAsync()}
        isLoading={isLoading}
        isError={isError}
        color="grey"
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
      <SharedButtons.SquareActionButton
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

interface SRBProps {
  fromUserId: number,
  toUserId: number,
  sendRequest: () => void,
  className?: string,
}
const SendRequestButton: FC<SRBProps> = ({ fromUserId, toUserId, sendRequest, className }) => {

  const { mutateAsync, isLoading, isError } = FriendsFeaturesLib.useSendRequest(fromUserId, toUserId, sendRequest)

  return (
    <SharedButtons.SquareActionButton
      body='Send request'
      onClick={() => mutateAsync()}
      isLoading={isLoading}
      isError={isError}
      color="green"
      className={["friend-feature-button", className].join(' ')}
    />
  )
}

interface CRBProps {
  fromUserId: number,
  toUserId: number,
  cancelRequest: () => void,
  className?: string,
}
const CancelRequestButton: FC<CRBProps> = ({ fromUserId, toUserId, cancelRequest, className }) => {

  const { mutateAsync, isLoading, isError } = FriendsFeaturesLib.useCancelRequest(fromUserId, toUserId, cancelRequest)

  return (
    <SharedButtons.SquareActionButton
      body='Cancel'
      onClick={() => mutateAsync()}
      isLoading={isLoading}
      isError={isError}
      color="grey"
      className={["friend-feature-button", className].join(' ')}
    />
  )
}

interface ARBProps {
  fromUserId: number,
  toUserId: number,
  acceptRequest: () => void,
  className?: string,
}
const AcceptRequestButton: FC<ARBProps> = ({ fromUserId, toUserId, acceptRequest, className }) => {

  const { mutateAsync, isLoading, isError } = FriendsFeaturesLib.useAcceptRequest(fromUserId, toUserId, acceptRequest);

  return (
    <SharedButtons.SquareActionButton
      body='Accept'
      onClick={() => mutateAsync()}
      isLoading={isLoading}
      isError={isError}
      color="green"
      className={["friend-feature-button", className].join(' ')}
    />
  )
}

interface RRBProps {
  fromUserId: number,
  toUserId: number,
  rejectRequest: () => void,
  className?: string,
}
const RejectRequestButton: FC<RRBProps> = ({ fromUserId, toUserId, rejectRequest, className }) => {

  const { mutateAsync, isLoading, isError } = FriendsFeaturesLib.useRejectRequest(fromUserId, toUserId, rejectRequest);

  return (
    <SharedButtons.SquareActionButton
      body='Reject'
      onClick={() => mutateAsync()}
      isLoading={isLoading}
      isError={isError}
      color="grey"
      className={["friend-feature-button", className].join(' ')}
    />
  )
}

interface DFBProps {
  fromUserId: number,
  toUserId: number,
  deleteFriend: () => void,
  className?: string,
}
const DeleteFriendButton: FC<DFBProps> = ({ fromUserId, toUserId, deleteFriend, className }) => {

  const { mutateAsync, isLoading, isError } = FriendsFeaturesLib.useDeleteFriend(fromUserId, toUserId, deleteFriend);

  return (
    <SharedButtons.SquareActionButton
      body='Delete'
      onClick={() => mutateAsync()}
      isLoading={isLoading}
      isError={isError}
      color="grey"
      className={["friend-feature-button", className].join(' ')}
    />
  )
}

interface CDBProps {
  fromUserId: number,
  toUserId: number,
  cancelDeleteFriend: () => void,
  className?: string,
}
const CancelDeleteButton: FC<CDBProps> = ({ fromUserId, toUserId, cancelDeleteFriend, className }) => {

  const { mutateAsync, isLoading, isError } = FriendsFeaturesLib.useCancelDeleteFriend(fromUserId, toUserId, cancelDeleteFriend);

  return (
    <SharedButtons.SquareActionButton
      body='Cancel'
      onClick={() => mutateAsync()}
      isLoading={isLoading}
      isError={isError}
      color="grey"
      className={["friend-feature-button", className].join(' ')}
    />
  )
}

export const FriendsFeaturesUi = {
  SendRequestButton,
  CancelRequestButton,
  AcceptRequestButton,
  RejectRequestButton,
  DeleteFriendButton,
  CancelDeleteButton
}