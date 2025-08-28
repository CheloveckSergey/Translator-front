export type FriendRequestStatus = 'waiting' | 'accepted' | 'rejected' | undefined;

export interface WordsNumberableOptional {
  wordsNumber?: number | undefined,
}

export interface WordsNumberableRequired {
  wordsNumber: number,
}

export interface TextsNumberableOptional {
  textsNumber?: number | undefined,
}

export interface TextsNumberableRequired {
  textsNumber: number,
}