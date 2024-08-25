import { StringSpan } from "../../word";

export class TextSpanClass {
  readonly id: number;
  name: string;
  stringSpans: StringSpan[];
  translation: string | undefined;

  constructor(id: number, name: string, stringSpans: StringSpan[], translation: string | undefined) {
    this.id = id;
    this.name = name;
    this.stringSpans = stringSpans;
    this.translation = translation;
  }

  changeName(name: string) {
    this.name = name;
  }

  getCopy() {
    const newTextSpan = new TextSpanClass(this.id, this.name, this.stringSpans, this.translation);
    return newTextSpan;
  }
}