import { from, of } from "rxjs";
import { filter, throttleTime, switchMap, catchError, map, startWith } from "rxjs/operators";
import { AppEpic } from "../store";
import { fetchUsers, fetchUsersSuccess, fetchUsersFail, fetchingUsers } from "../slices/github";
import { getUsersList } from "../utils/apis";
import { parseLink, parseSince } from '../utils/parser';

const fetchUsersEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    filter(fetchUsers.match),
    throttleTime(200),
    switchMap((action) =>
      from(getUsersList(action.payload)).pipe(
        map((res) =>
          {
            const link = parseLink(res.link ?? "");

            return fetchUsersSuccess(
              {
                users: res.data,
                since: action.payload.since,
                prev: null,
                next: link.last || !link.next ? null : parseSince(link.next),
              }
            );
          })
        ,
        startWith(fetchingUsers()),
        catchError((err) => of(fetchUsersFail(err)))
      )
    )
  );

const githubEpic = [fetchUsersEpic];
export default githubEpic;
