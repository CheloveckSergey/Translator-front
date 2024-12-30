export class CurUser {
  id: number;
  login: string;
  accessToken: string;
  private _avatar: string | undefined;

  constructor(id: number, login: string, accessToken: string, avatar?: string) {
    this.id = id;
    this.login = login;
    this.accessToken = accessToken;
    this._avatar = avatar;
  }

  public get avatar() {
    if (!this._avatar) {
      return 'https://avatars.mds.yandex.net/i?id=dd5b8839ecb2033af1341f7c9493adde_l-11387523-images-thumbs&n=13'
    }

    return 'http://localhost:5000/' + this._avatar
  }

  getCopy() {
    const user = new CurUser(this.id, this.login, this.accessToken, this._avatar);
    return user;
  }
}