import { GithubAgent } from "./httpAgent";
import { IListPayload } from "../slices/github";

export const getUsersList = ({ since, pageSize }: IListPayload) =>
  GithubAgent.request("GET", `/users?since=${since}&per_page=${pageSize}`);

export const getUser = (name: string) =>
  GithubAgent.request("GET", `/users/${name}`);
