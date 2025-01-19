import { Copyable } from "../../../../shared/types";

export abstract class OnlyUser implements Copyable<OnlyUser> {
  id: number;
  login: string;
  private _avatar: string | undefined;

  constructor(id: number, login: string, avatar?: string | undefined) {
    this.id = id;
    this.login = login;
    this._avatar = avatar;
  }

  public get avatar() {
    if (!this._avatar) {
      return 'https://avatars.mds.yandex.net/i?id=dd5b8839ecb2033af1341f7c9493adde_l-11387523-images-thumbs&n=13'
    }

    return 'http://localhost:5000/' + this._avatar
  }

  abstract getCopy(): OnlyUser;
}