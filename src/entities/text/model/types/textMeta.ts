export class TextMeta {
  constructor(
    public id: number,
    public name: string,
    public author: {
      id: number,
      login: string,
    },
    public premiere: boolean,
    public createDate: Date,
    public updateDate: Date,
  ) {}
} 