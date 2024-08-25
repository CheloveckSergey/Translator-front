import { TodayWordClass } from "./todayWord";
import { Connection, StringSpan, StringSpanDto, TranslationWordDto } from "./types";
import { WordSpanClass } from "./wordSpan";

export function mapStringSpanDto(stringSpanDto: StringSpanDto): StringSpan {
  if (stringSpanDto.type === 'word') {
    const wordSpan: WordSpanClass = new WordSpanClass(stringSpanDto.value, stringSpanDto.status);
    return wordSpan;
  } else {
    const connection: Connection = {
      value: stringSpanDto.value,
    }
    return connection;
  }
}

export function mapTodayWord(wordDto: TranslationWordDto): TodayWordClass {
  const todayWord = new TodayWordClass(
    wordDto.value, 
    wordDto.status, 
    wordDto.translation, 
    new Date(wordDto.updateDate),
    new Date(wordDto.createDate),
  );
  return todayWord;
}