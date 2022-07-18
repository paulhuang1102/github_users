import { from, of } from "rxjs";
import {
  filter,
  throttleTime,
  switchMap,
  catchError,
  map,
  startWith,
  tap,
} from "rxjs/operators";
import { AppEpic } from "../store";
import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFail,
  fetchingUsers,
  fetchUser,
  fetchUserSuccess,
  fetchingUser,
  fetchUserFail,
} from "../slices/github";
import { getUser, getUsersList } from "../utils/apis";
import { parseLink, parseSince } from "../utils/parser";

// WORKAROUND: https://api.github.com/users API didn't return prev in header link
// Record previous in array.
const paginations: number[] = [];

const fetchUsersEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    filter(fetchUsers.match),
    throttleTime(200),
    switchMap((action) =>
      from(getUsersList(action.payload)).pipe(
        tap(() => {
          const index = paginations.findIndex(
            (p) => p === action.payload.since
          );
          if (index < 0) {
            paginations.push(action.payload.since);
          }
        }),
        map((res) => {
          const link = parseLink(res.link ?? "");
          const index = paginations.indexOf(action.payload.since);

          return fetchUsersSuccess({
            users: res.data,
            since: action.payload.since,
            prev: index > 0 ? paginations[index - 1] : null,
            next: link.last || !link.next ? null : parseSince(link.next),
          });
        }),
        startWith(fetchingUsers()),
        catchError((err) => of(fetchUsersFail(err)))
      )
    )
  );

const fetchUserEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    filter(fetchUser.match),
    switchMap((action) =>
      from(getUser(action.payload)).pipe(
        map((res) => fetchUserSuccess(res.data)),
        startWith(fetchingUser()),
        catchError((e) => of(fetchUserFail(e)))
      )
    )
  );

const githubEpic = [fetchUsersEpic, fetchUserEpic];
export default githubEpic;
