import { createSlice } from "@reduxjs/toolkit";
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

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default githubSlice.reducer;