import { StringSpan } from "../../../word";
import { GeneralTextSpan } from "./types";
// import { Block } from "./types";

export interface Block {
  id: number,
  original: StringSpan[],
  translation: string,
}

export class PremiereTextSpan implements GeneralTextSpan {

  constructor(
    public id: number,
    public blocks: Block[],
  ) {}

  getCopy() {
    const newTextSpan = new PremiereTextSpan(this.id, this.blocks);
    return newTextSpan;
  }
}