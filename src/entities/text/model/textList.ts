import { TextPreviewClass } from "./textPreview";

export class TextListClass {
  texts: TextPreviewClass[];

  constructor(texts: TextPreviewClass[]) {
    this.texts = texts;
  }

  addText(text: TextPreviewClass) {
    this.texts = [text, ...this.texts];
  }

  getCopy() {
    const newTextList = new TextListClass(this.texts);
    return newTextList;
  }
}