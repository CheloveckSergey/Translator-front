import api from "../../../shared/api";
import { UpdateImageDto, AvatarUserDto } from "../model";

export interface UserQuery {
  wordsNumber?: boolean,
  friendship?: boolean,
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