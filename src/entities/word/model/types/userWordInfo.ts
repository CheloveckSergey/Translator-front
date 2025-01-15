import { Word, WordStatus } from ".";

export class UserWordInfo implements Word {
  readonly value: string;
  translation: string;
  status: WordStatus;
  createDate: Date;
  updateDate: Date;
  quantity: number;

  constructor(value: string, status: WordStatus, translation: string, quantity: number, createDate: Date, updateDate: Date) {
    this.value = value;
    this.status = status;
    this.translation = translation;
    this.createDate = createDate;
    this.updateDate = updateDate;
    this.quantity = quantity;
  }

  changeStatus(status: WordStatus) {
    this.status = status;
  }

  setTranslation(value: string) {
    this.translation = value;
  }

  addToProcess() {
    this.status = 'process';
  }

  deleteToStudied() {
    this.status = 'studied';
  }

  getCopy() {
    const newWord = new UserWordInfo(
      this.value,
      this.status,
      this.translation,
      this.quantity,
      this.createDate,
      this.updateDate
    );
    return newWord;
  }
}