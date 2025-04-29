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
import { IncomeRequests } from "./incomeRequests";
import { OutcomeRequests } from "./outcomeRequests";

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