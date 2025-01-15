import { StringSpanDto, TodayWordDto, TransStatusWordDto, UserWordInfoDto } from "./dto";
import { Connection, StringSpan, TodayWord, TransStatusWord, UserWordInfo, WordSpan } from "./types";

export function mapStringSpanDto(stringSpanDto: StringSpanDto): StringSpan {
  if (stringSpanDto.type === 'word') {
    const wordSpan: WordSpan = new WordSpan(stringSpanDto.value, stringSpanDto.status);
    return wordSpan;
  } else {
    const connection: Connection = new Connection(stringSpanDto.value);
    return connection;
  }
}

export function mapTodayWord(wordDto: TodayWordDto): TodayWord {
  const todayWord = new TodayWord(
    wordDto.value, 
    wordDto.translation, 
  );
  return todayWord;
}

export function mapUserWordInfo(userWordInfo: UserWordInfoDto): UserWordInfo {
  const wholeWord = new UserWordInfo(
    userWordInfo.value,
    userWordInfo.status,
    userWordInfo.translation,
    userWordInfo.quantity,
    new Date(userWordInfo.createDate),
    new Date(userWordInfo.updateDate),
  );
  return wholeWord;
}

export function mapTransWordDto(transWordDto: TransStatusWordDto): TransStatusWord {
  const translationWord: TransStatusWord = {
    type: 'word',
    word: new WordSpan(transWordDto.value, transWordDto.status, transWordDto.translation),
  }
  return translationWord
};