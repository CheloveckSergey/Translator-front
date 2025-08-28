import api from "../../../shared/api";
import { PrivacySettings, UserSettingsDto } from "../model";

export interface ChangeUserSettingReqDto {
  textsPrivacy?: PrivacySettings | undefined,
  wordsPrivacy?: PrivacySettings | undefined,
  pagePrivacy?: PrivacySettings | undefined,
  friendsPrivacy?: PrivacySettings | undefined,
  userId: number,
}

const INITIAL_URL = '/user-settings';

export class UserSettingsApi {
  static async getSettings(userId: number): Promise<UserSettingsDto> {
    const response = await api.get<UserSettingsDto>(INITIAL_URL + '/getSettings/' + userId);
    return response.data;
  }

  static async changeSettings(dto: ChangeUserSettingReqDto) {
    const repsonse = await api.post<UserSettingsDto>(
      INITIAL_URL + '/changeSettings',
      dto,
    );
    return repsonse.data;
  }
}