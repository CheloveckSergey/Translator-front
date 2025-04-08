import { StringSpan } from "../../../word";
// import { Block } from "./types";

export interface Block {
  id: number,
  original: StringSpan[],
  translation: string,
}

export class TextSpan {

  constructor(
    public id: number,
    public blocks: Block[],
  ) {}

  getCopy() {
    const newTextSpan = new TextSpan(this.id, this.blocks);
    return newTextSpan;
  }
}