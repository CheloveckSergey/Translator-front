import { FriendRequestStatus } from "./types/types";

export type SentRequestStatus = 'sentTo' | 'sentToRejected' | 'sentFrom' | 'sentFromRejected' | undefined;

export interface AvatarUserDto {
  id: number,
  login: string,
  avatar?: string | undefined,
  isFriend: boolean,
  isSentRequest: SentRequestStatus;
  wordsNumber?: number;
  textsNumber?: number,
}

export interface MeAvatarUserDto {
  id: number,
  login: string,
  avatar?: string | undefined,
  wordsNumber: number,
  textsNumber: number,
}

export interface UserDto {
  id: number,
  login: string,
  avatar?: string | undefined,
}

export interface UserDtoSchema {
  id: number,
  login: string,
  avatar?: string | undefined,
  isFriend: boolean,
  isSentRequest: SentRequestStatus;
  wordsNumber: number;
  textsNumber: number,
}

export interface FriendDto extends UserDto {}

export interface FindFriendDto extends UserDto {}

export interface IncomeRequestUserDto extends UserDto {
  status: FriendRequestStatus,
}

export interface OutcomeRequestUserDto extends UserDto {
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