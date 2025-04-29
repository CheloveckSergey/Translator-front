import { FC } from "react";
import { OutcomeRequestUser, UserLib, UserUi } from "../../../../entities/user";
import { useAppSelector } from "../../../../app/store";
import { FriendsFeaturesUi } from "../../../../features/friendship";

interface ORWProps {
  user: OutcomeRequestUser,
  updateState: () => void,
}
const OutcomeRequestWidget: FC<ORWProps> = ({ user, updateState }) => {

  const { user: meUser } = useAppSelector(state => state.user);

  function cancelRequests() {
    user.setIsSentRequest(false);
    updateState();
  }

  let description: string = '';
  const actions: React.ReactNode[] = [];

  if (!user.isSentRequest) {
    description = "You've canceled your request";
  } else {
    if (user.status === 'rejected') {
      description = "You've been rejected";
    }
    actions.push((
      <FriendsFeaturesUi.CancelRequestButton 
        fromUserId={meUser!.id}
        toUserId={user.id}
        cancelRequest={cancelRequests}
      />
    ))
  }

  return (
    <UserUi.UserCard<OutcomeRequestUser>
      user={user}
      description={description}
      actions={actions}
    />
  )
}

export const OutcomeRequests: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    data,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateState
  } = UserLib.useOutcomeRequests({ limit: 5, order: 'DESC', userId: user!.id });

  return (
    <UserUi.UserList<OutcomeRequestUser>
      users={data}
      isFetching={isFetching}
      isError={isError}
      mapUser={(user: OutcomeRequestUser, index: number) => <OutcomeRequestWidget 
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