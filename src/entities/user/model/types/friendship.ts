import { User } from "./user";
import { FriendRequestStatus } from "./types";

export interface SendRequestable {
  isSentRequest: boolean;

  setIsSentRequest(isSentRequest: boolean): void;
}

export interface StatusRequestable {
  status: FriendRequestStatus;

  setStatus(status: FriendRequestStatus): void;
}

export interface Friendable {
  isFriend: boolean;

  setIsFriend(isFriend: boolean): void;
}

export class Friend extends User implements Friendable {
  isFriend: boolean;

  constructor(
    id: number, 
    login: string, 
    avatar?: string | undefined,
  ) {
    super(id, login, avatar);
    this.isFriend = true;
  }

  setIsFriend(isFriend: boolean) {
    this.isFriend = isFriend;
  }

  getCopy() {
    const newUser = new Friend(this.id, this.login, this._avatar);
    newUser.isFriend = this.isFriend;
    return newUser
  }
}


export class PotentialFriend extends User implements SendRequestable {
  public isSentRequest: boolean = false;

  constructor(
    id: number, 
    login: string, 
    avatar?: string | undefined,
  ) {
    super(id, login, avatar);
  }

  setIsSentRequest(isSentRequest: boolean): void {
    this.isSentRequest = isSentRequest
  }

  getCopy() {
    const newUser = new PotentialFriend(this.id, this.login, this._avatar);
    newUser.isSentRequest = this.isSentRequest;
    return newUser;
  }
}


export class IncomeRequestUser extends User implements StatusRequestable {
  constructor(
    id: number, 
    login: string, 
    public status: FriendRequestStatus, 
    avatar?: string | undefined, 
  ) {
    super(id, login, avatar);
  }

  setStatus(status: FriendRequestStatus) {
    this.status = status;
  }

  getCopy() {
    const newUser = new IncomeRequestUser(this.id, this.login, this.status, this._avatar);
    return newUser
  }
}


export class OutcomeRequestUser extends User implements SendRequestable, StatusRequestable {
  public isSentRequest: boolean;

  constructor(
    id: number, 
    login: string, 
    public status: FriendRequestStatus, 
    avatar?: string | undefined,
  ) {
    super(id, login, avatar);
    this.isSentRequest = true;
  }

  setIsSentRequest(isSentRequest: boolean): void {
    this.isSentRequest = isSentRequest
  }

  setStatus(status: FriendRequestStatus) {
    this.status = status;
  }

  getCopy() {
    const newUser = new OutcomeRequestUser(this.id, this.login, this.status, this._avatar);
    newUser.setIsSentRequest(this.isSentRequest);
    return newUser
  }
}