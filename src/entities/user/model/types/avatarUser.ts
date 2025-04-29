import { Friendable, SentRequestStatus } from "..";
import { User } from "./user";

type RequestStatus = 'sentTo' | 'sentToRejected' | 'sentFrom' | 'sentFromRejected'  | undefined;

export class AvatarUser extends User implements Friendable {
  constructor(
    id: number, 
    login: string, 
    public isFriend: boolean, 
    public requestStatus: RequestStatus, 
    avatar?: string,
    wordsNumber?: number,
  ) {
    super(id, login, avatar, wordsNumber);
  }

  setIsFriend(isFriend: boolean) {
    this.isFriend = isFriend;
  }

  setRequestStatus(requestStatus: RequestStatus) {
    this.requestStatus = requestStatus;
  }

  getCopy(): AvatarUser {
    const newUser = new AvatarUser(this.id, this.login, this.isFriend, this.requestStatus, this._avatar, this.wordsNumber);
    return newUser
  }
}