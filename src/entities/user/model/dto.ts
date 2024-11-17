import { FriendRequestStatus } from "./types";

export type SentRequestStatus = 'sentTo' | 'sentFrom' | undefined;

export interface UserDto {
  id: number;
  login: string;
  avatar: string | undefined;
  isFriend: boolean;
  isSentRequest: SentRequestStatus;
}

export interface FindFriendDto {
  id: number;
  login: string;
}

export interface FriendDto {
  id: number;
  login: string;
}

export interface IncomeRequestUserDto {
  id: number,
  login: string,
  status: FriendRequestStatus,
}

export interface OutcomeRequestUserDto {
  id: number,
  login: string,
  status: FriendRequestStatus,
}

export interface UpdateImageDto {
  image: string,
}