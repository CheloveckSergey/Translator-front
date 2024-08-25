import { Dispatch, ThunkDispatch, UnknownAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../../features/auth/model/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { UserState } from "../../features/auth/model/types";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

const rootReducer = combineReducers({
  user: userSlice.reducer,

})

export type RootState = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

