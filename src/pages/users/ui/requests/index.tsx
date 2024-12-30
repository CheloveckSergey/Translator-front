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

  const actions: React.ReactNode[] = [];

  if (user.status === 'accepted') {
    actions.push((
      <p>Accepted</p>
    ))
  } else {
    if (user.status === 'rejected') {
      actions.push((
        <p>User has been rejected</p>
      ));
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
      <FriendsFeaturesUi.AcceptRequestBlock
        fromUserId={user.id}
        toUserId={meUser!.id}
        acceptRequest={acceptRequest}
      />
    ))
  }

  return (
    <UserUi.UserCard<IncomeRequestUser>
      user={user}
      actions={actions}
    />
  )
}

const IncomeRequests: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    users,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateState
  } = UserLib.useIncomeRequests({ limit: 5, order: 'DESC', userId: user!.id });

  return (
    <UserUi.UserList<IncomeRequestUser>
      users={users}
      isLoading={isLoading}
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

  const actions: React.ReactNode[] = [];

  if (user.isCanceled) {
    actions.push((
      <p>You've canceled your request</p>
    ));
  } else {
    if (user.status === 'rejected') {
      actions.push((
        <p>You've been rejected</p>
      ));
    }
    actions.push((
      <FriendsFeaturesUi.CancelRequestBlock 
        fromUserId={meUser!.id}
        toUserId={user.id}
        cancelRequest={cancelRequests}
      />
    ))
  }

  return (
    <UserUi.UserCard<OutcomeRequestUser>
      user={user}
      actions={actions}
    />
  )
}

const OutcomeRequests: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const {
    users,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateState
  } = UserLib.useOutcomeRequests({ limit: 5, order: 'DESC', userId: user!.id });

  return (
    <UserUi.UserList<OutcomeRequestUser>
      users={users}
      isLoading={isLoading}
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