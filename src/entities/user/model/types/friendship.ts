import { OnlyUser } from "./onlyUser";
import { FriendRequestStatus } from "./types";


export class Friend extends OnlyUser {
  isDeleted: boolean;

  constructor(id: number, login: string) {
    super(id, login);
    this.isDeleted = false;
  }

  setIsDeleted(isDeleted: boolean) {
    this.isDeleted = isDeleted;
  }

  getCopy() {
    const newUser = new Friend(this.id, this.login);
    newUser.isDeleted = this.isDeleted;
    return newUser
  }
}


export class PotentialFriend extends OnlyUser {
  isSentRequest: boolean;

  constructor(id: number, login: string) {
    super(id, login);
    this.isSentRequest = false;
  }

  setIsSentRequest(isSentRequest: boolean) {
    this.isSentRequest = isSentRequest;
  }

  getCopy() {
    const newUser = new PotentialFriend(this.id, this.login);
    newUser.isSentRequest = this.isSentRequest;
    return newUser;
  }
}


export class IncomeRequestUser extends OnlyUser {
  status: FriendRequestStatus;

  constructor(id: number, login: string, status: FriendRequestStatus) {
    super(id, login);
    this.status = status;
  }

  setStatus(status: FriendRequestStatus) {
    this.status = status;
  }

  getCopy() {
    const newUser = new IncomeRequestUser(this.id, this.login, this.status);
    return newUser
  }
}


export class OutcomeRequestUser extends OnlyUser {
  status: FriendRequestStatus;
  isCanceled: boolean;

  constructor(id: number, login: string, status: FriendRequestStatus) {
    super(id, login);
    this.status = status;
    this.isCanceled = false;
  }

  setIsCanceled(isCanceled: boolean) {
    this.isCanceled = isCanceled;
  }

  getCopy() {
    const newUser = new OutcomeRequestUser(this.id, this.login, this.status);
    newUser.setIsCanceled(this.isCanceled);
    return newUser
  }
}