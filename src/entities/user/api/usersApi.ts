import api from "../../../shared/api";
import { UsualQuery } from "../../../shared/types";
import { UserDto } from "../model";

export interface Users1Query extends UsualQuery {
  
}

const INITIAL_URL = '/users';

export class UserApi {
  static async getAllUsers1(query: Users1Query) {
    const response = await api.get<UserDto[]>(
      INITIAL_URL + '/getAllUsers1',
      {
        params: query,
      }
    );
    return response.data;
  }

  static async getUserById(userId: number) {
    const response = await api.get<UserDto>(
      INITIAL_URL + '/getUserById/' + userId,
    );
    return response.data;
  }
}