import { StringSpanDto, TodayWordDto, TransStatusWordDto, WholeWordDto } from "./dto";
import { TodayWordClass } from "./todayWord";
import { Connection, StringSpan, TransStatusWord } from "./types";
import { WholeWord } from "./wholeWord";
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

export function mapTodayWord(wordDto: TodayWordDto): TodayWordClass {
  const todayWord = new TodayWordClass(
    wordDto.value, 
    wordDto.translation, 
  );
  return todayWord;
}

export function mapWholeWord(wholeWordDto: WholeWordDto): WholeWord {
  const wholeWord = new WholeWord(
    wholeWordDto.value,
    wholeWordDto.status,
    wholeWordDto.translation,
    wholeWordDto.quantity,
    new Date(wholeWordDto.createDate),
    new Date(wholeWordDto.updateDate),
  );
  return wholeWord;
}

export function mapTransWordDto(transWordDto: TransStatusWordDto): TransStatusWord {
  const translationWord: TransStatusWord = {
    type: 'word',
    word: new WordSpanClass(transWordDto.value, transWordDto.status, transWordDto.translation),
  }
  return translationWord
};