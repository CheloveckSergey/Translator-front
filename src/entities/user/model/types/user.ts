import { Copyable } from "../../../../shared/types";

export abstract class User implements Copyable<User> {
  constructor(
    public id: number,
    public login: string,
    public _avatar?: string | undefined,
  ) {}

  setAvatar(image: string) {
    this._avatar = image;
  }

  public get avatar() {
    if (!this._avatar) {
      return 'https://avatars.mds.yandex.net/i?id=dd5b8839ecb2033af1341f7c9493adde_l-11387523-images-thumbs&n=13'
    }

    return 'http://localhost:5000/' + this._avatar
  }

  abstract getCopy(): User;
}