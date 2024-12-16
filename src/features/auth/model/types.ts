import { CurUser } from "../../../entities/user/model";

export interface UserState {
  user: CurUser | undefined,
  loading: boolean,
  error: string | undefined,
}

export interface ReqAuthDto {
  login: string,
  password: string,
}

export interface LogoutRes {
  message: string
}