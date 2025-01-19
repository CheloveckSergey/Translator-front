import { OnlyUser } from "./onlyUser";
import { FriendRequestStatus } from "./types";

export abstract class GeneralFriendRequest extends OnlyUser {
  constructor(
    id: number,
    login: string,
    public readonly wordsNumber: number,
    avatar?: string | undefined,
  ) {
    super(id, login, avatar);
  }
}

export class Friend extends GeneralFriendRequest {
  isDeleted: boolean;

  constructor(id: number, login: string, wordsNumber: number, avatar?: string | undefined) {
    super(id, login, wordsNumber, avatar);
    this.isDeleted = false;
  }

  setIsDeleted(isDeleted: boolean) {
    this.isDeleted = isDeleted;
  }

  getCopy() {
    const newUser = new Friend(this.id, this.login, this.wordsNumber, this.avatar);
    newUser.isDeleted = this.isDeleted;
    return newUser
  }
}


export class PotentialFriend extends GeneralFriendRequest {
  isSentRequest: boolean;

  constructor(id: number, login: string, wordsNumber: number, avatar?: string | undefined) {
    super(id, login, wordsNumber, avatar);
    this.isSentRequest = false;
  }

  setIsSentRequest(isSentRequest: boolean) {
    this.isSentRequest = isSentRequest;
  }

  getCopy() {
    const newUser = new PotentialFriend(this.id, this.login, this.wordsNumber, this.avatar);
    newUser.isSentRequest = this.isSentRequest;
    return newUser;
  }
}


export class IncomeRequestUser extends GeneralFriendRequest {
  status: FriendRequestStatus;

  constructor(id: number, login: string, status: FriendRequestStatus, wordsNumber: number, avatar?: string | undefined) {
    super(id, login, wordsNumber, avatar);
    this.status = status;
  }

  setStatus(status: FriendRequestStatus) {
    this.status = status;
  }

  getCopy() {
    const newUser = new IncomeRequestUser(this.id, this.login, this.status, this.wordsNumber, this.avatar);
    return newUser
  }
}


export class OutcomeRequestUser extends GeneralFriendRequest {
  status: FriendRequestStatus;
  isCanceled: boolean;

  constructor(id: number, login: string, status: FriendRequestStatus, wordsNumber: number, avatar?: string | undefined) {
    super(id, login, wordsNumber, avatar);
    this.status = status;
    this.isCanceled = false;
  }

  setIsCanceled(isCanceled: boolean) {
    this.isCanceled = isCanceled;
  }

  getCopy() {
    const newUser = new OutcomeRequestUser(this.id, this.login, this.status, this.wordsNumber, this.avatar);
    newUser.setIsCanceled(this.isCanceled);
    return newUser
  }
}