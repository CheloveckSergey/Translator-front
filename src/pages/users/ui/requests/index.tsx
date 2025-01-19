import React, { FC } from "react";
import { IncomeRequestUser } from "../../../../entities/user";
import { UserUi } from "../../../../entities/user/ui";
import { useAppSelector } from "../../../../app/store";
import { FriendsFeaturesUi } from "../../../../features/friendship";
import { UserLib } from "../../../../entities/user";
import './styles.scss';
import { SharedBlocks } from "../../../../shared/sharedUi/blocks";
import { UsersPageLib } from "../../lib";
import { OutcomeRequestUser } from "../../../../entities/user";

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

const IncomeRequests: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    users,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateState
  } = UserLib.useIncomeRequests({ limit: 5, order: 'DESC', userId: user!.id });

  return (
    <UserUi.UserList<IncomeRequestUser>
      users={users}
      isFetching={isFetching}
      isError={isError}
      mapUser={(user: IncomeRequestUser, index: number) => <IncomeRequestWidget 
        key={index}
        user={user}
        updateState={updateState}
      />}
      className="user-list"
    />
  )
}

interface ORWProps {
  user: OutcomeRequestUser,
  updateState: () => void,
}
const OutcomeRequestWidget: FC<ORWProps> = ({ user, updateState }) => {

  const { user: meUser } = useAppSelector(state => state.user);

  function cancelRequests() {
    user.setIsCanceled(true);
    updateState();
  }

  let description: string = '';
  const actions: React.ReactNode[] = [];

  if (user.isCanceled) {
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

const OutcomeRequests: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    users,
    isFetching,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateState
  } = UserLib.useOutcomeRequests({ limit: 5, order: 'DESC', userId: user!.id });

  return (
    <UserUi.UserList<OutcomeRequestUser>
      users={users}
      isFetching={isFetching}
      isError={isError}
      mapUser={(user: OutcomeRequestUser, index: number) => <OutcomeRequestWidget 
        key={index}
        user={user}
        updateState={updateState}
      />}
      className="user-list"
    />
  )
}

export const RequestsListWidget = () => {

  const { searchType, setSearchType } = UsersPageLib.useUsersSearchType();

  return (
    <div className="requests-widget user-list-widget">
      <div className="requests-choice">
        <SharedBlocks.MenuPoint 
          body="Income"
          onClick={() => setSearchType('incomeRequests')}
          active={searchType === 'incomeRequests'}
        />
        <SharedBlocks.MenuPoint 
          body="Outcome"
          onClick={() => setSearchType('outcomeRequests')}
          active={searchType === 'outcomeRequests'}
        />
      </div>
      {searchType === 'incomeRequests' && <IncomeRequests />}
      {searchType === 'outcomeRequests' && <OutcomeRequests />}
    </div>
  )
}