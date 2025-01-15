import { FC, useState } from "react";
import './styles.scss';
import { TextListWidget } from "./texts";
import { useUrlUserId } from "../lib";
import { UserLib } from "../../../entities/user";
import { useAppSelector } from "../../../app/store";
import { SharedUiHelpers } from "../../../shared/sharedUi/helpers";

interface AHProps {
  userId: number,
}
const AdditionalHeader: FC<AHProps> = ({ userId }) => {

  const { user: meUser } = useAppSelector(state => state.user);

  const { user, isLoading, isError } = UserLib.useUser(userId);
  
  return (
    <span className="additional-header">
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
      >
        {user?.login}
      </SharedUiHelpers.ErrorLoader>
    </span>
  )
}

export const TextsPage: FC = () => {

  const { user: meUser } = useAppSelector(state => state.user);

  const userId = useUrlUserId();

  const isMyTexts = meUser?.id === userId;

  return (
    <div className="texts-page">
      <div className="left-content">
        
      </div>
      <div className="main-content">
        <h1>
          Texts{!isMyTexts && <>
            {' '}/ <AdditionalHeader userId={userId} />
          </>}
        </h1>
        <TextListWidget />
      </div>
      <div className="right-content">
        
      </div>
    </div>
  )
}