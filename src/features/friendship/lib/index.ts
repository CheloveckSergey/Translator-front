import { useMutation } from "react-query"
import { FriendsApi } from "../../../entities/user"

const useSendRequest = (fromUserId: number, toUserId: number, sendRequest: () => void) => {
  return useMutation(() => {
    return FriendsApi.sendRequest(fromUserId, toUserId)
  }, {
    onSuccess: () => {
      sendRequest();
    }
  })
}

const useCancelRequest = (fromUserId: number, toUserId: number, cancelRequest: () => void) => {
  return useMutation(() => {
    return FriendsApi.cancelRequest(fromUserId, toUserId)
  }, {
    onSuccess: () => {
      cancelRequest();
    }
  })
}

const useAcceptRequest = (fromUserId: number, toUserId: number, acceptRequest: () => void) => {
  return useMutation(() => {
    return FriendsApi.acceptRequest(fromUserId, toUserId)
  }, {
    onSuccess: () => {
      acceptRequest();
    }
  })
}

const useDeleteFriend = (fromUserId: number, toUserId: number, deleteFriend: () => void) => {
  return useMutation(() => {
    return FriendsApi.deleteFriend(fromUserId, toUserId)
  }, {
    onSuccess: () => {
      deleteFriend();
    }
  })
}

const useCancelDeleteFriend = (userId1: number, userId2: number, cancelDeleteFriend: () => void) => {
  return useMutation(() => {
    return FriendsApi.cancelDeleteFriend(userId1, userId2)
  }, {
    onSuccess: () => {
      cancelDeleteFriend();
    }
  })
}

const useRejectRequest = (fromUserId: number, toUserId: number, rejectRequest: () => void) => {
  return useMutation(() => {
    return FriendsApi.rejectRequest(fromUserId, toUserId)
  }, {
    onSuccess: () => {
      rejectRequest();
    }
  })
}

export const FriendsFeaturesLib = {
  useSendRequest,
  useCancelRequest,
  useAcceptRequest,
  useDeleteFriend,
  useCancelDeleteFriend,
  useRejectRequest,
}