import { FriendRequestStatus } from "./types/types";

export type SentRequestStatus = 'sentTo' | 'sentFrom' | undefined;

export interface UserDto {
  id: number,
  login: string,
  avatar: string | undefined,
  isFriend: boolean,
  isSentRequest: SentRequestStatus;
  wordsNumber?: number;
}

export interface GeneralFriendRequstDto {
  id: number,
  login: string,
  wordsNumber: number,
  avatar?: string | undefined,
}

export interface FriendDto extends GeneralFriendRequstDto {}

export interface FindFriendDto extends GeneralFriendRequstDto {}

export interface IncomeRequestUserDto extends GeneralFriendRequstDto {
  status: FriendRequestStatus,
}

export interface OutcomeRequestUserDto extends GeneralFriendRequstDto {
  status: FriendRequestStatus,
}

export interface UpdateImageDto {
  image: string,
}

export interface ResAuthDto {
  id: number, 
  login: string, 
  accessToken: string,
  avatar?: string | undefined,
}