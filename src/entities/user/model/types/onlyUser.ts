import { Copyable } from "../../../../shared/types";

export abstract class OnlyUser implements Copyable<OnlyUser> {
  id: number;
  login: string;

  constructor(id: number, login: string) {
    this.id = id;
    this.login = login;
  }

  abstract getCopy(): OnlyUser;
}