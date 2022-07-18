import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GithubUser } from "../models/github";

interface IGithubState {
  users: GithubUser[];
  loading: boolean;
  errorMsg?: string | null;
}

const initialState: IGithubState = {
  users: [],
  loading: false,
};

export interface IListPayload {
  pageSize: number;
  since: number;
}

export const fetchUsers = createAction<IListPayload>("github/FETCH_USERS");
export const fetchingUsers = createAction("github/FETCHING_USERS");
export const fetchUsersSuccess = createAction<GithubUser[]>(
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
        (state, action: PayloadAction<GithubUser[]>) => {
          return {
            ...state,
            users: action.payload,
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
