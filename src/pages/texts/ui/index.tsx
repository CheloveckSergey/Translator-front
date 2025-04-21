import { FC, useState } from "react";
import './styles.scss';
import { TextListWidget } from "./texts";
import { useUrlUserId } from "../lib";
import { UserLib } from "../../../entities/user";
import { useAppSelector } from "../../../app/store";
import { SharedUiHelpers } from "../../../shared/sharedUi/helpers";
import { useNavigate } from "react-router-dom";
import { TextsInfo } from "./textsInfo";
import { SharedBlocks } from "../../../shared/sharedUi/blocks";

interface AHProps {
  userId: number,
}
const AdditionalHeader: FC<AHProps> = ({ userId }) => {

  const { user, isLoading, isError } = UserLib.useUser(userId);

  const navigate = useNavigate();
  
  return (
    <span 
      className="additional-header"
      onClick={() => {
        navigate('/users/' + user?.id);
      }}
    >
      <SharedUiHelpers.ErrorLoader
        isLoading={isLoading}
        isError={isError}
      >
        {user && (
          user.login
        )}
      </SharedUiHelpers.ErrorLoader>
    </span>
  )
}

export const TextsPage: FC = () => {

  const { user: meUser } = useAppSelector(state => state.user);

  const userId = useUrlUserId();

  const isMyTexts = meUser?.id === userId;

  return (
    <SharedBlocks.RegularLayout
      left={<>
        <TextsInfo />
      </>}
      center={<>
        <div className="texts-header">
          <h1>Texts</h1>
          {!isMyTexts && (
            <AdditionalHeader userId={userId} />
          )}
        </div>
        {isMyTexts && (
          <p>
            Here you can check all of your texts.
          </p>
        )}
        <TextListWidget />
      </>}
      className="texts-page"
    />
  )
}