import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LogoutRes, ReqAuthDto, ResAuthDto, UserState } from "./types";
import AuthApi from "../api";
import { AxiosError } from "axios";

export interface MyRejectValue {
  message: string | undefined,
  status: number | undefined,
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
      return thunkAPI.rejectWithValue({ message: err.response?.data.message, status: err.response?.status });
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
      return thunkAPI.rejectWithValue({ message: err.response?.data.message, status: err.response?.status });
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
      return thunkAPI.rejectWithValue({ message: err.response?.data.message, status: err.response?.status });
    }
  }
)

const logoutThunk = createAsyncThunk<
  LogoutRes,
  { userId: number },
  {
    rejectValue: MyRejectValue,
  }
>(
  'auth/logout',
  async ({ userId }, thunkAPI) => {
    console.log('ЛОГАУТСАНК');
    try {
      const response = await AuthApi.logout(userId);
      localStorage.removeItem('accessToken');
      return response.data;
    } catch (error) {
      const err = error as AxiosError<MyRejectValue>;
      return thunkAPI.rejectWithValue({ message: err.response?.data.message, status: err.response?.status });
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(registerThunk.pending, (state, action) => {
        state.user = undefined;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload;
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
        state.user = action.payload;
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
        state.user = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.user = undefined;
        state.loading = false;
        state.error = action.payload?.message;
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
        state.error = action.payload?.message;
      })
  }
});

export const authThunks = {
  registerThunk, 
  loginThunk,
  refreshThunk,
  logoutThunk,
}