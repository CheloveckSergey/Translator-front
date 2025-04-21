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

export abstract class SendRequestable extends GeneralFriendRequest {
  constructor(
    id: number,
    login: string,
    public readonly wordsNumber: number,
    public isSentRequest: boolean,
    avatar?: string | undefined,
  ) {
    super(id, login, wordsNumber, avatar);
  }

  setIsSentRequest(isSentRequest: boolean) {
    this.isSentRequest = isSentRequest;
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


export class PotentialFriend extends SendRequestable {
  isSentRequest: boolean;

  constructor(id: number, login: string, wordsNumber: number, avatar?: string | undefined) {
    super(id, login, wordsNumber, false, avatar);
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


export class OutcomeRequestUser extends SendRequestable {
  status: FriendRequestStatus;
  isSentRequest: boolean;

  constructor(id: number, login: string, status: FriendRequestStatus, wordsNumber: number, avatar?: string | undefined) {
    super(id, login, wordsNumber, false, avatar);
    this.status = status;
    this.isSentRequest = false;
  }

  setIsSentRequest(isSentRequest: boolean) {
    this.isSentRequest = isSentRequest;
  }

  getCopy() {
    const newUser = new OutcomeRequestUser(this.id, this.login, this.status, this.wordsNumber, this.avatar);
    newUser.setIsSentRequest(this.isSentRequest);
    return newUser
  }
}