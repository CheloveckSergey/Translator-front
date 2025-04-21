import { FC } from "react"
import { SharedButtons } from "../../../shared/sharedUi/buttons"
import { FriendsFeaturesLib } from "../lib"
import './styles.scss'

// interface SRBProps {
//   fromUserId: number,
//   toUserId: number,
//   queryKey: string[],
//   className?: string,
// }
// const SendRequestButton: FC<SRBProps> = ({ fromUserId, toUserId, queryKey, className }) => {

//   const { mutateAsync, isPending, isError } = FriendsFeaturesLib.useSendRequest(fromUserId, toUserId, queryKey)

//   return (
//     <SharedButtons.SquareActionButton
//       body='Send request'
//       onClick={() => mutateAsync()}
//       isLoading={isPending}
//       isError={isError}
//       color="green"
//       className={["friend-feature-button", className].join(' ')}
//     />
//   )
// }

// interface CRBProps {
//   fromUserId: number,
//   toUserId: number,
//   queryKey: string[],
//   className?: string,
// }
// const CancelRequestButton: FC<CRBProps> = ({ fromUserId, toUserId, queryKey, className }) => {

//   const { mutateAsync, isPending, isError } = FriendsFeaturesLib.useCancelRequest(fromUserId, toUserId, queryKey)

//   return (
//     <SharedButtons.SquareActionButton
//       body='Cancel'
//       onClick={() => mutateAsync()}
//       isLoading={isPending}
//       isError={isError}
//       color="grey"
//       className={["friend-feature-button", className].join(' ')}
//     />
//   )
// }

// interface ARBProps {
//   fromUserId: number,
//   toUserId: number,
//   queryKey: string[],
//   className?: string,
// }
// const AcceptRequestButton: FC<ARBProps> = ({ fromUserId, toUserId, queryKey, className }) => {

//   const { mutateAsync, isPending, isError } = FriendsFeaturesLib.useAcceptRequest(fromUserId, toUserId, queryKey);

//   return (
//     <SharedButtons.SquareActionButton
//       body='Accept'
//       onClick={() => mutateAsync()}
//       isLoading={isPending}
//       isError={isError}
//       color="green"
//       className={["friend-feature-button", className].join(' ')}
//     />
//   )
// }

// interface RRBProps {
//   fromUserId: number,
//   toUserId: number,
//   queryKey: string[],
//   className?: string,
// }
// const RejectRequestButton: FC<RRBProps> = ({ fromUserId, toUserId, queryKey, className }) => {

//   const { mutateAsync, isPending, isError } = FriendsFeaturesLib.useRejectRequest(fromUserId, toUserId, queryKey);

//   return (
//     <SharedButtons.SquareActionButton
//       body='Reject'
//       onClick={() => mutateAsync()}
//       isLoading={isPending}
//       isError={isError}
//       color="grey"
//       className={["friend-feature-button", className].join(' ')}
//     />
//   )
// }

// interface DFBProps {
//   fromUserId: number,
//   toUserId: number,
//   queryKey: string[],
//   className?: string,
// }
// const DeleteFriendButton: FC<DFBProps> = ({ fromUserId, toUserId, queryKey, className }) => {

//   const { mutateAsync, isPending, isError } = FriendsFeaturesLib.useDeleteFriend(fromUserId, toUserId, queryKey);

//   return (
//     <SharedButtons.SquareActionButton
//       body='Delete'
//       onClick={() => mutateAsync()}
//       isLoading={isPending}
//       isError={isError}
//       color="grey"
//       className={["friend-feature-button", className].join(' ')}
//     />
//   )
// }

// interface CDBProps {
//   fromUserId: number,
//   toUserId: number,
//   queryKey: string[],
//   className?: string,
// }
// const CancelDeleteButton: FC<CDBProps> = ({ fromUserId, toUserId, queryKey, className }) => {

//   const { mutateAsync, isPending, isError } = FriendsFeaturesLib.useCancelDeleteFriend(fromUserId, toUserId, queryKey);

//   return (
//     <SharedButtons.SquareActionButton
//       body='Cancel'
//       onClick={() => mutateAsync()}
//       isLoading={isPending}
//       isError={isError}
//       color="grey"
//       className={["friend-feature-button", className].join(' ')}
//     />
//   )
// }
interface SRBProps {
  fromUserId: number,
  toUserId: number,
  sendRequest: () => void,
  className?: string,
}
const SendRequestButton: FC<SRBProps> = ({ fromUserId, toUserId, sendRequest, className }) => {

  const { mutateAsync, isPending, isError } = FriendsFeaturesLib.useSendRequest(fromUserId, toUserId, sendRequest)

  return (
    <SharedButtons.SquareActionButton
      body='Send request'
      onClick={() => mutateAsync()}
      isLoading={isPending}
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

  const { mutateAsync, isPending, isError } = FriendsFeaturesLib.useCancelRequest(fromUserId, toUserId, cancelRequest)

  return (
    <SharedButtons.SquareActionButton
      body='Cancel'
      onClick={() => mutateAsync()}
      isLoading={isPending}
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

  const { mutateAsync, isPending, isError } = FriendsFeaturesLib.useAcceptRequest(fromUserId, toUserId, acceptRequest);

  return (
    <SharedButtons.SquareActionButton
      body='Accept'
      onClick={() => mutateAsync()}
      isLoading={isPending}
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

  const { mutateAsync, isPending, isError } = FriendsFeaturesLib.useRejectRequest(fromUserId, toUserId, rejectRequest);

  return (
    <SharedButtons.SquareActionButton
      body='Reject'
      onClick={() => mutateAsync()}
      isLoading={isPending}
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

  const { mutateAsync, isPending, isError } = FriendsFeaturesLib.useDeleteFriend(fromUserId, toUserId, deleteFriend);

  return (
    <SharedButtons.SquareActionButton
      body='Delete'
      onClick={() => mutateAsync()}
      isLoading={isPending}
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

  const { mutateAsync, isPending, isError } = FriendsFeaturesLib.useCancelDeleteFriend(fromUserId, toUserId, cancelDeleteFriend);

  return (
    <SharedButtons.SquareActionButton
      body='Cancel'
      onClick={() => mutateAsync()}
      isLoading={isPending}
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