export class TextPreviewClass {
  readonly id: number;
  name: string;
  content: string;

  constructor(id: number, name: string, content: string) {
    this.id = id;
    this.name = name;
    this.content = content;
  }

  changeName(name: string) {
    this.name = name;
  }
}