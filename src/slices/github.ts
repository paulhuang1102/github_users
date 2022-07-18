import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GithubUser } from "../models/github";

interface IGithubState {
  users: GithubUser[];
  loading: boolean;
  errorMsg?: string | null;
  since: number;
  prev: number | null;
  next: number | null;
}

const initialState: IGithubState = {
  users: [],
  loading: false,
  since: 0,
  prev: null,
  next: null,
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
      });
  },
});

export default githubSlice.reducer;
