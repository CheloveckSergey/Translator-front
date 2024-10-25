export class TextPreviewClass {
  readonly id: number;
  name: string;
  content: string;
  isDeleted: boolean;
  readonly author: {
    id: number,
    login: string,
  };
  isCopied: boolean;
  createDate: Date;

  constructor(
    id: number, 
    name: string, 
    content: string, 
    authorId: number,
    authorLogin: string,
    isCopied: boolean = false,
    createDate: Date,
  ) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.isDeleted = false;
    this.author = {
      id: authorId,
      login: authorLogin,
    };
    this.isCopied = isCopied;
    this.createDate = createDate;
  }

  changeName(name: string) {
    this.name = name;
  }

  setIsDeleted(isDeleted: boolean) {
    this.isDeleted = isDeleted;
  }

  setIsCopied(isCopied: boolean) {
    this.isCopied = isCopied;
  }
}