export class ShortTextPreview {
  readonly id: number;
  readonly name: string;
  readonly author: {
    id: number,
    login: string,
  }
  readonly createDate: Date;

  constructor(
    id: number, 
    name: string, 
    author: { 
      id: number, 
      login: string 
    },
    createDate: Date,
  ) {
    this.id = id;
    this.name = name;
    this.author = {
      id: author.id,
      login: author.login,
    };
    this.createDate = createDate;
  }

  getCopy() {
    const newText = new ShortTextPreview(this.id, this.name, this.author, this.createDate);
    return newText;
  }
}