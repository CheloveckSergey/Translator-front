import { useQuery } from "react-query"
import { UserSettingsApi } from "../api"
import { useState } from "react"
import { PrivacySettings, UserSettings } from "../model"
import { mapUserSettings } from "../model/mappers"

const userSettingsKeys = {
  settings: {
    root: 'settings',
    slug: (userId: number) => [userSettingsKeys.settings.root, userId],
  }
} 

const useSettings = (userId: number) => {

  const [settings, setSettings] = useState<UserSettings>(new UserSettings(
    0,
    PrivacySettings.ALL,
    PrivacySettings.ALL,
    PrivacySettings.ALL,
    new Date(),
    new Date(),
  ))

  const { isFetching, isError } = useQuery({
    queryKey: userSettingsKeys.settings.slug(userId),
    queryFn: () => {
      return UserSettingsApi.getSettings(userId)
    },
    onSuccess(data) {
      setSettings(mapUserSettings(data));
    },
  });

  function updateState() {
    const copy = settings.getCopy();
    setSettings(copy);
  }

  function changeTextsPrivacy(privacy: PrivacySettings) {
    settings.setTextPrivacy(privacy);
    updateState();
  }

  function changeWordsPrivacy(privacy: PrivacySettings) {
    settings.setWordsPrivacy(privacy);
    updateState();
  }

  function changePagePrivacy(privacy: PrivacySettings) {
    settings.setPagePrivacy(privacy);
    updateState();
  }

  return {
    settings,
    isFetching,
    isError,
    updateState,
    changeTextsPrivacy,
    changeWordsPrivacy,
    changePagePrivacy,
  }
}

export const UserSettingsLib = {
  useSettings,
}