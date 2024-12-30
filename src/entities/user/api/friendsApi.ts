import api from "../../../shared/api";
import { UsualQuery } from "../../../shared/types";
import { FriendDto, IncomeRequestUserDto, OutcomeRequestUserDto, PotentialFriendDto } from "../model";

export interface UsersQuery extends UsualQuery {
  userId: number,
}

const INITIAL_URL = '/friends';

export class FriendsApi {
  static async getFriends(query: UsersQuery) {
    const response = await api.get<FriendDto[]>(
      INITIAL_URL + '/getFriends',
      {
        params: query,
      }
    );
    return response.data;
  }

  static async getFindFriends(query: UsersQuery) {
    const response = await api.get<PotentialFriendDto[]>(
      INITIAL_URL + '/getFindFriends',
      {
        params: query,
      }
    );
    return response.data;
  }

  static async getIncomeRequests(query: UsersQuery) {
    const response = await api.get<IncomeRequestUserDto[]>(
      INITIAL_URL + '/getIncomeRequests',
      {
        params: query,
      }
    );
    return response.data; 
  }

  static async getOutcomeRequests(query: UsersQuery) {
    const response = await api.get<OutcomeRequestUserDto[]>(
      INITIAL_URL + '/getOutcomeRequests',
      {
        params: query,
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