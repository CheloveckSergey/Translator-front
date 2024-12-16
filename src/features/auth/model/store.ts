import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LogoutRes, ReqAuthDto, UserState } from "./types";
import AuthApi from "../api";
import { AxiosError } from "axios";
import { ResAuthDto, mapCurUser } from "../../../entities/user";

export interface MyRejectValue {
  message: string,
  status: number,
}

const initialState: UserState = {
  user: undefined,
  loading: false,
  error: undefined,
}

const registerThunk = createAsyncThunk<
  ResAuthDto,
  ReqAuthDto,
  {
    rejectValue: MyRejectValue,
  }
>(
  'auth/register',
  async (reqAuthDto, thunkAPI) => {
    console.log('РЕГИСТЕРСАНК');
    try {
      const response = await AuthApi.registration(reqAuthDto);
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<MyRejectValue>;
      if (err.response?.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: 'Неизвестная ошибка', status: 0 });
      }
    }
  }
)

const loginThunk = createAsyncThunk<
  ResAuthDto,
  ReqAuthDto,
  {
    rejectValue: MyRejectValue,
  }
>(
  'auth/login',
  async (reqAuthDto, thunkAPI) => {
    console.log('ЛОГИНСАНК');
    try {
      const response = await AuthApi.login(reqAuthDto);
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<MyRejectValue>;
      if (err.response?.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: 'Неизвестная ошибка', status: 0 });
      }
    }
  }
)

const refreshThunk = createAsyncThunk<
  ResAuthDto,
  {},
  {
    rejectValue: MyRejectValue,
  }
>(
  'auth/refresh',
  async (_, thunkAPI) => {
    console.log('РЕФРЕШСАНК');
    try {
      const response = await AuthApi.refresh();
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error) {
      const err = error as AxiosError<MyRejectValue>;
      if (err.response?.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: 'Неизвестная ошибка', status: 0 });
      }
    }
  }
)

const logoutThunk = createAsyncThunk<
  LogoutRes,
  {},
  {
    rejectValue: MyRejectValue,
    state: { user: UserState },
  }
>(
  'auth/logout',
  async (_, thunkAPI) => {
    console.log('ЛОГАУТСАНК');
    try {
      const { user: userState } = thunkAPI.getState();
      const response = await AuthApi.logout(userState.user!.id);
      localStorage.removeItem('accessToken');
      return response.data;
    } catch (error) {
      const err = error as AxiosError<MyRejectValue>;
      if (err.response?.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: 'Неизвестная ошибка', status: 0 });
      }
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerThunk.pending, (state, action) => {
        state.user = undefined;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = mapCurUser(action.payload);
        state.loading = false;
        state.error = undefined;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.user = undefined;
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(loginThunk.pending, (state, action) => {
        state.user = undefined;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = mapCurUser(action.payload);
        state.loading = false;
        state.error = undefined;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.user = undefined;
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(refreshThunk.pending, (state, action) => {
        state.user = undefined;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = mapCurUser(action.payload);
        state.loading = false;
        state.error = undefined;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.user = undefined;
        state.loading = false;
        state.error = undefined;
      })

      .addCase(logoutThunk.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.user = undefined;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.user = undefined;
        state.loading = false;
        state.error = undefined;
      })
  }
});

export const authThunks = {
  registerThunk, 
  loginThunk,
  refreshThunk,
  logoutThunk,
}