import { OnlyUser } from "./onlyUser"

export class IncomeRequestUser extends OnlyUser {
  isAccepted: boolean;
  isRejected: boolean;

  constructor(id: number, login: string) {
    super(id, login);
    this.isAccepted = false;
    this.isRejected = false;
  }

  setIsAccepted(isAccepted: boolean) {
    this.isAccepted = isAccepted;
  }

  setIsRejected(isRejected: boolean) {
    this.isRejected = isRejected;
  }

  getCopy() {
    const newUser = new IncomeRequestUser(this.id, this.login);
    newUser.isAccepted = this.isAccepted;
    newUser.isRejected = this.isRejected;
    return newUser
  }
}