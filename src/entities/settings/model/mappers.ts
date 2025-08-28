import { UserSettingsDto } from "./dto";
import { UserSettings } from "./types";

export function mapUserSettings(settingsDto: UserSettingsDto): UserSettings {
  const settings: UserSettings = new UserSettings(
    settingsDto.id,
    settingsDto.textsPrivacy,
    settingsDto.wordsPrivacy,
    settingsDto.pagePrivacy,
    settingsDto.friendsPrivacy,
    new Date(settingsDto.createdDate),
    new Date(settingsDto.updatedDate),
  );
  return settings
}