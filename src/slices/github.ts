import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GithubUser, GithubUserDetail } from "../models/github";

interface IGithubState {
  users: GithubUser[];
  loading: boolean;
  errorMsg?: string | null;
  since: number;
  prev: number | null;
  next: number | null;
  selectedUser: GithubUserDetail | null;
}

const initialState: IGithubState = {
  users: [],
  loading: false,
  since: 0,
  prev: null,
  next: null,
  selectedUser: null,
};

export interface IListPayload {
  pageSize: number;
  since: number;
}

interface IUsersPayload {
  users: GithubUser[];
  since: number;
  prev: number | null;
  next: number | null;
}

export const fetchUsers = createAction<IListPayload>("github/FETCH_USERS");
export const fetchingUsers = createAction("github/FETCHING_USERS");
export const fetchUsersSuccess = createAction<IUsersPayload>(
  "github/FETCH_USERS_SUCCESS"
);
export const fetchUsersFail = createAction<string>("github/FETCH_USERS_FAIL");

export const fetchUser = createAction<string>("github/FETCH_USER");
export const fetchingUser = createAction("github/FETCHING_USER");
export const fetchUserSuccess = createAction<GithubUserDetail>(
  "github/FETCH_USER_SUCCESS"
);
export const fetchUserFail = createAction<string>("github/FETCH_USER_FAIL");

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUsersSuccess,
        (state, action: PayloadAction<IUsersPayload>) => {
          return {
            ...state,
            users: action.payload.users,
            prev: action.payload.prev,
            next: action.payload.next,
            loading: false,
          };
        }
      )
      .addCase(fetchingUsers, (state) => ({
        ...state,
        loading: true,
        errorMsg: null,
      }))
      .addCase(fetchUsersFail, (state, action: PayloadAction<string>) => {
        return {
          ...state,
          errorMsg: action.payload,
          loading: false,
        };
      })
      .addCase(fetchingUser, (state) => ({
        ...state,
        loading: true,
        selectedUser: null,
        errorMsg: null,
      }))
      .addCase(
        fetchUserSuccess,
        (state, action: PayloadAction<GithubUserDetail>) => {
          return {
            ...state,
            selectedUser: action.payload,
            loading: false,
          };
        }
      )
      .addCase(fetchUserFail, (state, action: PayloadAction<string>) => {
        return {
          ...state,
          loading: false,
          errorMsg: action.payload,
        };
      });
  },
});

export default githubSlice.reducer;
