import { FC } from "react";
import './styles.scss';
import { Privacy } from "./privacy";
import { PrivacySettings, UserSettingsLib } from "../../../entities/settings";
import { useAppSelector } from "../../../app/store";

export const SettingsPage: FC = () => {

  const { user } = useAppSelector(state => state.user);

  const { 
    settings, 
    isFetching, 
    isError,
    changeTextsPrivacy,
    changeWordsPrivacy,
    changePagePrivacy,
    changeFriendsPrivacy,
  } = UserSettingsLib.useSettings(user!.id);

  return (
    <div className="home-page">
      <div className="left-content">
        
      </div>
      <div className="main-content">
        <h1>Settings</h1>
        <p className="description">
          Here you can change you settings
        </p>
        <Privacy
          textsPrivacy={settings.textsPrivacy}
          wordsPrivacy={settings.wordsPrivacy}
          pagePrivacy={settings.pagePrivacy}
          friendsPrivacy={settings.friendsPrivacy}
          changeTextsPrivacy={changeTextsPrivacy}
          changeWordsPrivacy={changeWordsPrivacy}
          changePagePrivacy={changePagePrivacy}
          changeFriendsPrivacy={changeFriendsPrivacy}
          isLoading={isFetching}
          isError={isError}
        />
      </div>
      <div className="right-content">
        
      </div>
    </div>
  )
}