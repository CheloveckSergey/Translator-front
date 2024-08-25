import { User } from "../../../entities/user/model";

export interface UserState {
  user: User | undefined,
  loading: boolean,
  error: string | undefined,
}

export interface ReqAuthDto {
  login: string,
  password: string,
}

export interface ResAuthDto {
  id: number, 
  login: string, 
  accessToken: string,
}

export interface LogoutRes {
  message: string
}