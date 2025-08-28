import { Copyable } from "../../../../shared/types";
import { PrivacySettings } from "./types";

export class UserSettings implements Copyable<UserSettings> {

  constructor(
    public id: number,
    public textsPrivacy: PrivacySettings,
    public wordsPrivacy: PrivacySettings,
    public pagePrivacy: PrivacySettings,
    public friendsPrivacy: PrivacySettings,
    public createdDate: Date,
    public updatedDate: Date,
  ) {}

  setTextPrivacy(privacy: PrivacySettings) {
    this.textsPrivacy = privacy;
  }

  setWordsPrivacy(privacy: PrivacySettings) {
    this.wordsPrivacy = privacy;
  }

  setPagePrivacy(privacy: PrivacySettings) {
    this.pagePrivacy = privacy;
  }

  setFriendsPrivacy(privacy: PrivacySettings) {
    this.friendsPrivacy = privacy;
  }

  getCopy() {
    const newSettings = new UserSettings(
      this.id, 
      this.textsPrivacy, 
      this.wordsPrivacy, 
      this.pagePrivacy,
      this.friendsPrivacy,
      this.createdDate,
      this.updatedDate,
    );
    return newSettings
  }
}