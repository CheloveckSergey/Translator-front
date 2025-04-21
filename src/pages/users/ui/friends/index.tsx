import { FC } from 'react';
import { Friend } from '../../../../entities/user';
import './styles.scss'
import { useAppSelector } from '../../../../app/store';
import { UserUi } from '../../../../entities/user/ui';
import { FriendsFeaturesUi } from '../../../../features/friendship';
import { UserLib } from '../../../../entities/user';

// interface FCWProps {
//   user: Friend,
//   queryKey: string[],
// }
// const FriendCardWidget: FC<FCWProps> = ({ user, queryKey }) => {

//   const { user: meUser } = useAppSelector(state => state.user);

//   let description: string = '';
//   const actions: React.ReactNode[] = [];

//   if (user.isDeleted) {
//     description = 'Пользователён удалён';
//     actions.push(
//       <FriendsFeaturesUi.CancelDeleteButton
//         fromUserId={meUser!.id}
//         toUserId={user.id}
//         queryKey={queryKey}
//       />
//     );
//   } else {
//     actions.push(
//       <FriendsFeaturesUi.DeleteFriendButton
//         fromUserId={meUser!.id}
//         toUserId={user.id}
//         queryKey={queryKey}
//       />
//     )
//   }

//   return (
//     <UserUi.UserCard<Friend>
//       user={user}
//       description={description}
//       actions={actions}
//     />
//   )
// }

// export const FriendsListWidget: FC = () => {

//   const { user } = useAppSelector(state => state.user);

//   const {
//     data: users,
//     isFetching,
//     isError,
//     hasNextPage,
//     isFetchingNextPage,
//     fetchNextPage,
//     queryKey,
//   } = UserLib.useFriends({ limit: 5, order: 'DESC', userId: user!.id });

//   return (
//     <UserUi.UserList<Friend>
//       users={users}
//       isFetching={isFetching}
//       isError={isError}
//       mapUser={(user: Friend, index: number) => <FriendCardWidget 
//         key={index}
//         user={user}
//         queryKey={queryKey}
//       />}
//       className="user-list-widget"
//     />
//   )
// }

interface FCWProps {
  user: Friend,
  updateState: () => void,
}
const FriendCardWidget: FC<FCWProps> = ({ user, updateState }) => {

  const { user: meUser } = useAppSelector(state => state.user);

  function deleteFriend() {
    user.setIsDeleted(true);
    updateState()
  }

  function cancelDeleteFriend() {
    user.setIsDeleted(false);
    updateState()
  }

  let description: string = '';
  const actions: React.ReactNode[] = [];

  if (user.isDeleted) {
    description = 'Пользователён удалён';
    actions.push(
      <FriendsFeaturesUi.CancelDeleteButton
        fromUserId={meUser!.id}
        toUserId={user.id}
        cancelDeleteFriend={cancelDeleteFriend}
      />
    );
  } else {
    actions.push(
      <FriendsFeaturesUi.DeleteFriendButton
        fromUserId={meUser!.id}
        toUserId={user.id}
        deleteFriend={deleteFriend}
      />
    )
  }

  return (
    <UserUi.UserCard<Friend>
      user={user}
      description={description}
      actions={actions}
    />
  )
}

export const FriendsListWidget: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    data,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateState,
  } = UserLib.useFriends({ limit: 5, order: 'DESC', userId: user!.id });

  return (
    <UserUi.UserList<Friend>
      users={data}
      isFetching={isFetching}
      isError={isError}
      mapUser={(user: Friend, index: number) => <FriendCardWidget 
        key={index}
        user={user}
        updateState={updateState}
      />}
      className="user-list-widget"
    />
  )
}