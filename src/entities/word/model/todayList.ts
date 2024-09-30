import { TodayWordClass } from "./todayWord";
import { WordSpanClass } from "./wordSpan";

export class TodayList {
  words: TodayWordClass[];
  curIndex: number;
  curWord: TodayWordClass;
  isEnd: boolean = false;

  constructor(words: TodayWordClass[]) {
    this.words = words;
    this.curIndex = 0;
    this.curWord = words[this.curIndex];
  }

  next() {
    if (this.curIndex === (this.words.length - 1)) {
      this.isEnd = true;
      return
    }
    this.curIndex++;
    this.curWord = this.words[this.curIndex];
  }

  try(translation: string) {
    this.curWord.try(translation);
  }

  getCopy() {
    const newList = new TodayList(this.words);
    newList.curIndex = this.curIndex;
    newList.curWord = newList.words[newList.curIndex];
    newList.isEnd = this.isEnd;
    return newList;
  }
}