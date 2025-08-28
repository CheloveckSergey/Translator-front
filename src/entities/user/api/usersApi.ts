import api from "../../../shared/api";
import { Copyable } from "../../../shared/types";
import { UpdateImageDto, AvatarUserDto, User, AvatarUser, UserDtoSchema } from "../model";

export interface UserQuery {
  wordsNumber?: boolean,
  friendship?: boolean,
}

export interface UserQuery1<K extends keyof UserDtoSchema> {
  userId: number,
  fields: K[],
}

const INITIAL_URL = '/users';

export class UserApi {
  static async getUserById(userId: number, query?: UserQuery) {
    const response = await api.get<AvatarUserDto>(
      INITIAL_URL + '/getUserById/' + userId,
      {
        params: query,
      }
    );
    return response.data;
  }

  static async getUser1<K extends keyof UserDtoSchema>(query: UserQuery1<K>): Promise<Pick<UserDtoSchema, K>> {
    const response = await api.get<Pick<UserDtoSchema, K>>(
      INITIAL_URL + '/getUser1/',
      {
        params: query,
      }
    );
    return response.data
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