import { FC } from "react";
import { IncomeRequestUser, UserLib, UserUi } from "../../../../entities/user";
import { useAppSelector } from "../../../../app/store";
import { FriendsFeaturesUi } from "../../../../features/friendship";

interface IRWProps {
  user: IncomeRequestUser,
  updateState: () => void,
}
const IncomeRequestWidget: FC<IRWProps> = ({ user, updateState }) => {

  const { user: meUser } = useAppSelector(state => state.user);

  function acceptRequest() {
    user.setStatus('accepted');
    updateState();
  }

  function rejectRequest() {
    user.setStatus('rejected');
    updateState();
  }

  let description: string = '';
  const actions: React.ReactNode[] = [];

  if (user.status === 'accepted') {
    description = 'Accepted';
  } else {
    if (user.status === 'rejected') {
      description = 'Rejected';
    } else {
      actions.push((
        <FriendsFeaturesUi.RejectRequestButton
          fromUserId={user.id}
          toUserId={(meUser!.id)}
          rejectRequest={rejectRequest}
        />
      ))
    }
    actions.push((
      <FriendsFeaturesUi.AcceptRequestButton
        fromUserId={user.id}
        toUserId={meUser!.id}
        acceptRequest={acceptRequest}
      />
    ))
  }

  return (
    <UserUi.UserCard<IncomeRequestUser>
      user={user}
      description={description}
      actions={actions}
    />
  )
}

export const IncomeRequests: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    data,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateState
  } = UserLib.useIncomeRequests({ limit: 5, order: 'DESC', userId: user!.id });

  return (
    <UserUi.UserList<IncomeRequestUser>
      users={data}
      isFetching={isFetching}
      isError={isError}
      mapUser={(user: IncomeRequestUser, index: number) => <IncomeRequestWidget 
        key={index}
        user={user}
        updateState={updateState}
      />}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      className="user-list"
    />
  )
}