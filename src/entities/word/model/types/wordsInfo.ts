import { Copyable } from "../../../../shared/types";

export class WordsInfo implements Copyable<WordsInfo> {

  constructor(
    public readonly generalWordsNumber: number,
    public readonly process: number,
    public readonly studied: number,
  ) {}

  getCopy(): WordsInfo {
    const newInfo = new WordsInfo(this.generalWordsNumber, this.process, this.studied);
    return newInfo
  }
}