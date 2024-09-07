export class TodayWordClass {
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
      return false;
    }
  }

  getCopy() {
    const newWord = new TodayWordClass(this.value, this.translation);
    return newWord;
  }
}