export interface CurUser {
  id: number,
  login: string,
  accessToken: string,
}

export type FriendRequestStatus = 'waiting' | 'accepted' | 'rejected';