import { Copyable } from "../../../../shared/types";

export class TextsInfo implements Copyable<TextsInfo> {

  constructor(
    public readonly generalTextsNumber: number,
    public readonly ownTextsNumber: number,
    public readonly copiedTextsNumber: number,
  ) {}

  getCopy(): TextsInfo {
    const newInfo = new TextsInfo(this.generalTextsNumber, this.ownTextsNumber, this.copiedTextsNumber);
    return newInfo
  }
}