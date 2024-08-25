import { WordStatus } from "./types";

export class TodayWordClass {
  readonly value: string;
  translation: string;
  //статус не нужен
  status: WordStatus;
  updateDate: Date;
  createDate: Date;

  constructor(value: string, status: WordStatus, translation: string, updateDate: Date, createDate: Date) {
    this.value = value;
    this.status = status;
    this.translation = translation;
    this.updateDate = updateDate;
    this.createDate = createDate;
  }

  changeStatus(status: WordStatus) {
    this.status = status;
  }

  addToProcess() {
    this.status = 'process';
  }

  deleteToStudied() {
    this.status = 'studied';
  }

  try(translation: string): boolean {
    if (this.translation = translation) {
      return true
    } else {
      return false;
    }
  }

  getCopy() {
    const newWord = new TodayWordClass(this.value, this.status, this.translation, this.updateDate, this.createDate);
    return newWord;
  }
}