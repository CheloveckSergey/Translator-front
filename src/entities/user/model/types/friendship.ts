import { User } from "./user";
import { FriendRequestStatus } from "./types";

export abstract class GeneralFriendRequest extends User {
  constructor(
    id: number,
    login: string,
    avatar?: string | undefined,
    wordsNumber?: number,
  ) {
    super(id, login, avatar, wordsNumber);
  }
}

export interface SendRequestable {
  isSentRequest: boolean;

  setIsSentRequest(isSentRequest: boolean): void;
}

export interface Friendable {
  isFriend: boolean;

  setIsFriend(isFriend: boolean): void;
}

export abstract class SendableFriendRequest extends GeneralFriendRequest implements SendRequestable {
  constructor(
    id: number,
    login: string,
    public isSentRequest: boolean,
    avatar?: string | undefined,
    wordsNumber?: number,
  ) {
    super(id, login, avatar, wordsNumber);
  }

  setIsSentRequest(isSentRequest: boolean) {
    this.isSentRequest = isSentRequest;
  }
}

export class Friend extends GeneralFriendRequest implements Friendable {
  isFriend: boolean;

  constructor(
    id: number, 
    login: string, 
    avatar?: string | undefined,
    wordsNumber?: number, 
  ) {
    super(id, login, avatar, wordsNumber);
    this.isFriend = true;
  }

  setIsFriend(isFriend: boolean) {
    this.isFriend = isFriend;
  }

  getCopy() {
    const newUser = new Friend(this.id, this.login, this._avatar, this.wordsNumber);
    newUser.isFriend = this.isFriend;
    return newUser
  }
}


export class PotentialFriend extends SendableFriendRequest {
  constructor(
    id: number, 
    login: string, 
    avatar?: string | undefined,
    wordsNumber?: number, 
  ) {
    super(id, login, false, avatar, wordsNumber);
  }

  getCopy() {
    const newUser = new PotentialFriend(this.id, this.login, this._avatar, this.wordsNumber);
    newUser.isSentRequest = this.isSentRequest;
    return newUser;
  }
}


export class IncomeRequestUser extends GeneralFriendRequest {
  constructor(
    id: number, 
    login: string, 
    public status: FriendRequestStatus, 
    avatar?: string | undefined,
    wordsNumber?: number, 
  ) {
    super(id, login, avatar, wordsNumber);
  }

  setStatus(status: FriendRequestStatus) {
    this.status = status;
  }

  getCopy() {
    const newUser = new IncomeRequestUser(this.id, this.login, this.status, this._avatar, this.wordsNumber);
    return newUser
  }
}


export class OutcomeRequestUser extends SendableFriendRequest {
  status: FriendRequestStatus;

  constructor(
    id: number, 
    login: string, 
    status: FriendRequestStatus, 
    avatar?: string | undefined,
    wordsNumber?: number, 
  ) {
    super(id, login, true, avatar, wordsNumber);
    this.status = status;
  }

  getCopy() {
    const newUser = new OutcomeRequestUser(this.id, this.login, this.status, this._avatar, this.wordsNumber);
    newUser.setIsSentRequest(this.isSentRequest);
    return newUser
  }
}