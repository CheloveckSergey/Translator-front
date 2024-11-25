import api from "../../../shared/api";
import { UsualQuery } from "../../../shared/types";
import { UpdateImageDto, UserDto } from "../model";

export interface Users1Query extends UsualQuery {
  
}

export interface UserQuery {
  meUserId?: number,
  wordsNumber?: boolean,
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

  static async getUserById(userId: number, query?: UserQuery) {
    const response = await api.get<UserDto>(
      INITIAL_URL + '/getUserById/' + userId,
      {
        params: query,
      }
    );
    return response.data;
  }

  static async updateAvatar(file: File): Promise<UpdateImageDto> {
    const formData = new FormData();
    formData.append('img', file);

    const response = await api.post<UpdateImageDto>(
      INITIAL_URL + '/updateAvatar/',
      formData,
    );
    return response.data;
  }
}