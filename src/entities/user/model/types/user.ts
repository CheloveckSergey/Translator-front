import { SentRequestStatus } from "..";

export class User {
  id: number;
  login: string;
  _avatar: string | undefined;
  isFriend: boolean;
  isSentRequest: SentRequestStatus;
  wordsNumber?: number;

  constructor(
    id: number, 
    login: string, 
    isFriend: boolean, 
    isSentRequest: SentRequestStatus, 
    avatar?: string,
    wordsNumber?: number,
  ) {
    this.id = id;
    this.login = login;
    this.isFriend = isFriend;
    this.isSentRequest = isSentRequest;
    this._avatar = avatar;
    this.wordsNumber = wordsNumber;
  }

  setIsFriend(isFriend: boolean) {
    this.isFriend = isFriend;
  }

  setIsSentRequest(isSentRequest: SentRequestStatus) {
    this.isSentRequest = isSentRequest;
  }

  setAvatar(image: string) {
    this._avatar = image;
  }

  public get avatar() {
    if (!this._avatar) {
      return 'https://avatars.mds.yandex.net/i?id=dd5b8839ecb2033af1341f7c9493adde_l-11387523-images-thumbs&n=13'
    }

    return 'http://localhost:5000/' + this._avatar
  }

  getCopy(): User {
    const newUser = new User(this.id, this.login, this.isFriend, this.isSentRequest, this._avatar, this.wordsNumber);
    return newUser
  }
}