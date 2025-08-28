import { Friendable, SentRequestStatus, TextsNumberableOptional, TextsNumberableRequired, WordsNumberableOptional, WordsNumberableRequired } from "..";
import { User } from "./user";

export class AvatarUser extends User implements Friendable, WordsNumberableOptional, TextsNumberableOptional {
  constructor(
    id: number, 
    login: string, 
    public isFriend: boolean, 
    public requestStatus: SentRequestStatus, 
    avatar?: string,
    public wordsNumber?: number | undefined, 
    public textsNumber?: number | undefined,
  ) {
    super(id, login, avatar);
  }

  setIsFriend(isFriend: boolean) {
    this.isFriend = isFriend;
  }

  setRequestStatus(requestStatus: SentRequestStatus) {
    this.requestStatus = requestStatus;
  }

  getCopy(): AvatarUser {
    const newUser = new AvatarUser(this.id, this.login, this.isFriend, this.requestStatus, this._avatar, this.wordsNumber, this.textsNumber);
    return newUser
  }
}

export class MeAvatarUser extends User implements WordsNumberableRequired, TextsNumberableRequired {
  constructor(
    id: number, 
    login: string, 
    public wordsNumber: number, 
    public textsNumber: number,
    avatar?: string,
  ) {
    super(id, login, avatar);
  }

  getCopy(): MeAvatarUser {
    const newUser = new MeAvatarUser(this.id, this.login, this.wordsNumber, this.textsNumber, this._avatar);
    return newUser
  }
}