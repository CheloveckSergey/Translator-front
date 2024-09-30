import { OnlyUser } from "./onlyUser";

export class OutcomeRequestUser extends OnlyUser {
  isCanceled: boolean;
  isRejected: boolean;

  constructor(id: number, login: string) {
    super(id, login);
    this.isCanceled = false;
    this.isRejected = false;
  }

  setIsCanceled(isAccepted: boolean) {
    this.isCanceled = isAccepted;
  }

  setIsRejected(isRejected: boolean) {
    this.isRejected = isRejected;
  }

  getCopy() {
    const newUser = new OutcomeRequestUser(this.id, this.login);
    newUser.isCanceled = this.isCanceled;
    newUser.isRejected = this.isRejected;
    return newUser
  }
}