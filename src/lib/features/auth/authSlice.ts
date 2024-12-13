import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import _ from "lodash";
import AppUser, { AppUserSettings } from "@/models/appUser";

export type AuthStateType =
  | "anonymous"
  | "authenticated"
  | "unauthenticated"
  | "registration_required";

export interface AuthState {
  user?: AppUser | null;
  isAdmin: boolean;
  state: AuthStateType;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  isAdmin: false,
  state: "unauthenticated",
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<
        ((AppUser | undefined) & { state?: AuthStateType }) | null | undefined
      >,
    ) => {
      state.loading = false;
      if (!action.payload) {
        state.user = null;
        state.state = "unauthenticated";
        return;
      }
      const { state: authState, ...user } = action.payload;
      if (user && !_.isEqual(state.user, user)) {
        state.user = user;
      }
      state.state = action.payload.state ?? "authenticated";
    },
    updateUserSettings: (
      state,
      action: PayloadAction<Partial<AppUserSettings>>,
    ) => {
      if (state.user) {
        state.user = {
          ...state.user,
          settings: {
            ...state.user.settings,
            ...action.payload,
          },
        };
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      console.error(action.payload);
      state.error = action.payload;
      state.loading = false;
    },
    clearUser: state => {
      state.loading = false;
      state.user = null;
      state.state = "unauthenticated";
    },
  },
});

export const { setUser, updateUserSettings, setError, clearUser } =
  authSlice.actions;

export const selectAuth = (state: RootState): AuthState => state.auth;

export default authSlice.reducer;
