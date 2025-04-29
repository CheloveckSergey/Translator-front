import { User } from "./user";

export class CurUser extends User {
  constructor(
    id: number, 
    login: string, 
    public readonly accessToken: string, 
    avatar?: string
  ) {
    super(id, login, avatar)
  }

  getCopy() {
    const user = new CurUser(this.id, this.login, this.accessToken, this._avatar);
    return user;
  }
}