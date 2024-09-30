import { FC, useState } from "react";
import { IncomeRequestUser } from "../../../../entities/user/model/incomeRequest";
import { UserUi } from "../../../../entities/user/ui";
import { useAppSelector } from "../../../../app/store";
import { FriendsFeaturesUi } from "../../../../features/friendship";
import { UserLib } from "../../../../entities/user";
import './styles.scss';
import { SharedBlocks } from "../../../../shared/sharedUi/blocks";
import { UsersPageLib } from "../../lib";
import { OutcomeRequestUser } from "../../../../entities/user/model/outcomeRequest";

interface IRWProps {
  user: IncomeRequestUser,
  updateState: () => void,
}
const IncomeRequestWidget: FC<IRWProps> = ({ user, updateState }) => {

  const { user: meUser } = useAppSelector(state => state.user);

  function acceptRequest() {
    user.setIsAccepted(true);
    updateState();
  }

  function rejectRequest() {
    user.setIsRejected(true);
    updateState();
  }

  return (
    <UserUi.UserCard<IncomeRequestUser>
      user={user}
      actions={[
        (user.isAccepted ? (
          <p>Accepted</p>
        ) : (
          <>
            {user.isRejected ? (
              <p>User has been rejected</p>
            ) : (
              <FriendsFeaturesUi.RejectRequestButton
                fromUserId={user.id}
                toUserId={(meUser!.id)}
                rejectRequest={rejectRequest}
              />
            )}
            <FriendsFeaturesUi.AcceptRequestBlock
              fromUserId={user.id}
              toUserId={meUser!.id}
              acceptRequest={acceptRequest}
            />
          </>
        ))
      ]}
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

  return (
    <UserUi.UserCard<OutcomeRequestUser>
      user={user}
      actions={[
        (!user.isCanceled ? (
          <>
            {user.isRejected && (
              <p>You've been rejected</p>
            )}
            <FriendsFeaturesUi.CancelRequestBlock 
              fromUserId={meUser!.id}
              toUserId={user.id}
              cancelRequest={cancelRequests}
            />
          </>
        ) : (
          <p>You've canceled your request</p>
        ))
      ]}
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