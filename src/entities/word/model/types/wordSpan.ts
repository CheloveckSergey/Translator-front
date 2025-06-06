import { Word, WordStatus } from ".";

export type StringSpan = WordSpan | Connection; 

export class WordSpan implements Word {
  readonly value: string;
  translation: string | undefined;
  status: WordStatus;

  constructor(value: string, status: WordStatus, translation?: string) {
    this.value = value;
    this.status = status;
    this.translation = translation;
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
    const newWordSpan = new WordSpan(this.value, this.status, this.translation);
    return newWordSpan
  }
}

export class Connection {
  constructor(public readonly value: string) {}
}