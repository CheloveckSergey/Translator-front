import { StringSpan } from "../../../word";
import { Block } from "./types";

export class TextSpan {

  constructor(
    public id: number, 
    public name: string, 
    public blocks: Block[],
    public premiere: boolean,
  ) {}

  changeName(name: string) {
    this.name = name;
  }

  getCopy() {
    const newTextSpan = new TextSpan(this.id, this.name, this.blocks, this.premiere);
    return newTextSpan;
  }
}