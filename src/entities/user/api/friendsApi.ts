import api from "../../../shared/api";
import { UsualQuery } from "../../../shared/types";
import { FriendDto, IncomeRequestUserDto, OutcomeRequestUserDto } from "../model";

interface GetFUsersQuery extends UsualQuery {
  friendsUserId?: number,
  unfriendsUserId?: number,
}

export interface GetFriendsQuery extends UsualQuery {
  userId: number,
}

export interface GetFindFriendsQuery extends UsualQuery {
  userId: number,
}

interface GetRequestsQuery extends UsualQuery {
  userId: number,
  type: 'from' | 'to',
}

export interface GetIncomeRequestsQuery {
  limit?: number,
  offset?: number,
  userId: number,
  order: 'ASC' | 'DESC',
}

export interface GetOutcomeRequestsQuery {
  limit?: number,
  offset?: number,
  userId: number,
  order: 'ASC' | 'DESC',
}

const INITIAL_URL = '/friends';

export class FriendsApi {
  static async getFriends(query: GetFriendsQuery) {
    const response = await api.get<FriendDto[]>(
      INITIAL_URL + '/getFriends',
      {
        params: query,
      }
    );
    return response.data;
  }
  static async getFindFriends(query: GetFindFriendsQuery) {
    const response = await api.get<FriendDto[]>(
      INITIAL_URL + '/getFindFriends',
      {
        params: query,
      }
    );
    return response.data;
  }

  static async getFUsers(query: GetFUsersQuery) {
    const response = await api.get(
      INITIAL_URL + '/getFUsers',
      {
        params: query,
      }
    );
    return response.data; 
  }

  static async getRequests(query: GetRequestsQuery) {
    
  }

  static async getIncomeRequests(query: GetIncomeRequestsQuery) {
    const response = await api.get<IncomeRequestUserDto[]>(
      INITIAL_URL + '/getIncomeRequests',
      {
        params: query,
      }
    );
    return response.data; 
  }

  static async getOutcomeRequests(query: GetOutcomeRequestsQuery) {
    const response = await api.get<OutcomeRequestUserDto[]>(
      INITIAL_URL + '/getOutcomeRequests',
      {
        params: query,
      }
    );
    return response.data; 
  }

  static async cancelRequest(fromUserId: number, toUserId: number) {
    const response = await api.post(
      INITIAL_URL + '/cancelRequest',
      {
        fromUserId,
        toUserId,
      }
    );
    return response.data;
  }

  static async sendRequest(fromUserId: number, toUserId: number) {
    const response = await api.post(
      INITIAL_URL + '/sendRequest',
      {
        fromUserId,
        toUserId,
      }
    );
    return response.data;
  }

  static async rejectRequest(fromUserId: number, toUserId: number) {
    const response = await api.post(
      INITIAL_URL + '/rejectRequest',
      {
        fromUserId,
        toUserId,
      }
    );
    return response.data;
  }

  static async acceptRequest(fromUserId: number, toUserId: number) {
    const response = await api.post(
      INITIAL_URL + '/acceptRequest',
      {
        fromUserId,
        toUserId,
      }
    );
    return response.data;
  }

  static async deleteFriend(fromUserId: number, toUserId: number) {
    const response = await api.post(
      INITIAL_URL + '/deleteFriend',
      {
        fromUserId,
        toUserId,
      }
    );
    return response.data;
  }

  static async cancelDeleteFriend(userId1: number, userId2: number) {
    const response = await api.post(
      INITIAL_URL + '/cancelDeleteFriend',
      {
        userId1,
        userId2,
      }
    );
    return response.data;
  }
}