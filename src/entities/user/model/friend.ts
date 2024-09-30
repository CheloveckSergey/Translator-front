import { OnlyUser } from "./onlyUser";

export class Friend extends OnlyUser {
  isFriend: boolean;

  constructor(id: number, login: string) {
    super(id, login);
    this.isFriend = true;
  }

  setIsFriend(isFriend: boolean) {
    this.isFriend = isFriend;
  }

  getCopy() {
    const newUser = new Friend(this.id, this.login);
    newUser.isFriend = this.isFriend;
    return newUser
  }
}