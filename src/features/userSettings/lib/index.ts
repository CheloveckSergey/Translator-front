import { useMutation } from "react-query"
import { ChangeUserSettingReqDto, PrivacySettings, UserSettingsApi } from "../../../entities/settings"

const useChangeSettings = ( 
  updateTextsPrivacy?: (setting: PrivacySettings) => void,
  updateWordsPrivacy?: (setting: PrivacySettings) => void,
  updatePagePrivacy?: (setting: PrivacySettings) => void,
) => {

  return useMutation(
    (props : ChangeUserSettingReqDto) => {
      return UserSettingsApi.changeSettings(props)
    },
    {
      onSuccess: (data, props) => {
        if (props.textsPrivacy && updateTextsPrivacy) {
          updateTextsPrivacy(data.textsPrivacy);
        }
        if (props.wordsPrivacy && updateWordsPrivacy) {
          updateWordsPrivacy(data.wordsPrivacy);
        }
        if (props.pagePrivacy && updatePagePrivacy) {
          updatePagePrivacy(data.pagePrivacy);
        }
      }
    }
  )
}

export const UserSettingsFeatures = {
  useChangeSettings,
}