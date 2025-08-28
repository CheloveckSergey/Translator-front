import { PrivacySettings } from "./types/types";

export interface UserSettingsDto {
  id: number,
  textsPrivacy: PrivacySettings,
  wordsPrivacy: PrivacySettings,
  pagePrivacy: PrivacySettings,
  friendsPrivacy: PrivacySettings,
  createdDate: string,
  updatedDate: string,
}