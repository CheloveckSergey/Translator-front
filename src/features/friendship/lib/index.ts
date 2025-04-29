import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Friend, FriendsApi, IncomeRequestUser, PotentialFriend, SendRequestable, userKeys } from "../../../entities/user"

// const useSendRequest = (fromUserId: number, toUserId: number, key: string[]) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => {
//       return FriendsApi.sendRequest(fromUserId, toUserId)
//     },
//     onSuccess: () => {
//       queryClient.setQueryData(
//         key, 
//         (old: PotentialFriend[]) => {
//           return old.map(user => {
//             if (user.id === toUserId) {
//               user.setIsSentRequest(true);
//               return user
//             } else {
//               return user
//             }
//           })
//         }
//       );
//     },
//   })
// }

// const useCancelRequest = (fromUserId: number, toUserId: number, key: string[]) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => {
//       return FriendsApi.cancelRequest(fromUserId, toUserId)
//     },
//     onSuccess: () => {
//       queryClient.setQueryData(
//         key, 
//         (old: SendRequestable[]) => {
//           return old.map(user => {
//             if (user.id === toUserId) {
//               user.setIsSentRequest(false);
//               return user
//             } else {
//               return user
//             }
//           })
//         }
//       );
//     },
//   })
// }

// const useAcceptRequest = (fromUserId: number, toUserId: number, key: string[]) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => {
//       return FriendsApi.acceptRequest(fromUserId, toUserId)
//     },
//     onSuccess: () => {
//       queryClient.setQueryData(
//         key, 
//         (old: IncomeRequestUser[]) => {
//           return old.map(user => {
//             if (user.id === fromUserId) {
//               user.setStatus('accepted');
//               return user
//             } else {
//               return user
//             }
//           })
//         }
//       );
//     },
//   })
// }

// const useDeleteFriend = (fromUserId: number, toUserId: number, key: string[]) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => {
//       return FriendsApi.deleteFriend(fromUserId, toUserId)
//     },
//     onSuccess: () => {
//       queryClient.setQueryData(
//         key, 
//         (old: Friend[]) => {
//           return old.map(user => {
//             if (user.id === toUserId) {
//               user.setIsDeleted(true);
//               return user
//             } else {
//               return user
//             }
//           })
//         }
//       );
//     },
//   })
// }

// const useCancelDeleteFriend = (userId1: number, userId2: number, key: string[]) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => {
//       return FriendsApi.cancelDeleteFriend(userId1, userId2)
//     },
//     onSuccess: () => {
//       queryClient.setQueryData(
//         key, 
//         (old: Friend[]) => {
//           return old.map(user => {
//             if (user.id === userId2) {
//               user.setIsDeleted(false);
//               return user
//             } else {
//               return user
//             }
//           })
//         }
//       );
//     },
//   })
// }

// const useRejectRequest = (fromUserId: number, toUserId: number, key: string[]) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => {
//       return FriendsApi.rejectRequest(fromUserId, toUserId)
//     },
//     onSuccess: () => {
//       queryClient.setQueryData(
//         key, 
//         (old: IncomeRequestUser[]) => {
//           return old.map(user => {
//             if (user.id === fromUserId) {
//               user.setStatus('rejected');
//               return user
//             } else {
//               return user
//             }
//           })
//         }
//       );
//     },
//   })
// }
const useSendRequest = (fromUserId: number, toUserId: number, sendRequest: () => void) => {
  return useMutation({
    mutationFn: () => {
      return FriendsApi.sendRequest(fromUserId, toUserId)
    },
    onSuccess: () => {
      sendRequest();
    },
  })
}

const useCancelRequest = (fromUserId: number, toUserId: number, cancelRequest: () => void) => {
  return useMutation({
    mutationFn: () => {
      return FriendsApi.cancelRequest(fromUserId, toUserId)
    },
    onSuccess: () => {
      cancelRequest();
    },
  })
}

const useAcceptRequest = (fromUserId: number, toUserId: number, acceptRequest: () => void) => {
  return useMutation({
    mutationFn: () => {
      return FriendsApi.acceptRequest(fromUserId, toUserId)
    },
    onSuccess: () => {
      acceptRequest();
    },
  })
}

const useDeleteFriend = (fromUserId: number, toUserId: number, deleteFriend: () => void) => {
  // const queryClient = useQueryClient();
  // const queryKey = userKeys.friends.slug(fromUserId);
  // console.log(queryKey);

  return useMutation({
    mutationFn: () => {
      return FriendsApi.deleteFriend(fromUserId, toUserId)
    },
    onSuccess: () => {
      // queryClient.setQueryData(
      //   queryKey, 
      //   (old: Friend[]) => {
      //     console.log(old);
      //     if (!old) {
      //       return undefined
      //     }
      //     return old.map(user => {
      //       if (user.id === toUserId) {
      //         user.setIsDeleted(true);
      //         return user
      //       } else {
      //         return user
      //       }
      //     })
      //   }
      // );
      deleteFriend();
    },
  })
}

const useCancelDeleteFriend = (userId1: number, userId2: number, cancelDeleteFriend: () => void) => {
  return useMutation({
    mutationFn: () => {
      return FriendsApi.cancelDeleteFriend(userId1, userId2)
    },
    onSuccess: () => {
      cancelDeleteFriend();
    },
  })
}

const useRejectRequest = (fromUserId: number, toUserId: number, rejectRequest: () => void) => {
  return useMutation({
    mutationFn: () => {
      return FriendsApi.rejectRequest(fromUserId, toUserId)
    },
    onSuccess: () => {
      rejectRequest();
    },
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