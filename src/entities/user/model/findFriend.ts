import { OnlyUser } from "./onlyUser";

export class FindFriend extends OnlyUser {
  isSentRequest: boolean;

  constructor(id: number, login: string) {
    super(id, login);
    this.isSentRequest = false;
  }

  setIsSentRequest(isSentRequest: boolean) {
    this.isSentRequest = isSentRequest;
  }

  getCopy() {
    const newUser = new FindFriend(this.id, this.login);
    newUser.isSentRequest = this.isSentRequest;
    return newUser;
  }
} 