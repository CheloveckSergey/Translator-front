import { Word } from "./types";

export class TodayWord implements Word {
  readonly value: string;
  translation: string;

  constructor(value: string, translation: string) {
    this.value = value;
    this.translation = translation;
  }

  try(translation: string): boolean {
    if (this.translation = translation) {
      return true
    } else {
      return false
    }
  }

  getCopy() {
    const newWord = new TodayWord(this.value, this.translation);
    return newWord;
  }
}

export class TodayList {
  words: TodayWord[];
  curIndex: number;
  curWord: TodayWord;
  isEnd: boolean = false;

  constructor(words: TodayWord[]) {
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