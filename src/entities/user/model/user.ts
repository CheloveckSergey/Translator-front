import { SentRequestStatus } from "./dto";

export class User {
  id: number;
  login: string;
  isFriend: boolean;
  isSentRequest: SentRequestStatus;

  constructor(id: number, login: string, isFriend: boolean, isSentRequest: SentRequestStatus) {
    this.id = id;
    this.login = login;
    this.isFriend = isFriend;
    this.isSentRequest = isSentRequest;
  }

  setIsFriend(isFriend: boolean) {
    this.isFriend = isFriend;
  }

  setIsSentRequest(isSentRequest: SentRequestStatus) {
    this.isSentRequest = isSentRequest;
  }

  getCopy(): User {
    const newUser = new User(this.id, this.login, this.isFriend, this.isSentRequest);
    return newUser
  }
}